import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FieldTypes } from '@/entities/types'
export default function UpdateForm({
  handleUpdateSubmit,
  handleInputChange,
  fieldUpdateDetails,
  setShowUpdateFormField,
}: {
  handleUpdateSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fieldUpdateDetails: FieldTypes | null
  setShowUpdateFormField: (e: boolean) => void
}) {
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
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Field name"
            name="field_name"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.field_name}
          />
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Location"
            name="location"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.location}
          />
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Size (Area)"
            name="field_size"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.field_size}
          />
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Soil Type"
            name="soil_type"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.soil_type}
          />
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
            placeholder="Irrigation System"
            name="irrigation_system"
            onChange={handleInputChange}
            defaultValue={fieldUpdateDetails?.irrigation_system}
          />
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl"
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
