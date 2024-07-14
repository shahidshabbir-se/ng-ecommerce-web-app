import React, { useState } from 'react'
import { registerUser } from '@utils/auth/register'
import { CreateUser } from '@interfaces/auth.interfaces'

const Register: React.FC = () => {
  const [createUser, setCreateUser] = useState<CreateUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState<string>('')

  const handleEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCreateUser({
      ...createUser,
      [name]: value
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (createUser.firstName === '') {
      setMessage('First Name is required')
      return
    }
    if (createUser.lastName === '') {
      setMessage('Last Name is required')
      return
    }
    if (createUser.email === '') {
      setMessage('Email is required')
      return
    }
    if (createUser.password === '') {
      setMessage('Password is required')
      return
    }
    const response = await registerUser(createUser)
    setMessage(response)
    console.log(response)
  }

  return (
    <form onSubmit={handleRegister} className='flex flex-col gap-5 p-4'>
      <label className='grid space-y-2'>
        <span className='px-1'>First Name</span>
        <input
          className='h-11 border-2 border-[#E1F0E2] bg-white px-3'
          type='text'
          name='firstName'
          value={createUser.firstName}
          onChange={handleEntry}
        />
      </label>
      <label className='grid space-y-2'>
        <span className='px-1'>Last Name</span>
        <input
          className='h-11 border-2 border-[#E1F0E2] bg-white px-3'
          type='text'
          name='lastName'
          value={createUser.lastName}
          onChange={handleEntry}
        />
      </label>
      <label className='grid space-y-2'>
        <span className='px-1'>Email Address</span>
        <input
          className='h-11 border-2 border-[#E1F0E2] bg-white px-3'
          type='email'
          name='email'
          value={createUser.email}
          onChange={handleEntry}
        />
      </label>
      <label className='grid space-y-2'>
        <span className='px-1'>Password</span>
        <input
          className='h-11 border-2 border-[#E1F0E2] bg-white px-3'
          type='password'
          name='password'
          value={createUser.password}
          onChange={handleEntry}
        />
      </label>
      <button
        type='submit'
        className='bg-black py-3 font-bold text-lg text-white'
      >
        Register
      </button>
    </form>
  )
}

export default Register
