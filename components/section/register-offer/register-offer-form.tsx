'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Bắt buộc' })
    .email({ message: 'Không đúng định dạng email' }),
});

export const RegisterOfferForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='inline-flex items-center space-x-4 py-2 px-3 rounded-[42px] border border-[#D2D2D2] bg-[#F5F5F5]'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl className='w-[600px]'>
                  <Input
                    placeholder='Điền email của bạn'
                    {...field}
                    className='focus-visible:ring-0  focus-visible:ring-offset-0 placeholder:text-[#777] bg-transparent border-none w-[260px] max-[1024px]:w-[200px]'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='font-semibold text-base text-black uppercase bg-transparent hover:bg-transparent'
          >
            Đăng ký
          </Button>
        </div>
      </form>
    </Form>
  );
};
