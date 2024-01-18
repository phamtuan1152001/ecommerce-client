'use client';

interface Props extends React.SVGAttributes<SVGElement> {}

export function TShirtIcon(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 25'
      {...props}
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M6 4.8h3s0 3 3 3 3-3 3-3h3m0 7v8.4a.6.6 0 01-.6.6H6.6a.6.6 0 01-.6-.6v-8.4M18 4.8l4.443 1.778a.6.6 0 01.334.78l-1.626 4.066a.6.6 0 01-.557.377H18M6 4.8L1.557 6.579a.6.6 0 00-.334.78l1.626 4.066a.6.6 0 00.557.377H6'
      ></path>
    </svg>
  );
}
