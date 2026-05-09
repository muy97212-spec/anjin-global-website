import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from './Button'

export interface CTAItem {
  label: string
  href?: string
  onClick?: () => void
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  icon?: React.ReactNode
  external?: boolean
}

export interface CTAGroupProps {
  primary: CTAItem
  secondary?: CTAItem
  layout?: 'horizontal' | 'vertical'
  className?: string
}

function renderCTA(item: CTAItem, defaultVariant: ButtonProps['variant']) {
  const button = (
    <Button
      variant={item.variant ?? defaultVariant}
      size={item.size ?? 'lg'}
      onClick={item.onClick}
    >
      {item.icon}
      {item.label}
    </Button>
  )

  if (item.href) {
    if (item.external) {
      return (
        <a href={item.href} target="_blank" rel="noopener noreferrer">
          {button}
        </a>
      )
    }
    return <Link href={item.href}>{button}</Link>
  }

  return button
}

export function CTAGroup({ primary, secondary, layout = 'horizontal', className }: CTAGroupProps) {
  return (
    <div
      className={cn(
        'flex gap-4',
        layout === 'horizontal' ? 'flex-col sm:flex-row sm:items-center' : 'flex-col items-stretch',
        className,
      )}
    >
      {renderCTA(primary, 'primary')}
      {secondary ? renderCTA(secondary, 'ghost') : null}
    </div>
  )
}
