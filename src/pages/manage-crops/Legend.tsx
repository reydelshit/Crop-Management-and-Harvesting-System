export default function Legend() {
  return (
    <div className="absolute bottom-5 right-2 w-full flex justify-end">
      <div className="flex-col flex p-2 rounded-md bg-primary-yellow text-primary-red font-semibold">
        <span className="font-bold">Legend:</span>
        <span className="flex items-center gap-2">
          <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-green-500 font-bold"></span>
          Highly Suitable
        </span>
        <span className="flex items-center gap-2">
          <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-green-500 font-bold"></span>
          Suitable
        </span>

        <span className="flex items-center gap-2">
          <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-yellow-500 font-bold"></span>
          Moderately Suitable
        </span>

        <span className="flex items-center gap-2">
          <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-red-500 font-bold"></span>
          Less Suitable
        </span>

        <span className="flex items-center gap-2">
          <span className="w-[1rem] block h-[1rem] border-2 rounded-full bg-red-500 font-bold"></span>
          Not Suitable
        </span>
      </div>
    </div>
  )
}
