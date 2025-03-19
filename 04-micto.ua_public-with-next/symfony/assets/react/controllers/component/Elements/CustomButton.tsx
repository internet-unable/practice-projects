import { Button } from '@/components/ui/button';
import { LOADING_ANIM_SVG } from '@/components/utils/SVG';
import { cn } from '@/lib/utils';
import React from 'react';

interface IPropsButton {
	text: string;
	onClick?: () => void;
	className?: string;
	classNameContainer?: string;
	type?: 'submit' | 'reset' | 'button';
	isLoading?: boolean;
}

const CustomButton: React.FC<IPropsButton> = ({
	text,
	onClick,
	className,
	classNameContainer,
	type = 'button',
	isLoading = false,
}) => {
	return (
		<div className={cn('w-full flex items-center justify-center' + ' ', classNameContainer)}>
			<Button
				onClick={onClick}
				className={cn(
					'bg-[var(--color5)] rounded-[var(--default-round)] text-center h-[44px]' +
						' hover:bg-[var(--hover)] hover:border-[var(--hover)] hover:!opacity-100 disabled:opacity-100 disabled:bg-[#80BEE7] desktop:h-[50px]',
					className
				)}
				type={type}
				disabled={isLoading}
			>
				{isLoading ? <LOADING_ANIM_SVG /> : text}
			</Button>
		</div>
	);
};

export default CustomButton;
