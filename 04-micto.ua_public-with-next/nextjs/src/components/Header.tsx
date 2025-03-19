'use client';
import { HEADER_NAV_LINKS } from '@/constants/routes';
import Link from 'next/link';
import ContentWrapper from './common/ContentWrapper';
import { Button } from './ui/button';
import CatalogDesktop, { ICatalogData } from './CatalogDesktop';
import BurgerMenu from './BurgerMenu';
import { useState } from 'react';
import useMedia from '@/hooks/useMedia';
import CatalogMobile from './CatalogMobile';
import Image from 'next/image';

export default function Header() {
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);
	// const [isCatalogOpen, setIsCatalogOpen] = useState(false);
	// const isMobile = useMedia('(max-width: 768px)');

	const openCatalog = () => {
		setIsBurgerOpen(false);
		// setIsCatalogOpen(true);
	};
	return (
		<>
			<header className="py-4 bg-white mb-6">
				<ContentWrapper>
					<div className="flex justify-between items-center">
						<div className="flex gap-3 sm:gap-6">
							<BurgerMenu
								isBurgerMenuOpen={isBurgerOpen}
								setIsBurgerMenuOpen={setIsBurgerOpen}
								openCatalog={openCatalog}
							/>
							<a href="/">
								<picture>
									<source
										srcSet="/logo-img.svg"
										width={32}
										height={38}
										media="(max-width: 640px)"
									/>
									<img src="/logo.svg" alt="Логотип MICTO.UA" />
								</picture>
							</a>
						</div>
						<div className="flex gap-5 sm:gap-6">
							<Image
								src="/search-blue.svg"
								alt="search-icon"
								width={26}
								height={26}
							/>

							<Button variant="outline" asChild className="w-[111px] sm:w-[133px]">
								<Link href="/auth">Увійти</Link>
							</Button>
						</div>
					</div>
					<nav className="mt-6 max-lg:hidden">
						<ul className="flex justify-between items-center">
							<li>
								<Button
									variant="secondary"
									className="w-[236px]"
									onClick={openCatalog}
								>
									Каталог медзакладів
								</Button>
							</li>
							{HEADER_NAV_LINKS.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className="fontInterMedium18 text-[var(--black)] hover:text-[var(--blue7)] pb-1 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[3px] before:bg-[var(--blue7)] before:rounded-t-[3px] before:scale-x-0 before:origin-center before:transition hover:before:scale-x-100"
									>
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</ContentWrapper>
			</header>
			{/* {!isMobile ? (
				<CatalogDesktop
					areas={areas}
					areasLetter={areasLetter}
					institutionUnitTypes={institutionUnitTypes}
					institutionUnitTypesLetter={institutionUnitTypesLetter}
					isCatalogOpen={isCatalogOpen}
					setIsCatalogOpen={setIsCatalogOpen}
				/>
			) : (
				<CatalogMobile
					areas={areas}
					areasLetter={areasLetter}
					institutionUnitTypes={institutionUnitTypes}
					institutionUnitTypesLetter={institutionUnitTypesLetter}
					isMobile={isMobile}
					isCatalogOpen={isCatalogOpen}
					setIsCatalogOpen={setIsCatalogOpen}
				/>
			)} */}
		</>
	);
}
