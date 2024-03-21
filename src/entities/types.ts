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
  harvesting_cal: string
  pest: string
  obnotes: string
  created_at: string
  variety: string
  image: string
  fertilizer: string
  fertilizer_type: string
  pest_brand: string
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

export type ResponseData = {
  crops_id: string
  crops_name: string
  // crop_status: string
  field_id: string
  field_name: string
  suitability: string
  suitable_month: string
  status: string
  activity: string
}

export type ScheduleTypes = {
  crops_id: string
  field_id: string
  activity: string
  scheduled_date: string
  actual_start_date: string
  actual_end_date: string
  user_id: string
  schedule_id: string
  status: string
  crops_name: string
  field_name: string
}
