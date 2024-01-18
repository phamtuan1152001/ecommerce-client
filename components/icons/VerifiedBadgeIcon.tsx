'use client';

interface Props extends React.SVGAttributes<SVGElement> {}

export function VerifiedBadgeIcon(props: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        stroke='currentColor'
        strokeWidth='1.5'
        d='M11.528 1.6a.6.6 0 01.944 0l1.809 2.3a.6.6 0 00.635.207l2.815-.798a.6.6 0 01.764.554l.11 2.925a.6.6 0 00.393.54l2.747 1.01a.6.6 0 01.292.897l-1.63 2.431a.6.6 0 000 .668l1.63 2.431a.6.6 0 01-.292.897l-2.747 1.01a.6.6 0 00-.392.54l-.111 2.925a.6.6 0 01-.764.554l-2.815-.798a.6.6 0 00-.636.206L12.473 22.4a.6.6 0 01-.944 0L9.72 20.1a.6.6 0 00-.635-.207l-2.815.798a.6.6 0 01-.764-.554l-.11-2.925a.6.6 0 00-.393-.54l-2.747-1.01a.6.6 0 01-.292-.897l1.63-2.431a.6.6 0 000-.668l-1.63-2.431a.6.6 0 01.292-.897l2.747-1.01a.6.6 0 00.392-.54l.111-2.925a.6.6 0 01.764-.554l2.815.798A.6.6 0 009.72 3.9L11.53 1.6z'
      ></path>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M9 12l2 2 4-4'
      ></path>
    </svg>
  );
}
