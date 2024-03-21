import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from 'react-router-dom'
import { ResponseData } from '@/entities/types'

type ManageCropsTableProps = {
  sortedData: ResponseData[]
  search: string
  filterMonth: string
}

export default function ManageCropsTable({
  sortedData,
  search,
  filterMonth,
}: ManageCropsTableProps) {
  return (
    <Table className="w-full text-lg ">
      <TableHeader>
        <TableRow className="text-primary-yellow border-none">
          {/* <TableHead className="text-primary-yellow text-2xl">
            Crop ID
          </TableHead> */}
          <TableHead className="text-primary-yellow text-2xl">Month</TableHead>

          <TableHead className="text-primary-yellow text-2xl">
            Suitability
          </TableHead>
          <TableHead className="text-primary-yellow text-2xl">
            Crop Name
          </TableHead>

          <TableHead className="text-primary-yellow text-2xl">Status</TableHead>
          <TableHead className="text-primary-yellow text-2xl">
            Activity
          </TableHead>

          <TableHead className="text-primary-yellow text-2xl">
            Field Name
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.length > 0 ? (
          sortedData
            .filter((res) => {
              const nameMatch = res.crops_name
                .toLowerCase()
                .includes(search.toLowerCase())
              const monthMatch =
                (res.suitable_month &&
                  res.suitable_month.includes(filterMonth)) ||
                filterMonth === 'All'
              return nameMatch && monthMatch
            })
            .map((res, index) => {
              return (
                <TableRow
                  key={index}
                  className="text-primary-yellow border-none"
                >
                  {/* <TableCell>{res.crops_id}</TableCell> */}
                  <TableCell>
                    {res.suitable_month.toLowerCase() === 'n/a' ? (
                      <>
                        N/A
                        <Link
                          className="bg-primary-yellow p-1 rounded-lg text-primary-red ml-2"
                          to={`/crops/${res.crops_id}`}
                        >
                          Set Suitability
                        </Link>
                      </>
                    ) : (
                      res.suitable_month
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2 items-center font-bold">
                    <span
                      className={`w-[1rem] block h-[1rem] border-2 rounded-full ${
                        res.suitability.includes('High') ||
                        res.suitability === 'Suitable'
                          ? 'bg-green-500'
                          : res.suitability.includes('Moderate')
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    ></span>
                    {res.suitability.length > 0 ? res.suitability : 'n/a'}
                  </TableCell>
                  <TableCell className="font-bold">{res.crops_name}</TableCell>
                  <TableCell>{res.status}</TableCell>
                  <TableCell>{res.activity}</TableCell>

                  <TableCell>
                    {res.field_name.length > 0 ? res.field_name : 'n/a'}
                  </TableCell>
                </TableRow>
              )
            })
        ) : (
          <TableRow className="text-white">
            <TableCell colSpan={5} className="text-center">
              No crops found or loading...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
