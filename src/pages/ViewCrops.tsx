import { CropTypes } from '@/entities/types'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

export default function ViewCrops() {
  const [crops, setCrops] = useState({} as CropTypes)
  const { id } = useParams()

  const [rowData, setRowData] = useState([
    {
      month: 'January',
      suitability: 'Moderately Suitable',
      notes:
        'Notes Temperatures are favorable, but rainfall might be lower than ideal in some areas. Choose early-maturing, drought-tolerant varieties if planting',
      editMode: false,
    },
    {
      month: 'February',
      suitability: 'Moderately Suitable',
      notes:
        'Similar to January, temperatures are suitable, but rainfall might require close monitoring and supplemental irrigation if needed.				',
      editMode: false,
    },
  ])

  const handleSave = (index: number) => {
    setRowData((prevData) => {
      const newData = [...prevData]
      newData[index].editMode = false

      return newData
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
  }, [])

  return (
    <div className="w-full h-dvh flex justify-around pl-[20rem] flex-col">
      <div className="px-[2rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Crop Management
        </h1>
      </div>
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
            <h1 className="uppercase font-bold text-[5rem]">
              {crops.crops_name}
            </h1>

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
        </div>

        <div className="w-[70%]">
          <div className="flex justify-end">
            <Button>Add Details</Button>
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="text-primary-yellow">
                <TableHead className="text-primary-yellow text-xl">
                  Month
                </TableHead>
                <TableHead className="text-primary-yellow text-xl w-[10rem]">
                  Suitability for {crops.crops_name} planting
                </TableHead>
                <TableHead className="text-primary-yellow text-xl text-start w-[30rem]">
                  Notes
                </TableHead>
                <TableHead className="text-primary-yellow text-xl  w-[5rem]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-4 border-primary-yellow">
              {rowData.map((row, index) => (
                <TableRow key={index} className="text-white border-none">
                  <TableCell>{row.month}</TableCell>
                  <TableCell>
                    {row.editMode ? (
                      <Input
                        className="text-black w-full p-2 outline-none"
                        type="text"
                        value={row.suitability}
                        onChange={(e) =>
                          setRowData((prevData) => {
                            const newData = [...prevData]
                            newData[index].suitability = e.target.value
                            return newData
                          })
                        }
                      />
                    ) : (
                      row.suitability
                    )}
                  </TableCell>
                  <TableCell>
                    {row.editMode ? (
                      <Input
                        className="text-black w-full p-2 outline-none"
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
                      <Button onClick={() => handleSave(index)}>Save</Button>
                    ) : (
                      <Button
                        onClick={() =>
                          setRowData((prevData) => {
                            const newData = [...prevData]
                            newData[index].editMode = true // Enable edit mode for the current row
                            return newData
                          })
                        }
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
