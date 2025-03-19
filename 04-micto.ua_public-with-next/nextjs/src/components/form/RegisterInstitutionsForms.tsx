'use client';

import {
	firstStepSchema,
	FirstStepSchema,
	secondStepSchema,
	SecondStepSchema,
	thirdStepSchema,
	ThirdStepSchema,
} from '@/schemas/RegisterInstitutionSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormTextarea } from '../ui/FormTextarea';
import { FormInput } from '../ui/FormInput';
import { Button } from '../ui/button';
import { FormCheckbox } from '../ui/FormCheckbox';
import { ReCaptcha } from '../ui/ReCaptcha';
import { FormSelect } from '../ui/FormSelect';
import {
	registerInstitutionStep1,
	registerInstitutionStep2,
	registerInstitutionStep3,
} from '@/app/actions';
import { isRegisterError } from '@/types/RegisterIntsitutionStep2Error';

interface IFirstStepProps {
	setFirstStepData: (data: FirstStepSchema) => void;
	firstStepData: FirstStepSchema;
	setTab: (tab: number) => void;
}
export const FirstStep = ({ setFirstStepData, setTab, firstStepData }: IFirstStepProps) => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<FirstStepSchema>({
		resolver: yupResolver(firstStepSchema),
		defaultValues: {
			name: firstStepData.name || '',
			type: firstStepData.type || '',
			edrpou: firstStepData.edrpou || '',
			description: firstStepData.description || '',
		},
	});
	const onSubmit: SubmitHandler<FirstStepSchema> = async (data) => {
		const isRegister = await registerInstitutionStep1(data);
		if (isRegister) {
			setFirstStepData(data);
			setTab(2);
		}
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="sm:shadow-auth sm:bg-white sm:p-6 flex flex-col items-center gap-6 w-full sm:rounded-lg"
			noValidate
		>
			<FormTextarea
				control={control}
				name="name"
				label="Повна назва"
				placeholder="Вкажіть повну назву"
			/>
			<FormSelect
				control={control}
				name="type"
				className=" w-full"
				label="Тип власності"
				placeholder="Не обрано"
				options={[
					{
						value: 'STATE',
						name: 'Державна',
					},
					{
						value: 'PRIVATE',
						name: 'Приватна',
					},
					{
						value: 'COLLECTIVE',
						name: 'Комунальна',
					},
				]}
			/>
			<FormInput
				control={control}
				name="edrpou"
				type="text"
				label="Код ЄДРПОУ"
				placeholder="Вкажіть код медзакладу"
			/>
			<FormTextarea
				control={control}
				name="description"
				label="Про медзаклад"
				placeholder="Розкажіть про ваш медзаклад та його спеціалізацію.."
			/>
			<Button className="sm:w-[306px] w-[265px] max-sm:h-[44px] mt-4" disabled={isSubmitting}>
				Продовжити
			</Button>
		</form>
	);
};
interface ISecondStepProps {
	setSecondStepData: (data: SecondStepSchema) => void;
	secondStepData: SecondStepSchema;
	setTab: (tab: number) => void;
}

export const SecondStep = ({ setSecondStepData, setTab, secondStepData }: ISecondStepProps) => {
	const {
		handleSubmit,
		control,
		setError,
		formState: { isSubmitting },
	} = useForm<SecondStepSchema>({
		resolver: yupResolver(secondStepSchema),
		defaultValues: {
			firstName: secondStepData.firstName || '',
			lastName: secondStepData.lastName || '',
			email: secondStepData.email || '',
			phone: secondStepData.phone || '',
			position: secondStepData.position || '',
		},
	});
	const onSubmit: SubmitHandler<SecondStepSchema> = async (data) => {
		const result = await registerInstitutionStep2(data);

		if (isRegisterError(result)) {
			setError('phone', result.errors.phone || {});
			setError('email', result.errors.email || {});
			setError('root', result.errors.root || {});
		} else {
			setSecondStepData(data);
			setTab(3);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="sm:shadow-auth sm:bg-white sm:p-6 flex flex-col items-center gap-6 w-full sm:rounded-lg"
			noValidate
		>
			<FormInput
				control={control}
				name="firstName"
				type="text"
				label="Ім’я*"
				placeholder="Вкажіть ваше ім’я"
			/>
			<FormInput
				control={control}
				name="lastName"
				type="text"
				label="Прізвище*"
				placeholder="Вкажіть ваше прізвище"
			/>
			<FormInput
				control={control}
				name="phone"
				type="text"
				label="Робочий телефон*"
				placeholder="Вкажіть ваш робочий телефон"
			/>
			<FormInput
				control={control}
				name="email"
				type="text"
				label="E-mail*"
				placeholder="Вкажіть вашу пошту"
				helpText="Цей e-mail буде використовуватись для зворотнього зв’язку та авторизації."
			/>
			<FormInput
				control={control}
				name="position"
				type="text"
				label="Посада"
				placeholder="Вкажіть вашу посаду"
			/>
			<Button className="sm:w-[306px] w-[265px] max-sm:h-[44px] mt-4" disabled={isSubmitting}>
				Продовжити
			</Button>
		</form>
	);
};

export const ThirdStep = ({ setIsRegister }: { setIsRegister: (isRegister: boolean) => void }) => {
	const form = useForm<ThirdStepSchema>({
		resolver: yupResolver(thirdStepSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
			recaptcha: false,
			agreeTerms: false,
		},
	});
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = form;
	const onSubmit: SubmitHandler<ThirdStepSchema> = async (data) => {
		const isRegister = await registerInstitutionStep3(data);
		if (isRegister) {
			setIsRegister(true);
		}
	};
	return (
		<FormProvider {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="sm:shadow-auth sm:bg-white sm:p-6 flex flex-col items-center gap-6 w-full sm:rounded-lg"
				noValidate
			>
				<FormInput
					control={control}
					type="password"
					name="password"
					label="Пароль"
					placeholder="Створіть пароль"
				/>
				<FormInput
					control={control}
					type="password"
					name="confirmPassword"
					label="Повторіть пароль"
					placeholder="Повторіть пароль"
				/>
				<ReCaptcha />
				<Button
					className="sm:w-[306px] w-[265px] max-sm:h-[44px] mt-4"
					disabled={isSubmitting}
				>
					Надіслати
				</Button>
				<FormCheckbox
					control={control}
					name="agreeTerms"
					label="Так, Я погоджуюсь на обробку персональної інформації та з Політикою конфіденційності."
					className="m-1"
				/>
			</form>
		</FormProvider>
	);
};
