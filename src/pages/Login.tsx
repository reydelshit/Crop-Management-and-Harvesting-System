import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import { useState } from 'react'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export default function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [credentials, setCredentials] = useState([])

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target

    setUsername(value)
    setPassword(value)

    setCredentials((values) => ({ ...values, [name]: value }))

    console.log(credentials)
  }

  const handleLogin = () => {
    if (!username || !password) return setError('Please fill in all fields')

    axios
      .get('http://localhost/cmhs/login.php', {
        params: credentials,
      })
      .then((res) => {
        console.log(res.data)
      })
  }
  return (
    <div className="bg-gray-50 w-full h-full flex justify-center items-center">
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
        <Input onChange={handleChange} name="password" placeholder="Password" />
        <Button
          onClick={handleLogin}
          className="mt-[2rem] w-[10rem]"
          variant="outline"
        >
          Login
        </Button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  )
}
