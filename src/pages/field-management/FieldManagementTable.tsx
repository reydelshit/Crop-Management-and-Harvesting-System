import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MdDelete } from 'react-icons/md'

import { FaPencilAlt } from 'react-icons/fa'

import { FieldTypes } from '@/entities/types'

type FieldManagementTableProps = {
  fieldData: FieldTypes[]
  sortedData: FieldTypes[]
  handleUpdateForm: (id: number) => void
  handleDeleteField: (id: number) => void
}
export default function FieldManagementTable({
  fieldData,
  sortedData,
  handleUpdateForm,
  handleDeleteField,
}: FieldManagementTableProps) {
  return (
    <Table className="w-full ">
      <TableHeader>
        <TableRow className="text-primary-yellow border-b-4 border-primary-yellow">
          {/* <TableHead className="text-primary-yellow text-xl">
            Field ID
          </TableHead> */}
          <TableHead className="text-primary-yellow text-xl">
            Field Name
          </TableHead>
          <TableHead className="text-primary-yellow text-xl">
            Location
          </TableHead>

          <TableHead className="text-primary-yellow text-xl">
            Size (Area)
          </TableHead>

          <TableHead className="text-primary-yellow text-xl">
            Soil Type
          </TableHead>

          <TableHead className="text-primary-yellow text-xl">
            Irrigation System
          </TableHead>

          <TableHead className="text-primary-yellow text-xl">
            Crop History
          </TableHead>
          <TableHead className="text-primary-yellow text-xl w-[10rem]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-xl ">
        {fieldData.length > 0 ? (
          sortedData.map((field, index) => (
            <TableRow
              key={index}
              className="text-primary-yellow border-b-4 border-primary-yellow"
            >
              {/* <TableCell>{field.field_id}</TableCell> */}
              <TableCell>{field.field_name}</TableCell>
              <TableCell>{field.location}</TableCell>

              <TableCell>{field.field_size}</TableCell>
              <TableCell>{field.soil_type}</TableCell>
              <TableCell>{field.irrigation_system}</TableCell>
              <TableCell>{field.crop_history}</TableCell>

              <TableCell className="flex gap-2">
                <FaPencilAlt
                  onClick={() => handleUpdateForm(field.field_id)}
                  className="p-2 text-[2.5rem] text-primary-yellow cursor-pointer"
                />

                <MdDelete
                  onClick={() => handleDeleteField(field.field_id)}
                  className="p-2 text-[2.5rem] text-primary-yellow cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="text-primary-yellow">
            <TableCell colSpan={8} className="text-center">
              No field found or loading...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
