import { CropTypes } from '@/entities/types'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ViewCrops() {
  const [crops, setCrops] = useState({} as CropTypes)
  const { id } = useParams()

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
  }, [])

  return (
    <div className="w-full h-dvh flex flex-row justify-around pl-[20rem] py-[2rem] border-2">
      <div>
        <h1 className="uppercase font-bold text-[5rem]">{crops.crops_name}</h1>

        <div className="flex justify-between items-start my-[2rem] flex-col">
          <p className="text-[2rem]">
            Planted Date: {moment(crops.planting_date).format('LL')}
          </p>

          <p className="text-[2rem]">
            Expected Harvest: {moment(crops.expected_harvest).format('LL')}
          </p>
          <p className="text-[2rem]">OGC: {crops.ogc}</p>
          <p className="text-[2rem]">Variety: {crops.variety}</p>
        </div>
      </div>

      <div className="w-[35rem] h-[40rem]">
        <img
          src={crops.crops_img}
          alt="crops"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  )
}
