import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CropTypes } from '@/entities/types'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export default function Crops() {
  const [image, setImage] = useState<string | null>(null)
  const [cropsDetails, setCropsDetails] = useState({})
  const [showAddCrops, setShowAddCrops] = useState(false)
  const [crops, setCrops] = useState<CropTypes[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const fetchCrops = async () => {
    await axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setCrops(res.data)
        }
      })
  }

  useEffect(() => {
    fetchCrops()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(cropsDetails)
    e.preventDefault()
    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...cropsDetails,
        crops_img: image,
      })
      .then((res) => {
        if (res.data) {
          fetchCrops()
          setShowAddCrops(false)
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

  return (
    <div className="relative w-full h-full">
      <h1 className="font-bold text-4xl my-[1.5rem]">Crops</h1>

      <div className="h-[5rem] flex items-center mb-4">
        <Button
          onClick={() => setShowAddCrops(!showAddCrops)}
          className="mt-2 w-[10rem] h-[3.5rem]"
        >
          Add Crops
        </Button>
      </div>

      <div className="w-full grid grid-cols-4 grid-rows-2 gap-4 h-[45rem]">
        {crops
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((crop, index) => {
            return (
              <div
                key={index}
                className="w-full border-2 rounded-lg overflow-hidden shadow-sm relative cursor-pointer hover:shadow-lg hover:shadow-violet-400 hover:text-violet-600 transition-all duration-300 ease-in-out"
              >
                <Button className="absolute right-2 top-2">
                  <PiDotsThreeVerticalBold className="text-2xl" />
                </Button>

                <img
                  className="object-cover h-[80%] w-full"
                  src={crop.crops_img}
                />

                <h1 className="uppercase font-semibold text-center mt-2 text-2xl">
                  <Link to={`/crops/${crop.crops_id}`}>{crop.crops_name}</Link>
                </h1>
              </div>
            )
          })}
      </div>

      <div className="w-full h-[5rem] flex mt-[2rem] items-center justify-center">
        <Button
          onClick={() => pageChangeHandler(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-2 font-bold">
          Page {currentPage} of {Math.ceil(crops.length / itemsPerPage)}
        </span>
        <Button
          onClick={() => pageChangeHandler(currentPage + 1)}
          disabled={currentPage === Math.ceil(crops.length / itemsPerPage)}
        >
          Next
        </Button>
      </div>

      {showAddCrops && (
        <div className="absolute w-full h-full top-0 z-50 bg-[#f2f2f0] bg-opacity-80 flex justify-center items-center">
          <form
            className="bg-white w-[35rem] h-fit p-4 rounded-md border-[#618264] border-2"
            onSubmit={handleSubmit}
          >
            <div className="mb-2">
              <img
                className="w-[40rem]  h-[25rem] object-cover rounded-lg mb-4"
                src={image! ? image! : 'https://via.placeholder.com/150'}
              />
              <Label>Image</Label>
              <Input
                required
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                name="crops_img"
              />
            </div>

            <div>
              <Label>Crop Name</Label>
              <Input required onChange={handleInputChange} name="crops_name" />
            </div>

            <div>
              <Label>planting_date</Label>
              <Input
                required
                type="date"
                onChange={handleInputChange}
                name="planting_date"
              />
            </div>

            <div>
              <Label>expected_harvest </Label>
              <Input
                required
                type="date"
                onChange={handleInputChange}
                name="expected_harvest"
              />
            </div>

            <div>
              <Label>ogc</Label>
              <Input required onChange={handleInputChange} name="ogc" />
            </div>

            <div>
              <Label>variety</Label>
              <Input required onChange={handleInputChange} name="variety" />
            </div>

            <div className="gap-2 flex">
              <Button onClick={() => setShowAddCrops(false)} className="mt-2">
                Cancel
              </Button>
              <Button type="submit" className="mt-2">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
