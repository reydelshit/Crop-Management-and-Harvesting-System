import { Button } from '@/components/ui/button'
import { FieldTypes } from '@/entities/types'
import ButtonStyle from '@/lib/ButtonStyle'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AddFieldFom from './field-management/AddFieldForm'
import FieldManagementTable from './field-management/FieldManagementTable'
import UpdateForm from './field-management/UpdateForm'

export default function FieldManagement() {
  const [showAddField, setShowAddField] = useState(false)
  const [fieldDetails, setFieldDetails] = useState({} as FieldTypes)
  const [fieldData, setFieldData] = useState<FieldTypes[]>([])
  const [showUpdateFormField, setShowUpdateFormField] = useState(false)
  const [fieldUpdateDetails, setFieldUpdateDetails] =
    useState<FieldTypes | null>(null)
  const [fieldUpdateID, setFieldUpdateID] = useState(0)
  const [irrigationSystem, setIrrigationSystem] = useState('')
  const [soilType, setSoilType] = useState('')

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

  const handleIrrigation = (e: string) => {
    setIrrigationSystem(e)
  }

  const handleSoitType = (e: string) => {
    setSoilType(e)
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
        irrigation_system: irrigationSystem,
        soil_type: soilType,
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
      })
  }

  const [sortOrder, setSortOrder] = useState('asc')

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
  }

  const sortedData = [...fieldData].sort((a, b) => {
    // Sort by crops name
    if (sortOrder === 'asc') {
      return a.field_name.localeCompare(b.location)
    } else {
      return b.field_name.localeCompare(a.location)
    }
  })

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Field Management
        </h1>
      </div>

      <div className="flex gap-10 w-full h-full justify-around">
        <div className="w-full h-full flex justify-between items-start ">
          <div className="w-full h-[95%] bg-primary-red rounded-2xl p-4 gap-2 flex justify-start items-center flex-col">
            <div className="w-full justify-between flex">
              <div>
                <Button
                  onClick={toggleSortOrder}
                  className="rounded-full h-full border-4 border-primary-yellow bg-primary-red font-bold text-xl text-primary-yellow hover:bg-primary-yellow hover:text-primary-red hover:border-primary-yellow hover:border-4"
                >
                  {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                </Button>
              </div>

              <ButtonStyle
                background="yellow"
                onCLick={() => setShowAddField(!showAddField)}
              >
                Add Field
              </ButtonStyle>
            </div>
            <div className="w-[100%] min-h-[80%] border-4 border-primary-yellow rounded-3xl p-4">
              <FieldManagementTable
                sortedData={sortedData}
                fieldData={sortedData}
                handleUpdateForm={handleUpdateForm}
                handleDeleteField={handleDeleteField}
              />
            </div>
          </div>
        </div>
      </div>

      {showAddField && (
        <AddFieldFom
          handleIrrigation={handleIrrigation}
          handleSoitType={handleSoitType}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setShowAddField={setShowAddField}
          showAddField={showAddField}
        />
      )}

      {showUpdateFormField && (
        <UpdateForm
          handleInputChange={handleInputChange}
          setShowUpdateFormField={setShowUpdateFormField}
          fieldUpdateDetails={fieldUpdateDetails}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      )}
    </div>
  )
}
