import { PriceRange } from '@interfaces/results.interface'

export const priceRange: PriceRange[] = [
  {
    id: 1,
    name: 'under $10',
    min: 0,
    max: 10
  },
  {
    id: 2,
    name: '$10 - $20',
    min: 10,
    max: 20
  },
  {
    id: 3,
    name: '$20 - $30',
    min: 20,
    max: 30
  },
  {
    id: 4,
    name: '$30 - $50',
    min: 30,
    max: 50
  },
  {
    id: 5,
    name: '$50 - $100',
    min: 50,
    max: 100
  },
  {
    id: 6,
    name: '$100 - $150',
    min: 100,
    max: 150
  },
  {
    id: 7,
    name: '$150 & $200',
    min: 150,
    max: 200
  },
  {
    id: 8,
    name: '$200 & Above',
    min: 200,
    max: 999999
  }
]
