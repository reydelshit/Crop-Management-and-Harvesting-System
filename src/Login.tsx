import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import { useState } from 'react'
import Farmer from '@/assets/farmer.png'
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
    <div className="w-dvw h-dvh flex justify-between items-center flex-row ">
      <div className="bg-[#D04848] text-[#F3B95F] shadow-slate-400 w-[40%] px-[5rem] h-full flex justify-center items-center flex-col p-4 rounded-md">
        <h1 className="mb-[7rem] font-semibold text-3xl">
          CROP MANAGEMENT AND HARVESTING SCHEDULE SYSTEM
        </h1>
        {/* <Label className="mb-1 self-start text-sm">Username</Label> */}
        <Input
          onChange={handleChange}
          className="mb-8 border-4 border-[#F3B95F] rounded-full p-8 w-full text-[#F3B95F] focus:outline-none placeholder:text-[#F3B95F] placeholder:text-2xl placeholder:font-semibold"
          placeholder="Username"
          name="username"
        />

        {/* <Label className="mb-1 self-start text-sm">Password</Label> */}
        <Input
          className="mb-2 border-4 border-[#F3B95F] rounded-full p-8 w-full text-[#F3B95F] focus:outline-none placeholder:text-[#F3B95F] placeholder:text-2xl placeholder:font-semibold"
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />

        <a
          onClick={handleLogin}
          className="text-[#F3B95F] bg-inherit text-3xl outline-none font-semibold cursor-pointer my-[1.5rem] hover:text-white"
        >
          Login
        </a>

        {errorInput && <p className="text-red-500">{errorInput}</p>}
      </div>

      <div className="w-[60%] bg-[#F3B95F] h-full items-center flex justify-center relative">
        <img className="w-[80%] absolute" src={Farmer} alt="farmer" />

        <div className="w-full h-full flex justify-end items-center">
          <div className="bg-[#6895D2] w-[50%] h-[80%]"></div>
        </div>
      </div>
    </div>
  )
}
