'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import Image from 'next/image';
import { GroupedInstitutionUnitTypes } from '@/pages';
import { Area, AreaList } from '@/graphql/generated/types';

export interface ICatalogData {
	areasLetter: string[];
	institutionUnitTypesLetter: string[];
	areas: Array<Area>;
	institutionUnitTypes: GroupedInstitutionUnitTypes;
}

export interface ICatalogProps extends ICatalogData {
	isCatalogOpen: boolean;
	setIsCatalogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ITabProps {
	title: string;
	letters: string[];
	list: GroupedInstitutionUnitTypes | Array<Area>;
	isMobile?: boolean;
}

export default function CatalogDesktop({
	areasLetter,
	institutionUnitTypesLetter,
	areas,
	institutionUnitTypes,
	isCatalogOpen,
	setIsCatalogOpen,
}: ICatalogProps) {
	const [activeTab, setActiveTab] = useState(1);
	return (
		<Dialog open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
			<DialogContent className="flex w-11/12 mx-auto translate-y-[-30%] h-full max-h-[calc(100svh-300px)] min-h-96">
				<ul className="flex flex-col flex-none py-6 pl-4 pr-7 w-[272px] box-content border-r border-[#CFCFCF]">
					<li
						className={`flex justify-between items-center fontInterMedium18 p-2 rounded-[7px] cursor-pointer ${
							activeTab === 1 && ' bg-[var(--blue1)]'
						}`}
						onMouseEnter={() => activeTab !== 1 && setActiveTab(1)}
					>
						Області України <Image src="/icon-arrow-right.svg" alt="icon-arrow-left" />
					</li>
					<li
						className={`flex justify-between items-center fontInterMedium18 p-2 rounded-[7px] cursor-pointer ${
							activeTab === 2 && ' bg-[var(--blue1)]'
						}`}
						onMouseEnter={() => activeTab !== 2 && setActiveTab(2)}
					>
						Типи медичних установ
						<Image src="/icon-arrow-right.svg" alt="icon-arrow-left" />
					</li>
				</ul>
				{activeTab === 1 && (
					<Tab title="Оберіть область України" letters={areasLetter} list={areas} />
				)}
				{activeTab === 2 && (
					<Tab
						title="Оберіть тип медичної установи"
						letters={institutionUnitTypesLetter}
						list={institutionUnitTypes}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}

export function Tab({ title, letters, list, isMobile }: ITabProps) {
	const halfIndex = Math.ceil(letters.length / 2);
	const firstHalf = letters.slice(0, letters.length % 2 === 0 ? halfIndex + 1 : halfIndex);
	const secondHalf = letters.slice(letters.length % 2 === 0 ? halfIndex + 1 : halfIndex);
	return (
		<div
			className={`${
				isMobile
					? 'flex flex-col p-6 w-full h-[calc(100svh-74px)]'
					: 'px-[14px] py-6 w-full h-full flex flex-col'
			}`}
		>
			<DialogTitle className="fontInterBold18 mb-6 min-[769px]:fontUbuntuBold25 min-[769px]:mb-10">
				{title}
			</DialogTitle>
			{isMobile ? (
				<ul className="custom-scrollbar flex flex-col gap-4 ">
					<TabItems list={list} letters={letters} />
				</ul>
			) : (
				<div className="custom-scrollbar h-full grid grid-cols-2 gap-4">
					<ul className="flex flex-col gap-4">
						<TabItems list={list} letters={firstHalf} />
					</ul>
					<ul className="flex flex-col gap-4">
						<TabItems list={list} letters={secondHalf} />
					</ul>
				</div>
			)}
		</div>
	);
}

const TabItems = ({
	list,
	letters,
}: {
	list: GroupedInstitutionUnitTypes | Array<Area>;
	letters: string[];
}) => {
	console.log(list);
	return (
		<>
			{letters.map((letter) => (
				<li key={letter}>
					<h2 className="fontInterBold20 text-[var(--gray2)] ">{letter}</h2>
					<ul className="flex flex-col gap-2">
						{/* {list[letter]?.map(
							(item: GroupedInstitutionUnitTypes | Area, i: number) => (
								<li key={i}>
									<Link
										href={`${item.slug}-t${item.oldId}`}
										className="fontInterMedium16 text-[var(--main)] hover-effect min-[769px]:text-lg"
									>
										{item.name && item.name}
									</Link>
								</li>
							)
						)} */}
					</ul>
				</li>
			))}
		</>
	);
};
