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
  pesticidesDate,
  harvestDate,
  selectedCropsName,
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
  pesticidesDate: string
  harvestDate: string
  selectedCropsName: string
}) {
  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <div className="w-[80%] flex gap-4 ml-[-15rem] p-5">
        <div className="w-[90%] bg-primary-yellow p-4 rounded-lg flex">
          <div className="w-full">
            <div className="flex items-center gap-4 w-full mb-2">
              <Select required onValueChange={(e: string) => handleActivity(e)}>
                <SelectTrigger className="w-[80%] h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                  <SelectValue placeholder="Activity.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pesticides">PESTICIDES</SelectItem>
                  <SelectItem value="Harvest Period">HARVEST PERIOD</SelectItem>
                  <SelectItem value="Land Preparation">
                    Land Preparation (tilling, plowing)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4 w-full mb-2">
              <Select required onValueChange={(e: string) => handleCrops(e)}>
                <SelectTrigger className="w-[80%] h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                  <SelectValue placeholder="Crops.." />
                </SelectTrigger>
                <SelectContent>
                  {cropsData.map((crop, index) => (
                    <SelectItem
                      key={index}
                      value={crop.crops_name + crop.crops_id.toString()}
                    >
                      {crop.crops_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
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

          <div className="w-full flex flex-col ">
            <div className="flex items-center gap-4 w-full mb-2">
              <Select required onValueChange={(e: string) => handleField(e)}>
                <SelectTrigger className="w-full h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
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
            <div className="w-full h-fit flex items-center flex-col p-4 border-4 border-primary-red rounded-3xl">
              <div className="w-full text-start my-4 flex-col bg-white p-2 rounded-lg">
                {pesticidesDate.length > 0 && (
                  <span className="block mb-[2rem] font-semibold text-[1.2rem] p-2 rounded-xl">
                    {selectedCropsName}{' '}
                    {selectedActivity === 'Harvest Period'
                      ? harvestDate +
                        '. - Automatically set the end date based on the start date selected'
                      : pesticidesDate}{' '}
                  </span>
                )}

                <span className="block text-[1.2rem] p-2">
                  Activity:{' '}
                  <span className="font-bold text-primary-red">
                    {selectedActivity}
                  </span>
                </span>

                <span className="block text-[1.2rem] p-2">
                  Start:{' '}
                  <span className="font-bold text-primary-red">
                    {moment(state.startDate).format('ll')}
                  </span>
                </span>
                <span className="block text-[1.2rem] p-2">
                  End:{' '}
                  <span className="font-bold text-primary-red">
                    {moment(state.endDate).format('ll')}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex w-full justify-end gap-4 mt-2">
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
