import { useState } from 'react'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { FaArrowRight } from 'react-icons/fa'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FaPencilAlt } from 'react-icons/fa'
import { FieldTypes } from '@/entities/types'
import { MdDelete } from 'react-icons/md'
import ButtonStyle from '@/lib/ButtonStyle'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'

export default function ScheduleGeneration() {
  const [showAddField, setShowAddField] = useState(false)
  const [fieldDetails, setFieldDetails] = useState({} as FieldTypes)
  const [fieldData, setFieldData] = useState<FieldTypes[]>([])
  const [showUpdateFormField, setShowUpdateFormField] = useState(false)
  const [fieldUpdateDetails, setFieldUpdateDetails] =
    useState<FieldTypes | null>(null)
  const [fieldUpdateID, setFieldUpdateID] = useState(0)
  const user_id = localStorage.getItem('cmhs_token')

  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const handleChange = (item: any) => {
    setState(item.selection)
    console.log(item.selection)
  }

  const fetchFieldData = () => {
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
        }
      })
  }

  useEffect(() => {
    fetchFieldData()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/field.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...fieldDetails,
        user_id: user_id,
      })
      .then((res) => {
        if (res.data) {
          fetchFieldData()
          setShowAddField(!showAddField)
        }
        console.log(res.data)
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setFieldDetails((values) => ({ ...values, [name]: value }))
  }

  const handleDeleteField = (field_id: number) => {
    axios
      .delete(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/field.php`, {
        data: {
          field_id: field_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          fetchFieldData()
        }
      })
  }

  const fetchUpdateFieldData = (id: number) => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/field.php`, {
        params: {
          field_id: id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setFieldUpdateDetails(res.data[0])

          setShowUpdateFormField(true)
        }
      })
  }
  const handleUpdateForm = (field_id: number) => {
    fetchUpdateFieldData(field_id)
    setFieldUpdateID(field_id)
  }

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .put(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/field.php`, {
        field_id: fieldUpdateID,
        field_name: fieldDetails.field_name
          ? fieldDetails.field_name
          : fieldUpdateDetails?.field_name!,
        field_size: fieldDetails.field_size
          ? fieldDetails.field_size
          : fieldUpdateDetails?.field_size!,
        soil_type: fieldDetails.soil_type
          ? fieldDetails.soil_type
          : fieldUpdateDetails?.soil_type!,
        irrigation_system: fieldDetails.irrigation_system
          ? fieldDetails.irrigation_system
          : fieldUpdateDetails?.irrigation_system!,
        location: fieldDetails.location
          ? fieldDetails.location
          : fieldUpdateDetails?.location!,
        crop_history: fieldDetails.crop_history
          ? fieldDetails.crop_history
          : fieldUpdateDetails?.crop_history!,
        user_id: user_id,
      })
      .then((res) => {
        setShowUpdateFormField(false)
        fetchFieldData()
        console.log(res.data)
        // if (res.data.status === 'success') {

        //   // window.location.reload()
        // }

        // if()
      })
  }

  return (
    <div className="w-full h-dvh flex  items-start flex-col pl-[20rem] relative">
      <div className="my-[4rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Schedule
        </h1>
      </div>

      <div className="flex gap-10 w-full h-full justify-around">
        <div className="w-full h-full flex justify-between items-start ">
          <div className="w-full h-[95%] bg-primary-yellow rounded-2xl p-4 gap-2 flex justify-start items-center flex-col">
            <div className="w-full justify-end flex">
              <ButtonStyle
                background="red"
                onCLick={() => setShowAddField(!showAddField)}
              >
                Set Schedule
              </ButtonStyle>
            </div>
            <div className="w-[100%] min-h-[80%] border-4 border-primary-red rounded-3xl p-4">
              <Table className="w-full ">
                <TableHeader>
                  <TableRow className="text-primary-red border-b-4 border-primary-red">
                    <TableHead className="text-primary-red text-xl">
                      Schedule ID
                    </TableHead>
                    <TableHead className="text-primary-red text-xl">
                      Crop ID
                    </TableHead>
                    <TableHead className="text-primary-red text-xl">
                      Field ID
                    </TableHead>

                    <TableHead className="text-primary-red text-xl">
                      Activity
                    </TableHead>

                    <TableHead className="text-primary-red text-xl">
                      Scheduled Date
                    </TableHead>

                    <TableHead className="text-primary-red text-xl">
                      Actual Start Date
                    </TableHead>

                    <TableHead className="text-primary-red text-xl">
                      Actual End Date
                    </TableHead>
                    <TableHead className="text-primary-red text-xl w-[10rem]">
                      Status
                    </TableHead>
                    <TableHead className="text-primary-red text-xl w-[10rem]"></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-xl ">
                  <TableRow className="text-primary-red border-b-4 border-primary-red">
                    <TableCell>SCH-001</TableCell>
                    <TableCell>CROP-002</TableCell>
                    <TableCell>FLD-001</TableCell>
                    <TableCell>Land preparation (tilling, plowing)</TableCell>
                    <TableCell>2024-03-15</TableCell>
                    <TableCell>2024-03-17</TableCell>
                    <TableCell>2024-03-20</TableCell>
                    <TableCell>Completed</TableCell>

                    <TableCell className="flex gap-2">
                      <FaPencilAlt className="p-2 text-[2.5rem] text-primary-red cursor-pointer" />

                      <MdDelete className="p-2 text-[2.5rem] text-primary-red cursor-pointer" />
                    </TableCell>
                  </TableRow>
                </TableBody>

                {/* <TableBody className="text-xl ">
                  {fieldData.length > 0 ? (
                    fieldData.map((field, index) => (
                      <TableRow
                        key={index}
                        className="text-primary-red border-b-4 border-primary-red"
                      >
                        <TableCell>{field.field_id}</TableCell>
                        <TableCell>{field.field_name}</TableCell>
                        <TableCell>{field.location}</TableCell>

                        <TableCell>{field.field_size}</TableCell>
                        <TableCell>{field.soil_type}</TableCell>
                        <TableCell>{field.irrigation_system}</TableCell>
                        <TableCell>{field.crop_history}</TableCell>

                        <TableCell className="flex gap-2">
                          <FaPencilAlt
                            onClick={() => handleUpdateForm(field.field_id)}
                            className="p-2 text-[2.5rem] text-primary-red cursor-pointer"
                          />

                          <MdDelete
                            onClick={() => handleDeleteField(field.field_id)}
                            className="p-2 text-[2.5rem] text-primary-red cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <h1>LOADING OR NO INTERNET</h1>
                  )}
                </TableBody> */}
              </Table>
            </div>
          </div>
        </div>
      </div>

      {showAddField && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
          <div className="w-[80%]  flex gap-4 ml-[-15rem] p-5">
            <div className="w-[80%] bg-primary-yellow p-4 rounded-lg flex">
              <div className="w-[70%]">
                <div className="flex items-center gap-4 w-full">
                  <h1>Activity</h1>
                  <Select>
                    <SelectTrigger className="w-[17rem] bg-primary-red text-primary-yellow font-bold">
                      <SelectValue placeholder="Activities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PESTICIDES">PESTICIDES</SelectItem>
                      <SelectItem value="HARVEST PERIOD">
                        HARVEST PERIOD
                      </SelectItem>
                      <SelectItem value="Land Preparation">
                        Land Preparation (tilling, plowing)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-[3rem]">
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleChange}
                    moveRangeOnFirstSelection={false}
                    ranges={[state]}
                    // direction="vertical"
                    // scroll={{ enabled: true }}
                    minDate={new Date()}
                    // months={12}
                  />
                </div>
              </div>

              <div className="p-4 w-full flex flex-col ">
                <div className="w-full h-fit p-4">
                  <div className="flex items-center gap-4 w-full border-4 border-primary-red p-2 rounded-full mb-4">
                    <h1 className="font-bold text-[1.5rem] text-primary-red">
                      Choose crop
                    </h1>
                    <Select>
                      <SelectTrigger className="w-[17rem] bg-primary-red text-primary-yellow font-bold">
                        <SelectValue placeholder="Activities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PESTICIDES">PESTICIDES</SelectItem>
                        <SelectItem value="HARVEST PERIOD">
                          HARVEST PERIOD
                        </SelectItem>
                        <SelectItem value="Land Preparation">
                          Land Preparation (tilling, plowing)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-4 w-full border-4 border-primary-red p-2 rounded-full">
                    <h1 className="font-bold text-[1.5rem] text-primary-red">
                      Choose field
                    </h1>
                    <Select>
                      <SelectTrigger className="w-[17rem] bg-primary-red text-primary-yellow font-bold">
                        <SelectValue placeholder="Activities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PESTICIDES">PESTICIDES</SelectItem>
                        <SelectItem value="HARVEST PERIOD">
                          HARVEST PERIOD
                        </SelectItem>
                        <SelectItem value="Land Preparation">
                          Land Preparation (tilling, plowing)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex w-full justify-end h-full flex-col items-end">
                  <ButtonStyle onCLick={() => {}} background="red">
                    Submit
                  </ButtonStyle>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
