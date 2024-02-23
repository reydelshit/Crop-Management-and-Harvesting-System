import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
  suitable_month: string
  status: string
}

export default function ManageCrops() {
  const [search, setSearch] = useState('')
  const user_id = localStorage.getItem('cmhs_token')
  const [responseData, setResponseData] = useState<ResponseData[]>([])
  const [filterMonth, setFilterMonth] = useState('' as string)
  const [sortCrops, setSortCrops] = useState(false)

  const handleMonth = (e: string) => {
    setFilterMonth(e)
    console.log(e)
  }

  const fetchCropsFromFirstPage = async () => {
    await axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops-summary.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data !== null) {
          console.log(res.data, 'dsdas')
          setResponseData(res.data)
        }
      })
  }

  const [sortOrder, setSortOrder] = useState('asc')

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
  }

  const sortedData = [...responseData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.crops_name.localeCompare(b.crops_name)
    } else {
      return b.crops_name.localeCompare(a.crops_name)
    }
  })

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

      {/* filter buttons  */}

      <div className="w-full flex justify-center items-center mt-[3rem] flex-col">
        <div className="w-[80%] flex h-[3.5rem] gap-2 items-end justify-end mb-4">
          <Button
            onClick={toggleSortOrder}
            className="rounded-full h-full bg-primary-yellow font-bold text-xl text-primary-red hover:bg-primary-red hover:text-primary-yellow hover:border-primary-yellow hover:border-4"
          >
            {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
          </Button>
          <Select required onValueChange={(e: string) => handleMonth(e)}>
            <SelectTrigger className="w-[20%] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="January">January</SelectItem>
              <SelectItem value="February">February</SelectItem>
              <SelectItem value="March">March</SelectItem>
              <SelectItem value="April">April</SelectItem>
              <SelectItem value="May">May</SelectItem>
              <SelectItem value="June">June</SelectItem>
              <SelectItem value="July">July</SelectItem>
              <SelectItem value="August">August</SelectItem>
              <SelectItem value="September">September</SelectItem>
              <SelectItem value="October">October</SelectItem>
              <SelectItem value="November">November</SelectItem>
              <SelectItem value="December">December</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[80%] border-4 border-primary-yellow p-8 rounded-[5rem]">
          <Table className="w-full text-lg ">
            <TableHeader>
              <TableRow className="text-primary-yellow border-none">
                <TableHead className="text-primary-yellow text-2xl">
                  Crop ID
                </TableHead>
                <TableHead className="text-primary-yellow text-2xl">
                  Suitability
                </TableHead>
                <TableHead className="text-primary-yellow text-2xl">
                  Crop Name
                </TableHead>

                <TableHead className="text-primary-yellow text-2xl">
                  Status
                </TableHead>

                <TableHead className="text-primary-yellow text-2xl">
                  Field Name
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData
                  .filter((res) => {
                    const nameMatch = res.crops_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                    const monthMatch =
                      res.suitable_month.includes(filterMonth) ||
                      filterMonth === 'All'
                    return nameMatch && monthMatch
                  })
                  .map((res, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="text-primary-yellow border-none"
                      >
                        <TableCell>{res.crops_id}</TableCell>
                        <TableCell className="flex gap-2 items-center ">
                          <span
                            className={`w-[1rem] block h-[1rem] border-2 rounded-full ${
                              res.suitability.includes('High') ||
                              res.suitability === 'Suitable'
                                ? 'bg-green-500'
                                : res.suitability.includes('Moderate')
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                          ></span>
                          {res.suitability}
                        </TableCell>
                        <TableCell>{res.crops_name}</TableCell>
                        <TableCell>{res.status}</TableCell>
                        <TableCell>{res.field_name}</TableCell>
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
          <span className="flex items-center gap-2">
            <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-green-500 font-bold"></span>
            Highly Suitable
          </span>
          <span className="flex items-center gap-2">
            <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-green-500 font-bold"></span>
            Suitable
          </span>

          <span className="flex items-center gap-2">
            <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-yellow-500 font-bold"></span>
            Moderately Suitable
          </span>

          <span className="flex items-center gap-2">
            <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-red-500 font-bold"></span>
            Less Suitable
          </span>

          <span className="flex items-center gap-2">
            <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-red-500 font-bold"></span>
            Not Suitable
          </span>
        </div>
      </div>
    </div>
  )
}
