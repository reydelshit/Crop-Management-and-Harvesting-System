import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import DefaultCropsImage from '@/assets/default-image.jpg'

export default function CropsForm({
  handleSubmit,
  handleChangeImage,
  handleInputChange,
  image,
  setShowAddCrops,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  image: string | null
  setShowAddCrops: (show: boolean) => void
}) {
  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <form
        className="bg-white w-[35rem] h-fit p-4 rounded-md ml-[-15rem]"
        onSubmit={handleSubmit}
      >
        <div className="mb-2">
          <img
            className="w-[40rem]  h-[25rem] object-cover rounded-lg mb-4"
            src={image! ? image! : DefaultCropsImage}
          />
          <Label>Image</Label>
          <Input
            required
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            name="crops_img"
          />
        </div>

        <div>
          <Label>Crop Name</Label>
          <Input required onChange={handleInputChange} name="crops_name" />
        </div>

        <div>
          <Label>planting_date</Label>
          <Input
            required
            type="date"
            onChange={handleInputChange}
            name="planting_date"
          />
        </div>

        <div>
          <Label>expected_harvest </Label>
          <Input
            required
            type="date"
            onChange={handleInputChange}
            name="expected_harvest"
          />
        </div>

        <div>
          <Label>ogc</Label>
          <Input required onChange={handleInputChange} name="ogc" />
        </div>

        <div>
          <Label>variety</Label>
          <Input required onChange={handleInputChange} name="variety" />
        </div>

        <div className="gap-2 flex justify-center">
          <Button
            onClick={() => setShowAddCrops(false)}
            className="mt-2 bg-primary-yellow p-2 text-primary-red font-bold w-[8rem]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="mt-2 bg-primary-yellow p-2 text-primary-red font-bold w-[8rem]"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
