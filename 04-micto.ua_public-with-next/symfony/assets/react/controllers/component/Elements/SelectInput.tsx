import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectContent,
	SelectLabel,
	SelectItem,
} from '@/components/ui/select';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface IPropsSelectInput {
	label: string;
	placeholder?: string;
	className?: string;
	value?: string;
	onChange?: (...event: any[]) => void;
	options?: { id: number; name: string }[];
}

const SelectInput: React.FC<IPropsSelectInput> = ({
	label,
	placeholder,
	className,
	value,
	onChange,
	options = [
		{ id: 1, name: 'test' },
		{ id: 2, name: 'test2' },
		{ id: 3, name: 'test3' },
	],
}) => {
	return (
		<div className={cn('flex flex-col items-start gap-1', className)}>
			<Label className="fontRegular2 text-[var(--color10)]">{label}</Label>
			<Select onValueChange={onChange}>
				<SelectTrigger
					icon={true}
					className="w-full shadow-none mt-1 h-[44px] rounded-[var(--default-round)] text-[var(--gray2)] fontRegular2 "
					value={value}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{options.map((option) => (
							<SelectItem key={option.id} value={option.id.toString()}>
								{option.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	className?: string;
	options?: { id: number; name: string }[];
};

export const SelectControllerInput = <T extends FieldValues>({
	name,
	control,
	...rest
}: Props<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<SelectInput
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

export default SelectInput;
