import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { ErrorInfo } from './ErrorInfo';
import { cn } from '@/lib/utils';
import { Textarea } from './textarea';

interface ICustomTextarea extends React.ComponentProps<'textarea'> {
	label?: string;
	error?: FieldError;
	wrapperClassName?: string;
	onChange?: (...event: any[]) => void;
}

const CustomTextarea = ({
	wrapperClassName,
	placeholder,
	label,
	error,
	value,
	onChange,
}: ICustomTextarea) => {
	return (
		<div className={cn('w-full', wrapperClassName)}>
			<label htmlFor={placeholder} className="fontInterRegular18 mb-2 block">
				{label}
			</label>
			<Textarea
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				id={placeholder}
				className={`${
					error
						? 'text-[var(--red)] border-[var(--red)] placeholder:text-[var(--red)]'
						: ''
				}`}
			/>
			{error && <ErrorInfo errorMessage={error.message} />}
		</div>
	);
};

type FormTextareaProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	placeholder: string;
	wrapperClassName?: string;
};

export const FormTextarea = <T extends FieldValues>({
	control,
	name,
	...rest
}: FormTextareaProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<CustomTextarea
					label={rest.label}
					placeholder={rest.placeholder}
					wrapperClassName={rest.wrapperClassName}
					value={value}
					onChange={onChange}
					error={error}
				/>
			)}
		/>
	);
};
