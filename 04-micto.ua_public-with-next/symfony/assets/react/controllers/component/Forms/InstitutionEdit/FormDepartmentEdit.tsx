import React, { useEffect, useState } from 'react';
import Container from '@/controllers/component/Elements/Container';
import AboutInput from '@/controllers/component/Elements/AboutInput';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import CustomInput, { CustomInputControll } from '../../Elements/CustomInput';
import CustomSwitch from '../../Elements/CustomSwitch';
import WeekTime from './components/WeekTime';
import { DELETE_SVG, PLUS_SVG } from '@/components/utils/SVG';
import TimeInput from '../TimeInput';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DayOfWeek, ScheduleItemInput, UnitDepartmentInput } from '@/Types/cabinetTypes';
import useInstitutionUnitForm from '@/hooks/useInstitutionUnitForm';
import schema from '../../../shemas/shemaUnitDepartment';
import * as yup from 'yup';
import CustomButton from '../../Elements/CustomButton';
import { sheduleFormat, weeksName } from '@/components/utils/consts';
import {
	createDepartment,
	fetchDepartmentById,
	updateDepartment,
} from '@/reduxToolkit/slices/unitDepartmentSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchUnitById } from '@/reduxToolkit/slices/institutionUnitSlice';

interface FormDepartmentEditProps {
	createMode?: boolean;
}

export default function FormDepartmentEdit({ createMode }: FormDepartmentEditProps) {
	const { unit, loading: unitLoading } = useAppSelector((state) => state.institutionUnit);

	const { department, loading: departmentLoading } = useAppSelector(
		(state) => state.unitDepartment
	);

	const { institutionId, unitId, departmentId } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [accordionError, setAccordionError] = useState({
		name: false,
		schedule: false,
		// address: false,
		phones: false,
		emails: false,
		headHospital: false,
		chiefPhysician: false,
	});

	type FormDataSchema = yup.InferType<typeof schema>;

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormDataSchema>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: (department?.name as string) || '',
			description: '',
			contacts: {
				phones: [],
				emails: [],
			},
			schedule: [
				{
					dayOfWeek: DayOfWeek.MON,
					isHoliday: false,
					startTime: '00:00',
					endTime: '00:00',
				},
				{
					dayOfWeek: DayOfWeek.TUE,
					isHoliday: false,
					startTime: '00:00',
					endTime: '00:00',
				},
				{
					dayOfWeek: DayOfWeek.WED,
					isHoliday: false,
					startTime: '00:00',
					endTime: '00:00',
				},
				{
					dayOfWeek: DayOfWeek.THU,
					isHoliday: false,
					startTime: '00:00',
					endTime: '00:00',
				},
				{
					dayOfWeek: DayOfWeek.FRI,
					isHoliday: false,
					startTime: '00:00',
					endTime: '00:00',
				},
				{
					dayOfWeek: DayOfWeek.SAT,
					isHoliday: false,
					startTime: '00:00',
					endTime: '00:00',
				},
				{
					dayOfWeek: DayOfWeek.SUN,
					isHoliday: false,
					startTime: '00:00',
					endTime: '00:00',
				},
			],
		},
	});

	const {
		areas,
		districts,
		cities,
		areaId,
		setAreaId,
		districtId,
		setDistrictId,
		isRoundTheClock,
		setIsRoundTheClock,
		isAdditionalActive,
		setIsAdditionalActive,
		isTimeForAllWorkdays,
		setIsTimeForAllWorkdays,
	} = useInstitutionUnitForm(errors);

	const {
		fields: mainFields1,
		append: append1,
		remove: remove1,
	} = useFieldArray({
		control,
		name: 'contacts.phones',
	});

	const {
		fields: mainFields2,
		append: append2,
		remove: remove2,
	} = useFieldArray({
		control,
		name: 'contacts.emails',
	});

	const onSubmit: SubmitHandler<FormDataSchema> = async (data) => {
		const fetchData: UnitDepartmentInput = {
			...data,
			schedule: sheduleFormat(
				data.schedule as ScheduleItemInput[],
				isRoundTheClock,
				isTimeForAllWorkdays,
				isAdditionalActive
			),
			// address: {
			//   address: data.address.address,
			//   zipCode: data.address.zipCode,
			//   cityId: Number(data.address.cityId),
			// },
		};

		if (createMode) {
			try {
				const data = await dispatch(
					createDepartment({ id: Number(unitId), unit: fetchData })
				).unwrap();

				console.log('created');
				console.log(data);

				navigate(
					`/cabinet/institution/${institutionId}/unit/${unitId}/department/${data.data.createUnitDepartment.id}/edit`
				);
			} catch (error) {
				console.log('error create: ', error);
			}
		} else {
			dispatch(updateDepartment({ id: Number(departmentId), unit: fetchData }));
		}
	};

	React.useEffect(() => {
		if (departmentId && !createMode) {
			dispatch(fetchDepartmentById(Number(departmentId)));
		}
	}, []);

	useEffect(() => {
		setAccordionError({
			name: !!errors.name,
			schedule: !!errors.schedule,
			// address: !!errors.address,
			phones: !!errors.contacts?.phones,
			emails: !!errors.contacts?.emails,
			headHospital: false,
			chiefPhysician: false,
		});
	}, [JSON.stringify(errors)]);

	React.useEffect(() => {
		if (!createMode) {
			reset({
				name: (department.name as string) || '',
				description: department.description || '',
				contacts: department.contacts || null,
				schedule: department.schedule ? [...department.schedule] : [],
			});
		}
	}, [department]);

	return (
		<Container className="flex flex-col items-center px-5 mb-20 desktop:max-w-[800px] desktop:m-auto">
			<div className="w-[100%] font-ubuntumedium text-[20px] px-1 font-medium leading-[26px] text-[#000305] my-[24px] desktop:text-center desktop:max-w-[70%] desktop:mx-auto desktop:p-0">
				<div className="font-ubuntumedium text-[20px] font-medium leading-[26px] text-[#000305] mb-6">
					{createMode ? (
						'Cтворити відділення'
					) : departmentLoading ? (
						<>
							<Skeleton className="w-full h-[20px] rounded-[var(--default-round)] mb-3 desktop:mx-auto desktop:max-w-[70%]" />
							<Skeleton className="w-[40%] h-[20px] rounded-[var(--default-round)] desktop:mx-auto" />
						</>
					) : (
						department.name
					)}
				</div>

				<div className="fontRegular2 text-[var(--black)]">
					<span className="min-w-[50%]">
						{!createMode && (
							<>
								{departmentLoading ? (
									<>
										<Skeleton className="inline-flex w-full h-[20px] max-w-[70%] rounded-[var(--default-round)] desktop:mx-auto desktop:max-w-[50%] mt-3" />
									</>
								) : (
									<>
										{department?.unit?.id && (
											<>
												<span className="inline-flex">Підрозділ:</span>
												<Link
													className="text-[var(--color5)] ml-1"
													to={`/cabinet/institution/${institutionId}/unit/${department.unit?.id}/edit`}
												>
													{department?.unit?.name}
												</Link>
											</>
										)}
									</>
								)}
							</>
						)}
					</span>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
				<div className="relative mx-auto w-[205px]">
					<img
						src="/img/cabinet/institution-img.jpg"
						alt="Institution"
						className="rounded-lg"
					/>
					<button
						className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 bg-[var(--color5)] rounded-[var(--default-round)]"
						aria-label="Edit Image"
						onClick={(e) => {
							e.preventDefault();
							return;
						}}
					>
						<img
							src="/img/cabinet/edit-white.svg"
							alt="Edit"
							className="fill-current text-stone-200"
						/>
					</button>
				</div>

				<Accordion type="multiple" className="w-full mt-[20px]">
					<AccordionItem value="item-1">
						<AccordionTrigger
							isError={accordionError?.name}
							className="font-ubuntumedium"
						>
							Назва
						</AccordionTrigger>

						<AccordionContent>
							<div className="flex flex-col gap-[16px]">
								<CustomInputControll
									control={control}
									name="name"
									type="text"
									label="Коротка назва"
									placeholder="Вкажіть назву відділення"
								/>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-2">
						<AccordionTrigger
							isError={accordionError.schedule}
							className="font-ubuntumedium"
						>
							Графік роботи
						</AccordionTrigger>

						<AccordionContent>
							<div className="flex flex-col gap-[16px] desktop:grid desktop:gap-6 desktop:grid-cols-2">
								<div className="flex flex-col p-4 bg-white shadow-cabinet rounded-[7px] desktop:col-span-full overflow-hidden duration-500">
									<CustomSwitch
										label="Цілодобово"
										checked={isAdditionalActive ? false : isRoundTheClock}
										disabled={isAdditionalActive}
										onCheckedChange={setIsRoundTheClock}
										className="mb-4"
									/>

									<CustomSwitch
										label="Вказати час для усіх робочих днів"
										checked={isRoundTheClock ? false : isAdditionalActive}
										disabled={isRoundTheClock}
										onCheckedChange={setIsAdditionalActive}
									/>

									<div
										className="overflow-hidden transition-all duration-500"
										style={{
											maxHeight:
												isAdditionalActive && !isRoundTheClock
													? '64px'
													: '0',
											paddingTop:
												isAdditionalActive && !isRoundTheClock
													? '16px'
													: '0',
											opacity: isAdditionalActive ? 1 : 0,
										}}
									>
										<div className="flex gap-[16px] items-center fontRegular2">
											<div>з</div>

											<TimeInput
												value={isTimeForAllWorkdays.startTime}
												onChange={(value) =>
													setIsTimeForAllWorkdays((prev) => ({
														...prev,
														startTime: value,
													}))
												}
											/>

											<div>до</div>

											<TimeInput
												value={isTimeForAllWorkdays.endTime}
												onChange={(value) =>
													setIsTimeForAllWorkdays((prev) => ({
														...prev,
														endTime: value,
													}))
												}
											/>
										</div>
									</div>
								</div>

								{weeksName.map((weekName, idx) => (
									<WeekTime
										key={weekName}
										isRoundTheClock={isRoundTheClock}
										isAdditionalActive={isAdditionalActive}
										name={`schedule.${idx}`}
										control={control}
										weekDay={weekName}
									/>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>

					{/* <AccordionItem value="item-3">
            <AccordionTrigger
              isError={accordionError.address}
              className="font-ubuntumedium"
            >
              Адреса
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-[16px]">
                <AutocompleteSelect
                  label="Область"
                  placeholder="Наприклад: Київсська область"
                  value={areaId}
                  onChange={setAreaId}
                  options={areas.items}
                  error={
                    Object.keys(errors).length > 0 && !areaId
                      ? { message: "Область обов'язкова" }
                      : undefined
                  }
                />

                <AutocompleteSelect
                  label="Район"
                  placeholder="Наприклад: Київсський район"
                  value={districtId}
                  onChange={setDistrictId}
                  textNotItem={
                    areaId ? "Нічого не знайдено..." : "Виберіть область..."
                  }
                  options={areaId ? districts.items : []}
                  error={
                    Object.keys(errors).length > 0 && !districtId
                      ? { message: "Район обов'язковий" }
                      : undefined
                  }
                />

                <SelectAutoControl
                  control={control}
                  name="address.cityId"
                  label="Місто"
                  placeholder="Наприклад: Київ"
                  textNotItem={
                    districtId ? "Нічого не знайдено..." : "Виберіть район..."
                  }
                  options={
                    areaId
                      ? cities.items.map((item) => ({
                          id: item.id,
                          name: item.name,
                        }))
                      : []
                  }
                />

                <CustomInputControll
                  control={control}
                  name="address.address"
                  type="text"
                  label="Адреса"
                  placeholder="Наприклад: вулиця Васильківська 135"
                />

                <CustomInputControll
                  control={control}
                  name="address.zipCode"
                  type="text"
                  label="Індекс"
                  placeholder="Наприклад: 49000"
                />
              </div>
            </AccordionContent>
          </AccordionItem> */}

					<AccordionItem value="item-4">
						<AccordionTrigger
							isError={accordionError.phones}
							className="font-ubuntumedium"
						>
							Телефон
						</AccordionTrigger>

						<AccordionContent>
							<div className="flex flex-col gap-[32px]">
								{mainFields1.map((field, index) => (
									<div className="flex flex-col gap-[16px]" key={field.id}>
										<CustomInputControll
											control={control}
											name={`contacts.phones.${index}.number`}
											type="text"
											label="Телефон"
											placeholder="+380 95 555 55 55"
										/>

										<CustomInputControll
											control={control}
											name={`contacts.phones.${index}.comment`}
											type="text"
											label="Коментар"
											placeholder="Адміністрація"
										/>

										<div
											className="flex items-center gap-[16px] cursor-pointer"
											onClick={() => remove1(index)}
										>
											<DELETE_SVG />

											<div className="fontMediumRegular text-[#4B5563]">
												Видалити
											</div>
										</div>
									</div>
								))}

								<div
									className="flex items-center gap-[16px] cursor-pointer"
									onClick={() => append1({ number: '', comment: '' })}
								>
									<PLUS_SVG />

									<div className="fontMediumRegular text-[#007DCF] underline underline-offset-4">
										Додати телефон
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-5">
						<AccordionTrigger
							isError={accordionError.emails}
							className="font-ubuntumedium"
						>
							Email
						</AccordionTrigger>

						<AccordionContent>
							<div className="flex flex-col gap-[16px]">
								{mainFields2.map((field, index) => (
									<div className="flex flex-col gap-[16px]" key={field.id}>
										<CustomInputControll
											control={control}
											name={`contacts.emails.${index}.email`}
											type="text"
											label="Email"
											placeholder="example@email.com"
										/>

										<CustomInputControll
											control={control}
											name={`contacts.emails.${index}.comment`}
											type="text"
											label="Коментар"
											placeholder="Адміністрація"
										/>

										<div
											className="flex items-center gap-[16px] cursor-pointer"
											onClick={() => remove2(index)}
										>
											<DELETE_SVG />

											<div className="fontMediumRegular text-[#4B5563]">
												Видалити
											</div>
										</div>
									</div>
								))}

								<div
									className="flex items-center gap-[16px] cursor-pointer"
									onClick={() => append2({ email: '', comment: '' })}
								>
									<PLUS_SVG />

									<div className="fontMediumRegular text-[#007DCF] underline underline-offset-4">
										Додати email
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-6">
						<AccordionTrigger className="font-ubuntumedium">
							Завідувач відділенням
						</AccordionTrigger>

						<AccordionContent>
							<div className="flex flex-col gap-[16px]">
								<CustomInput
									type="text"
									label="Прізвище"
									placeholder="Вкажіть прізвище"
									value=""
								/>

								<CustomInput
									type="text"
									label="Ім’я"
									placeholder="Вкажіть ім’я"
									value=""
								/>

								<CustomInput
									type="text"
									label="По-батькові"
									placeholder="Вкажіть по-батькові"
									value=""
								/>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<AboutInput
					className="mt-[20px] w-full gap-8 px-1"
					label="Про відділення"
					placeholder="Опишіть медзаклад..."
				/>

				<CustomButton
					text="Зберегти"
					type="submit"
					className="mx-auto my-8 w-[265px] h-[44px] bg-[var(--color5)] rounded-[var(--default-round)] font-medium text-[16px] text-white hover:opacity-90"
				/>
			</form>
		</Container>
	);
}
