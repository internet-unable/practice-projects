import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { InputPasswordControll } from "../Elements/CustomInputPassword";
import * as yup from "yup";
import schema from "@/controllers/shemas/shemaChangePass";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../Elements/CustomButton";
import { useAppDispatch, useAppSelector } from "@/reduxToolkit/hooks";
import { updatePassword } from "@/reduxToolkit/slices/userSlice";
import { UserPasswordInput } from "@/Types/cabinetTypes";
import { Link } from "react-router-dom";

const ChangePassForm = () => {
  const { isUpdatePass, errors } = useAppSelector(state => state.user.password)
  const dispatch = useAppDispatch();
  const [ isSuccessEdit, setIsSuccessEdit] = useState(false);

  type FormDataSchema = yup.InferType<typeof schema>;

  const { handleSubmit, control, formState: { errors: errorsForm }, setError, watch } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit: SubmitHandler<FormDataSchema> = async (data) => {
    try {
      const dataFetch = await dispatch(updatePassword({pass: data as UserPasswordInput})).unwrap();

      if (dataFetch.data) {
        setIsSuccessEdit(true);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    if (errors.length) {
      setError('oldPassword', { type: 'manual', message: errors[0].message });
    }
  }, [errors]);

  const ifUpperText = /[A-Z]/.test(watch().password);
  const ifNumSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(watch().password);
  const ifTextLenght = watch().password.length >= 6 && watch().password.length <= 16;

  return (
    <>
      {isSuccessEdit ? (
        <div className="flex flex-col items-center gap-[24px]">
          <img src="/img/cabinet/successfully_pass.svg" className="desktop:w-[556px]"/>

          <h1 className="text-[var(--color5)] text-center fontUbuntu25Bold desktop:fontInter45Bold">
            Пароль був успішно змінений!
          </h1>

          <Link to='/cabinet' className="w-full">
            <CustomButton
              text="Повернутись"
              type="button"
              className="mx-auto mt-[16px] w-[265px] h-[44px] bg-[var(--color5)] rounded-[var(--default-round)] font-medium text-[16px] text-white hover:opacity-90"
            />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[40px]">
          <h1 className="text-[var(--color5)] text-center fontUbuntu25Bold desktop:w-full desktop:fontInter45Bold">
            Змінити пароль
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px] w-full desktop:bg-[var(--white)] desktop:p-[24px] desktop:rounded-[7px] desktop:shadow-cabinet-desktop">
            <InputPasswordControll
              control={control}
              name='oldPassword'
              label='Старий пароль'
              placeholder='Вкажіть старий пароль'
            />

            <div>
              <InputPasswordControll
                control={control}
                name='password'
                label='Новий пароль'
                placeholder='Вкажіть новий пароль'
              />

              <div className="mt-4 flex flex-col gap-8px">
                <div 
                  className={`${ifTextLenght ? 'text-[var(--success2)]' : 'text-[var(--gray4)]'} ${!!Object.keys(errorsForm).length && !ifTextLenght ? '!text-[var(--error)]' : ''}`}
                >
                  Від 6 до 16 символів
                </div>
                <div 
                  className={`${ifUpperText ? 'text-[var(--success2)]' : 'text-[var(--gray4)]'} ${!!Object.keys(errorsForm).length && !ifUpperText ? '!text-[var(--error)]' : ''}`}
                >
                  Мінімум 1 велика латинська літера
                </div>
                <div 
                  className={`${ifNumSymbol ? 'text-[var(--success2)]' : 'text-[var(--gray4)]'} ${!!Object.keys(errorsForm).length && !ifNumSymbol ? '!text-[var(--error)]' : ''}`}
                >
                  Мініумум 1 цифра або спецсимвол
                </div>
              </div>
            </div>

            <InputPasswordControll
              control={control}
              name='confirmPassword'
              label='Повторити новий пароль'
              placeholder='Повторіть новий пароль'
            />

            <CustomButton
              text="Змінити пароль"
              type="submit"
              className="mx-auto mt-[16px] w-[265px] h-[44px] bg-[var(--color5)] rounded-[var(--default-round)] font-medium text-[16px] text-white hover:opacity-90 desktop:w-[306px] desktop:w-[306px] desktop:py-[11.5px] desktop:fontMediumRegular"
              isLoading={isUpdatePass}
            />
          </form>
        </div>
      )}
    </>
  )
};

export default ChangePassForm;