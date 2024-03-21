import DefaultCropsImage from '@/assets/default-product.jpg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CropTypes } from '@/entities/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ButtonStyle from '@/lib/ButtonStyle'
import GoBackBtn from '@/lib/GoBackBtn'
import Search from '@/lib/Search'
import CropsForm from '@/pages/crops/CropsFom'
import Pagination from '@/pages/crops/Pagination'

export default function Crops() {
  const [image, setImage] = useState<string | null>(null)
  const [cropsDetails, setCropsDetails] = useState({} as CropTypes)
  const [showAddCrops, setShowAddCrops] = useState(false)
  const [crops, setCrops] = useState<CropTypes[]>([])
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [cropsId, setCropsId] = useState(0)
  const [searchCrops, setSearchCrops] = useState('')
  const [error, setError] = useState('')

  const user_id = localStorage.getItem('cmhs_token')

  const [updateCropsDefault, setUpdateCropsDefault] =
    useState<CropTypes | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const fetchCrops = async () => {
    await axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setCrops(res.data)
        }
      })
  }

  const handleFetchSpecificCrops = async (id: number) => {
    await axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        params: {
          crops_id: id,
        },
      })
      .then((res) => {
        if (res.data) {
          setUpdateCropsDefault(res.data[0])
          console.log(res.data[0])
        }
      })
  }

  useEffect(() => {
    fetchCrops()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(cropsDetails, 'test')
    if (
      cropsDetails.crops_name === undefined ||
      cropsDetails.planting_method === undefined ||
      // cropsDetails.harvesting_cal === undefined ||
      // cropsDetails.pest === undefined ||
      cropsDetails.variety === undefined ||
      image === null
    ) {
      return setError('All fields are required')
    }

    e.preventDefault()
    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...cropsDetails,
        crops_img: image,
        user_id: user_id,
      })
      .then((res) => {
        if (res.data) {
          fetchCrops()
          setShowAddCrops(false)
          setImage(null)
        }
        console.log(res.data)
      })
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FileReader()
    data.readAsDataURL(e.target.files![0])

    data.onloadend = () => {
      const base64 = data.result
      if (base64) {
        setImage(base64.toString())

        // console.log(base64.toString());
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setCropsDetails((values) => ({ ...values, [name]: value }))
  }

  const pageChangeHandler = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleDelete = (id: number) => {
    axios
      .delete(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        data: { crops_id: id },
      })
      .then((res) => {
        if (res.data) {
          fetchCrops()
        }
      })
  }

  const handleShowUpdate = (id: number) => {
    handleFetchSpecificCrops(id)
    setShowUpdateForm(true)
    setCropsId(id)
  }

  const handleUpdateCrops = (e: React.FormEvent) => {
    e.preventDefault()
    axios
      .put(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        crops_id: cropsId,
        crops_name: cropsDetails.crops_name
          ? cropsDetails.crops_name
          : updateCropsDefault?.crops_name!,
        planting_method: cropsDetails.planting_method
          ? cropsDetails.planting_method
          : updateCropsDefault?.planting_method!,
        harvesting_cal: cropsDetails.harvesting_cal
          ? cropsDetails.harvesting_cal
          : updateCropsDefault?.harvesting_cal!,
        pest: cropsDetails.pest ? cropsDetails.pest : updateCropsDefault?.pest!,
        fertilizer: cropsDetails.fertilizer
          ? cropsDetails.fertilizer
          : updateCropsDefault?.fertilizer!,
        fertilizer_type: cropsDetails.fertilizer_type
          ? cropsDetails.fertilizer_type
          : updateCropsDefault?.fertilizer_type!,
        pest_brand: cropsDetails.pest_brand
          ? cropsDetails.pest_brand
          : updateCropsDefault?.pest_brand!,
        obnotes: cropsDetails.obnotes
          ? cropsDetails.obnotes
          : updateCropsDefault?.obnotes!,
        variety: cropsDetails.variety
          ? cropsDetails.variety
          : updateCropsDefault?.variety!,
        crops_img:
          image && image.length ? image : updateCropsDefault?.crops_img!,
        user_id: user_id,
      })
      .then((res) => {
        // if (res.data) {
        //   fetchCrops()
        //   setShowUpdateForm(false)

        //   console.log(res.data)
        // }

        console.log(res.data)
      })
  }
  return (
    <div className="w-full h-dvh flex justify-start items-start flex-col pl-[20rem] border-none relative">
      <div className="py-[2rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Crop Management
        </h1>

        <div className="flex items-center gap-4">
          <ButtonStyle
            background="yellow"
            onCLick={() => setShowAddCrops(!showAddCrops)}
          >
            Add Crops{' '}
          </ButtonStyle>

          <Search onChange={(e) => setSearchCrops(e.target.value)} />
        </div>
      </div>
      <GoBackBtn />
      <div className="w-full grid grid-cols-4 grid-rows-2 gap-4 h-[45rem]">
        {crops
          .filter((crop) =>
            crop.crops_name.toLowerCase().includes(searchCrops.toLowerCase()),
          )
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((crop, index) => {
            return (
              <div
                key={index}
                className="w-full h-[20rem] overflow-hidden shadow-sm relative text-primary-yellow cursor-pointer hover:shadow-sm hover:shadow-primary-yellow transition-all duration-300 ease-in-out"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute right-2 top-2 bg-primary-yellow p-1 rounded-md">
                    <PiDotsThreeVerticalBold className="text-2xl text-primary-red" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleShowUpdate(crop.crops_id)}
                      className="cursor-pointer"
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleDelete(crop.crops_id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <img
                  className="object-cover h-[70%] w-full bg-primary-yellow"
                  src={crop.crops_img}
                />

                <h1 className="uppercase font-semibold text-center mt-2 text-2xl">
                  <Link
                    className="flex flex-col hover:text-black"
                    to={`/crops/${crop.crops_id}`}
                  >
                    {crop.crops_name}

                    <Button className="p-4 text-primary-red bg-primary-yellow rounded-full w-[80%] self-center hover:border-primary-yellow hover:border-4 hover:bg-primary-red hover:text-primary-yellow">
                      DETAILS
                    </Button>
                  </Link>
                </h1>
              </div>
            )
          })}
      </div>

      <Pagination
        crops={crops}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        pageChangeHandler={pageChangeHandler}
      />

      {showAddCrops && (
        <CropsForm
          setShowAddCrops={setShowAddCrops}
          handleSubmit={handleSubmit}
          image={image}
          handleChangeImage={handleChangeImage}
          handleInputChange={handleInputChange}
          error={error}
          setError={setError}
        />
      )}

      {showUpdateForm && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
          <form
            className="bg-white w-[35rem] h-fit p-4 rounded-md ml-[-15rem]"
            onSubmit={handleUpdateCrops}
          >
            <div className="mb-2">
              <img
                className="w-[40rem]  h-[25rem] object-cover rounded-lg mb-4"
                src={
                  updateCropsDefault?.crops_img
                    ? updateCropsDefault?.crops_img!
                    : DefaultCropsImage
                }
              />
              <Label>Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                name="crops_img"
              />
            </div>

            <div>
              <Label>Crop name</Label>
              <Input
                defaultValue={updateCropsDefault?.crops_name}
                onChange={handleInputChange}
                name="crops_name"
              />
            </div>
            <div>
              <Label>Variety</Label>
              <Input
                defaultValue={updateCropsDefault?.variety}
                onChange={handleInputChange}
                name="variety"
              />
            </div>
            <div>
              <Label>Fertilizer</Label>
              <Input
                defaultValue={updateCropsDefault?.fertilizer}
                onChange={handleInputChange}
                name="fertilizer"
              />
            </div>
            <div>
              <Label>Fertilizer Type</Label>
              <Input
                defaultValue={updateCropsDefault?.fertilizer_type}
                onChange={handleInputChange}
                name="fertilizer_type"
              />
            </div>
            <div>
              <Label>Planting Method</Label>
              <Input
                defaultValue={updateCropsDefault?.planting_method}
                onChange={handleInputChange}
                name="planting_method"
              />
            </div>

            <div>
              <Label>Harvesting Calendar (eg. 5 months / 1 year/s)</Label>
              <Input
                defaultValue={updateCropsDefault?.harvesting_cal}
                onChange={handleInputChange}
                name="harvesting_cal"
              />
            </div>
            <div>
              <Label>Pesticide Schedule (eg. 15 days)</Label>
              <Input
                defaultValue={updateCropsDefault?.pest}
                onChange={handleInputChange}
                name="pest"
              />
            </div>

            <div>
              <Label>Pesticide Brand</Label>
              <Input
                defaultValue={updateCropsDefault?.pest_brand}
                onChange={handleInputChange}
                name="pest_brand"
              />
            </div>

            <div>
              <Label>Observation / Notes</Label>
              <Input
                defaultValue={updateCropsDefault?.obnotes}
                onChange={handleInputChange}
                name="obnotes"
              />
            </div>

            <div className="gap-2 flex">
              <Button
                onClick={() => setShowUpdateForm(false)}
                className="mt-2 bg-primary-yellow p-2 hover:bg-primary-yellow hover:text-primary-red text-primary-red font-bold w-[8rem]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="mt-2 bg-primary-yellow p-2 text-primary-red font-bold w-[8rem]"
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
