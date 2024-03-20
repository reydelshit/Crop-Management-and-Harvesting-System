import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import moment from 'moment'
import { MdDelete } from 'react-icons/md'
import { ScheduleTypes } from '@/entities/types'
import { Button } from '@/components/ui/button'

type ScheduleTableProps = {
  sortedData: ScheduleTypes[]
  handleDeleteSched: (id: number) => void
  handleUpdateStatus: (id: string, status: string) => void
  status: string
}
export default function ScheduleTable({
  sortedData,
  handleUpdateStatus,
  handleDeleteSched,
  status,
}: ScheduleTableProps) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="text-primary-yellow border-b-4 border-primary-yellow">
          <TableHead className="text-primary-yellow text-xl">
            Schedule ID
          </TableHead>
          <TableHead className="text-primary-yellow text-xl">Crop</TableHead>
          <TableHead className="text-primary-yellow text-xl">Field</TableHead>

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
          <TableHead className="text-primary-yellow text-xl ">Status</TableHead>
          <TableHead className="text-primary-yellow text-xl w-[5rem]"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="text-xl ">
        {sortedData.length > 0 ? (
          sortedData
            .filter(
              (sched) => sched.status.includes(status) || status === 'All',
            )
            .map((sched, index) => (
              <TableRow
                key={index}
                className="text-primary-yellow border-b-4 border-primary-yellow"
              >
                <TableCell>{sched.schedule_id}</TableCell>
                <TableCell>{sched.crops_name}</TableCell>
                <TableCell>{sched.field_name}</TableCell>
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
                      handleUpdateStatus(sched.schedule_id, sched.status)
                    }
                  >
                    Set {sched.status === 'Ongoing' ? 'Done' : 'Ongoing'}
                  </Button>

                  <MdDelete
                    onClick={() =>
                      handleDeleteSched(parseInt(sched.schedule_id))
                    }
                    className="p-2 text-[2.5rem] text-primary-yellow cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))
        ) : (
          <TableRow className="text-primary-yellow">
            <TableCell colSpan={8} className="text-center">
              No schedule found or loading...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
