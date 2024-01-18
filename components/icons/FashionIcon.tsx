interface Props extends React.SVGAttributes<SVGElement> {}

export function FashionIcon(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 15 25'
      {...props}
    >
      <path
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='0.3'
        d='M7.897 24.8l-6.466-.043a.387.387 0 01-.385-.36c-.008-.095-.177-2.403.227-6.326.397-3.9 1.787-6.908 2.381-8.191l.04-.09c.257-.553-.002-.861-.484-1.36-.333-.343-.711-.733-.711-1.27V1.19c0-.103.04-.204.117-.278a.37.37 0 01.272-.111l2.265.03a.39.39 0 01.384.39v.035c0 1.597 1.223 2.33 2.36 2.338 1.133-.006 2.357-.741 2.357-2.338V1.22a.39.39 0 01.384-.39L12.905.8a.391.391 0 01.395.39v5.97c0 .537-.379.924-.711 1.27-.44.453-.7.755-.537 1.232v.005c.01.036.027.074.046.117l.041.09c.594 1.284 1.984 4.292 2.384 8.194.4 3.923.232 6.231.224 6.327a.391.391 0 01-.387.36l-6.463.043v.003zM1.8 23.98l6.096.044 6.095-.043c.03-.79.063-2.853-.24-5.831-.387-3.774-1.738-6.698-2.316-7.949l-.04-.087a1.63 1.63 0 01-.083-.207c-.321-.95.278-1.57.717-2.022.253-.259.49-.507.49-.725V1.586l-1.504.019c-.073.8-.406 1.482-.972 1.983-.57.502-1.33.782-2.145.785-.82-.005-1.583-.283-2.15-.785-.566-.501-.899-1.182-.972-1.983l-1.502-.02V7.16c0 .221.24.466.493.728.477.49 1.129 1.16.635 2.226l-.04.093c-.578 1.248-1.93 4.171-2.314 7.943-.305 2.978-.272 5.04-.242 5.83H1.8z'
      ></path>
      <path
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='0.3'
        d='M8.744 11.058H7.046a.39.39 0 01-.39-.39V9.194a.39.39 0 01.39-.39h1.698a.39.39 0 01.39.39v1.474a.39.39 0 01-.39.39zm-1.31-.78h.92v-.697h-.92v.698z'
      ></path>
      <path
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='0.3'
        d='M11.747 10.342H8.744a.39.39 0 110-.78h3.003a.39.39 0 110 .78zM7.046 10.342H4.044a.39.39 0 110-.78h3a.39.39 0 110 .78h.002z'
      ></path>
    </svg>
  );
}
