import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[7px] fontInterMedium18 text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-[var(--main)] hover:bg-[var(--blue5)]',
				outline:
					'border border-main text-main hover:text-[var(--blue5)] hover:border-[var(--blue5)]',
				plainText:
					'border-0 fontInterBold16 text-black hover:text-[var(--blue8)] flex gap-2 items-center',
				mutedOutline:
					'border border-muted-foreground text-muted-foreground hover:text-[var(--blue6)] hover:border-[var(--blue6)]',
				secondary: 'bg-[var(--blue7)] hover:bg-[var(--blue6)]',
			},
			size: {
				default: 'h-[44px] lg:h-[50px]',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
				fit: '!h-fit !lg:h-fit',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
