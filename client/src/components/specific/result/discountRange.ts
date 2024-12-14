import { DiscountRange } from '@interfaces/results.interface'

export const discountRange: DiscountRange[] = [
  {
    id: 1,
    name: '0%',
    minDiscount: 0,
    maxDiscount: 0
  },
  {
    id: 2,
    name: 'up to 20%',
    minDiscount: 0,
    maxDiscount: 20
  },
  {
    id: 3,
    name: '21%-30%',
    minDiscount: 21,
    maxDiscount: 30
  },
  {
    id: 4,
    name: '31%-40%',
    minDiscount: 31,
    maxDiscount: 40
  },
  {
    id: 5,
    name: '41%-50%',
    minDiscount: 41,
    maxDiscount: 50
  },
  {
    id: 6,
    name: '51%-60%',
    minDiscount: 51,
    maxDiscount: 60
  },
  {
    id: 7,
    name: '61%-70%',
    minDiscount: 61,
    maxDiscount: 70
  },
  {
    id: 8,
    name: '70% or more',
    minDiscount: 70,
    maxDiscount: 100
  }
]
