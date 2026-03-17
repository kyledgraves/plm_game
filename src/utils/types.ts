export interface Part {
  id: string
  partNumber: string
  name: string
  description: string
  revision: string
  state: string
  specifications: Array<{ name: string; value: string; unit: string }>
  children: Part[]
  unit?: string
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
