import React, { useEffect, useState } from 'react';
import Container from '@/controllers/component/Elements/Container';
import AboutInput, { AboutInputControll } from '@/controllers/component/Elements/AboutInput';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import CustomInput, { CustomInputControll } from '../../Elements/CustomInput';
import { CustomAreaControll } from '../../Elements/InputArea';
import CustomSwitch from '../../Elements/CustomSwitch';
import WeekTime from './components/WeekTime';
import { DELETE_SVG, PLUS_SVG } from '@/components/utils/SVG';
import TimeInput from '../TimeInput';
import CustomButton from '../../Elements/CustomButton';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import {
	DayOfWeek,
	getInstitutionUnitResponse,
	InstitutionUnit,
	InstitutionUnitInput,
	ScheduleItemInput,
} from '@/Types/cabinetTypes';
import AutocompleteSelect, { SelectAutoControl } from '../../Elements/AutocompleteSelect';
import { fetchAreas, fetchCities, fetchDistricts } from '@/reduxToolkit/slices/selectsSlice';
import schema from '../../../shemas/schemaInstitutionUnit';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	createUnit,
	defaultInstitutionUnitState,
	fetchUnitById,
	updateUnit,
} from '@/reduxToolkit/slices/institutionUnitSlice';
import { useLocation } from 'react-router-dom';
import { sheduleFormat, weeksName } from '@/components/utils/consts';
import useInstitutionUnitForm from '@/hooks/useInstitutionUnitForm';
import { PayloadAction } from '@reduxjs/toolkit';
import { Skeleton } from '@/components/ui/skeleton';

interface FormInstitutionUnitEditProps {
	createMode?: boolean;
}

export default function FormInstitutionUnitEdit({ createMode }: FormInstitutionUnitEditProps) {
	const { loading: unitLoading, unit } = useAppSelector((state) => state.institutionUnit);
	const dispatch = useAppDispatch();
	const { institutionId, unitId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [accordionError, setAccordionError] = useState({
		name: false,
		schedule: false,
		address: false,
		phones: false,
		emails: false,
		headHospital: false,
		chiefPhysician: false,
	});

	const weeksName = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пятниця', 'Субота', 'Неділя'];

	React.useEffect(() => {
		if (!createMode) {
			dispatch(fetchUnitById(Number(unitId)));
		}
	}, [dispatch, unitId, createMode]);

	React.useEffect(() => {
		if (!createMode) {
			reset({
				name: unit.name || '',
				fullName: unit.fullName || '',
				description: unit.description || '',
				typeId: unit?.type?.id?.toString() || '',
				edrpou: unit.edrpou || '',
				contacts: unit.contacts,
				schedule: unit.schedule ? [...unit.schedule] : [],
				address: {
					address: unit?.address?.address || '',
					zipCode: unit?.address?.zipCode || '',
					cityId: unit?.city?.id?.toString() || '',
				},
			});

			setAreaId(unit?.city?.area?.id.toString());
			setDistrictId(unit?.city?.district?.id.toString());
		}
	}, [unit]);

	type FormDataSchema = yup.InferType<typeof schema>;

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<FormDataSchema>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			fullName: '',
			description: '',
			typeId: '',
			edrpou: '',
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
			address: {
				address: '',
				zipCode: '',
				cityId: '',
			},
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
		const fetchData: InstitutionUnitInput = {
			...data,
			schedule: sheduleFormat(
				data.schedule as ScheduleItemInput[],
				isRoundTheClock,
				isTimeForAllWorkdays,
				isAdditionalActive
			),
			typeId: Number(data.typeId),
			address: {
				address: data.address.address,
				zipCode: data.address.zipCode,
				cityId: Number(data.address.cityId),
			},
		};

		if (createMode) {
			try {
				const data = await dispatch(
					createUnit({ id: Number(institutionId), unit: fetchData })
				).unwrap();

				navigate(
					`/cabinet/institution/${institutionId}/unit/${data.data.createInstitutionUnit.id}/edit`
				);
			} catch (error) {
				console.log('error create: ', error);
			}
		} else {
			dispatch(updateUnit({ id: Number(unitId), unit: fetchData }));
		}
	};

	// TODO: Place in address component
	// Maybe cache result for at least 1h?
	// useEffect(() => {
	//   dispatch(fetchAreas());
	// }, []);

	// useEffect(() => {
	//   if (areaId) dispatch(fetchDistricts({ areaId: Number(areaId) }));
	// }, [areaId]);

	// useEffect(() => {
	//   if (districtId) dispatch(fetchCities({ districtId: Number(districtId) }));
	// }, [districtId]);

	useEffect(() => {
		setAccordionError({
			name: !!errors.name || !!errors.fullName || !!errors.typeId || !!errors.edrpou,
			schedule: !!errors.schedule,
			address: !!errors.address,
			phones: !!errors.contacts?.phones,
			emails: !!errors.contacts?.emails,
			headHospital: false,
			chiefPhysician: false,
		});
	}, [JSON.stringify(errors)]);

	return (
		<Container className="flex flex-col items-center px-5 mb-20 desktop:max-w-[800px] desktop:m-auto">
			<div className="w-[100%] font-ubuntumedium text-[20px] px-1 font-medium leading-[26px] text-[#000305] my-[24px] desktop:text-center desktop:max-w-[70%] desktop:mx-auto desktop:p-0">
				{createMode ? (
					'Cтворити підрозділ'
				) : unitLoading ? (
					<>
						<Skeleton className="w-full h-[20px] rounded-[var(--default-round)] mb-3 desktop:mx-auto desktop:max-w-[70%]" />
						<Skeleton className="w-[40%] h-[20px] rounded-[var(--default-round)] desktop:mx-auto" />
					</>
				) : (
					unit.name
				)}
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
							isError={accordionError.name}
							className="font-ubuntumedium"
						>
							Назва
						</AccordionTrigger>

						<AccordionContent className="desktop:p-6 desktop:bg-white rounded-[var(--default-round)]">
							<div className="flex flex-col gap-[16px]">
								<CustomInputControll
									control={control}
									name="name"
									type="text"
									label="Коротка назва"
									placeholder="Вкажіть коротку назву"
								/>

								<CustomAreaControll
									control={control}
									name="fullName"
									label="Повна назва"
									placeholder="Вкажіть повну назву
                                "
								/>

								<CustomInputControll
									control={control}
									name="typeId"
									type="number"
									label="Тип закладу"
									placeholder="Вкажіть тип закладу"
								/>

								<CustomInputControll
									control={control}
									name="edrpou"
									type="number"
									label="ЄДРПОУ"
									placeholder="Вкажіть ЄДРПОУ"
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
							<div className="flex flex-col gap-[16px] desktop:grid desktop:grid-cols-2">
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

					<AccordionItem value="item-3">
						<AccordionTrigger
							isError={accordionError.address}
							className="font-ubuntumedium"
						>
							Адреса
						</AccordionTrigger>

						<AccordionContent className="desktop:p-6 desktop:bg-white rounded-[var(--default-round)]">
							<div className="flex flex-col gap-[16px]">
								<AutocompleteSelect
									label="Область"
									placeholder="Наприклад: Київсська область"
									value={areaId?.toString()}
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
									value={districtId?.toString()}
									onChange={setDistrictId}
									textNotItem={
										areaId ? 'Нічого не знайдено...' : 'Виберіть область...'
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
										districtId ? 'Нічого не знайдено...' : 'Виберіть район...'
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
					</AccordionItem>

					<AccordionItem value="item-4">
						<AccordionTrigger
							isError={accordionError.phones}
							className="font-ubuntumedium"
						>
							Телефон
						</AccordionTrigger>

						<AccordionContent className="desktop:p-6 desktop:bg-white rounded-[var(--default-round)]">
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

						<AccordionContent className="desktop:p-6 desktop:bg-white rounded-[var(--default-round)]">
							<div className="flex flex-col gap-[32px]">
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
						<AccordionTrigger
							isIcon={true}
							isError={accordionError.headHospital}
							className="font-ubuntumedium"
						>
							Керівник лікарні
						</AccordionTrigger>

						<AccordionContent className="desktop:p-6 desktop:bg-white rounded-[var(--default-round)]">
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

					<AccordionItem value="item-7">
						<AccordionTrigger
							isIcon={true}
							isError={accordionError.chiefPhysician}
							className="font-ubuntumedium"
						>
							Головний лікар
						</AccordionTrigger>

						<AccordionContent className="desktop:p-6 desktop:bg-white rounded-[var(--default-round)]">
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

				<AboutInputControll
					control={control}
					name="description"
					className="mt-[20px] w-full gap-8 px-1"
					label="Про клініку"
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
