import { Checkbox } from '@/components/ui/checkbox';

interface FilterColorsProps {
  options: { color:string }[],
}
export const FilterColors = ({ options = [] }: FilterColorsProps) => {
 
  return (
    <div className='flex gap-4 flex-wrap'>
      {options.map((item) => (
        <div key={item.color} className='flex items-center' >
            <Checkbox id={item.color} 
              style={{
                background:`${item.color}`, 
              }} 
              className={`
                w-6 h-6 rounded-full
                ${item.color === '#FFFFFF' ? 'border border-[#D9D9D9]' : 'border-none'}
                ${item.color === '#202020' ? 'data-[state=checked]:text-white' : 'data-[state=checked]:text-black'}
              `}
            />
        </div>
      ))}
    </div>
)};
