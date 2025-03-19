import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React from 'react';
import { cn } from '@/lib/utils';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type PropsCheckbox = {
	label: string;
	className?: string;
	classNameLabel?: string;
	value?: boolean;
	checked?: boolean;
	onChange?: (value: boolean) => void;
};

const CustomCheckbox: React.FC<PropsCheckbox> = ({
	label,
	className,
	classNameLabel,
	onChange,
	checked = false,
}) => {
	return (
		<div className={cn('flex items-center gap-[6px]', className)}>
			<Checkbox id={label} checked={checked} onCheckedChange={onChange} />
			<Label htmlFor={label} className={cn('fontRegular2 cursor-pointer', classNameLabel)}>
				{label}
			</Label>
		</div>
	);
};

type Props<T extends FieldValues> = {
	label: string;
	control?: Control<T>;
	name?: Path<T>;
	className?: string;
};

export const CustomCheckboxControll = <T extends FieldValues>({
	control,
	name,
	...rest
}: Props<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange }, fieldState: { error } }) => (
				<CustomCheckbox className={rest.className} label={rest.label} onChange={onChange} />
			)}
		/>
	);
};

export default CustomCheckbox;
