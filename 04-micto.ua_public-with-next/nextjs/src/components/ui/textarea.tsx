import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'flex min-h-[60px] w-full bg-white fontInterRegular16 rounded-md border border-input px-3 py-2 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none hover:border-main focus-visible:border-1 focus-visible:border-main disabled:cursor-not-allowed disabled:opacity-50 duration-300',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Textarea.displayName = 'Textarea';

export { Textarea };
