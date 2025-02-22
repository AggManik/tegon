/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { Slot } from '@radix-ui/react-slot';
import { RiLoader4Line } from '@remixicon/react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from 'common/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:shadow-none disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-blue-600 text-slate-50 shadow hover:bg-blue-600/90 dark:bg-blue-600 dark:text-slate-50 dark:hover:bg-blue-600/90',
        destructive:
          'bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        outline:
          'border border-slate-200 shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-50',
        secondary:
          'bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost:
          'hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-0',
        link: 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-600',
      },
      size: {
        default: 'h-8 px-4 py-2',
        sm: 'h-7 rounded-md px-3',
        xs: 'h-6 rounded-md px-2',
        lg: 'h-9 rounded-md px-8',
        xl: 'h-14 rounded-md px-8',
        icon: 'h-9 w-9',
      },
      full: {
        false: 'w-auto',
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      full: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
  isActive?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      full,
      asChild = false,
      children,
      isLoading,
      isActive,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, full, className }),
          isActive &&
            'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-50',
        )}
        ref={ref}
        {...props}
        disabled={isLoading ?? disabled}
      >
        {isLoading ? <RiLoader4Line className="animate-spin mr-2" /> : <></>}
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
