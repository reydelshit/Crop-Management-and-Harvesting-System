import { FaArrowRight } from 'react-icons/fa'
import ButtonStyle from '@/lib/ButtonStyle'
export default function FieldManagement() {
  return (
    <div className="w-full h-dvh flex  items-start flex-col pl-[20rem]">
      <div className="my-[4rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Field Management
        </h1>
      </div>

      <div className="flex gap-10 w-full h-full justify-around">
        <div className="w-[50%] h-full flex justify-between items-start ">
          <div className="w-full h-[30rem] bg-primary-yellow rounded-2xl p-4 gap-2 flex justify-start items-center flex-col">
            <div className="w-full justify-end flex">
              <ButtonStyle background="red" onCLick={() => {}}>
                Add Field
              </ButtonStyle>
            </div>

            <div className="w-full border-4 p-4 rounded-md border-primary-red flex justify-between">
              <h1 className="font-bold text-2xl text-primary-red">
                TUPI MAIN FARM
              </h1>
              <FaArrowRight className="text-[2rem] text-primary-red hover:animate-ping cursor-pointer" />
            </div>

            <div className="w-full border-4 p-4 rounded-md border-primary-red flex justify-between">
              <h1 className="font-bold text-2xl text-primary-red">
                TUPI MAIN FARM
              </h1>
              <FaArrowRight className="text-[2rem] text-primary-red hover:animate-ping cursor-pointer" />
            </div>

            <div className="w-full border-4 p-4 rounded-md border-primary-red flex justify-between">
              <h1 className="font-bold text-2xl text-primary-red">
                TUPI MAIN FARM
              </h1>
              <FaArrowRight className="text-[2rem] text-primary-red hover:animate-ping cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-start "></div>
      </div>
    </div>
  )
}
