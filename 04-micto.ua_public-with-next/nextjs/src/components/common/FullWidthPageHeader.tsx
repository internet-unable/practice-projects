import React from 'react';
import ContentWrapper from './ContentWrapper';
import getWordForm from '@/utils/getWordForm';

const FullWidthPageHeader = ({
	title,
	itemsCount,
	titleVariants,
	className,
}: Readonly<{
	title: string;
	itemsCount?: number;
	titleVariants?: [string, string, string];
	className?: string;
}>) => {
	return (
		<>
			<ContentWrapper wrapperClassName="bg-[var(--blue1)]" fullWidth={true}>
				<div
					className={'flex flex-col gap-6 justify-between py-16 lg:flex-row ' + className}
				>
					<h1 className="order-2 fontUbuntuBold30 lg:fontInterBold45">{title}</h1>
					{itemsCount !== null && titleVariants && (
						<div className="order-1 flex gap-2 items-center lg:order-3">
							<span className="text-main fontUbuntuBold25">{itemsCount}</span>
							<span className="fontUbuntuBold20 font-medium">
								{getWordForm(itemsCount ? itemsCount : 0, titleVariants)}
							</span>
						</div>
					)}
				</div>
			</ContentWrapper>
		</>
	);
};

export default FullWidthPageHeader;
