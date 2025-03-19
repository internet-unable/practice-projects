import { FACEBOOK_SVG, INSTAGRAM_SVG, LOGO_SOFT_UA_SVG, SOFT_UA_SVG } from '@/components/utils/SVG';
import { cn } from '@/lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';

interface Props {
	className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
	return (
		<footer className={cn(className, 'bg-[#F3F4F6] border-t-[1px] ')}>
			<Container className="max-w-[1440px] flex items-center py-6 justify-between min-h-[200px] flex-col desktop:items-start desktop:flex-row desktop:px-[75px] min-xl:!px-0">
				{/* logo */}
				<div>
					<img src="/img/logo.svg" alt="logo" className="h-[59px]" />
				</div>

				{/* contacts us  */}
				<div className="flex flex-col items-center gap-2 mt-5 desktop:mt-0 desktop:gap-3 desktop:items-start">
					<h2 className="text-[var(--gray5)] fontTitle !font-medium text-center desktop:text-start">
						Зв’язатись з адміністрацією <br /> MICTO.UA :
					</h2>
					<a
						className="text-[var(--color5)] hover:text-[var(--color5)]"
						href="mailto:infos@micto.ua"
					>
						infos@micto.ua
					</a>
				</div>

				{/* about */}
				<div className="flex justify-between gap-10 mt-8  desktop:flex-col desktop:gap-3 desktop:mt-0">
					<div className="flex flex-col flex-wrap desktop:gap-3">
						<Link
							to="/about"
							className="text-[var(--gray5)] fontMedium hover:text-[var(--gray5)]"
						>
							Про проект
						</Link>
						<Link
							to="/"
							className="text-[var(--gray5)] fontMedium hover:text-[var(--gray5)]"
						>
							Медичні установи
						</Link>
					</div>
					<div className="flex flex-col flex-wrap desktop:gap-3">
						<Link
							to="/donate"
							className="text-[var(--gray5)] fontMedium hover:text-[var(--gray5)]"
						>
							Допомога проєкту
						</Link>
						<Link
							to="/about/"
							className="text-[var(--gray5)] fontMedium hover:text-[var(--gray5)]"
						>
							Реклама
						</Link>
					</div>
				</div>

				{/* media */}
				<div className="flex flex-col gap-5 mt-8 desktop:mt-0">
					<h3 className="text-[var(--gray5)] fontUbuntu20">Наші соцмережі</h3>
					<div className="flex items-center justify-center gap-5 desktop:items-start desktop:justify-start">
						<a href="https://www.instagram.com/micto_ua/?utm_medium=copy_link">
							<INSTAGRAM_SVG />
						</a>
						<a href="https://www.facebook.com/100081935077947/posts/110907848239641/">
							<FACEBOOK_SVG />
						</a>
					</div>
				</div>
			</Container>
			<div className="min-h-[86px] bg-[var(--color5)] ">
				<Container className="flex flex-col gap-2 justify-center items-center pt-4">
					<div className="flex gap-2 ">
						<LOGO_SOFT_UA_SVG />
						<SOFT_UA_SVG />
					</div>
					<h4 className="text-[#DFDFDF] fontRegular2 text-center">
						Ідея, архітектура, розробка, підтримка та розвиток проєкту
					</h4>
				</Container>
			</div>
		</footer>
	);
};
