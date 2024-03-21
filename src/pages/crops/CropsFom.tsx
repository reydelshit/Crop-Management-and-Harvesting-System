import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import DefaultCropsImage from '@/assets/default-product.jpg'

type CropsFormType = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  image: string | null
  setShowAddCrops: (show: boolean) => void
  error: string
  setError: (error: string) => void
}
export default function CropsForm({
  handleSubmit,
  handleChangeImage,
  handleInputChange,
  image,
  setShowAddCrops,
  error,
  setError,
}: CropsFormType) {
  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <form
        className="bg-white w-[35rem] h-fit p-4 rounded-md ml-[-15rem]  border-2"
        onSubmit={handleSubmit}
      >
        <div className="mb-2">
          <img
            className="w-full  h-[15rem] object-cover rounded-lg mb-4"
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
          <Label>Crop name</Label>
          <Input required onChange={handleInputChange} name="crops_name" />
        </div>
        <div>
          <Label>Variety</Label>
          <Input required onChange={handleInputChange} name="variety" />
        </div>
        <div>
          <Label>Fertilizer (eg. 15 days)</Label>
          <Input required onChange={handleInputChange} name="fertilizer" />
        </div>
        <div>
          <Label>Fertilizer Type</Label>
          <Input onChange={handleInputChange} name="fertilizer_type" />
        </div>
        <div>
          <Label>Planting Method</Label>
          <Input required onChange={handleInputChange} name="planting_method" />
        </div>

        <div>
          <Label>Harvesting Calendar (eg. 5 months / 1 year/s)</Label>
          <Input required onChange={handleInputChange} name="harvesting_cal" />
        </div>
        <div>
          <Label>Pesticide Schedule (eg. 15 days)</Label>
          <Input required onChange={handleInputChange} name="pest" />
        </div>
        <div>
          <Label>Pesticide Brand</Label>
          <Input onChange={handleInputChange} name="pest_brand" />
        </div>

        <div>
          <Label>Observation / Notes</Label>
          <Input required onChange={handleInputChange} name="obnotes" />
        </div>

        <div className="gap-2 flex justify-center">
          <Button
            onClick={() => setShowAddCrops(false)}
            className="mt-2 hover:bg-primary-yellow hover:text-primary-red bg-primary-red  p-2 border-2 text-black font-bold w-[8rem]"
          >
            Cancel
          </Button>
          <Dialog>
            <DialogTrigger className="mt-2 bg-primary-yellow text-primary-red font-semibold w-[8rem] p-0 rounded-md">
              Submit
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Are the informations provided are corrrect?
                </DialogTitle>
                <DialogDescription className="flex flex-col text-lg">
                  If the inforrmation is not correct it might cause inaccurate
                  information based on our limited data. It should follow the
                  information from Department of Agriculture.
                  {error && (
                    <span className="text-red-500 my-4">Error: {error}</span>
                  )}
                  <div className="gap-2 flex justify-center items-center mt-[2rem] self-end">
                    <DialogClose asChild>
                      <Button
                        onClick={() => setError('')}
                        type="button"
                        variant="secondary"
                      >
                        Close
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleSubmit(e as any)
                      }
                      className=" bg-primary-yellow p-2 text-primary-red font-bold w-[8rem self-end"
                    >
                      Submit
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  )
}
