import React from 'react';

const ContentWrapper = ({
	children,
	fullWidth = false,
	wrapperClassName = '',
	childrenWrapperClassName = '',
}: Readonly<{
	children: React.ReactNode;
	fullWidth?: boolean;
	wrapperClassName?: string;
	childrenWrapperClassName?: string;
}>) => {
	return (
		<>
			{fullWidth ? (
				<section
					className={
						'mx-auto box-content' + (wrapperClassName ? ' ' + wrapperClassName : '')
					}
				>
					<div
						className={
							'max-w-[1290px] px-4 mx-auto box-content' +
							(childrenWrapperClassName ? ' ' + childrenWrapperClassName : '')
						}
					>
						{children}
					</div>
				</section>
			) : (
				<div
					className={
						'max-w-[1290px] px-4 mx-auto box-content' +
						(wrapperClassName ? ' ' + wrapperClassName : '')
					}
				>
					{children}
				</div>
			)}
		</>
	);
};

export default ContentWrapper;
