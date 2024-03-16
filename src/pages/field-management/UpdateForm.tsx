import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FieldTypes } from '@/entities/types'
import { Label } from '@/components/ui/label'

type UpdateFromProps = {
  handleUpdateSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fieldUpdateDetails: FieldTypes | null
  setShowUpdateFormField: (e: boolean) => void
}

export default function UpdateForm({
  handleUpdateSubmit,
  handleInputChange,
  fieldUpdateDetails,
  setShowUpdateFormField,
}: UpdateFromProps) {
  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <div className="w-[80%] flex justify-center gap-4 ml-[-15rem] p-5">
        <form
          onSubmit={handleUpdateSubmit}
          className="w-[50%] bg-primary-yellow p-8 rounded-lg"
        >
          <h1 className="font-bold text-2xl text-primary-red py-4">
            UPDATE SOIL
          </h1>
          <Label className="text-primary-red my-2 block">Field name</Label>
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Field name"
            name="field_name"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.field_name}
          />

          <Label className="text-primary-red my-2 block">Location</Label>

          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Location"
            name="location"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.location}
          />

          <Label className="text-primary-red my-2 block">Size</Label>

          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Size (Area)"
            name="field_size"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.field_size}
          />

          <Label className="text-primary-red my-2 block">Soil Type</Label>

          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Soil Type"
            name="soil_type"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.soil_type}
          />

          <Label className="text-primary-red my-2 block">
            Irrigation System
          </Label>
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Irrigation System"
            name="irrigation_system"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.irrigation_system}
          />

          <Label className="text-primary-red my-2 block">
            Past Crop History
          </Label>
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Past Crop History"
            name="crop_history"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.crop_history}
          />

          <div className="flex gap-2 justify-end items-center">
            <Button
              onClick={() => setShowUpdateFormField(false)}
              className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-yellow text-primary-red hover:bg-primary-red hover:text-primary-yellow hover:border-primary-yellow"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-red text-primary-yellow hover:bg-primary-yellow hover:text-primary-red hover:border-primary-red"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
