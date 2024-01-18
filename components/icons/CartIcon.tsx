interface Props extends React.SVGAttributes<SVGElement> {}

export function CartIcon(props: Props) {
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
        d='M19.579 7.25H4.42a.75.75 0 00-.745.667l-1.334 12a.75.75 0 00.746.833h17.824a.75.75 0 00.745-.833l-1.333-12a.75.75 0 00-.745-.667z'
      ></path>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8.25 10.25v-3a3.75 3.75 0 017.5 0v3'
      ></path>
    </svg>
  );
}
