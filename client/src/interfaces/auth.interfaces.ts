export interface authState {
  currentState: 'auth' | 'register' | 'login'
}

export interface CreateUser{
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface LoginUser{
  email: string,
  password: string
}