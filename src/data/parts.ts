import type { Part } from '../utils/types'

export const INITIAL_PARTS: Part[] = [
  {
    id: 'HT-11000',
    partNumber: 'HT-11000',
    name: 'Main Rotor Blade',
    description: 'Primary lift component',
    revision: 'A',
    state: 'RELEASED',
    specifications: [
      { name: 'Length', value: '2.5m', unit: 'm' },
      { name: 'Material', value: 'Carbon Fiber', unit: '' }
    ],
    children: []
  },
  {
    id: 'HT-11200',
    partNumber: 'HT-11200',
    name: 'Tail Rotor Blade',
    description: 'Anti-torque component',
    revision: 'A',
    state: 'RELEASED',
    specifications: [
      { name: 'Length', value: '0.8m', unit: 'm' }
    ],
    children: []
  },
  {
    id: 'HT-11300',
    partNumber: 'HT-11300',
    name: 'Engine Assembly',
    description: 'Power plant',
    revision: 'A',
    state: 'RELEASED',
    specifications: [
      { name: 'Power', value: '450', unit: 'hp' }
    ],
    children: []
  }
]
