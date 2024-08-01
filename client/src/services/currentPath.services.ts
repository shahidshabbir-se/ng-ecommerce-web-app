import { headers } from 'next/headers'

export const currentPath = () => {
  const headersList = headers()
  const fullUrl = headersList.get('referer')
  return fullUrl
}
