import Link from 'next/link';
import { FOOTER_NAV_LINKS } from '@/constants/routes';
import ContentWrapper from './common/ContentWrapper';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Footer = () => {
	return (
		<footer>
			<ContentWrapper
				fullWidth={true}
				wrapperClassName="bg-[var(--blue8)] text-white"
				childrenWrapperClassName="flex justify-between py-10 gap-0 md:gap-[35px] gap-10 flex-col items-center text-center md:flex-row md:items-start md:text-left"
			>
				<div className="max-w-[290px] w-full flex flex-col items-center md:items-start md:max-w-[268px]">
					<Link href="/">
						<Image
							className="md:mb-2 mb-6"
							src="/logo-white.svg"
							width={217}
							height={57}
							alt="Логотип MICTO.UA"
						/>
					</Link>
					<h4 className="fontInterBold18 mb-8 md:fontUbuntuBold20 md:mb-9">
						Зробимо українську медицину здоровою разом
					</h4>
					<a
						href="mailto:moz@moz.gov.ua"
						className="inline-block hover-effect fontInterRegular16 md:fontInterMedium18 mb-4"
					>
						moz@moz.gov.ua
					</a>
					<Link
						href="/insitution/add"
						className="inline-block hover-effect fontInterRegular16 md:fontInterMedium18"
					>
						Додати медзаклад
					</Link>
				</div>

				<div className="w-[180px] flex flex-col items-center text-center md:items-start md:text-left">
					<h5 className="fontInterBold18 md:fontUbuntuBold20 mb-6">Проєкт МІСТО.ЮА</h5>
					<ul className="flex flex-col gap-2  items-center text-center md:gap-4 md:items-start md:text-left ">
						{FOOTER_NAV_LINKS.map((link, index) => (
							<li key={index} className="flex">
								<Link
									href={link.href}
									rel="noopener noreferrer"
									className={`${
										link.name === 'Інвесторам' && 'text-[#fbc756]'
									} hover-effect fontInterMedium18 max-md:text-base`}
								>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="w-[291px] mb-3 md:mb-9  ">
					<h5 className="fontUbuntuBold20 mb-6">Контакти</h5>
					<a href="tel:0800505201" className="flex hover-effect fontInterMedium18 ">
						0 800 505 201 - Гаряча лінія МОЗ
					</a>
				</div>
				<div className="w-[167px] flex flex-col items-center text-center md:items-start md:text-left ">
					<h5 className="mb-6 fontUbuntuBold20">Наші соцмережі</h5>
					<div className="flex gap-[22px] justify-center md:justify-start">
						<SocialLinks />
					</div>
				</div>
			</ContentWrapper>
			<Link
				href="https://soft.ua/"
				target="_blank"
				className="bg-[var(--blue7)] flex flex-col items-center gap-[10px] justify-center py-[10px] md:py-3 px-4 md:px-0"
			>
				<Image src="/logo-creator.svg" alt="Логотип soft.ua" width={121} height={30} />
				<div className="text-center md:text-left">
					<p className="fontInterRegular16 text-[var(--light-gray)] max-md:max-w-[290px]">
						Ідея, архітектура, розробка, підтримка та розвиток проєкту
					</p>
				</div>
			</Link>
		</footer>
	);
};

export const SocialLinks = ({ className }: { className?: string }) => {
	return (
		<>
			<Link
				href="https://www.instagram.com/micto_ua?utm_medium=copy_link"
				target="_blank"
				rel="noopener noreferrer"
				className={cn(className, ' transition hover:scale-105')}
			>
				<Image src="/icon-instagram.svg" alt="Instagram" width={40} height={40} />
			</Link>
			<Link
				href="https://www.facebook.com/100081935077947/posts/110907848239641"
				target="_blank"
				rel="noopener noreferrer"
				className={cn(className, ' transition hover:scale-105')}
			>
				<Image src="/icon-facebook.svg" alt="Facebook" width={40} height={40} />
			</Link>
		</>
	);
};
