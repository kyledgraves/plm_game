export interface Part {
  id: string
  partNumber: string
  name: string
  description: string
  revision: string
  state: string
  specifications: Array<{ name: string; value: string; unit: string }>
  children: Array<{ partId: string; quantity: number }>
  unit?: string
  material?: string
  weight?: number
}

export interface ProductStructure {
  id: string
  name: string
  parts: string[]
}

export interface ChangeRequest {
  id: string
  title: string
  description: string
  status: string
  priority: string
  requestedBy: string
  requestedAt: string
  affectedParts: string[]
  affectedProducts: string[]
}

export interface ChangeOrder {
  id: string
  title: string
  description: string
  status: string
  priority: string
  requestedBy: string
  requestedAt: string
  implementationDate: string
  affectedParts: string[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt?: string
}

export interface StoryProgress {
  currentDialogue: string | null
  dialogueIndex: number
  seenDialogues: string[]
  currentAchievement: string | null
}

export interface Character {
  id: string
  name: string
  emoji: string
  role: string
  color: string
}

export interface DialogueEntry {
  characterId: string
  text: string
}
