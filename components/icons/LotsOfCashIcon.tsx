interface Props extends React.SVGAttributes<SVGElement> {}

export function LotsOfCashIcon(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 25 25'
      {...props}
    >
      <g
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        clipPath='url(#clip0_509_5923)'
      >
        <path d='M4.5 18.8v-8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-14a2 2 0 01-2-2zM19 14.81l.01-.01M8 14.81l.01-.01'></path>
        <path d='M4.5 16.8h-1a2 2 0 01-2-2v-8a2 2 0 012-2h14a2 2 0 012 2v2M13.5 16.8a2 2 0 110-4 2 2 0 010 4z'></path>
      </g>
      <defs>
        <clipPath id='clip0_509_5923'>
          <path
            fill='#fff'
            d='M0 0H24V24H0z'
            transform='translate(.5 .8)'
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}
