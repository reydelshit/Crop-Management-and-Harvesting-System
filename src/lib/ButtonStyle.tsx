import { Button } from '@/components/ui/button'

export default function ButtonStyle({
  children,
  onCLick,
  background,
}: {
  children: React.ReactNode
  onCLick: () => void
  background: string
}) {
  return (
    <Button
      onClick={onCLick}
      className={`mt-2 w-[10rem] h-[3.5rem] ${
        background === 'red'
          ? 'bg-primary-red text-primary-yellow hover:bg-primary-yellow hover:text-primary-red hover:border-primary-red '
          : 'border-2 bg-primary-yellow font-bold text-xl text-primary-red hover:bg-primary-red hover:text-primary-yellow transition-all duration-300 ease-in-out hover:border-primary-yellow hover:border-4'
      } font-bold text-xl  transition-all duration-300 ease-in-out hover:border-4`}
    >
      {children}
    </Button>
  )
}
