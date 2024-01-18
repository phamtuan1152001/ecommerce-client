'use client';

interface Props extends React.SVGAttributes<SVGElement> {}

export function BrandIcon(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 25'
      {...props}
    >
      <path
        stroke='currentColor'
        strokeWidth='1.5'
        d='M20.485 3.8h-3.992l.5 5s1 1 2.5 1a3.23 3.23 0 002.139-.806.503.503 0 00.15-.465l-.705-4.227a.6.6 0 00-.592-.501z'
      ></path>
      <path
        stroke='currentColor'
        strokeWidth='1.5'
        d='M16.493 3.8l.5 5s-1 1-2.5 1-2.5-1-2.5-1v-5h4.5z'
      ></path>
      <path
        stroke='currentColor'
        strokeWidth='1.5'
        d='M11.993 3.8v5s-1 1-2.5 1-2.5-1-2.5-1l.5-5h4.5z'
      ></path>
      <path
        stroke='currentColor'
        strokeWidth='1.5'
        d='M7.493 3.8H3.502a.6.6 0 00-.592.502L2.205 8.53c-.028.173.02.35.15.465.328.291 1.061.807 2.138.807 1.5 0 2.5-1 2.5-1l.5-5z'
      ></path>
      <path
        stroke='currentColor'
        strokeWidth='1.5'
        d='M3 9.8v10a2 2 0 002 2h14a2 2 0 002-2v-10'
      ></path>
      <path
        stroke='currentColor'
        strokeMiterlimit='16'
        strokeWidth='1.5'
        d='M14.833 21.8v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6'
      ></path>
    </svg>
  );
}
