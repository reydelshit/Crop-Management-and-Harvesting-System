import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import ButtonStyle from '@/lib/ButtonStyle'

type FilterContainerProps = {
  toggleSortOrder: () => void
  sortOrder: string
  handleStatus: (e: string) => void
  showScheduleForm: boolean
  setShowScheduleForm: (e: boolean) => void
}
export default function FilterContainer({
  toggleSortOrder,
  sortOrder,
  handleStatus,
  showScheduleForm,
  setShowScheduleForm,
}: FilterContainerProps) {
  return (
    <div className="w-full justify-between flex">
      <div className="flex gap-2">
        <Button
          onClick={toggleSortOrder}
          className="rounded-full h-full bg-primary-yellow font-bold text-xl text-primary-red hover:bg-primary-red hover:text-primary-yellow hover:border-primary-yellow hover:border-4"
        >
          {sortOrder === 'asc' ? 'Sort Date ' : 'Sort  Date'}
        </Button>
        <Select required onValueChange={(e: string) => handleStatus(e)}>
          <SelectTrigger className="w-[15rem] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ButtonStyle
        background="yellow"
        onCLick={() => setShowScheduleForm(!showScheduleForm)}
      >
        Set Schedule
      </ButtonStyle>
    </div>
  )
}
