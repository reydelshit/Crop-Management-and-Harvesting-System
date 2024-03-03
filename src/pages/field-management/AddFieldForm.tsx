import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type AddFieldFomProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showAddField: boolean
  setShowAddField: (e: boolean) => void
  handleIrrigation: (e: string) => void
  handleSoitType: (e: string) => void
}

export default function AddFieldFom({
  handleSubmit,
  handleInputChange,
  showAddField,
  setShowAddField,
  handleIrrigation,
  handleSoitType,
}: AddFieldFomProps) {
  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <div className="w-[80%] flex gap-4 ml-[-15rem] p-5">
        <form
          onSubmit={handleSubmit}
          className="w-[50%] bg-primary-yellow p-8 rounded-lg"
        >
          <h1 className="font-bold text-2xl text-primary-red py-4">
            ADD SOIL FIELD
          </h1>
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Field name"
            name="field_name"
            required
            onChange={handleInputChange}
          />
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Location"
            name="location"
            required
            onChange={handleInputChange}
          />
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Size (Area)"
            name="field_size"
            required
            onChange={handleInputChange}
          />
          <div className="flex items-center gap-4 w-full ">
            <Select required onValueChange={(e: string) => handleSoitType(e)}>
              <SelectTrigger className="w-full h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                <SelectValue placeholder="Soil type.." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alluvial soil">Alluvial soil</SelectItem>
                <SelectItem value="Clayey soil">Clayey soil</SelectItem>
                <SelectItem value="Loamy soil">Loamy soil</SelectItem>

                <SelectItem value="Sandy soil">Sandy soil</SelectItem>
                <SelectItem value="Volcanic soil">Volcanic soil</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Soil Type"
            name="soil_type"
            required
            onChange={handleInputChange}
          /> */}
          {/* <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Irrigation System"
            name="irrigation_system"
            required
            onChange={handleInputChange}
          /> */}
          <div className="flex items-center gap-4 w-full my-2">
            <Select required onValueChange={(e: string) => handleIrrigation(e)}>
              <SelectTrigger className="w-full h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                <SelectValue placeholder="Irrigation system.." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sprinkler irrigation">
                  Sprinkler irrigation
                </SelectItem>
                <SelectItem value="Drip irrigation">Drip irrigation</SelectItem>
                <SelectItem value="Furrow irrigation">
                  Furrow irrigation
                </SelectItem>

                <SelectItem value="Canal irrigation">
                  Canal irrigation
                </SelectItem>
                <SelectItem value="Subsurface irrigation">
                  Subsurface irrigation
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Past Crop History"
            name="crop_history"
            required
            onChange={handleInputChange}
          />
          <div className="flex gap-2 justify-end items-center">
            <Button
              onClick={() => setShowAddField(!showAddField)}
              className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-yellow text-primary-red hover:bg-primary-red hover:text-primary-yellow hover:border-primary-yellow"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-red text-primary-yellow hover:bg-primary-yellow hover:text-primary-red hover:border-primary-red"
            >
              Save
            </Button>
          </div>
        </form>

        <div className="w-[40%] bg-primary-yellow p-8 rounded-lg">
          <h1 className="font-bold text-2xl text-primary-red py-4">
            SAMPLE FIELD DATA
          </h1>
          <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
            Sultan Kudarat Mango Orchard
          </div>

          <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
            Barangay Kalamansig, Sultan Kudarat, Philippines
          </div>
          <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
            5 hectares
          </div>
          <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
            Clay loam
          </div>
          <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
            Drip irrigation
          </div>
          <div className="mb-2 border-4 border-primary-red p-3 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red">
            Mango (since 2015)
          </div>
        </div>
      </div>
    </div>
  )
}
