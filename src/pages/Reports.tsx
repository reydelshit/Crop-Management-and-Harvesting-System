import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CropTypes, FieldTypes } from '@/entities/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Reports() {
  const [fieldData, setFieldData] = useState<FieldTypes[]>([])
  const [cropsData, setCropsData] = useState<CropTypes[]>([])
  const [selectedCrops, setSelectedCrops] = useState<string>('')
  const [selectedField, setSelectedField] = useState<string>('')
  const user_id = localStorage.getItem('cmhs_token')

  const fetchCropsField = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setCropsData(res.data)
          // setFieldData(res.data)
        }
      })

    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/field.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setFieldData(res.data)
          // setFieldData(res.data)
        }
      })
  }

  useEffect(() => {
    fetchCropsField()
  }, [])

  const extractDuration = (text: string) => {
    const lowercaseText = text.toLowerCase()
    const numberRegex = /\d+/

    if (lowercaseText.includes('months')) {
      const match = lowercaseText.match(numberRegex)
      if (match) {
        const number = parseInt(match[0])
        const days = number * 30 // Assuming 30 days in a month
        console.log(number, days)
      } else {
        console.log('No number found')
      }
    } else if (
      lowercaseText.includes('years') ||
      lowercaseText.includes('year')
    ) {
      const match = lowercaseText.match(numberRegex)
      if (match) {
        const number = parseInt(match[0])
        const days = number * 365 // Assuming 365 days in a year
        console.log(number, days)
      } else {
        console.log('No number found')
      }
    } else {
      console.log('No match')
    }
  }

  const handleCrops = (e: string) => {
    setSelectedCrops(e)

    // axios fetch data based on selected crops

    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/reports.php`, {
        params: {
          user_id: user_id,
          crops_id: e,
        },
      })
      .then((res) => {
        console.log(res.data[0].harvesting_cal)
        extractDuration(res.data[0].harvesting_cal)
      })
  }
  const handleField = (e: string) => {
    setSelectedField(e)
  }

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[4rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Reports
        </h1>
      </div>

      <div className="flex w-full items-center">
        <div className="flex items-center gap-2 w-full border-4 bg-primary-red border-primary-red p-2 rounded-full overflow-hidden">
          <h1 className="font-bold text-[1rem] text-primary-yellow text-center">
            Crops
          </h1>
          <Select required onValueChange={(e: string) => handleCrops(e)}>
            <SelectTrigger className="w-[80%] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
              <SelectValue placeholder="Select crops.." />
            </SelectTrigger>
            <SelectContent>
              {cropsData.map((crop, index) => (
                <SelectItem key={index} value={crop.crops_id.toString()}>
                  {crop.crops_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 w-full border-4 bg-primary-red border-primary-red p-2 rounded-full overflow-hidden">
          <h1 className="font-bold text-[1rem] text-primary-yellow text-center">
            Field
          </h1>
          <Select required onValueChange={(e: string) => handleField(e)}>
            <SelectTrigger className="w-[80%] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
              <SelectValue placeholder="Select field.." />
            </SelectTrigger>
            <SelectContent>
              {fieldData.map((field, index) => (
                <SelectItem key={index} value={field.field_id.toString()}>
                  {field.field_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 w-full border-4 bg-primary-red border-primary-red p-2 rounded-full overflow-hidden">
          <h1 className="font-bold text-[1rem] text-primary-yellow text-center">
            Date Range
          </h1>
          <Select required onValueChange={(e: string) => handleField(e)}>
            <SelectTrigger className="w-[80%] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
              <SelectValue placeholder="Range.." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Last Month">Last Mont</SelectItem>
              <SelectItem value="Last Week">Last Quarter</SelectItem>
              <SelectItem value="Last Year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-[2rem] w-[100%] border-4 border-primary-yellow rounded-[5rem] h-[50%] p-8">
        <h1 className="text-[2rem] text-primary-yellow">
          CROP PEFROMANCE ANALYSIS & FIELD UTILIZATION EFFICIENCY
        </h1>

        <div className="w-full flex justify-around ">
          <div className="w-[30%] border-2 mt-[2rem] p-4 h-full flex justify-center flex-col items-center">
            <h1 className="font-semibold bg-primary-yellow p-2 w-full text-center rounded-full text-primary-red">
              CROP NAME
            </h1>
          </div>
          <div className="w-[30%] border-2 mt-[2rem] p-4 h-full flex justify-center flex-col items-center">
            <h1 className="font-semibold bg-primary-yellow p-2 w-full text-center rounded-full text-primary-red">
              Field NAME
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
