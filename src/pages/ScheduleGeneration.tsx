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
import { CropTypes, FieldTypes } from '@/entities/types'
import { MdDelete } from 'react-icons/md'
import ButtonStyle from '@/lib/ButtonStyle'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import moment from 'moment'

type ScheduleTypes = {
  crops_id: string
  field_id: string
  activity: string
  scheduled_date: string
  actual_start_date: string
  actual_end_date: string
  user_id: string
  schedule_id: string
  status: string
}

export default function ScheduleGeneration() {
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [selectedCrops, setSelectedCrops] = useState<string>('')
  const [selectedField, setSelectedField] = useState<string>('')
  const [selectedActivity, setSelectedActivity] = useState<string>('')
  const [fieldData, setFieldData] = useState<FieldTypes[]>([])
  const [cropsData, setCropsData] = useState<CropTypes[]>([])
  const [scheduleData, setScheduleData] = useState<ScheduleTypes[]>([])
  const [status, setStatus] = useState('' as string)

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

  const handleCrops = (e: string) => {
    setSelectedCrops(e)
  }
  const handleField = (e: string) => {
    setSelectedField(e)
  }
  const handleActivity = (e: string) => {
    setSelectedActivity(e)
  }

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

  const fetchSchedule = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/schedule.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setScheduleData(res.data)
        }
      })
  }
  useEffect(() => {
    fetchCropsField()
    fetchSchedule()
  }, [])

  const handleSubmit = () => {
    if (
      selectedCrops === '' ||
      selectedField === '' ||
      selectedActivity === ''
    ) {
      return
    }
    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/schedule.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        crops_id: selectedCrops,
        field_id: selectedField,
        activity: selectedActivity,
        scheduled_date: moment().format('ll'),
        actual_start_date: state.startDate,
        actual_end_date: state.endDate,
        user_id: user_id,
        status: 'Ongoing',
      })
      .then((res) => {
        if (res.data.status === 'success') {
          fetchSchedule()
          setShowScheduleForm(false)
        }
      })
  }

  const handleUpdateStatus = (id: string, status: string) => {
    console.log('click')
    axios
      .put(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/schedule.php`, {
        schedule_id: id,
        status: status === 'Ongoing' ? 'Done' : 'Ongoing',
        user_id: user_id,
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.status === 'success') {
          fetchSchedule()
        }
      })
  }

  const handleDeleteSched = (schedule_id: number) => {
    axios
      .delete(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/schedule.php`, {
        data: {
          schedule_id: schedule_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          fetchSchedule()
        }
      })
  }

  const [sortOrder, setSortOrder] = useState('asc')

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
  }

  const sortedData = [...scheduleData].sort((a, b) => {
    console.log(a.scheduled_date, b.scheduled_date)
    // Assuming scheduled_date is the property containing the date
    const dateA = new Date(a.actual_start_date).getTime()
    const dateB = new Date(b.actual_end_date).getTime()

    if (sortOrder === 'asc') {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  })

  const handleStatus = (e: string) => {
    setStatus(e)
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
          <div className="w-full h-[95%] rounded-2xl p-4 gap-2 flex justify-start items-center flex-col">
            <div className="w-full justify-between flex">
              <div className="flex gap-2">
                <Button
                  onClick={toggleSortOrder}
                  className="rounded-full h-full bg-primary-yellow font-bold text-xl text-primary-red hover:bg-primary-red hover:text-primary-yellow hover:border-primary-yellow hover:border-4"
                >
                  {sortOrder === 'asc' ? 'Sort Date ' : 'Sort  Date'}
                </Button>
                <Select required onValueChange={(e: string) => handleStatus(e)}>
                  <SelectTrigger className="w-[15rem] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ButtonStyle
                background="yellow"
                onCLick={() => setShowScheduleForm(!showScheduleForm)}
              >
                Set Schedule
              </ButtonStyle>
            </div>
            <div className="w-[100%] min-h-[80%] border-4 rounded-3xl border-primary-yellow p-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="text-primary-yellow border-b-4 border-primary-yellow">
                    <TableHead className="text-primary-yellow text-xl">
                      Schedule ID
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl">
                      Crop ID
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl">
                      Field ID
                    </TableHead>

                    <TableHead className="text-primary-yellow text-xl">
                      Activity
                    </TableHead>

                    <TableHead className="text-primary-yellow text-xl">
                      Scheduled Date
                    </TableHead>

                    <TableHead className="text-primary-yellow text-xl">
                      Actual Start Date
                    </TableHead>

                    <TableHead className="text-primary-yellow text-xl">
                      Actual End Date
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl ">
                      Status
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl w-[5rem]"></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-xl ">
                  {sortedData
                    .filter(
                      (sched) =>
                        sched.status.includes(status) || status === 'All',
                    )
                    .map((sched, index) => (
                      <TableRow
                        key={index}
                        className="text-primary-yellow border-b-4 border-primary-yellow"
                      >
                        <TableCell>{sched.schedule_id}</TableCell>
                        <TableCell>{sched.crops_id}</TableCell>
                        <TableCell>{sched.field_id}</TableCell>
                        <TableCell>{sched.activity}</TableCell>
                        <TableCell>{sched.scheduled_date}</TableCell>
                        <TableCell>
                          {moment(sched.actual_start_date).format('LL')}
                        </TableCell>
                        <TableCell>
                          {moment(sched.actual_end_date).format('LL')}
                        </TableCell>
                        <TableCell>{sched.status}</TableCell>

                        <TableCell className="flex gap-2">
                          <Button
                            className="bg-primary-yellow text-primary-red font-bold h-[3rem] rounded-full hover:bg-primary-red hover:text-primary-yellow"
                            onClick={() =>
                              handleUpdateStatus(
                                sched.schedule_id,
                                sched.status,
                              )
                            }
                          >
                            Set{' '}
                            {sched.status === 'Ongoing' ? 'Done' : 'Ongoing'}
                          </Button>

                          <MdDelete
                            onClick={() =>
                              handleDeleteSched(parseInt(sched.schedule_id))
                            }
                            className="p-2 text-[2.5rem] text-primary-yellow cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {showScheduleForm && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
          <div className="w-[80%]  flex gap-4 ml-[-8rem] p-5">
            <div className="w-[80%] bg-primary-yellow p-4 rounded-lg flex">
              <div className="w-[70%]">
                <div className="flex items-center gap-4 w-full">
                  <Select
                    required
                    onValueChange={(e: string) => handleActivity(e)}
                  >
                    <SelectTrigger className="w-[80%] h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                      <SelectValue placeholder="Activity.." />
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
                <div className="w-full h-[23rem] flex items-center flex-col p-4 border-4 border-primary-red rounded-3xl">
                  <div className="w-full text-start my-4 flex-col bg-white p-2 rounded-lg">
                    <span className="block">
                      Activity:{' '}
                      <span className="font-bold text-primary-red">
                        {selectedActivity}
                      </span>
                    </span>

                    <span className="block">
                      Start:{' '}
                      <span className="font-bold text-primary-red">
                        {moment(state.startDate).format('ll')}
                      </span>
                    </span>
                    <span className="block">
                      End:{' '}
                      <span className="font-bold text-primary-red">
                        {moment(state.endDate).format('ll')}
                      </span>
                    </span>
                  </div>

                  <div className="mb-5 flex items-center gap-2 w-full border-4 bg-primary-red border-primary-red p-2 rounded-full overflow-hidden">
                    <h1 className="font-bold text-[1rem] text-primary-yellow text-center">
                      Choose crops
                    </h1>
                    <Select
                      required
                      onValueChange={(e: string) => handleCrops(e)}
                    >
                      <SelectTrigger className="w-[80%] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                        <SelectValue placeholder="Crops.." />
                      </SelectTrigger>
                      <SelectContent>
                        {cropsData.map((crop) => (
                          <SelectItem value={crop.crops_id.toString()}>
                            {crop.crops_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-4 w-full border-4 bg-primary-red border-primary-red p-2 rounded-full overflow-hidden">
                    <h1 className="font-bold text-[1rem] text-primary-yellow text-center">
                      Choose field
                    </h1>
                    <Select
                      required
                      onValueChange={(e: string) => handleField(e)}
                    >
                      <SelectTrigger className="w-[80%] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                        <SelectValue placeholder="Field.." />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldData.map((field) => (
                          <SelectItem value={field.field_id.toString()}>
                            {field.field_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex w-full justify-end gap-4">
                  <ButtonStyle
                    onCLick={() => {
                      setShowScheduleForm(false)
                      setState({
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection',
                      })
                    }}
                    background="yellow"
                  >
                    Cancel
                  </ButtonStyle>

                  <ButtonStyle onCLick={handleSubmit} background="red">
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
