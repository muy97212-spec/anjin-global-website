import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-brand-primary)] text-[var(--color-surface)] hover:bg-[var(--color-neutral-900)]',
        secondary:
          'bg-[var(--color-brand-secondary)] text-[var(--color-surface)] hover:opacity-90',
        ghost:
          'bg-transparent text-[var(--color-brand-primary)] hover:bg-[var(--color-surface-alt)]',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : null}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
