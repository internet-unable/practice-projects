import Container from '@/controllers/component/Elements/Container';
import CustomInput from '@/controllers/component/Elements/CustomInput';
import { CustomAreaControll } from '@/controllers/component/Elements/InputArea';
import SelectInput from '@/controllers/component/Elements/SelectInput';
import { IFormInstitution } from '@/controllers/page/cabinet/Institution';
import React from 'react';
import { Control } from 'react-hook-form';

interface IPropsFormInstitution {
	control: Control<IFormInstitution>;
}

const FormInstitution: React.FC<IPropsFormInstitution> = ({ control }) => {
	return (
		<Container className="flex bg-[var(--bg-color)] flex-col items-center mt-5 px-6 desktop:w-[630px] desktop:mt-10 desktop:!bg-white desktop:rounded-[var(--default-round)] desktop:min-h-[910px] desktop:py-5">
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

			<CustomAreaControll<IFormInstitution>
				name="input.fullName"
				control={control}
				className="mt-8 w-full"
				label="Повна назва"
				placeholder="Вкажіть повну назву"
			/>
			<CustomInput
				className="mt-5 w-full "
				// value=""
				placeholder="Вкажіть тип закладу"
				type="text"
				label="Тип закладу"
			/>
			<SelectInput
				className="mt-8 w-full text"
				label="Тип власності"
				placeholder="Не вибрано"
				options={[
					{
						id: 1,
						name: 'Державна',
					},
					{
						id: 2,
						name: 'Приватна',
					},
					{
						id: 3,
						name: 'Комунальна',
					},
				]}
			/>
			<CustomAreaControll<IFormInstitution>
				name="input.description"
				control={control}
				className="mt-8 w-full gap-8 mb-[100px] desktop:mb-0"
				classNameLabel="fontUbuntu20Bold"
				label="Про медзаклад"
				placeholder="Опишіть медзаклад..."
			/>
		</Container>
	);
};

export default FormInstitution;
