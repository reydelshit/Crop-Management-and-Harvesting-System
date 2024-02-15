import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useFetchData<T>(url: string, options: any) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  setLoading(true)

  try {
    axios.get(url, options).then((res) => {
      setData(res.data)
      setLoading(false)
    })
  } catch (error) {
    console.log(error)
    setError('Error fetching data')
    setLoading(true)
  }

  return { data, error, loading }
}
