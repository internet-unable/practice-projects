'use client';

import { FirstStep, SecondStep, ThirdStep } from '@/components/form/RegisterInstitutionsForms';
import { Button } from '@/components/ui/button';
import { FirstStepSchema, SecondStepSchema } from '@/schemas/RegisterInstitutionSchemas';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
export default function RegistrationInsitutionPage() {
	const [firstStepData, setFirstStepData] = useState<FirstStepSchema>({
		name: '',
		type: '',
		edrpou: '',
		description: '',
	});
	const [secondStepData, setSecondStepData] = useState<SecondStepSchema>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		position: '',
	});
	const [isRegister, setIsRegister] = useState(false);

	const [tab, setTab] = useState(1);
	return (
		<>
			{isRegister ? (
				<div className="max-w-[415px] w-full mx-auto">
					<h1 className="fontUbuntuBold25 text-[var(--main)] text-center mb-10 sm:fontInterBold45">
						Дякуємо
					</h1>
					<div className="flex flex-col-reverse gap-6 sm:flex-col sm:gap-4 mb-10">
						<Image src="/success-registration-pic.svg" alt="MICTO.UA" />
						<p className="fontUbuntuRegular20 text-center ">
							Заявка на розгляді.
							<br /> Ми зв’яжемось з вами за потреби.
						</p>
					</div>
					<Button asChild className="w-full">
						<Link href="/">До кабінету</Link>
					</Button>
				</div>
			) : (
				<div className="max-w-[630px] w-full mx-auto">
					<h1 className="fontUbuntuBold25 text-[var(--main)] text-center mb-6 sm:fontInterBold30">
						Реєстрація медзакладу
					</h1>
					<p className="fontInterRegular14 text-center text-[var(--gray4)] mb-4 sm:text-lg">
						{tab === 1 && 'Інформація про медзаклад'}
						{tab === 2 &&
							'Завдяки цим даним, ми зможемо надати Вам зворотній зв’язок для надання доступу до усіх функцій сайту'}
						{tab === 3 && 'Контакти для зворотнього зв’язку з MICTO'}
					</p>
					<div className="flex items-center justify-center space-x-4 relative mb-10">
						<StepButton step={1} currentStep={tab} goToStep={setTab} />
						<StepButton step={2} currentStep={tab} goToStep={setTab} />
						<StepButton step={3} currentStep={tab} goToStep={setTab} />
					</div>
					{tab === 1 && (
						<FirstStep
							firstStepData={firstStepData}
							setFirstStepData={setFirstStepData}
							setTab={setTab}
						/>
					)}
					{tab === 2 && (
						<SecondStep
							secondStepData={secondStepData}
							setSecondStepData={setSecondStepData}
							setTab={setTab}
						/>
					)}
					{tab === 3 && <ThirdStep setIsRegister={setIsRegister} />}
				</div>
			)}
		</>
	);
}

const StepButton = ({
	step,
	currentStep,
	goToStep,
}: {
	step: number;
	currentStep: number;
	goToStep: (step: number) => void;
}) => {
	const isCompleted = step < currentStep;
	const isActive = step === currentStep;
	const isFuture = step > currentStep;

	return (
		<div className="relative flex items-center">
			{step !== 1 && (
				<div
					className={`absolute -left-4 w-8 h-px ${
						isActive
							? 'bg-[var(--main)]'
							: isCompleted
							? 'bg-[var(--main)]'
							: 'bg-[var(--light-gray)]'
					} z-0`}
				/>
			)}

			<button
				className={`relative w-4 h-4 rounded-full z-10 ${
					isCompleted
						? 'bg-[var(--main)] hover:bg-[var(--bloo5)] cursor-pointer'
						: isActive
						? 'border-2 border-[var(--main)] bg-white'
						: 'bg-[var(--light-gray)]'
				}`}
				onClick={() => isCompleted && goToStep(step)}
				disabled={isActive || isFuture}
			/>

			{step !== 3 && (
				<div
					className={`absolute -right-4 w-8 h-px ${
						isActive
							? 'bg-[var(--light-gray)]'
							: isCompleted
							? 'bg-[var(--main)]'
							: 'bg-[var(--light-gray)]'
					} z-0`}
				/>
			)}
		</div>
	);
};
