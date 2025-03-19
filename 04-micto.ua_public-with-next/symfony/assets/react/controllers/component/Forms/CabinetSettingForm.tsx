import * as React from "react";
import { useState, useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import Textarea from "./Textarea";
import { useAppDispatch, useAppSelector } from "../../../reduxToolkit/hooks";
import { InstitutionUnit } from "../../../Types/cabinetTypes";

// TODO: get institutionUnit obj
type Props = {};

export default function CabinetSettingForm({}: Props) {
  const dispatch = useAppDispatch();

  const unitState = useAppSelector((state) => state.institutionUnit);

  return <></>;
  // <form
  //   id="settings-form"
  //   className="main"
  //   onSubmit={handleSubmit((data) => {
  //     const unitData = data as InstitutionUnit;
  //     const obj = {
  //       id: institutionUnit.id,
  //       unit: unitData,
  //     };
  //     // updateForm(obj);

  //     // fetch('http://localhost:8080', {
  //     //   method: 'POST',
  //     //   body: formData,
  //     // });
  //   })}
  //   onChange={() => {
  //     setFormData(getValues());
  //   }}
  // >
  //   <Controller
  //     control={control}
  //     name={'type'}
  //     render={({ field: { onChange, value, ref } }) => {
  //       return (
  //         <Input
  //           type={'text'}
  //           id={'type'}
  //           placeholder={'Вкажіть тип закладу'}
  //           label={'Тип закладу'}
  //           customOnChange={(e: any) => {
  //             onChange(e.target.value);
  //           }}
  //         />
  //       );
  //     }}
  //   ></Controller>

  //   <Controller
  //     control={control}
  //     name={'name'}
  //     render={({ field: { onChange, value, ref } }) => {
  //       return (
  //         <Input
  //           type={'text'}
  //           id={'name'}
  //           placeholder={'Вкажіть коротку назву'}
  //           label={'Коротка назва'}
  //           defaultValue={institutionUnit?.institution.name}
  //           customOnChange={(e: any) => {
  //             onChange(e.target.value);
  //           }}
  //         />
  //       );
  //     }}
  //   ></Controller>

  //   <Textarea
  //     register={{ ...register('fullName') }}
  //     id={'fullName'}
  //     placeholder={'Вкажіть повну назву'}
  //     label={'Повна назва'}
  //     defaultValue={institutionUnit?.institution.fullName}
  //   />

  //   <Input type={'submit'} id={'form-sumbit'} />
  // </form>
  // );
}
