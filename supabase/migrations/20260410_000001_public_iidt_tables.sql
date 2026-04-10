-- ============================================
-- IIDT - normalize Supabase tables to public.iidt_*
-- Safe to run multiple times.
-- ============================================

-- 1) shared trigger function
CREATE OR REPLACE FUNCTION public.update_edited_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.edit_date = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2) move/rename legacy tables if they exist
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'iidt' AND table_name = 'member'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'iidt_member'
  ) THEN
    ALTER TABLE iidt.member SET SCHEMA public;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'member'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'iidt_member'
  ) THEN
    ALTER TABLE public.member RENAME TO iidt_member;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'iidt' AND table_name = 'will'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'iidt_will'
  ) THEN
    ALTER TABLE iidt.will SET SCHEMA public;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'will'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'iidt_will'
  ) THEN
    ALTER TABLE public.will RENAME TO iidt_will;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'iidt' AND table_name = 'will_answer'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'iidt_will_answer'
  ) THEN
    ALTER TABLE iidt.will_answer SET SCHEMA public;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'will_answer'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'iidt_will_answer'
  ) THEN
    ALTER TABLE public.will_answer RENAME TO iidt_will_answer;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'iidt' AND table_name = 'token_blacklist'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'iidt_token_blacklist'
  ) THEN
    ALTER TABLE iidt.token_blacklist SET SCHEMA public;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'token_blacklist'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'iidt_token_blacklist'
  ) THEN
    ALTER TABLE public.token_blacklist RENAME TO iidt_token_blacklist;
  END IF;
END $$;

-- 3) create missing tables in final shape
CREATE TABLE IF NOT EXISTS public.iidt_member (
  mem_idx         SERIAL          PRIMARY KEY,
  mem_userid      VARCHAR(100)    NOT NULL,
  mem_username    VARCHAR(50)     NOT NULL,
  mem_email       VARCHAR(100)    NOT NULL,
  mem_nickname    VARCHAR(30)     NOT NULL,
  mem_cooperation VARCHAR(20)     NOT NULL,
  mem_status      SMALLINT        NOT NULL DEFAULT 0,
  reg_date        TIMESTAMPTZ     NOT NULL DEFAULT now(),
  edit_date       TIMESTAMPTZ     NOT NULL DEFAULT now(),

  CONSTRAINT uk_iidt_member_nickname UNIQUE (mem_nickname),
  CONSTRAINT uk_iidt_member_userid_cooperation UNIQUE (mem_userid, mem_cooperation)
);

CREATE TABLE IF NOT EXISTS public.iidt_will (
  will_id         VARCHAR(21)     PRIMARY KEY,
  mem_idx         INT             REFERENCES public.iidt_member(mem_idx),
  title           VARCHAR(30)     NOT NULL,
  content         VARCHAR(1500),
  thumbnail       VARCHAR(255),
  content_type    SMALLINT        NOT NULL DEFAULT 0,
  is_private      SMALLINT        NOT NULL DEFAULT 0,
  is_delete       SMALLINT        NOT NULL DEFAULT 0,
  guest_nickname  VARCHAR(30),
  guest_password  TEXT,
  reg_date        TIMESTAMPTZ     NOT NULL DEFAULT now(),
  edit_date       TIMESTAMPTZ     NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.iidt_will_answer (
  answer_idx      SERIAL          PRIMARY KEY,
  will_id         VARCHAR(21)     NOT NULL REFERENCES public.iidt_will(will_id) ON DELETE CASCADE,
  qs_essay_idx    VARCHAR(50)     NOT NULL DEFAULT '',
  qs_idx          VARCHAR(10)     NOT NULL,
  qs_essay_answer TEXT            NOT NULL,
  reg_date        TIMESTAMPTZ     NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.iidt_token_blacklist (
  token_idx       SERIAL          PRIMARY KEY,
  access_token    TEXT            NOT NULL,
  mem_idx         INT             NOT NULL REFERENCES public.iidt_member(mem_idx),
  expired_at      TIMESTAMPTZ     NOT NULL,
  reg_date        TIMESTAMPTZ     NOT NULL DEFAULT now()
);

-- 4) ensure guest-writing shape
ALTER TABLE public.iidt_will
  ALTER COLUMN mem_idx DROP NOT NULL;

ALTER TABLE public.iidt_will
  ADD COLUMN IF NOT EXISTS guest_nickname VARCHAR(30),
  ADD COLUMN IF NOT EXISTS guest_password TEXT;

-- 5) comments and indexes
COMMENT ON TABLE public.iidt_member IS '회원';
COMMENT ON COLUMN public.iidt_member.mem_status IS '0=정상, 1=정지, 2=탈퇴';

COMMENT ON TABLE public.iidt_will IS '유언장';
COMMENT ON COLUMN public.iidt_will.content_type IS '0=기본작성, 1=질문모드';

COMMENT ON TABLE public.iidt_will_answer IS '유언장 질문 답변';
COMMENT ON TABLE public.iidt_token_blacklist IS '토큰 블랙리스트';

CREATE INDEX IF NOT EXISTS idx_iidt_will_mem_idx ON public.iidt_will(mem_idx);
CREATE INDEX IF NOT EXISTS idx_iidt_will_list ON public.iidt_will(is_delete, reg_date DESC);
CREATE INDEX IF NOT EXISTS idx_iidt_will_answer_will_id ON public.iidt_will_answer(will_id);
CREATE INDEX IF NOT EXISTS idx_iidt_token_blacklist_expired_at ON public.iidt_token_blacklist(expired_at);

-- 6) triggers
DROP TRIGGER IF EXISTS trg_iidt_member_edit_date ON public.iidt_member;
CREATE TRIGGER trg_iidt_member_edit_date
  BEFORE UPDATE ON public.iidt_member
  FOR EACH ROW EXECUTE FUNCTION public.update_edited_at();

DROP TRIGGER IF EXISTS trg_iidt_will_edit_date ON public.iidt_will;
CREATE TRIGGER trg_iidt_will_edit_date
  BEFORE UPDATE ON public.iidt_will
  FOR EACH ROW EXECUTE FUNCTION public.update_edited_at();

-- 7) RLS
ALTER TABLE public.iidt_member ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iidt_will ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iidt_will_answer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iidt_token_blacklist ENABLE ROW LEVEL SECURITY;
