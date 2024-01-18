interface Props extends React.SVGAttributes<SVGElement> {}

export function ConsumableIcon(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 25 25'
      {...props}
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M22.503 3.8v4.498A.503.503 0 0122 8.8v0a.52.52 0 01-.466-.3 10 10 0 00-9.031-5.7c-5.185 0-9.449 3.946-9.95 9'
      ></path>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M17.5 10.8v5a2 2 0 01-2 2h-6a2 2 0 01-2-2v-5a2 2 0 012-2h6a2 2 0 012 2zM12.5 11.8v-3'
      ></path>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M2.55 21.8v-4.496c0-.278.226-.503.504-.503v0c.2 0 .38.119.466.3a10.001 10.001 0 009.03 5.7c5.186 0 9.45-3.947 9.951-9'
      ></path>
    </svg>
  );
}
