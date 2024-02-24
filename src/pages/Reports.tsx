import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CropTypes, FieldTypes } from '@/entities/types'
import ButtonStyle from '@/lib/ButtonStyle'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'
type ResponseType = {
  field_id: string
  field_name: string
  field_size: string
  irrigation_system: string
  location: string
  soil_type: string
  crop_history: string
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    flexDirection: 'column',
    margin: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    marginBottom: 100,
    textAlign: 'center',
  },
  dataContainer: {
    marginBottom: 5,
    padding: 10,
    color: 'black',
  },
  dataText: {
    fontSize: 12,
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
})

export default function Reports() {
  const [fieldData, setFieldData] = useState<FieldTypes[]>([])
  const [cropsData, setCropsData] = useState<CropTypes[]>([])
  const [selectedField, setSelectedField] = useState<string>('')
  const [fieldName, setFieldName] = useState<string>('')
  const [showPDF, setShowPDF] = useState(false)
  const [fieldDetails, setFieldDetails] = useState<FieldTypes[]>([])

  const [responseData, setResponseData] = useState<ResponseType[]>([])
  const user_id = localStorage.getItem('cmhs_token')

  const fetchCropsField = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setCropsData(res.data)
          // setFieldData(res.data)
        }
      })

    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/field.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setFieldData(res.data)
          // setFieldData(res.data)
        }
      })
  }

  useEffect(() => {
    fetchCropsField()
  }, [])

  const ExtractDuration = ({ text }: { text: string }) => {
    const lowercaseText = text.toLowerCase()
    const numberRegex = /\d+/

    if (lowercaseText.includes('months')) {
      const match = lowercaseText.match(numberRegex)
      if (match) {
        const number = parseInt(match[0])
        const days = number * 30
        console.log(number, days)

        return (
          <span>
            Approximately {days} days in {number} months
          </span>
        )
      } else {
        console.log('No number found')
      }
    } else if (
      lowercaseText.includes('years') ||
      lowercaseText.includes('year')
    ) {
      const match = lowercaseText.match(numberRegex)
      if (match) {
        const number = parseInt(match[0])
        const days = number * 365
        console.log(number, days)

        return (
          <span>
            Approximately {days} days in {number} year/s
          </span>
        )
      } else {
        console.log('No number found')
      }
    } else {
      console.log('No match')
    }
  }

  const handleField = (e: string) => {
    setSelectedField(e)

    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/reports.php`, {
        params: {
          user_id: user_id,
          field_id: e,
        },
      })
      .then((res) => {
        console.log(res.data)

        if (res.data.length !== 0) {
          setFieldName(res.data[0].field_name)

          setResponseData(res.data)
        } else {
          setFieldName('')
          setResponseData([])
        }
      })

    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/reports.php`, {
        params: {
          user_id_field: user_id,
          field_id_field: e,
        },
      })
      .then((res: any) => {
        // console.log(res.data[0].harvesting_cal)
        // extractDuration(res.data[0].harvesting_cal)
        console.log(res.data, 'field details')
        setFieldDetails(res.data)
      })
  }

  const PDFReport = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>
              REPORT FOR{' '}
              {fieldName
                ? fieldName.toUpperCase()
                : 'Select Field to view reports'}
              .
            </Text>

            <View style={styles.dataContainer}>
              <Text>List Crops Planted</Text>
              {responseData.length > 0 ? (
                responseData.map((data: any, index: number) => (
                  <View style={styles.dataContainer} key={index}>
                    <Text style={styles.dataText}>
                      Crop Name: {data.crops_name}
                    </Text>
                    <Text style={styles.dataText}>
                      Harvesting Duration:{data.harvesting_cal}
                    </Text>
                    <Text style={styles.dataText}>
                      Notes / Description: {data.obnotes}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No data to display</Text>
              )}
            </View>

            <View style={styles.dataContainer}>
              <Text>Field Details</Text>
              {fieldDetails.length > 0 ? (
                fieldDetails.map((data, index) => (
                  <View key={index} style={styles.dataContainer}>
                    <View style={{ marginBottom: 5 }}>
                      <Text style={styles.dataText}>
                        Field Size: {data.field_size}
                      </Text>
                    </View>

                    <View style={{ marginBottom: 5 }}>
                      <Text style={styles.dataText}>
                        Irrigation System: {data.irrigation_system}
                      </Text>
                    </View>

                    <View style={{ marginBottom: 5 }}>
                      <Text style={styles.dataText}>
                        Location: {data.location}
                      </Text>
                    </View>

                    <View style={{ marginBottom: 5 }}>
                      <Text style={styles.dataText}>
                        Soil Type: {data.soil_type}
                      </Text>
                    </View>

                    <View style={{ marginBottom: 5 }}>
                      <Text style={styles.dataText}>
                        Crop History: {data.crop_history}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No data to display</Text>
              )}
            </View>
          </View>
        </Page>
      </Document>
    )
  }

  return (
    <div className="w-full min-h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Reports
        </h1>
      </div>

      <div className="flex w-full items-center">
        <div className="flex items-center gap-4 w-full border-4 bg-primary-red border-primary-red p-2 rounded-full overflow-hidden">
          <h1 className="font-bold text-[1rem] text-primary-yellow text-center">
            Field
          </h1>
          <Select required onValueChange={(e: string) => handleField(e)}>
            <SelectTrigger className="w-[30%] h-full bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
              <SelectValue placeholder="Select field.." />
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

      <div className="mt-[1rem] flex gap-2 justify-between w-[100%] border-4 border-primary-yellow rounded-[5rem] h-fit p-8">
        <div className="flex flex-col w-[100%] h-full">
          <div className="flex justify-between items-center">
            <h1 className="text-[5rem] text-primary-yellow mb-5 font-bold">
              {fieldName ? fieldName : 'Select Field to view reports'}
            </h1>
            <div className="flex justify-end flex-col w-[50%]">
              {fieldDetails.length > 0 ? (
                fieldDetails.map((data, index: number) => {
                  return (
                    <div
                      key={index}
                      className="grid place-content-center gap-2 mb-2 grid-cols-2 w-full bg-primary-yellow rounded-xl mt-[1rem] p-4 h-full "
                    >
                      <div className="bg-primary-red w-full p-1 rounded-xl h-fit">
                        <Label className="text-primary-yellow bg-primary-red p-1 rounded-lg text-[0.9rem]">
                          Field Size
                        </Label>
                        <h1 className="text-[0.9rem] text-primary-yellow">
                          {data.field_size}
                        </h1>
                      </div>
                      <div className="bg-primary-red w-full p-1 rounded-xl">
                        <Label className="text-primary-yellow bg-primary-red p-1 rounded-lg text-[0.9rem]">
                          Irrigation System
                        </Label>
                        <p className="text-[0.9rem] text-primary-yellow">
                          {data.irrigation_system}
                        </p>
                      </div>

                      <div className="bg-primary-red w-full p-1 rounded-xl">
                        <Label className="text-primary-yellow bg-primary-red p-1 rounded-lg text-[0.9rem]">
                          Location
                        </Label>
                        <p className="text-[0.9rem] text-primary-yellow">
                          {data.location}
                        </p>
                      </div>

                      <div className="bg-primary-red w-full p-1 rounded-xl">
                        <Label className="text-primary-yellow bg-primary-red p-1 rounded-lg text-[0.9rem]">
                          Soil Type
                        </Label>
                        <p className="text-[0.9rem] text-primary-yellow">
                          {data.soil_type}
                        </p>
                      </div>

                      <div className="bg-primary-red w-full p-1 rounded-xl">
                        <Label className="text-primary-yellow bg-primary-red p-1 rounded-lg text-[0.9rem]">
                          Crop History
                        </Label>
                        <p className="text-[0.9rem] text-primary-yellow">
                          {data.crop_history}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <h1 className="text-primary-yellow text-2xl">
                  No data to display
                </h1>
              )}
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-2">
            {responseData.length > 0 ? (
              responseData.map((data: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-[100%] bg-primary-yellow rounded-xl p-4 h-full flex justify-start flex-col items-start"
                  >
                    <div className="bg-primary-red text-center my-2 w-[3rem] h-[3rem] rounded-full text-primary-yellow font-bold text-[2rem]">
                      {index + 1}
                    </div>
                    <div className="bg-primary-red w-full p-1 rounded-xl">
                      <Label className="text-primary-yellow bg-primary-red p-1 rounded-lg text-[0.9rem]">
                        Crop Name
                      </Label>
                      <h1 className="text-[1.5rem] text-primary-yellow">
                        {data.crops_name}
                      </h1>
                    </div>

                    <div className="bg-primary-red w-full p-1 rounded-xl my-2">
                      <Label className="text-primary-yellow bg-primary-red p-1 rounded-lg text-[0.9rem]">
                        Harvesting Duration
                      </Label>

                      <p className="text-[1.5rem] text-primary-yellow">
                        <ExtractDuration text={data.harvesting_cal} />
                      </p>
                    </div>

                    <div className="bg-primary-red w-full p-1 rounded-xl my-2">
                      <Label className="text-primary-yellow bg-primary-red p-1 rounded-lg text-[0.9rem] mt-[1rem]">
                        Notes / Desciption
                      </Label>
                      <p className="text-[1.5rem] text-primary-yellow">
                        {data.obnotes}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <h1 className="text-primary-yellow text-2xl">
                No data to display
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full px-10 mt-[2rem] my-[5rem]">
        <ButtonStyle
          background="yellow"
          onCLick={() => {
            setShowPDF(!showPDF)
          }}
        >
          {showPDF ? 'Close PDF' : 'Generate PDF'}
        </ButtonStyle>
      </div>

      {showPDF && (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
          <PDFReport />
        </PDFViewer>
      )}
    </div>
  )
}
