import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from 'react-router-dom'
import { FaArrowCircleRight } from 'react-icons/fa'
import Search from '@/lib/Search'
import { useState } from 'react'

export default function ManageCrops() {
  const [search, setSearch] = useState('')
  return (
    <div className="w-full h-full flex items-start flex-col px-[2rem] relative">
      <div className="my-[4rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Crop Management
        </h1>

        <Search onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="w-full flex justify-center items-center">
        <div className="w-[80%]">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="text-primary-yellow">
                <TableHead className="text-primary-yellow text-xl">
                  Crop ID
                </TableHead>
                <TableHead className="text-primary-yellow text-xl">
                  Suitability
                </TableHead>
                <TableHead className="text-primary-yellow text-xl">
                  Crop Name
                </TableHead>

                <TableHead className="text-primary-yellow text-xl">
                  Status
                </TableHead>

                <TableHead className="text-primary-yellow text-xl">
                  Field ID
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-4 border-primary-yellow">
              <TableRow className="text-white border-none">
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>Credit Card</TableCell>

                <TableCell>Credit Card</TableCell>
                <TableCell>Credit Card</TableCell>
              </TableRow>

              <TableRow className="text-white border-none">
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>Credit Card</TableCell>

                <TableCell>Credit Card</TableCell>
                <TableCell>Credit Card</TableCell>
              </TableRow>

              <TableRow className="text-white border-none">
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>Credit Card</TableCell>

                <TableCell>Credit Card</TableCell>
                <TableCell>Credit Card</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="absolute right-5 bottom-[50%]">
        <Link to="/crops">
          <FaArrowCircleRight className="text-primary-yellow text-[4rem]" />
        </Link>
      </div>

      <div className="absolute bottom-5 right-2 w-full flex justify-end">
        <div className="text-white flex-col flex">
          <span>Legend:</span>
          <span>0 - not planted</span>
          <span>1 - planted</span>
          <span>2 - pestiscides</span>
          <span>3 -scheduled fo harvest</span>
          <span>4 - harvested</span>
        </div>
      </div>
    </div>
  )
}
