interface Props extends React.SVGAttributes<SVGElement> {}

export function RuleIcon(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <mask
        id='mask0_542_26807'
        style={{ maskType: 'alpha' }}
        width='24'
        height='24'
        x='0'
        y='0'
        maskUnits='userSpaceOnUse'
      >
        <path fill='#D9D9D9' d='M0 0H24V24H0z'></path>
      </mask>
      <g mask='url(#mask0_542_26807)'>
        <path
          fill='currentColor'
          d='M4.615 17c-.46 0-.844-.154-1.153-.462A1.565 1.565 0 013 15.385v-6.77c0-.46.154-.844.462-1.152A1.565 1.565 0 014.615 7h14.77c.46 0 .844.154 1.152.463.309.308.463.692.463 1.152v6.77c0 .46-.154.844-.462 1.153a1.565 1.565 0 01-1.153.462H4.615zm0-1h14.77a.588.588 0 00.423-.192.588.588 0 00.192-.423v-6.77a.588.588 0 00-.192-.423.588.588 0 00-.423-.192H16.5v3.23h-1V8h-3v3.23h-1V8h-3v3.23h-1V8H4.615a.588.588 0 00-.423.192.588.588 0 00-.192.423v6.77c0 .154.064.295.192.423.129.128.27.192.423.192z'
        ></path>
      </g>
    </svg>
  );
}
