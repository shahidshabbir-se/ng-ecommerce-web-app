export interface CreateAddress {
  userId: number
  addressLine: string
  city: string
  state: string
  postalCode: number
  country: string
}

export interface Address {
  addressId: number
  addressLine: string
  city: string
  state: string
  postalCode: number
  country: string
}
