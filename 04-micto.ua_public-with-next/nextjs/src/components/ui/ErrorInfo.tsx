import React from 'react';
import { WarningIcon } from '../icons/WarningIcon';

interface IErrorInfoProps {
	errorMessage?: string;
	isErrorTypeMatch?: boolean;
}

export const ErrorInfo = ({ errorMessage, isErrorTypeMatch }: IErrorInfoProps) => {
	return (
		<div className="flex items-center gap-[10px] bg-[var(--bgError)] border border-[var(--red)] py-3 px-4 rounded-lg mt-[2px] w-full">
			<WarningIcon />
			{isErrorTypeMatch ? (
				<p className="fontInterRegular18">
					Некоректний пароль.
					<br />
					Можна використовувати літери{' '}
					<span className="font-bold">лише латинського алфавіту та цифри.</span>
				</p>
			) : (
				<p className="fontInterRegular18">{errorMessage}</p>
			)}
		</div>
	);
};
