'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import schema from '@/schemas/LoginSchema';
import { FormInput } from '@/components/ui/FormInput';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { Login } from '@/app/actions';
import { ErrorInfo } from '@/components/ui/ErrorInfo';
import Link from 'next/link';
import { ReCaptcha } from '@/components/ui/ReCaptcha';

type FormDataSchema = yup.InferType<typeof schema>;
export default function LoginPage() {
	const form = useForm<FormDataSchema>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: '',
			recaptcha: false,
		},
	});
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		setError,
		watch,
		clearErrors,
	} = form;
	useEffect(() => {
		const subscription = watch(() => {
			if (errors.root) {
				clearErrors('root');
			}
		});
		return () => subscription.unsubscribe();
	}, [errors.root, clearErrors, watch]);

	const onSubmit: SubmitHandler<FormDataSchema> = async (formData) => {
		const { email, password } = formData;
		try {
			await Login(email, password);
		} catch (error) {
			setError('root', {
				type: 'server',
				message: error instanceof Error ? error.message : 'Помилка авторизації',
			});
		}
	};
	return (
		<div className="max-w-[630px] w-full mx-auto">
			<h1 className="fontUbuntuBold25 text-[var(--main)] text-center mb-10 sm:fontInterBold45">
				Авторизуйтесь
			</h1>
			<FormProvider {...form}>
				<form
					className="sm:shadow-auth sm:bg-white sm:p-6 flex flex-col items-center gap-6 w-full sm:rounded-lg"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					{errors.root && <ErrorInfo errorMessage={errors.root.message} />}
					<FormInput
						type="email"
						label="E-mail"
						name="email"
						placeholder="Вкажіть вашу пошту"
						control={control}
					/>
					<FormInput
						type="password"
						label="Пароль"
						name="password"
						placeholder="Вкажіть ваш пароль"
						control={control}
					/>

					<ReCaptcha className="max-sm:mt-4" />
					<Button
						disabled={isSubmitting}
						className="sm:w-[306px] w-[265px] max-sm:h-[44px] mt-4"
					>
						Увійти
					</Button>
					<Link
						href="/auth/reset-password"
						className="fontInterMedium18 text-[var(--gray3)] transition-colors hover:text-[var(--main)]"
					>
						Забули пароль?
					</Link>
				</form>
			</FormProvider>
		</div>
	);
}
