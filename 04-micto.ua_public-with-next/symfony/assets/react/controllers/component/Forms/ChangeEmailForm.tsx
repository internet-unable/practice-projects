import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { InputPasswordControll } from '../Elements/CustomInputPassword';
import * as yup from 'yup';
import schema from '@/controllers/shemas/shemaChangeEmail';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '../Elements/CustomButton';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { updateEmail } from '@/reduxToolkit/slices/userSlice';
import { UserEmailInput } from '@/Types/cabinetTypes';
import { CustomInputControll } from '../Elements/CustomInput';

const ChangeEmailForm = () => {
	const { isUpdateEmail, errors } = useAppSelector((state) => state.user.email);
	const dispatch = useAppDispatch();
	const [isSuccessEdit, setIsSuccessEdit] = useState(false);

	type FormDataSchema = yup.InferType<typeof schema>;

	const { handleSubmit, control, setError, watch } = useForm<FormDataSchema>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FormDataSchema> = async (data) => {
		try {
			const dataFetch = await dispatch(
				updateEmail({ payload: data as UserEmailInput })
			).unwrap();

			if (dataFetch.data) {
				setIsSuccessEdit(true);
			}
		} catch (error) {
			console.log('error:', error);
		}
	};

	useEffect(() => {
		if (errors.length && errors[0].extensions.field === 'password') {
			setError('password', { type: 'manual', message: errors[0].message });
		} else if (errors.length && errors[0].extensions.field === 'email') {
			setError('email', { type: 'manual', message: errors[0].message });
		}
	}, [errors]);

	return (
		<>
			{isSuccessEdit ? (
				<div className="flex flex-col items-center gap-[24px]">
					<img src="/img/cabinet/successfully_email.svg" className="desktop:w-[410px]" />

					<h1 className="text-[var(--color5)] text-center fontUbuntu25Bold desktop:fontInter45Bold">
						Лист надісланий!
					</h1>

					<div className="text-center fontRegular2 text-[var(--black)] w-[335px] desktop:fontInterTitle">
						Щоб змінити пошту , відкрийте лист, який ми вам надіслали на новий e-mail{' '}
						{watch().email}, і натисніть в ньому на кнопку “Змінити e-mail”.
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center gap-[40px]">
					<div className="flex flex-col items-center gap-[24px]">
						<h1 className="text-[var(--color5)] text-center fontUbuntu25Bold w-[240px] desktop:w-full desktop:fontInter45Bold">
							Змінити e-mail для логіну
						</h1>

						<div className="text-center fontRegular2 text-[var(--gray4)] w-[285px] desktop:w-full desktop:fontMediumRegular">
							Посилання для підтвердження зміни пошти буде надіслано на новий e-mail.
						</div>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-[24px] w-full desktop:bg-[var(--white)] desktop:p-[24px] desktop:rounded-[7px] desktop:shadow-cabinet-desktop"
					>
						<CustomInputControll
							control={control}
							type="text"
							name="email"
							label="Новий e-mail"
							placeholder="Вкажіть нову пошту"
						/>

						<InputPasswordControll
							control={control}
							name="password"
							label="Пароль"
							placeholder="Вкажіть пароль"
						/>

						<CustomButton
							text="Змінити e-mail"
							type="submit"
							className="mx-auto mt-[16px] w-[265px] h-[44px] bg-[var(--color5)] rounded-[var(--default-round)] font-medium text-[16px] text-white hover:opacity-90 desktop:w-[306px] desktop:w-[306px] desktop:py-[11.5px] desktop:fontMediumRegular"
							isLoading={isUpdateEmail}
						/>
					</form>
				</div>
			)}
		</>
	);
};

export default ChangeEmailForm;
