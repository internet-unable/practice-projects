import React from 'react';
import { cn } from '@/lib/utils';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectContent,
	SelectItem,
} from './select';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface IPropsSelectInput {
	label: string;
	placeholder?: string;
	className?: string;
	value?: string;
	onChange?: (...event: any[]) => void;
	options?: { value: number | string; name: string }[];
}

const CustomSelect: React.FC<IPropsSelectInput> = ({
	label,
	placeholder,
	className,
	value,
	onChange,
	options,
}) => {
	return (
		<div className={cn('flex flex-col items-start gap-1', className)}>
			<label className="fontInterRegular18 block">{label}</label>
			<Select onValueChange={onChange}>
				<SelectTrigger
					icon={true}
					className="w-full shadow-none mt-1 h-[44px] rounded-[var(--default-round)] text-[var(--gray2)] fontInterRegular18 "
					value={value}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{options?.map((option) => (
							<SelectItem key={option.value} value={option.value.toString()}>
								{option.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

type FormSelectProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	className?: string;
	options?: { value: number | string; name: string }[];
};

export const FormSelect = <T extends FieldValues>({
	name,
	control,
	...rest
}: FormSelectProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<CustomSelect
					label={rest.label}
					placeholder={rest.placeholder}
					className={rest.className}
					value={value}
					onChange={onChange}
					options={rest.options}
				/>
			)}
		/>
	);
};
