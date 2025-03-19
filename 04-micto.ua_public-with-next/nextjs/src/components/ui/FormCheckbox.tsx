'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { ErrorInfo } from './ErrorInfo';

interface IFormCheckboxProps<T extends FieldValues> extends React.ComponentProps<'input'> {
	name: Path<T>;
	label?: string;
	className?: string;
	control: Control<T>;
}
export const FormCheckbox = <T extends FieldValues>({
	name,
	label,
	control,
	className,
}: IFormCheckboxProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div className="w-full">
					<div className="flex gap-2 items-start w-full">
						<Checkbox
							checked={field.value}
							onCheckedChange={field.onChange}
							id={name}
							className={className}
						/>
						<label htmlFor={name} className="fontInterRegular16 text-[var(--gray3)]">
							{label}
						</label>
					</div>
					{error && <ErrorInfo errorMessage={error.message}></ErrorInfo>}
				</div>
			)}
		/>
	);
};
