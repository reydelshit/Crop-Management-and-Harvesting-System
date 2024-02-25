import React from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function GoFrontBtn() {
  const navigate = useNavigate()
  return (
    <div className="my-2">
      <FaArrowCircleRight
        onClick={() => navigate(1)}
        className="text-primary-yellow text-[4rem] cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
      />
    </div>
  )
}
