import React, { useState } from 'react';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import ErrorInfo from './ErrorInfo';
import { CLOSE_EYE_SVG, OPEN_EYE_SVG } from '@/components/utils/SVG';


interface IPropsCustomInput {
    label?: string;
    placeholder: string;
    className?: string;
    value?: string | number;
    onChange?: (...event: any[]) => void;
    error?: FieldError;
}

const CustomInputPassword: React.FC<IPropsCustomInput> = ({ label, value, placeholder, className, onChange, error }) => {
    const [typePass, setTypePass] = useState<'password' | 'text'>('password');

    return (
        <div className={cn('flex flex-col items-start gap-2 w-full', className)}>
            <Label className='fontRegular2 text-[var(--color10)]' htmlFor={placeholder}>{label}</Label>
            <div className='relative w-full'>
                <Input
                    className={'fontRegular2 text-[var(--color10)] rounded-[var(--default-round)] h-11 autofill:bg-transparent placeholder:text-[var(--gray2)] bg-white' +
                        (!!error ? ' border-[var(--error)] text-[var(--error)] placeholder:text-[var(--error)]' : '')
                    }
                    value={value}
                    id={placeholder}
                    placeholder={placeholder}
                    onChange={onChange}
                    type={typePass}
                />
                <div
                    className='w-[40px] h-[40px] flex items-center justify-center absolute right-[12px] top-1/2 transform -translate-y-1/2 cursor-pointer'
                    onClick={() => setTypePass(prew => prew === 'password' ? 'text' : 'password')}
                >
                    {typePass === 'password' ? (
                        <CLOSE_EYE_SVG />
                    ) : (
                        <OPEN_EYE_SVG />
                    )}
                </div>
            </div>
            {!!error?.message.trim() && <ErrorInfo textError={error.message}/>}
        </div>
    );
};

type Props<T extends FieldValues> = {
    control: Control<T>,
    name: Path<T>;
    label?: string;
    placeholder: string;
    className?: string;
};

export const InputPasswordControll = <T extends FieldValues>({ control, name, ...rest }: Props<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CustomInputPassword
                    label={rest.label}
                    placeholder={rest.placeholder}
                    className={rest.className}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            )}
        />
    )
}

export default CustomInputPassword;