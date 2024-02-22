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
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
export default function FieldManagement() {
  const [showAddField, setShowAddField] = useState(false)
  const [fieldDetails, setFieldDetails] = useState({})
  const [fieldData, setFieldData] = useState<FieldTypes[]>([])

  const user_id = localStorage.getItem('cmhs_token')

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
  return (
    <div className="w-full h-dvh flex  items-start flex-col pl-[20rem] relative">
      <div className="my-[4rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Field Management
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
                Add Field
              </ButtonStyle>
            </div>
            <div className="w-[100%] min-h-[80%] border-4 border-primary-red rounded-3xl p-4">
              <Table className="w-full ">
                <TableHeader>
                  <TableRow className="text-primary-red border-b-4 border-primary-red">
                    <TableHead className="text-primary-red text-xl">
                      Field ID
                    </TableHead>
                    <TableHead className="text-primary-red text-xl">
                      Field Name
                    </TableHead>
                    <TableHead className="text-primary-red text-xl">
                      Location
                    </TableHead>

                    <TableHead className="text-primary-red text-xl">
                      Size (Area)
                    </TableHead>

                    <TableHead className="text-primary-red text-xl">
                      Soil Type
                    </TableHead>

                    <TableHead className="text-primary-red text-xl">
                      Irrigation System
                    </TableHead>

                    <TableHead className="text-primary-red text-xl w-[10rem]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xl ">
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
                        <TableCell className="flex gap-2">
                          <FaPencilAlt className="p-2 text-[2.5rem] text-primary-red cursor-pointer" />

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
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {showAddField && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
          <div className="w-[80%] flex gap-4 ml-[-15rem] p-5">
            <form
              onSubmit={handleSubmit}
              className="w-[50%] bg-primary-yellow p-8 rounded-lg"
            >
              <h1 className="font-bold text-2xl text-primary-red py-4">
                ADD SOIL FIELD
              </h1>
              <Input
                className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
                placeholder="Field name"
                name="field_name"
                required
                onChange={handleInputChange}
              />
              <Input
                className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
                placeholder="Location"
                name="location"
                required
                onChange={handleInputChange}
              />
              <Input
                className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
                placeholder="Size (Area)"
                name="field_size"
                required
                onChange={handleInputChange}
              />
              <Input
                className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
                placeholder="Soil Type"
                name="soil_type"
                required
                onChange={handleInputChange}
              />
              <Input
                className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
                placeholder="Irrigation System"
                name="irrigation_system"
                required
                onChange={handleInputChange}
              />
              <Input
                className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
                placeholder="Past Crop History"
                name="crop_history"
                required
                onChange={handleInputChange}
              />

              <div className="flex gap-2 justify-end items-center">
                <Button
                  onClick={() => setShowAddField(!showAddField)}
                  className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-yellow text-primary-red hover:bg-primary-red hover:text-primary-yellow hover:border-primary-yellow"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-red text-primary-yellow hover:bg-primary-yellow hover:text-primary-red hover:border-primary-red"
                >
                  Save
                </Button>
              </div>
            </form>

            <div className="w-[40%] bg-primary-yellow p-8 rounded-lg">
              <h1 className="font-bold text-2xl text-primary-red py-4">
                SAMPLE FIELD DATA
              </h1>
              <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
                Sultan Kudarat Mango Orchard
              </div>

              <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
                Barangay Kalamansig, Sultan Kudarat, Philippines
              </div>
              <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
                5 hectares
              </div>
              <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
                Clay loam
              </div>
              <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
                Drip irrigation
              </div>
              <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
                Mango (since 2015)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
