interface Props extends React.SVGAttributes<SVGElement> {}

export function DeliveryTruckIcon(props: Props) {
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
        strokeWidth='1.5'
        clipPath='url(#clip0_511_5934)'
      >
        <path
          strokeLinejoin='round'
          strokeMiterlimit='1.5'
          d='M8.5 19.8a2 2 0 100-4 2 2 0 000 4zM18.5 19.8a2 2 0 100-4 2 2 0 000 4z'
        ></path>
        <path d='M10.55 17.8h4.95V7.4a.6.6 0 00-.6-.6H1.5M6.15 17.8H4.1a.6.6 0 01-.6-.6v-4.9'></path>
        <path strokeLinejoin='round' d='M2.5 9.8h4'></path>
        <path d='M15.5 9.8h5.61a.6.6 0 01.548.357l1.79 4.027a.6.6 0 01.052.244v2.773a.6.6 0 01-.6.6H21M15.5 17.8h1'></path>
      </g>
      <defs>
        <clipPath id='clip0_511_5934'>
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
