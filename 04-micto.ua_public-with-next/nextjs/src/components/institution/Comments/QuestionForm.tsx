'use client';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorInfo } from '@/components/ui/ErrorInfo';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import monthsArray from '@/constants/months';
import { generateYearRange } from '@/utils/yearRange';
import SetRatingBlock from '@/components/common/SetRatingBlock';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { FormInput } from '@/components/ui/FormInput';

export const schema = yup
	.object({
		email: yup.string().email('Invalid email').required('Email is required'),
		name: yup
			.string()
			.required('Name is required')
			.min(2, 'Mark must be at least 1')
			.max(32, 'Mark cannot exceed 32'),
		phone: yup
			.string()
			.matches(/^\+?\d{10,15}$/, 'Invalid phone number')
			.required('Phone number is required'),
		commentText: yup
			.string()
			.min(5, 'Comment must be at least 5 characters')
			.required('Comment is required'),
		registerUser: yup.boolean().notRequired(),
		password: yup
			.string()
			.test('is-password-required', 'Password is required', function (value) {
				const { registerUser } = this.parent;
				if (registerUser && (!value || value.length < 8)) {
					return this.createError({ message: 'Password must be at least 8 characters' });
				}
				return true;
			}),
		repeatPassword: yup
			.string()
			.test('is-repeat-password-required', 'Repeat password is required', function (value) {
				const { registerUser, password } = this.parent;
				if (registerUser && value !== password) {
					return this.createError({ message: 'Passwords must match' });
				}
				return true;
			}),
	})
	.required();

type FormDataSchema = yup.InferType<typeof schema>;

export default function QuestionForm() {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		setError,
		watch,
		clearErrors,
	} = useForm<FormDataSchema>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			name: '',
			phone: '',
			commentText: '',
			registerUser: false,
			password: '',
			repeatPassword: '',
		},
	});

	const [commentText] = watch(['commentText']);

	const registerUserChecked = watch('registerUser');

	const onSubmit = async (data: any) => {
		console.log(data);
		// const response = await fetch('/api/comments', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(data),
		// });

		// if (!response.ok) {
		// 	console.error('Failed to submit comment');
		// }
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-6 bg-[var(--blue-background)] flex flex-col duration-300 rounded-lg"
		>
			<h3 className="fontUbuntuBold25 mb-6">Задайте Ваше запитання</h3>

			{errors.root && <ErrorInfo errorMessage={errors.root.message} />}

			<FormInput
				type="textarea"
				label="Повідомлення*"
				name="commentText"
				placeholder="Тут Ви можете залишити запитання"
				control={control}
				wrapperClassName="w-full mb-6"
				className="w-full min-h-[170px]"
			/>

			<AnimatePresence>
				{commentText && (
					<motion.div
						initial={{ maxHeight: 0 }}
						animate={{ maxHeight: 500 }}
						exit={{ maxHeight: 0 }}
						transition={{ duration: 0.3 }}
						style={{ overflow: 'hidden' }}
						className="space-y-2"
					>
						<div className="flex flex-col">
							<div className="flex gap-x-[30px] mt-6 ">
								<FormInput
									type="email"
									label="E-mail*"
									name="email"
									placeholder="Вкажіть вашу пошту"
									control={control}
									wrapperClassName="w-[378px]"
									className="bg-white"
									helpText="Цей e-mail буде використовуватись для зворотнього зв’язку та авторизації."
								/>

								<FormInput
									type="text"
									label="Ім’я та прізвище*"
									name="name"
									placeholder="Вкажіть ваше ім’я та прізвище"
									control={control}
									wrapperClassName="w-[378px]"
								/>

								<FormInput
									type="tel"
									label="Телефон*"
									name="phone"
									placeholder="Вкажіть ваше ім’я та прізвище"
									control={control}
									wrapperClassName="w-[378px]"
								/>
							</div>

							<Controller
								name="registerUser"
								control={control}
								render={({ field }) => (
									<label className="flex items-center mt-6 w-fit">
										<input
											type="checkbox"
											checked={field.value ? field.value : false}
											onChange={(event) => {
												field.onChange(event.target.checked);
											}}
											className="hidden"
										/>
										<Checkbox
											checked={field.value ? field.value : false}
											onCheckedChange={(checked: boolean) =>
												field.onChange(checked)
											}
											className="mr-2"
										/>
										<span className="m-0 cursor-pointer fontInterBold18 order-2">
											Зареєструйте мене на MICTO.UA
										</span>
									</label>
								)}
							/>

							<AnimatePresence>
								{registerUserChecked && (
									<motion.div
										initial={{ maxHeight: 0 }}
										animate={{ maxHeight: 164 }}
										exit={{ maxHeight: 0 }}
										transition={{ duration: 0.3 }}
										style={{ overflow: 'hidden' }}
										className="space-y-2"
									>
										<div className="mt-6 flex gap-[30px]">
											<FormInput
												type="password"
												label="Пароль"
												name="password"
												placeholder="Створіть пароль"
												control={control}
												wrapperClassName="w-fit flex-1"
											/>
											<FormInput
												type="password"
												label="Повторіть пароль"
												name="repeatPassword"
												placeholder="Повторіть пароль"
												control={control}
												wrapperClassName="w-fit flex-1"
											/>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							<Button
								disabled={isSubmitting}
								className="sm:w-[306px] w-[265px] max-sm:h-[44px] mx-auto mt-10"
								type="submit"
							>
								Додати питання
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</form>
	);
}
