import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DateRangePicker } from 'react-date-range'
import ButtonStyle from '@/lib/ButtonStyle'
import moment from 'moment'
import { FieldTypes } from '@/entities/types'
import { CropTypes } from '@/entities/types'

interface StateProps {
  startDate: Date
  endDate: Date
  key: string
}
export default function ScheduleForm({
  handleActivity,
  handleChange,
  handleSubmit,
  state,
  setState,
  setShowScheduleForm,
  selectedActivity,
  cropsData,
  fieldData,
  handleCrops,
  handleField,
}: {
  handleActivity: (e: string) => void
  handleChange: (item: any) => void
  handleSubmit: () => void
  setState: (e: StateProps) => void
  state: StateProps
  setShowScheduleForm: (e: boolean) => void
  selectedActivity: string
  cropsData: CropTypes[]
  fieldData: FieldTypes[]
  handleCrops: (e: string) => void
  handleField: (e: string) => void
}) {
  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <div className="w-[80%]  flex gap-4 ml-[-8rem] p-5">
        <div className="w-[80%] bg-primary-yellow p-4 rounded-lg flex">
          <div className="w-[70%]">
            <div className="flex items-center gap-4 w-full">
              <Select required onValueChange={(e: string) => handleActivity(e)}>
                <SelectTrigger className="w-[80%] h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                  <SelectValue placeholder="Activity.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PESTICIDES">PESTICIDES</SelectItem>
                  <SelectItem value="HARVEST PERIOD">HARVEST PERIOD</SelectItem>
                  <SelectItem value="Land Preparation">
                    Land Preparation (tilling, plowing)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-[3rem]">
              <DateRangePicker
                editableDateInputs={true}
                onChange={handleChange}
                moveRangeOnFirstSelection={false}
                ranges={[state]}
                // direction="vertical"
                // scroll={{ enabled: true }}
                minDate={new Date()}
                // months={12}
              />
            </div>
          </div>

          <div className="p-4 w-full flex flex-col ">
            <div className="w-full h-[23rem] flex items-center flex-col p-4 border-4 border-primary-red rounded-3xl">
              <div className="w-full text-start my-4 flex-col bg-white p-2 rounded-lg">
                <span className="block">
                  Activity:{' '}
                  <span className="font-bold text-primary-red">
                    {selectedActivity}
                  </span>
                </span>

                <span className="block">
                  Start:{' '}
                  <span className="font-bold text-primary-red">
                    {moment(state.startDate).format('ll')}
                  </span>
                </span>
                <span className="block">
                  End:{' '}
                  <span className="font-bold text-primary-red">
                    {moment(state.endDate).format('ll')}
                  </span>
                </span>
              </div>

              <div className="mb-5 flex items-center gap-2 w-full border-4 bg-primary-red border-primary-red p-2 rounded-full overflow-hidden">
                <h1 className="font-bold text-[1rem] text-primary-yellow text-center">
                  Choose crops
                </h1>
                <Select required onValueChange={(e: string) => handleCrops(e)}>
                  <SelectTrigger className="w-[80%] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                    <SelectValue placeholder="Crops.." />
                  </SelectTrigger>
                  <SelectContent>
                    {cropsData.map((crop, index) => (
                      <SelectItem key={index} value={crop.crops_id.toString()}>
                        {crop.crops_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4 w-full border-4 bg-primary-red border-primary-red p-2 rounded-full overflow-hidden">
                <h1 className="font-bold text-[1rem] text-primary-yellow text-center">
                  Choose field
                </h1>
                <Select required onValueChange={(e: string) => handleField(e)}>
                  <SelectTrigger className="w-[80%] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                    <SelectValue placeholder="Field.." />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldData.map((field, index) => (
                      <SelectItem key={index} value={field.field_id.toString()}>
                        {field.field_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex w-full justify-end gap-4">
              <ButtonStyle
                onCLick={() => {
                  setShowScheduleForm(false)
                  setState({
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                  })
                }}
                background="yellow"
              >
                Cancel
              </ButtonStyle>

              <ButtonStyle onCLick={handleSubmit} background="red">
                Submit
              </ButtonStyle>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
