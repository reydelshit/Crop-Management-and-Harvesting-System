import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from 'react-router-dom'
import { FaArrowCircleRight } from 'react-icons/fa'
import Search from '@/lib/Search'
import { useEffect, useState } from 'react'
import axios from 'axios'

type ResponseData = {
  crops_id: string
  crops_name: string
  // crop_status: string
  field_id: string
  field_name: string
  suitability: string
}

export default function ManageCrops() {
  const [search, setSearch] = useState('')
  const user_id = localStorage.getItem('cmhs_token')
  const [responseData, setResponseData] = useState<ResponseData[]>([])

  const fetchCropsFromFirstPage = async () => {
    await axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops-summary.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        console.log(res.data)
        setResponseData(res.data)
        // if (res.data) {
        //   setCrops(res.data)
        // }
      })
  }

  useEffect(() => {
    fetchCropsFromFirstPage()
  }, [])

  return (
    <div className="w-full h-full flex items-start flex-col px-[2rem] relative">
      <div className="my-[2rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Crop Management
        </h1>

        <Search onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="w-full flex justify-center items-center">
        <div className="w-[80%]">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="text-primary-yellow">
                <TableHead className="text-primary-yellow text-xl">
                  Crop ID
                </TableHead>
                <TableHead className="text-primary-yellow text-xl">
                  Suitability
                </TableHead>
                <TableHead className="text-primary-yellow text-xl">
                  Crop Name
                </TableHead>

                <TableHead className="text-primary-yellow text-xl">
                  Status
                </TableHead>

                <TableHead className="text-primary-yellow text-xl">
                  Field ID
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-4 border-primary-yellow">
              {responseData.length > 0 ? (
                responseData.map((crop, index) => {
                  return (
                    <TableRow key={index} className="text-white">
                      <TableCell>{crop.crops_id}</TableCell>
                      <TableCell>{crop.suitability}</TableCell>
                      <TableCell>{crop.crops_name}</TableCell>
                      <TableCell>Planted</TableCell>
                      <TableCell>{crop.field_id}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow className="text-white">
                  <TableCell colSpan={5} className="text-center">
                    No crops found or loading...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="absolute right-5 bottom-[50%]">
        <Link to="/crops">
          <FaArrowCircleRight className="text-primary-yellow text-[4rem]" />
        </Link>
      </div>

      <div className="absolute bottom-5 right-2 w-full flex justify-end">
        <div className="flex-col flex p-2 rounded-md bg-primary-yellow text-primary-red font-semibold">
          <span className="font-bold">Legend:</span>
          <span>0 - not planted</span>
          <span>1 - planted</span>
          <span>2 - pestiscides</span>
          <span>3 -scheduled fo harvest</span>
          <span>4 - harvested</span>
        </div>
      </div>
    </div>
  )
}
