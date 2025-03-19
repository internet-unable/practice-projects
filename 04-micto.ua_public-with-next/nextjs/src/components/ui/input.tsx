import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-[50px] w-full rounded-lg border border-input bg-white p-4 fontInterRegular16 text-foreground tracking-normal  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-[var(--main)] focus:border-[var(--main)] ',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };
