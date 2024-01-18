import React from 'react';

import { cn } from '@/lib/utils';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn('bg-white p-6', className)} ref={ref} {...props} />
    );
  }
);

Box.displayName = 'Box';
