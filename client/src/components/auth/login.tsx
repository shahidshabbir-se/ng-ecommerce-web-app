import React, { useState } from 'react'
import { LoginUser } from '@interfaces/auth.interfaces'
import { loginUser } from '@utils/auth/login.utils'

const Login: React.FC = () => {
  const [loginUserCredentials, setLoginUserCredentials] = useState<LoginUser>({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState<string>('')

  const handleEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginUserCredentials({
      ...loginUserCredentials,
      [name]: value
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await loginUser(loginUserCredentials)
    } catch (error) {
      setMessage('Login failed. Please check your credentials.')
      console.error('Login error:', error)
    }
  }

  return (
    <form className='flex flex-col gap-5 p-4' onSubmit={handleLogin}>
      <label className='grid space-y-2'>
        <span className='px-1'>Email Address</span>
        <input
          className='h-11 border-2 border-[#E1F0E2] bg-white px-3'
          type='email'
          name='email'
          value={loginUserCredentials.email}
          onChange={handleEntry}
        />
      </label>
      <label className='grid space-y-2'>
        <span className='px-1'>Password</span>
        <input
          className='h-11 border-2 border-[#E1F0E2] bg-white px-3'
          type='password'
          name='password'
          value={loginUserCredentials.password}
          onChange={handleEntry}
        />
      </label>
      <button
        type='submit'
        className='bg-black py-3 font-bold text-lg text-white'
      >
        Login
      </button>
    </form>
  )
}

export default Login
