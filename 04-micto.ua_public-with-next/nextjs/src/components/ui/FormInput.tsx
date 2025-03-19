'use client';
import { useState } from 'react';
import { Input } from './input';
import { CloseEyeIcon, OpenEyeIcon } from '../icons/EyeIcons';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ErrorInfo } from './ErrorInfo';
import { Textarea } from './textarea';

interface ICustomInput extends React.ComponentProps<'input'> {
	inputName: string;
	label?: string;
	labelClassName?: string;
	error?: FieldError;
	wrapperClassName?: string;
	className?: string;
	helpText?: string;
	onChange: (...value: any) => void;
}

const InputForForm = ({
	inputName,
	type,
	label,
	labelClassName,
	placeholder,
	error,
	wrapperClassName,
	className,
	helpText,
	onChange,
	value,
}: ICustomInput) => {
	const [inputType, setInputType] = useState(type);

	return (
		<div className={cn('w-full', wrapperClassName)}>
			<label
				className={cn('fontInterRegular18 mb-2 block w-fit', labelClassName)}
				htmlFor={inputName}
			>
				{label}
			</label>
			{(() => {
				switch (type) {
					case 'textarea':
						return (
							<Textarea
								className={cn(
									`${
										error
											? 'text-[var(--red)] border-[var(--red)] placeholder:text-[var(--red)]'
											: ''
									}`,
									'resize-none',
									className
								)}
								name={inputName}
								id={inputName}
								placeholder={placeholder}
								onChange={(e) => {
									e.preventDefault();
									onChange(e.currentTarget.value);
								}}
								value={value}
							/>
						);
					case 'password':
						return (
							<div className="relative">
								<Input
									type={inputType}
									className={cn(
										`${
											error
												? 'text-[var(--red)] border-[var(--red)] placeholder:text-[var(--red)]'
												: ''
										}`,
										className
									)}
									placeholder={placeholder}
									onChange={(e) => {
										e.preventDefault();
										onChange(e.currentTarget.value);
									}}
									value={value}
									name={inputName}
									id={inputName}
								/>
								{/* todo: fix eye icon */}
								<button
									className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-4 flex items-center justify-center"
									type="button"
									onClick={() =>
										setInputType(inputType === 'password' ? 'text' : 'password')
									}
								>
									{inputType === 'password' ? <OpenEyeIcon /> : <CloseEyeIcon />}
								</button>
							</div>
						);
					default:
						return (
							<Input
								type={type}
								className={cn(
									`${
										error
											? 'text-[var(--red)] border-[var(--red)] placeholder:text-[var(--red)]'
											: ''
									}`,
									className
								)}
								name={inputName}
								placeholder={placeholder}
								onChange={(e) => {
									e.preventDefault();
									onChange(e.currentTarget.value);
								}}
								value={value}
								id={inputName}
							/>
						);
				}
			})()}
			{error && <ErrorInfo errorMessage={error.message} />}
			{helpText && (
				<div className="text-muted-foreground fontInterRegular14 mt-[2px]">{helpText}</div>
			)}
		</div>
	);
};

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	labelClassName?: string;
	placeholder: string;
	type: React.HTMLInputTypeAttribute;
	className?: string;
	wrapperClassName?: string;
	helpText?: string;
};
export const FormInput = <T extends FieldValues>({ control, name, ...rest }: Props<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<InputForForm
					inputName={name}
					label={rest.label}
					labelClassName={rest.labelClassName}
					placeholder={rest.placeholder}
					type={rest.type}
					wrapperClassName={rest.wrapperClassName}
					className={rest.className}
					value={value}
					onChange={onChange}
					error={error}
					helpText={rest.helpText}
				/>
			)}
		/>
	);
};
