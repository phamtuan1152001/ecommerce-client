interface Props extends React.SVGAttributes<SVGElement> {}

export function ShieldCheckIcon(props: Props) {
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
        d='M9 12.3l3 3 5-5'
      ></path>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M5.5 18.8L3.63 5.714A.996.996 0 014.404 4.6l7.662-1.703a2 2 0 01.868 0L20.596 4.6c.51.113.848.596.774 1.113L19.5 18.801c-.07.495-.5 3.5-7 3.5s-6.93-3.005-7-3.5z'
      ></path>
    </svg>
  );
}
