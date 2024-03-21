import { CropTypes } from '@/entities/types'
import CropsDetailsConditional from '@/lib/CropsDetailsConditional'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import GoBackBtn from '@/lib/GoBackBtn'
import moment from 'moment'

export default function ViewCrops() {
  const [crops, setCrops] = useState({} as CropTypes)
  const { id } = useParams()
  const user_id = localStorage.getItem('cmhs_token')
  const [suitabilityID, setSuitabilityID] = useState(0)
  const [rowData, setRowData] = useState([
    {
      month: 'January',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'February',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'March',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'April',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'May',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'June',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'July',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'August',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'September',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'October',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'November',
      suitability: '',
      notes: '',
      editMode: false,
    },
    {
      month: 'December',
      suitability: '',
      notes: '',
      editMode: false,
    },
  ])

  const fetchSuitableData = async () => {
    await axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/suitable.php`, {
        params: {
          suitable_crops_id: id,
          user_id: user_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'suitable')

        if (res.data.length === 0) {
          return
        }

        setRowData((prevData) => {
          return prevData.map((item) => {
            const correspondingData = res.data.find(
              (data: any) => data.suitable_month === item.month,
            )

            if (correspondingData) {
              return {
                ...item,
                suitability: correspondingData.suitability,
                notes: correspondingData.suitable_notes,
              }
            } else {
              return item
            }
          })
        })
      })
  }

  const handleSave = (index: number) => {
    const updatedRowData = [...rowData]
    updatedRowData[index].editMode = false

    const rowDataToUpdate = updatedRowData[index]

    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/suitable-table.php`, {
        params: {
          suitable_crops_id: id,
          suitable_index: index,
          user_id: user_id,
        },
      })
      .then((res) => {
        const existingData = res.data.length > 0 ? res.data[0] : null

        const requestData = {
          suitable_month: rowDataToUpdate.month,
          suitable_notes: rowDataToUpdate.notes,
          suitable_index: index,
          suitable_crops_id: id,
          suitability: rowDataToUpdate.suitability,
          user_id: user_id,
          suitable_id: existingData ? existingData.suitable_id : null,
        }

        const axiosRequest = existingData
          ? axios.put(
              `${import.meta.env.VITE_CMHS_LOCAL_HOST}/suitable.php`,
              requestData,
            )
          : axios.post(
              `${import.meta.env.VITE_CMHS_LOCAL_HOST}/suitable.php`,
              requestData,
            )

        return axiosRequest.then((res) => {
          console.log(res.data)
          setSuitabilityID(res.data.suitable_id)
        })
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleFetchCrops = async () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        params: {
          crops_id: id,
        },
      })
      .then((res) => {
        if (res.data) {
          setCrops(res.data[0])
          console.log(res.data[0])
        }
      })
  }
  useEffect(() => {
    handleFetchCrops()
    fetchSuitableData()
  }, [])

  return (
    <div className="w-full min-h-dvh flex justify-around pl-[20rem] flex-col">
      <div className="px-[2rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Crop Management
        </h1>
      </div>
      <GoBackBtn />
      <div className="flex flex-row justify-between">
        <div>
          <div className="w-[20rem] h-[20rem]">
            <img
              src={crops.crops_img}
              alt="crops"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="text-primary-yellow">
            <span className="uppercase font-bold text-[2.5rem] w-[30rem] text-wrap block break-words">
              {crops.crops_name}
            </span>

            <div className="flex justify-between items-start my-[2rem] flex-col">
              <CropsDetailsConditional
                title="Planting Method"
                cropDetailsName={crops.planting_method}
                style="text-[1.5rem]"
              />
              <CropsDetailsConditional
                title="Harvesting Calendar"
                style="text-[1.5rem]"
                cropDetailsName={crops.harvesting_cal}
              />
              <CropsDetailsConditional
                title="Pesticide Schedule"
                style="text-[1.5rem]"
                cropDetailsName={crops.pest}
              />
              <CropsDetailsConditional
                title="Pesticide Brand"
                style="text-[1.5rem]"
                cropDetailsName={crops.pest_brand}
              />
              <CropsDetailsConditional
                title="Fertilizer"
                style="text-[1.5rem]"
                cropDetailsName={crops.fertilizer}
              />
              <CropsDetailsConditional
                title="Fertilizer Type"
                style="text-[1.5rem]"
                cropDetailsName={crops.fertilizer_type}
              />
              <CropsDetailsConditional
                title="Variety"
                style="text-[1.5rem]"
                cropDetailsName={crops.variety}
              />
              <CropsDetailsConditional
                title="Observation/Notes"
                style="text-[1.5rem]"
                cropDetailsName={crops.obnotes}
              />

              <CropsDetailsConditional
                title="Date Created"
                style="text-[1.5rem]"
                cropDetailsName={moment(crops.created_at).format('LL')}
              />
            </div>
          </div>
        </div>
        <div className="w-[70%]">
          <Table className="w-full">
            <TableHeader className="bg-primary-yellow border-4 border-primary-yellow">
              <TableRow className="text-primary-red">
                <TableHead className="text-primary-red text-xl w-[10rem]">
                  Month
                </TableHead>
                <TableHead className="text-primary-red text-xl w-[20rem]">
                  Suitability for {crops.crops_name} planting
                </TableHead>
                <TableHead className="text-primary-red text-xl text-start w-[25rem]">
                  Notes
                </TableHead>
                <TableHead className="text-primary-red text-xl w-[5rem]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="border-4 border-primary-yellow">
              {rowData &&
                rowData.map((row, index) => (
                  <TableRow key={index} className="border-2">
                    <TableCell>{row.month}</TableCell>
                    <TableCell>
                      {row.editMode ? (
                        <Select
                          defaultValue={row.suitability}
                          onValueChange={(e: string) => {
                            const selectedValue = e
                            setRowData((prevData) => {
                              const newData = [...prevData]
                              newData[index].suitability = selectedValue
                              return newData
                            })
                          }}
                        >
                          <SelectTrigger className="w-[180px] bg-primary-yellow text-primary-red">
                            <SelectValue placeholder="Choose Suitability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Highly Suitable">
                              Highly Suitable
                            </SelectItem>
                            <SelectItem value="Suitable">Suitable</SelectItem>
                            <SelectItem value="Moderately">
                              Moderately Suitable
                            </SelectItem>
                            <SelectItem value="Less Suitable">
                              Less Suitable
                            </SelectItem>
                            <SelectItem value="Not Suitable">
                              Not Suitable
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        row.suitability
                      )}
                    </TableCell>
                    <TableCell>
                      {row.editMode ? (
                        <Input
                          className="w-full p-2 outline-none bg-primary-yellow text-primary-red focus:outline-none"
                          type="text"
                          value={row.notes}
                          onChange={(e) =>
                            setRowData((prevData) => {
                              const newData = [...prevData]
                              newData[index].notes = e.target.value
                              return newData
                            })
                          }
                        />
                      ) : (
                        row.notes
                      )}
                    </TableCell>
                    <TableCell>
                      {row.editMode ? (
                        <Button
                          onClick={() => handleSave(index)}
                          className="bg-primary-yellow text-primary-red w-[5rem] font-bold hover:bg-primary-red hover:text-primary-yellow"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          className="bg-primary-yellow text-primary-red w-[5rem] font-bold hover:bg-primary-red hover:text-primary-yellow"
                          onClick={() => {
                            setRowData((prevData) => {
                              const newData = [...prevData]
                              newData[index].editMode = true
                              return newData
                            })

                            // setSuitabilityID(row.suitable_id)
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
