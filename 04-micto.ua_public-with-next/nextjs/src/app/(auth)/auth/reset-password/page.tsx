'use client';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import schema from '@/schemas/ResetPasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPassword } from '@/app/actions';
import { useState } from 'react';
import Image from 'next/image';

type FormDataSchema = yup.InferType<typeof schema>;

export default function ResetPasswordPage() {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
		watch,
		setError,
	} = useForm<FormDataSchema>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
		},
	});
	const [isSend, setIsSend] = useState(false);

	const onSubmit: SubmitHandler<FormDataSchema> = async (formData) => {
		const { email } = formData;
		try {
			const isEmailSend = await resetPassword(email);
			if (isEmailSend) {
				setIsSend(true);
				localStorage.setItem('resetEmail', email);
			}
		} catch (error) {
			setError('email', {
				type: 'server',
				message: error instanceof Error ? error.message : 'Помилка авторизації',
			});
		}
	};
	return (
		<div
			className={`max-w-[630px] w-full mx-auto ${
				isSend ? 'flex flex-col items-center gap-6' : ''
			}`}
		>
			{isSend ? (
				<>
					<Image
						alt="Запит успішно оброблений"
						src="/successfully_email.svg"
						className="sm:w-[410px]"
					/>

					<h1 className="text-[var(--main)] text-center fontUbuntuBold25 sm:fontInterBold45">
						Лист надісланий!
					</h1>

					<div className="text-center max-sm:text-base w-full fontInterRegular20">
						Щоб відновити пароль, відкрийте лист, який ми вам надіслали на ел. пошту{' '}
						{watch().email}, і натисніть в ньому на кнопку “Відновити пароль”.
					</div>
				</>
			) : (
				<>
					<h1 className="fontUbuntuBold25 text-[var(--main)] text-center mb-6 sm:fontInterBold45">
						Забули пароль ?
					</h1>
					<p className="fontInterRegular18 max-sm:text-base text-[var(--gray4)] text-center mb-10">
						На цей e-mail ми відправимо лист із інструкцією по відновленню паролю.
					</p>
					<form
						className="sm:shadow-auth sm:bg-white sm:p-6 flex flex-col items-center gap-6 w-full sm:rounded-lg"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<FormInput
							type="email"
							label="E-mail"
							name="email"
							placeholder="Вкажіть вашу пошту"
							control={control}
						/>
						<Button
							disabled={isSubmitting}
							className="sm:w-[306px] w-[265px] max-sm:h-[44px] mt-4"
						>
							Увійти
						</Button>
					</form>
				</>
			)}
		</div>
	);
}
