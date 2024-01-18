import React from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
  el?: HTMLElement;
  full?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  el = 'div',
  full = false,
}) => {
  const rootClassName = cn(className, {
    'mx-auto max-w-7xl px-6 w-full': !full,
  });

  const Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  return <Component className={rootClassName}>{children}</Component>;
};
