'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { CHEVRON_SVG } from '@/components/utils/SVG';
import ErrorInfo from './ErrorInfo';

interface IPropsSelectInput {
	label: string;
	placeholder?: string;
	className?: string;
	value: string;
	onChange: (...event: any[]) => void;
	options?: { id: number; name: string }[];
	textNotItem?: string;
	error?: FieldError | { message: string };
}

const AutocompleteSelect: React.FC<IPropsSelectInput> = ({
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
	textNotItem = 'Нічого не знайдено...',
	error,
}) => {
	const [open, setOpen] = React.useState(false);
	const blockRef = React.useRef<HTMLButtonElement>(null);

	return (
		<div className={cn('flex flex-col items-start gap-2', className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<Label className="fontRegular2 text-[var(--color10)]">{label}</Label>
				<PopoverTrigger asChild>
					<Button
						ref={blockRef}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={
							'w-full shadow-none mt-1 h-[44px] rounded-[var(--default-round)] text-[var(--gray2)] fontRegular2 bg-[white] justify-between hover:bg-[white] hover:text-[var(--gray2)]' +
							(value ? ' text-[var(--color10)] hover:text-[var(--color10)]' : '') +
							(open ? ' border-[var(--color5)]' : '') +
							(!!error
								? ' border-[var(--error)] text-[var(--error)] placeholder:text-[var(--error)]'
								: '')
						}
					>
						{value
							? options.find((option) => option.id.toString() === value)?.name
							: placeholder}
						<CHEVRON_SVG
							className={
								'h-[10px] w-[18px] shrink-0 text-muted-foreground transition-all duration-200' +
								(open ? ' rotate-180' : ' rotate-0')
							}
							color={open ? '#007DCF' : '#D1D5DB'}
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className={`w-[300px] p-0 rounded-[7px]`}
					style={{
						width: `${
							blockRef.current ? blockRef.current.offsetWidth + 'px' : '200px'
						}`,
					}}
				>
					<Command className={`rounded-[7px]`}>
						<CommandInput
							placeholder="Пошук"
							className="h-[44px] border-none p-[16px] fontRegular2"
						/>
						<CommandList>
							<CommandEmpty>{textNotItem}</CommandEmpty>
							<CommandGroup className={`px-0`}>
								{options.map((option) => (
									<CommandItem
										key={option.id}
										value={option.name}
										onSelect={(currentValue) => {
											onChange(option.id.toString());
											setOpen(false);
										}}
										className={`!text-[var(--black)] rounded-[7px] cursor-pointer p-[16px] fontRegular2`}
									>
										{option.name}
										<Check
											className={cn(
												'ml-auto',
												value === option.id.toString()
													? 'opacity-100'
													: 'opacity-0'
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{!!error && <ErrorInfo textError={error.message} />}
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
	textNotItem?: string;
};

export const SelectAutoControl = <T extends FieldValues>({ name, control, ...rest }: Props<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<AutocompleteSelect
					label={rest.label}
					placeholder={rest.placeholder}
					className={rest.className}
					value={value}
					onChange={onChange}
					options={rest.options}
					textNotItem={rest.textNotItem}
					error={error}
				/>
			)}
		/>
	);
};

export default AutocompleteSelect;
