import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import { useState } from 'react'

import { UserType } from '@/entities/types'
import { Navigate } from 'react-router-dom'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export default function Login() {
  const cmhsLoginToken = localStorage.getItem('cmhs_token')

  if (cmhsLoginToken) {
    return <Navigate to="/" replace={true} />
  }

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorInput, setErrorInput] = useState<string>('')

  const [credentials, setCredentials] = useState([])

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target

    setUsername(value)
    setPassword(value)

    setCredentials((values) => ({ ...values, [name]: value }))

    console.log(credentials)
  }

  const handleLogin = () => {
    if (!username || !password)
      return setErrorInput('Please fill in all fields')

    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/login.php`, {
        params: credentials,
      })
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          localStorage.setItem('cmhs_token', res.data[0].user_id)
          localStorage.setItem('cmhs_account_type', res.data[0].account_type)
          window.location.href = '/'
        }
      })
  }
  return (
    <div className="w-dvw h-dvh flex justify-center items-center flex-col ">
      <div className="bg-white shadow-slate-400 shadow-sm my-[2rem] w-[35rem] h-fit flex justify-center items-center flex-col p-4 rounded-md">
        <h1 className="my-[1rem] font-bold">Please log in</h1>
        <Label className="mb-1 self-start text-sm">Username</Label>
        <Input
          onChange={handleChange}
          className="mb-2"
          placeholder="Username"
          name="username"
        />

        <Label className="mb-1 self-start text-sm">Password</Label>
        <Input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
        <Button
          onClick={handleLogin}
          className="mt-[2rem] w-[10rem]"
          variant="outline"
        >
          Login
        </Button>

        {errorInput && <p className="text-red-500">{errorInput}</p>}
      </div>
    </div>
  )
}
