import * as z from "zod"

// @components
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

// @validataion
import { formSchema } from "@/validation/form-checkout";

interface ContactFormProps {
  form: any
}

const ContactForm = ({ form }: ContactFormProps) => {
  return (
    <div className=' flex flex-col gap-y-4'>
      <div className=' flex items-center gap-x-2'>
        <PiHandbagThin size={24} />
        <h3 className=' text-[20px] font-bold'>Contact Info</h3>
      </div>
      <div className=' flex flex-col gap-y-4 '>
        <div className=' flex gap-x-6 justify-between items-end'>
          <div className=' flex-1'>
            <FormField
              control={form?.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' text-sm font-bold text-[#333333]'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                      placeholder='Enter Email'
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

export default ContactForm