import React, { useState } from 'react'
import { LoginUser } from '@interfaces/auth.interfaces'
import { loginUser } from '@utils/auth/login.utils'
import { useGlobalUserStore } from '@store/globalUser/store'
import { useAuthAsideVisibilityStore } from '@store/index'

const Login: React.FC = () => {
  const [loginUserCredentials, setLoginUserCredentials] = useState<LoginUser>({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState<string>('')
  const handleAuthAsideVisibility = useAuthAsideVisibilityStore(
    (state) => state.setAuthAsideVisibility
  )

  const handleEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginUserCredentials({
      ...loginUserCredentials,
      [name]: value
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Before login',useGlobalUserStore.getState().userId)

    try {
      const response = await loginUser(loginUserCredentials)
      if (
        response.message ===
        'This email is not registered. Please sign up to create an account.'
      ) {
        setMessage(response.message)
        return
      }
      if (
        response.message ===
        "Incorrect password. Please ensure you've entered the correct password."
      ) {
        setMessage(response.message)
        return
      }
      useGlobalUserStore.getState().setUser(response.user)
      console.log('After login',useGlobalUserStore.getState().userId)
      setTimeout(() => {
        setMessage('Login successful')
      }, 2000)
      setTimeout(() => {
        handleAuthAsideVisibility(false)
      }, 1000)
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
      <p
        className={`'w-full text-center ${
          message === 'Login successful' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {message}
      </p>
    </form>
  )
}

export default Login
