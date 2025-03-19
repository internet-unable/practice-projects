import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Button } from './ui/button';
import Link from 'next/link';
import { HEADER_NAV_LINKS } from '@/constants/routes';
import { SocialLinks } from './Footer';
import Image from 'next/image';

interface IBurgerMenuProps {
	isBurgerMenuOpen: boolean;
	setIsBurgerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	openCatalog: () => void;
}
export default function BurgerMenu({
	isBurgerMenuOpen,
	setIsBurgerMenuOpen,
	openCatalog,
}: IBurgerMenuProps) {
	return (
		<Sheet open={isBurgerMenuOpen} onOpenChange={setIsBurgerMenuOpen}>
			<SheetTrigger asChild>
				<button>
					<Image src="/menu.svg" alt="menu-icon" width={24} height={18} />
				</button>
			</SheetTrigger>
			<SheetContent side={'left'} className="[&_svg]:size-4">
				<SheetHeader className="p-6">
					<Image
						src="/logo.svg"
						alt="Логотип MICTO.UA"
						width={215}
						height={56}
						className="h-12 max-w-[184px] pl-3"
					/>
				</SheetHeader>
				<div className="flex flex-col custom-scrollbar h-[calc(100%-96px)] ">
					<div className="p-6 flex flex-col gap-10 text-[var(--black)]">
						<Button asChild className="w-full min-h-[50px]">
							<Link href="/insitution/add">Додати медзаклад</Link>
						</Button>
						<nav>
							<ul className="flex flex-col gap-4">
								{HEADER_NAV_LINKS.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											className="hover-effect fontInterMedium18"
										>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</nav>
						<Button variant="secondary" className="w-[236px]" onClick={openCatalog}>
							Каталог медзакладів
						</Button>
						<div>
							<h2 className="fontInterBold18 mb-6">Контакти MICTO</h2>
							<div className="fontInterMedium18 flex flex-col">
								<p className="max-w-[200px]">ТОВ "СОФТ.юа" технічний партнер:</p>
								<a
									href="http://soft.ua"
									target="_blank"
									rel="noopener noreferrer"
									className="hover-effect text-[var(--main)] w-fit"
								>
									www.soft.ua
								</a>
								<a
									href="mailto:infos@soft.ua"
									className="hover-effect text-[var(--main)] w-fit"
								>
									infos@soft.ua
								</a>
							</div>
						</div>
						<div className="fontInterMedium18 ">
							<h2 className="fontInterBold18 mb-6">Контакти МОЗ</h2>
							<div className="flex flex-col mb-4">
								<p>Телефон "гарячої лінії":</p>
								<a
									href="tel:+380800505201"
									className="hover-effect text-[var(--main)] w-fit"
								>
									0 800 505 201
								</a>
							</div>
							<div className="flex flex-col">
								<span>Сайт і пошта:</span>
								<a
									href="http://moz.gov.ua "
									target="_blank"
									rel="noopener noreferrer"
									className="hover-effect text-[var(--main)] w-fit"
								>
									www.moz.gov.ua
								</a>
								<a
									href="mailto:moz@moz.gov.ua"
									className="hover-effect text-[var(--main)] w-fit"
								>
									moz@moz.gov.ua
								</a>
							</div>
						</div>
					</div>
					<SheetFooter className="gap-2 bg-[var(--blue8)] p-6">
						<h2 className="fontInterMedium18 text-white">Приєднуйтесь до нас</h2>
						<div className="flex gap-2">
							<SocialLinks className="w-6" />
						</div>
						<p className="fontInterRegular12 text-[#E6F7FE]">
							©Медичний портал-хаб Micto.ua
						</p>
					</SheetFooter>
				</div>
			</SheetContent>
		</Sheet>
	);
}
