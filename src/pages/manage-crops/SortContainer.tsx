import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SortContainerProps = {
  filterMonth: string
  handleMonth: (e: string) => void
  sortOrder: string
  toggleSortOrder: () => void
}
export default function SortContainer({
  filterMonth,
  handleMonth,
  sortOrder,
  toggleSortOrder,
}: SortContainerProps) {
  return (
    <div className="w-[80%] flex h-[4rem] gap-2 items-end justify-between mb-4">
      {filterMonth && (
        <div className="p-2 text-primary-yellow rounded-lg h-full">
          <h1 className="text-xl font-bold">Month: {filterMonth}</h1>
          <span className="block text-md font-semibold">
            Note: If you see N/A set the suitability in the crops section
          </span>
        </div>
      )}

      <div className="flex gap-2 h-full">
        <Button
          onClick={toggleSortOrder}
          className="rounded-full h-full bg-primary-yellow font-bold text-xl text-primary-red hover:bg-primary-red hover:text-primary-yellow hover:border-primary-yellow hover:border-4"
        >
          {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
        </Button>
        <Select required onValueChange={(e: string) => handleMonth(e)}>
          <SelectTrigger className="w-[10rem] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="January">January</SelectItem>
            <SelectItem value="February">February</SelectItem>
            <SelectItem value="March">March</SelectItem>
            <SelectItem value="April">April</SelectItem>
            <SelectItem value="May">May</SelectItem>
            <SelectItem value="June">June</SelectItem>
            <SelectItem value="July">July</SelectItem>
            <SelectItem value="August">August</SelectItem>
            <SelectItem value="September">September</SelectItem>
            <SelectItem value="October">October</SelectItem>
            <SelectItem value="November">November</SelectItem>
            <SelectItem value="December">December</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
