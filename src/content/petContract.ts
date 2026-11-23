export const PET_IDS = ['piko', 'mobi', 'lumba', 'ruru', 'kora'] as const;
export type PetId = (typeof PET_IDS)[number];

export const PET_PERSONALITIES = ['ramah', 'tenang', 'langsung', 'sinis', 'penasaran'] as const;
export type PetPersonality = (typeof PET_PERSONALITIES)[number];

export const PET_AI_STEP_KINDS = ['concept', 'story', 'sim', 'limit'] as const;
export type PetAiStepKind = (typeof PET_AI_STEP_KINDS)[number];

export const PET_AI_TIP_IDS = ['recall', 'compare', 'predict'] as const;
export type PetAiTipId = (typeof PET_AI_TIP_IDS)[number];

export const PET_HINT_CUES = ['requested', 'stuck', 'taking_time'] as const;
export type PetHintCue = (typeof PET_HINT_CUES)[number];

export interface PetHintRequest {
  worldId: string;
  topicId: string;
  stepKind: PetAiStepKind;
  personality: PetPersonality;
  intent: 'study_hint';
  cue?: PetHintCue;
}

export interface PetHintResponse {
  tipId: PetAiTipId;
}
