// @components
import SelectionComponent from '@/components/form/selection-component';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// @icon
import { PiHandbagThin } from 'react-icons/pi';

interface DeliveryAddressFormProps {
  form: any,
  listProvinces: {
    id: string,
    name: string,
    type: string
  }[],
  listDistricts: {
    id: string,
    name: string,
    type: string,
  }[],
  listWards: {
    id: string,
    name: string,
    type: string,
  }[],
  onGetListDistrictsAsProvincesId: (value: string) => void,
  onGetListWardsAsDistrictId: (value: string) => void
}

const DeliveryAddressForm = ({
  form,
  listProvinces,
  listDistricts,
  listWards,
  onGetListDistrictsAsProvincesId,
  onGetListWardsAsDistrictId
}: DeliveryAddressFormProps) => {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className=' flex items-center gap-x-2'>
        <PiHandbagThin size={24} />
        <h3 className=' text-[20px] font-bold'>Delivery address</h3>
      </div>
      <div className=' flex flex-col gap-y-4 '>
        <div className='grid grid-cols-2 gap-4 max-[1024px]:grid-cols-1'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-sm font-bold text-[#333333]'>
                  Full name
                </FormLabel>
                <FormControl>
                  <Input
                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                    placeholder='Enter your first and last name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-sm font-bold text-[#333333]'>
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                    placeholder='Enter your phone number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-3 gap-4 max-[1024px]:grid-cols-1'>
          <FormField
            control={form.control}
            name='provinceId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-sm font-bold text-[#333333]'>
                  Province/City
                </FormLabel>
                <SelectionComponent
                  datas={listProvinces}
                  placeholder="Select Province/City"
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                    const data = form.getValues()
                    onGetListDistrictsAsProvincesId(
                      data.provinceId
                    )
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='districtId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-sm font-bold text-[#333333]'>
                  District
                </FormLabel>
                <SelectionComponent
                  datas={listDistricts}
                  placeholder="Select District"
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                    const data = form.getValues()
                    onGetListWardsAsDistrictId(
                      data.districtId
                    )
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='wardId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-sm font-bold text-[#333333]'>
                  Wards
                </FormLabel>
                <SelectionComponent
                  datas={listWards}
                  placeholder="Select Ward/Commune"
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex'>
          <div className=' flex-1'>
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' text-sm font-bold text-[#333333]'>
                    Address house, street, area
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                      placeholder='Enter house number, street, area'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryAddressForm