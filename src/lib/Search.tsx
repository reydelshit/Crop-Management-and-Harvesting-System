import { Input } from '@/components/ui/input'

export default function Search({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <Input
      onChange={onChange}
      className="p-7 w-[20rem] text-primary-yellow text-2xl rounded-full bg-inherit border-4 border-primary-yellow placeholder:text-primary-yellow placeholder:text-center placeholder:font-semibold"
      type="text"
      placeholder="SEARCH"
    />
  )
}
