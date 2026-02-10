import { NextResponse } from 'next/server'
import type { Will, Answer } from '@/api/will/types'

export function apiSuccess<T>(result: T) {
  return NextResponse.json({ code: '0000', reason: 'success', result })
}

export function apiError(code: string, reason: string, status = 400) {
  return NextResponse.json({ code, reason, result: null }, { status })
}

// Supabase 소문자 → 기존 Will 타입 대문자 매핑
export function mapWillRow(row: any): Will {
  return {
    WILL_ID: row.will_id,
    MEM_IDX: row.mem_idx,
    TITLE: row.title,
    CONTENT: row.content ?? '',
    THUMBNAIL: row.thumbnail ?? '',
    CONTENT_TYPE: row.content_type,
    IS_PRIVATE: row.is_private,
    IS_DELETE: row.is_delete,
    REG_DATE: row.reg_date,
    EDIT_DATE: row.edit_date,
    MEM_NICKNAME: row.member?.mem_nickname ?? row.mem_nickname ?? '',
    ANSWER_LIST: row.will_answer?.map(mapAnswerRow) ?? undefined,
  }
}

function mapAnswerRow(row: any): Answer {
  return {
    question_essay_index: row.qs_essay_idx,
    question_index: row.qs_idx,
    question_answer: row.qs_essay_answer,
  }
}
