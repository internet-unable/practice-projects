'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { useState } from 'react';
import { ICatalogProps, Tab } from './CatalogDesktop';
import Image from 'next/image';
interface ICatlogMobileProps extends ICatalogProps {
	isMobile: boolean;
}
export default function CatalogMobile({
	areasLetter,
	institutionUnitTypesLetter,
	areas,
	institutionUnitTypes,
	isMobile,
	isCatalogOpen,
	setIsCatalogOpen,
}: ICatlogMobileProps) {
	const [activeTab, setActiveTab] = useState(0);
	return (
		<Sheet open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
			<SheetContent
				className="flex flex-col w-[302px] [&_svg]:size-4"
				side="left"
				close={activeTab !== 0}
			>
				<SheetHeader className="p-6">
					{activeTab === 0 ? (
						<Image
							src="/logo.svg"
							alt="Логотип MICTO.UA"
							width={215}
							height={56}
							className="h-12 max-w-[184px] pl-3"
						/>
					) : (
						<SheetTitle
							className="fontUbuntuBold20 text-[var(--blue7)] flex justify-between items-center cursor-pointer"
							onClick={() => setActiveTab(0)}
						>
							Каталог медзакладів
							<Image src="/icon-arrow-left.svg" alt="" />
						</SheetTitle>
					)}
				</SheetHeader>
				{activeTab === 0 && (
					<>
						<SheetTitle className="fontUbuntuBold20 text-[var(--black)] px-6 pt-4">
							Каталог медзакладів
						</SheetTitle>
						<ul className="flex flex-col p-6 w-full ">
							<li
								className="flex justify-between items-center fontInterMedium18 p-2 rounded-[7px] cursor-pointer hover:bg-[var(--blue1)]"
								onClick={() => setActiveTab(1)}
							>
								Області України{' '}
								<Image src="/icon-arrow-right.svg" alt="icon-arrow-left" />
							</li>
							<li
								className="flex justify-between items-center fontInterMedium18 p-2 rounded-[7px] cursor-pointer hover:bg-[var(--blue1)]"
								onClick={() => setActiveTab(2)}
							>
								Типи медичних установ
								<Image src="/icon-arrow-right.svg" alt="icon-arrow-left" />
							</li>
						</ul>
					</>
				)}

				{activeTab === 1 && (
					<Tab
						title="Оберіть область України"
						letters={areasLetter}
						list={areas}
						isMobile={isMobile}
					/>
				)}
				{activeTab === 2 && (
					<Tab
						title="Оберіть тип медичної установи"
						letters={institutionUnitTypesLetter}
						list={institutionUnitTypes}
						isMobile={isMobile}
					/>
				)}
			</SheetContent>
		</Sheet>
	);
}
