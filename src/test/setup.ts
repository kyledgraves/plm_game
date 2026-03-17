import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock localStorage for zustand persist middleware
const mockStorage = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(global, 'localStorage', { value: mockStorage })
Object.defineProperty(global, 'sessionStorage', { value: mockStorage })