'use client';
import { registerUser } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { FormCheckbox } from '@/components/ui/FormCheckbox';
import { FormInput } from '@/components/ui/FormInput';
import { ReCaptcha } from '@/components/ui/ReCaptcha';
import schema, { FormDataSchema } from '@/schemas/RegisterUserSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export default function RegistrationUserPage() {
	const [isSend, setIsSend] = useState(false);
	const form = useForm<FormDataSchema>({
		resolver: yupResolver(schema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			recaptcha: false,
			acceptTerms: false,
		},
	});
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = form;
	const onSubmit: SubmitHandler<FormDataSchema> = async (data) => {
		const { firstName, lastName, email, password, confirmPassword } = data;
		try {
			const isRegister = await registerUser(
				firstName,
				lastName,
				email,
				password,
				confirmPassword
			);
			if (isRegister) {
				setIsSend(true);
			}
		} catch (error) {
			console.log('error:', error);
		}
	};
	return (
		<div className="max-w-[630px] w-full mx-auto">
			{isSend ? (
				<>
					<h1 className="fontUbuntuBold25 text-center sm:fontInterBold45 text-[var(--main)] mb-10">
						Дякуємо!
					</h1>
					<Image src="/success-registration-pic.svg" alt="MICTO.UA" className="mb-6" />
					<p className="fontUbuntuRegular20 text-center">
						Перевірте пошту для завершення реєстрації
					</p>
				</>
			) : (
				<>
					<h1 className="fontUbuntuBold25 text-center sm:fontInterBold45 text-[var(--main)] mb-10">
						Реєстрація пацієнта
					</h1>
					<FormProvider {...form}>
						<form
							className="sm:shadow-auth sm:bg-white sm:p-6 flex flex-col items-center gap-6 w-full sm:rounded-lg"
							noValidate
							onSubmit={handleSubmit(onSubmit)}
						>
							<FormInput
								control={control}
								name="lastName"
								label="Прізвище"
								type="text"
								placeholder="Вкажіть ваше прізвище"
							/>
							<FormInput
								control={control}
								name="firstName"
								label="Ім'я"
								type="text"
								placeholder="Вкажіть ваше ім'я"
							/>
							<FormInput
								control={control}
								name="email"
								label="E-mail"
								type="text"
								placeholder="Вкажіть ваше пошту"
								helpText="Цей e-mail буде використовуватись для зворотнього зв’язку та авторизації."
							/>
							<FormInput
								control={control}
								name="password"
								label="Пароль"
								type="password"
								placeholder="Створіть пароль"
							/>
							<FormInput
								control={control}
								name="confirmPassword"
								label="Підтвердження паролю"
								type="password"
								placeholder="Повторіть пароль"
							/>
							<ReCaptcha className="mt-4" />
							<Button disabled={isSubmitting} className="mt-4 max-w-[300px] w-full">
								Продовжити
							</Button>
							<FormCheckbox
								control={control}
								name="acceptTerms"
								label="Так, Я погоджуюсь на обробку персональної інформації та з Політикою конфіденційності."
								className="m-1"
							/>
						</form>
					</FormProvider>
				</>
			)}
		</div>
	);
}
