export type UserType = {
  user_id: string
  account_type: string
  created_at: string
  username: string
}

export type CropTypes = {
  crops_id: number
  crops_img: string
  crops_name: string
  planting_method: string
  expected_yield: string
  harvesting_cal: string
  pest: string
  obnotes: string
  created_at: string
  variety: string
  image: string
}

export type FieldTypes = {
  field_id: number
  field_name: string
  field_size: string
  crop_history: string
  location: string
  soil_type: string
  irrigation_system: string
  created_at: string
}
