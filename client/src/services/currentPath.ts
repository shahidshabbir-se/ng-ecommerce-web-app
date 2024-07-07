'use client'
import { usePathname } from 'next/navigation'

export default function CurrentPath() {
  const router = usePathname()
  return router as string
}
