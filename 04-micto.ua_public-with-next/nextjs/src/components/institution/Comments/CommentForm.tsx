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
import { useMutation } from '@apollo/client';

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
		mark: yup
			.number()
			.min(1, 'Mark must be at least 1')
			.max(5, 'Mark cannot exceed 5')
			.required('Mark is required'),
		commentType: yup.string().notRequired(),
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

enum CommentTypeEnum {
	REVIEW,
	QUESTION,
	COMPLAINT,
	GRATIDUTE,
}

const commentTypes: Record<CommentTypeEnum, { id: number; label: string }> = {
	[CommentTypeEnum.REVIEW]: { id: CommentTypeEnum.REVIEW, label: 'Відгук' },
	[CommentTypeEnum.QUESTION]: { id: CommentTypeEnum.QUESTION, label: 'Питання' },
	[CommentTypeEnum.COMPLAINT]: { id: CommentTypeEnum.COMPLAINT, label: 'Скарга' },
	[CommentTypeEnum.GRATIDUTE]: { id: CommentTypeEnum.GRATIDUTE, label: 'Подяка' },
};

export default function CommentForm() {
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
			mark: 0,
			registerUser: false,
			password: '',
			repeatPassword: '',
		},
	});

	const [createComment, { data, loading, error }] = useMutation();

	const ratingSelected = watch('mark');
	const [commentType, commentText] = watch(['commentType', 'commentText']);

	const registerUserChecked = watch('registerUser');

	const onSubmit = async (data: any) => {
		console.log(data);

	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-6 bg-[var(--blue-background)] flex flex-col duration-300 rounded-lg"
		>
			<h3 className="fontUbuntuBold25 mb-6">Оцініть цей медзаклад</h3>

			{errors.root && <ErrorInfo errorMessage={errors.root.message} />}

			<div className="flex flex-wrap gap-4 max-w-[290px]">
				<SetRatingBlock control={control} name="mark" />
			</div>

			<AnimatePresence>
				{ratingSelected && (
					<motion.div
						initial={{ maxHeight: 0 }}
						animate={{ maxHeight: 500 }}
						exit={{ maxHeight: 0 }}
						transition={{ duration: 0.3 }}
						style={{ overflow: 'hidden' }}
						className="space-y-2"
					>
						<span className="w-full fontUbuntuBold25 mb-6 mt-10 block">
							Напишіть ваш відгук
						</span>

						<div className="flex gap-x-10">
							<div className="flex flex-wrap max-w-[260px] gap-4 mb-6">
								<span className="w-full fontInterMedium18">
									Коли Ви відвідували заклад ?
								</span>

								<Select onValueChange={() => {}}>
									<SelectTrigger
										icon={true}
										color="#d1d5db"
										width={18}
										height={10}
										className="w-fit bg-white min-w-[120px] shadow-none mt-1 h-[44px] rounded-[var(--default-round)] text-[var(--gray2)] fontRegular2 "
									>
										<SelectValue placeholder={'Місяць'} />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{monthsArray.map((month) => (
												<SelectItem
													key={month.id}
													value={month.id.toString()}
												>
													{month.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								<Select onValueChange={() => {}}>
									<SelectTrigger
										icon={true}
										color="#d1d5db"
										width={18}
										height={10}
										className="w-fit bg-white min-w-[120px] shadow-none mt-1 h-[44px] rounded-[var(--default-round)] text-[var(--gray2)] fontRegular2 "
									>
										<SelectValue placeholder={'Рік'} />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{generateYearRange().map((year) => (
												<SelectItem
													key={year.value}
													value={year.value.toString()}
												>
													{year.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="flex flex-wrap gap-4 mb-6 max-w-[260px]">
								<span className="w-full fontInterMedium18">Тема відгуку :</span>

								<Controller
									name="commentType"
									control={control}
									render={({ field }) => (
										<Select
											onValueChange={(newValue) => {
												field.onChange(newValue);
											}}
										>
											<SelectTrigger
												icon={true}
												color="#d1d5db"
												width={18}
												height={10}
												className="w-fit bg-white min-w-[260px] shadow-none mt-1 h-[44px] rounded-[var(--default-round)] text-[var(--gray2)] fontRegular2 "
											>
												<SelectValue
													placeholder={
														field.value
															? Object.values(commentTypes).find(
																	(el) =>
																		el.id.toString() ===
																		field?.value
															  )?.label
															: 'Не обрано'
													}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{Object.values(commentTypes).map((type) => (
														<SelectItem
															key={type.id}
															value={type.id.toString()}
														>
															{type.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
							</div>
						</div>

						<FormInput
							type="textarea"
							label="Повідомлення*"
							name="commentText"
							placeholder="Тут Ви можете залишити коментар до заявки"
							control={control}
							wrapperClassName="w-full mb-6"
							className="w-full min-h-[170px]"
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{commentType && commentText && (
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
								Додати відгук
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</form>
	);
}
