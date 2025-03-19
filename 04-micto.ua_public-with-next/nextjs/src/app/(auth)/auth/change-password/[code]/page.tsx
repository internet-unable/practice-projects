'use client';
import { changePassword } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/FormInput';
import schema, { FormDataSchema } from '@/schemas/ChangePasswordAfterResetSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ChangePasswordPage() {
	const params = useParams<{ code: string }>();
	const [email, _] = useState(localStorage.getItem('resetEmail'));
	const [isChanged, setIsChanged] = useState(false);
	// if (code instanceof Array) return null;
	const urlDecoded = decodeURIComponent(params?.code ? params?.code : '');
	const decodedCode = decodeURIComponent(urlDecoded);

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<FormDataSchema>({
		resolver: yupResolver(schema),
		defaultValues: {
			code: decodedCode,
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: FormDataSchema) => {
		const { code, password, confirmPassword } = data;
		try {
			const isChange = await changePassword(code, password, confirmPassword);
			if (isChange) {
				localStorage.removeItem('resetEmail');
				setIsChanged(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={`max-w-[630px] w-full mx-auto ${
				isChanged ? 'flex flex-col items-center gap-6' : ''
			}`}
		>
			{isChanged ? (
				<>
					<h1 className="fontUbuntuBold25 text-[var(--main)] text-center sm:fontInterBold45">
						Все готово !
					</h1>
					<Image src="/success-change-password-pic.svg" alt="MICTO.UA" />
					<p className="fontInterRegular16">Ваш пароль успішно оновлено.</p>
					<Button asChild className="mt-4">
						<Link href="/">До кабінету</Link>
					</Button>
				</>
			) : (
				<>
					<h1 className="fontUbuntuBold25 text-[var(--main)] text-center mb-6 sm:fontInterBold45">
						Забули пароль ?
					</h1>
					<p className="fontInterRegular18 max-sm:text-base text-[var(--gray4)] text-center mb-10">
						Будь ласка, введіть новий пароль для облікового запису {email}
					</p>
					<form
						className="sm:shadow-auth sm:bg-white sm:p-6 flex flex-col items-center gap-6 w-full sm:rounded-lg"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<FormInput
							type="password"
							label="Пароль"
							name="password"
							placeholder="Вкажіть новий пароль"
							control={control}
						/>
						<FormInput
							type="password"
							label="Повторіть пароль"
							name="confirmPassword"
							placeholder="Повторіть пароль"
							control={control}
						/>
						<Button
							disabled={isSubmitting}
							className="sm:w-[306px] w-[265px] max-sm:h-[44px] mt-4"
						>
							Зберегти
						</Button>
					</form>
				</>
			)}
		</div>
	);
}
