import { HTMLProps } from 'react'
import cn from 'clsx'
import s from '../CustomPagination.module.css'

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean }

export default function PageLink({
  className,
  active,
  disabled,
  children,
  ...otherProps
}: Props) {
  if (disabled) {
    return (
      <span
        className={cn(
          s['page-link'],
          active && s.active,
          disabled && s.disabled,
          className
        )}
      >
        {children}
      </span>
    )
  }

  return (
    <a
      className={cn(s['page-link'], active && s.active, disabled && s.disabled, className)}
      aria-current={active ? 'page' : undefined}
      {...otherProps}
    >
      {children}
    </a>
  )
}
