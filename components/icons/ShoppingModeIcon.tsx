'use client';

interface Props extends React.SVGAttributes<SVGElement> {}

export function ShoppingModeIcon(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <mask
        id='mask0_520_7517'
        style={{ maskType: 'alpha' }}
        width='24'
        height='24'
        x='0'
        y='0'
        maskUnits='userSpaceOnUse'
      >
        <path fill='#D9D9D9' d='M0 0H24V24H0z'></path>
      </mask>
      <g mask='url(#mask0_520_7517)'>
        <path
          fill='currentColor'
          d='M12.22 21.054a1.459 1.459 0 01-1.07.446c-.415 0-.772-.149-1.07-.446l-7.15-7.15a1.432 1.432 0 01-.425-1.066 1.48 1.48 0 01.445-1.076l8.8-8.816a1.57 1.57 0 011.085-.446h7.15c.409 0 .76.148 1.056.443.296.296.444.648.444 1.057v7.15c0 .214-.042.415-.124.604a1.622 1.622 0 01-.342.5l-8.8 8.8zM17.483 7.75c.346 0 .642-.121.885-.364.244-.243.366-.538.366-.885s-.122-.642-.365-.886a1.202 1.202 0 00-.884-.365c-.347 0-.642.121-.886.364a1.202 1.202 0 00-.365.885c0 .347.121.642.364.886.243.243.538.365.885.365zM11.154 20l8.83-8.85V4H12.83L4 12.85 11.154 20z'
        ></path>
      </g>
    </svg>
  );
}
