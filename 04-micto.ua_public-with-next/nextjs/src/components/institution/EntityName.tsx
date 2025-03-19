'use client';
import React from 'react';
import { CHEVRON_SVG } from '../common/SVG';

const EntityName = ({
	shortName,
	fullName,
	className,
}: {
	shortName: string;
	fullName?: string | null;
	className?: string;
}) => {
	const [fullNameIsOpen, setFullNameIsOpen] = React.useState(false);

	return (
		<>
			<h1 className={`fontInterBold30${fullName ? ' mb-4' : ''}`}>{shortName}</h1>

			{fullName && (
				<button
					className={
						'fontInterMedium18 flex gap-3 items-center duration-300 ' +
						(fullNameIsOpen ? 'mb-2' : '')
					}
					onClick={(e) => {
						setFullNameIsOpen(!fullNameIsOpen);
					}}
				>
					{fullNameIsOpen ? 'Сховати ' : 'Показати '}
					повну назву
					<CHEVRON_SVG className={`${fullNameIsOpen ? 'rotate-180' : ''} duration-300`} />
				</button>
			)}

			<div
				className={
					'duration-300 grid ' + (fullNameIsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')
				}
			>
				<h3 className={'fontInterMedium18 overflow-hidden'}>{fullName}</h3>
			</div>
		</>
	);
};

export default EntityName;
