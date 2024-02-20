import { Button } from '@/components/ui/button'

export default function Pagination({
  crops,
  itemsPerPage,
  currentPage,
  pageChangeHandler,
}: {
  crops: any[]
  itemsPerPage: number
  currentPage: number
  pageChangeHandler: (page: number) => void
}) {
  return (
    <div className="w-full h-[5rem] flex items-center justify-center mt-[2rem]">
      <Button
        className="w-[8rem] bg-primary-yellow p-2 text-primary-red font-bold"
        onClick={() => pageChangeHandler(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="mx-2 font-bold text-primary-yellow">
        Page {currentPage} of {Math.ceil(crops.length / itemsPerPage)}
      </span>
      <Button
        className="w-[8rem] bg-primary-yellow p-2 text-primary-red font-bold"
        onClick={() => pageChangeHandler(currentPage + 1)}
        disabled={currentPage === Math.ceil(crops.length / itemsPerPage)}
      >
        Next
      </Button>
    </div>
  )
}
