'use client';
import { Checkbox } from '@/components/ui/checkbox';
import {
	GetAllAreasQuery,
	GetInstitutionUnitTypesByIdQuery,
	InstitutionUnitType,
} from '@/graphql/generated/types';
import { useState } from 'react';
import CloseSvg from './icons/CloseSvg';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { getDistrictsAndCitiesByAreaId } from '@/app/actions';

interface ICityFiltersProps {
	items: InstitutionUnitType[];
}
export const CityFilters = ({ items }: ICityFiltersProps) => {
	const [selected, setSelected] = useState<string[]>([]);
	if (items.length === 0) {
		return <></>;
	}
	return (
		<div className="w-[322px] sticky top-4 self-start">
			<h3 className="fontUbuntuBold25 mb-4">Фільтри</h3>
			<div className="bg-white shadow-auth border border-[#F2F2F2] rounded-lg  py-6 px-4">
				<div className="custom-scrollbar max-h-screen pr-6">
					{selected.length > 0 && (
						<div className="flex flex-col gap-4 mb-10">
							<h5 className="fontInterBold18">Ви обрали</h5>
							<div className="border border-[var(--black)] py-[11px] px-[14px] relative rounded-lg fontInterMedium18">
								<button
									className="absolute right-[14px] top-[11px]"
									onClick={() => setSelected([])}
								>
									<CloseSvg svgClassName="w-4 h-4 m-[5px]" />
								</button>
								<p className="text-[var(--gray3)]">Тип мед.закладу</p>
								<p>{selected.join(', ')}</p>
							</div>
							<button
								className="flex items-center gap-2 text-[var(--main)] fontInterMedium18"
								onClick={() => setSelected([])}
							>
								Очистити всі <CloseSvg svgClassName="w-4 h-4" />
							</button>
						</div>
					)}
					<h5 className="fontInterBold18 pb-2 border-b mb-6 border-[var(--gray2)]">
						Тип мед. закладу
					</h5>
					<ul className="flex flex-col gap-6  ">
						{items?.map((item) => (
							<li key={item.oldId} className="flex gap-4 items-start">
								<Checkbox
									id={item.name}
									checked={selected.includes(item.name)}
									onCheckedChange={(checked) => {
										setSelected((prev) =>
											checked
												? [...prev, item.name]
												: prev.filter((name) => name !== item.name)
										);
									}}
									className="mt-1"
								/>
								<label htmlFor={item.name} className="fontInterMedium18">
									{item.name}
								</label>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

interface IInstitutionFiltersProps {
	items: GetAllAreasQuery['areas']['items'];
}

export const InstitutionFilters = ({ items }: IInstitutionFiltersProps) => {
	const [selectedDistrictsAndCities, setSelectedDistrictsAndCities] = useState<string[]>([]);
	const [selectedArea, setSelectedArea] = useState('');
	const [visibleCount, setVisibleCount] = useState(5);
	const [districtsAndCity, setDistrictsAndCity] = useState([]);

	const onValueChange = async (value: string) => {
		setSelectedArea(value);
		setSelectedDistrictsAndCities([]);
		console.log('fetch districts and cities by areaId: ', value);
		// const { districts, cities } = await getDistrictsAndCitiesByAreaId(Number(value));
		// setDistrictsAndCity([...districts, ...cities]);
	};

	return (
		<div className="w-[322px] sticky top-4 self-start">
			<h3 className="fontUbuntuBold25 mb-4">Фільтри</h3>
			<div className="bg-white shadow-auth border border-[#F2F2F2] rounded-lg  py-6 px-4">
				<div className="custom-scrollbar max-h-screen overflow-y-scroll pr-6">
					{selectedArea && (
						<div className="flex flex-col gap-4 mb-10">
							<h5 className="fontInterBold18">Ви обрали</h5>
							<div className="border border-[var(--black)] py-[11px] px-[14px] relative rounded-lg fontInterMedium18">
								<button
									className="absolute right-[14px] top-[11px]"
									onClick={() => setSelectedArea('')}
								>
									<CloseSvg svgClassName="w-4 h-4 m-[5px]" />
								</button>
								<p className="text-[var(--gray3)]">Область України </p>
								<p>{selectedArea}</p>
							</div>
							{selectedDistrictsAndCities.length > 0 && (
								<div className="border border-[var(--black)] py-[11px] px-[14px] relative rounded-lg fontInterMedium18">
									<button
										className="absolute right-[14px] top-[11px]"
										onClick={() => setSelectedDistrictsAndCities([])}
									>
										<CloseSvg svgClassName="w-4 h-4 m-[5px]" />
									</button>
									<p className="text-[var(--gray3)]">Тип мед.закладу</p>
									<p>{selectedDistrictsAndCities.join(', ')}</p>
								</div>
							)}
							<button
								className="flex items-center gap-2 text-[var(--main)] fontInterMedium18"
								onClick={() => {
									setSelectedDistrictsAndCities([]);
									setSelectedArea('');
								}}
							>
								Очистити всі <CloseSvg svgClassName="w-4 h-4" />
							</button>
						</div>
					)}
					<h5 className="fontInterBold18 pb-2 border-b mb-6 border-[var(--gray2)]">
						Область України
					</h5>
					<RadioGroup onValueChange={onValueChange}>
						{items?.map((item) => (
							<div key={item.oldId} className="flex gap-4 items-start">
								<RadioGroupItem
									id={item.name}
									value={item?.oldId?.toString() || ''}
									className="mt-1"
								/>
								<label htmlFor={item.name} className="fontInterMedium18">
									{item.name}
								</label>
							</div>
						))}
					</RadioGroup>
					{selectedArea && (
						<>
							<h5 className="fontInterBold18 pb-2 border-b mb-6 border-[var(--gray2)]">
								Населений пункт або район
							</h5>
							<ul className="flex flex-col gap-6  ">
								{items?.map((item) => (
									<li key={item.oldId} className="flex gap-4 items-start">
										<Checkbox
											id={item.name}
											checked={selectedDistrictsAndCities.includes(item.name)}
											onCheckedChange={(checked) => {
												setSelectedDistrictsAndCities((prev) =>
													checked
														? [...prev, item.name]
														: prev.filter((name) => name !== item.name)
												);
											}}
											className="mt-1"
										/>
										<label htmlFor={item.name} className="fontInterMedium18">
											{item.name}
										</label>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
