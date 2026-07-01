export interface Address {
  id: string
  label: string
  fullName: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  addresses: Address[]
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}
