import { ResponseData } from '@/entities/types'
import GoFrontBtn from '@/lib/GoFront'
import Search from '@/lib/Search'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Legend from './manage-crops/Legend'
import ManageCropsTable from './manage-crops/ManageCropsTable'
import SortContainer from './manage-crops/SortContainer'
export default function ManageCrops() {
  const [search, setSearch] = useState('')
  const user_id = localStorage.getItem('cmhs_token')
  const [responseData, setResponseData] = useState<ResponseData[]>([])
  const [filterMonth, setFilterMonth] = useState('' as string)

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

    const currentMonth = new Date().getMonth() + 1

    switch (currentMonth) {
      case 1:
        setFilterMonth('January')
        break
      case 2:
        setFilterMonth('February')
        break
      case 3:
        setFilterMonth('March')
        break
      case 4:
        setFilterMonth('April')
        break
      case 5:
        setFilterMonth('May')
        break
      case 6:
        setFilterMonth('June')
        break
      case 7:
        setFilterMonth('July')
        break
      case 8:
        setFilterMonth('August')
        break
      case 9:
        setFilterMonth('September')
        break
      case 10:
        setFilterMonth('October')
        break
      case 11:
        setFilterMonth('November')
        break
      case 12:
        setFilterMonth('December')
        break
      default:
        setFilterMonth('Unknown')
    }
  }, [])

  return (
    <div className="w-full h-full flex items-start flex-col  relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Crop Management
        </h1>

        <Search onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* filter buttons  */}

      <div className="w-full flex justify-center items-center mt-[3rem] flex-col">
        <SortContainer
          filterMonth={filterMonth}
          handleMonth={handleMonth}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
        />
        <div className="w-[80%] border-4 border-primary-yellow p-8 rounded-[5rem]">
          <ManageCropsTable
            sortedData={sortedData}
            search={search}
            filterMonth={filterMonth}
          />
        </div>
        <span className=" text-md font-semibold justify-end flex w-[80%] text-primary-yellow my-2">
          To show all the crops select all in the month filter
        </span>
      </div>

      <div className="absolute right-5 bottom-[50%]">
        <Link to="/crops">
          <GoFrontBtn />
        </Link>
      </div>

      <Legend />
    </div>
  )
}
