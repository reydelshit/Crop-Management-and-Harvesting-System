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
import CropsDetailsConditional from '@/lib/CropsDetailsConditional'

interface StateProps {
  startDate: Date
  endDate: Date
  key: string
}

type ScheduleFormProps = {
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
  fertilizerDate: string
  harvestDate: string
  selectedCropsName: string
  selectedTypeBrand: string
  selectedTypeFerti: string
  selectedBrandPest: string
  selectedCropsDetails: CropTypes
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
  selectedCropsDetails,
  pesticidesDate,
  fertilizerDate,
  harvestDate,
  selectedCropsName,
  selectedTypeBrand,
  selectedTypeFerti,
  selectedBrandPest,
}: ScheduleFormProps) {
  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <div className="w-[80%] flex gap-4 ml-[-15rem] p-5">
        <div className="w-[90%] bg-primary-yellow p-4 rounded-lg flex">
          <div className="w-full">
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
                  <SelectItem value="Fertilizer">FERTILIZER</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4 w-full mb-2">
              <Select required onValueChange={(e: string) => handleField(e)}>
                <SelectTrigger className="w-[80%] h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
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
            <div className="w-full h-full flex items-center flex-col p-4 border-4 border-primary-red rounded-3xl">
              <div className="w-full h-full text-start my-4 flex-col bg-white p-2 rounded-lg">
                {selectedCropsDetails.crops_id && selectedCropsDetails && (
                  <div className="flex gap-4">
                    <img
                      src={selectedCropsDetails.crops_img}
                      alt={selectedCropsDetails.crops_name}
                      className="w-[10rem] h-[10rem]"
                    />
                    <div>
                      <h1 className="font-bold">
                        {selectedCropsDetails.crops_name}
                      </h1>
                      <CropsDetailsConditional
                        title="Fertilizer"
                        cropDetailsName={selectedCropsDetails.fertilizer}
                        style="text-[1rem]"
                      />
                      <CropsDetailsConditional
                        title="Fertilizer Type"
                        cropDetailsName={selectedCropsDetails.fertilizer_type}
                        style="text-[1rem]"
                      />
                      <CropsDetailsConditional
                        title="Pesticide"
                        cropDetailsName={selectedCropsDetails.pest}
                        style="text-[1rem]"
                      />{' '}
                      <CropsDetailsConditional
                        title="Pesticide Brand"
                        cropDetailsName={selectedCropsDetails.pest_brand}
                        style="text-[1rem]"
                      />
                      <CropsDetailsConditional
                        title="Planting Method"
                        cropDetailsName={selectedCropsDetails.planting_method}
                        style="text-[1rem]"
                      />{' '}
                      <CropsDetailsConditional
                        title="Harvesting Calendar"
                        cropDetailsName={selectedCropsDetails.harvesting_cal}
                        style="text-[1rem]"
                      />{' '}
                      <CropsDetailsConditional
                        title="Variet"
                        cropDetailsName={selectedCropsDetails.variety}
                        style="text-[1rem]"
                      />
                    </div>
                  </div>
                )}

                <span className="block text-[1.2rem] p-2 mt-[2rem]">
                  Activity:{' '}
                  <span className="font-bold ">{selectedActivity}</span>
                </span>

                <span className="block text-[1.2rem] p-2">
                  Start:{' '}
                  <span className="font-bold ">
                    {moment(state.startDate).format('ll')}
                  </span>
                </span>
                <span className="block text-[1.2rem] p-2">
                  End:{' '}
                  <span className="font-bold ">
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
