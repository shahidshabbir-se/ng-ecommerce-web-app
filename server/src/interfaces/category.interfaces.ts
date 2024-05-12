import { Prisma } from '@prisma/client'

export interface categoryData {
  categoryName: string
  categoryDescription: Prisma.InputJsonValue
  parentId?: number
}
