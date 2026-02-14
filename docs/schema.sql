-- ============================================
-- IIDT (If I Die Tomorrow) - Supabase Schema
-- Supabase SQL Editor에 그대로 복붙해서 실행
-- ============================================

-- 스키마 생성
CREATE SCHEMA IF NOT EXISTS iidt;
SET search_path TO iidt;

-- updated_at 자동 갱신 트리거 함수
CREATE OR REPLACE FUNCTION iidt.update_edited_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.edit_date = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ============================================
-- 1. 회원
-- ============================================
CREATE TABLE iidt.member (
  mem_idx         SERIAL          PRIMARY KEY,
  mem_userid      VARCHAR(100)    NOT NULL,                          -- 소셜 로그인 유저 ID
  mem_username    VARCHAR(50)     NOT NULL,                          -- 이름
  mem_email       VARCHAR(100)    NOT NULL,                          -- 이메일
  mem_nickname    VARCHAR(30)     NOT NULL,                          -- 닉네임
  mem_cooperation VARCHAR(20)     NOT NULL,                          -- 소셜 제공자 (kakao, google 등)
  mem_status      SMALLINT        NOT NULL DEFAULT 0,                -- 0=정상, 1=정지, 2=탈퇴
  reg_date        TIMESTAMPTZ     NOT NULL DEFAULT now(),
  edit_date       TIMESTAMPTZ     NOT NULL DEFAULT now(),

  CONSTRAINT uk_mem_nickname UNIQUE (mem_nickname),
  CONSTRAINT uk_mem_userid_cooperation UNIQUE (mem_userid, mem_cooperation)
);

COMMENT ON TABLE  iidt.member IS '회원';
COMMENT ON COLUMN iidt.member.mem_status IS '0=정상, 1=정지, 2=탈퇴';

CREATE TRIGGER trg_member_edit_date
  BEFORE UPDATE ON iidt.member
  FOR EACH ROW EXECUTE FUNCTION iidt.update_edited_at();


-- ============================================
-- 2. 유언장
-- ============================================
CREATE TABLE iidt.will (
  will_id         VARCHAR(21)     PRIMARY KEY,                       -- nanoid (프론트 생성)
  mem_idx         INT             NOT NULL REFERENCES iidt.member(mem_idx),
  title           VARCHAR(30)     NOT NULL,
  content         VARCHAR(1500),                                     -- 기본모드 본문
  thumbnail       VARCHAR(255),
  content_type    SMALLINT        NOT NULL DEFAULT 0,                -- 0=기본, 1=질문
  is_private      SMALLINT        NOT NULL DEFAULT 0,                -- 0=공개, 1=비공개
  is_delete       SMALLINT        NOT NULL DEFAULT 0,                -- 0=정상, 1=삭제
  reg_date        TIMESTAMPTZ     NOT NULL DEFAULT now(),
  edit_date       TIMESTAMPTZ     NOT NULL DEFAULT now()
);

COMMENT ON TABLE  iidt.will IS '유언장';
COMMENT ON COLUMN iidt.will.content_type IS '0=기본작성, 1=질문모드';

CREATE INDEX idx_will_mem_idx ON iidt.will(mem_idx);
CREATE INDEX idx_will_list ON iidt.will(is_delete, reg_date DESC);

CREATE TRIGGER trg_will_edit_date
  BEFORE UPDATE ON iidt.will
  FOR EACH ROW EXECUTE FUNCTION iidt.update_edited_at();


-- ============================================
-- 3. 유언장 질문 답변 (content_type=1)
-- ============================================
CREATE TABLE iidt.will_answer (
  answer_idx      SERIAL          PRIMARY KEY,
  will_id         VARCHAR(21)     NOT NULL REFERENCES iidt.will(will_id) ON DELETE CASCADE,
  qs_essay_idx    VARCHAR(50)     NOT NULL DEFAULT '',               -- 에세이 질문 인덱스
  qs_idx          VARCHAR(10)     NOT NULL,                          -- 질문 번호 (1~7)
  qs_essay_answer TEXT            NOT NULL,                          -- 답변
  reg_date        TIMESTAMPTZ     NOT NULL DEFAULT now()
);

COMMENT ON TABLE iidt.will_answer IS '유언장 질문 답변';

CREATE INDEX idx_answer_will_id ON iidt.will_answer(will_id);


-- ============================================
-- 4. 토큰 블랙리스트 (로그아웃)
-- ============================================
CREATE TABLE iidt.token_blacklist (
  token_idx       SERIAL          PRIMARY KEY,
  access_token    TEXT            NOT NULL,
  mem_idx         INT             NOT NULL REFERENCES iidt.member(mem_idx),
  expired_at      TIMESTAMPTZ     NOT NULL,                          -- 토큰 만료 시각
  reg_date        TIMESTAMPTZ     NOT NULL DEFAULT now()
);

COMMENT ON TABLE iidt.token_blacklist IS '토큰 블랙리스트';

CREATE INDEX idx_blacklist_expired_at ON iidt.token_blacklist(expired_at);


-- ============================================
-- 5. RLS (Row Level Security)
-- ============================================
ALTER TABLE iidt.member          ENABLE ROW LEVEL SECURITY;
ALTER TABLE iidt.will            ENABLE ROW LEVEL SECURITY;
ALTER TABLE iidt.will_answer     ENABLE ROW LEVEL SECURITY;
ALTER TABLE iidt.token_blacklist ENABLE ROW LEVEL SECURITY;

-- 서비스 역할(service_role)은 RLS 무시 → 백엔드 서버에서 service_role key 사용
-- 필요 시 아래처럼 정책 추가:
--
-- CREATE POLICY "본인 유언장만 수정" ON iidt.will
--   FOR UPDATE USING (mem_idx = current_setting('app.current_user_idx')::int);
--
-- CREATE POLICY "공개 유언장 조회" ON iidt.will
--   FOR SELECT USING (is_delete = 0 AND is_private = 0);
