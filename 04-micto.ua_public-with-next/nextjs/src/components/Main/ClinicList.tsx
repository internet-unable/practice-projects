'use client';
import ContentWrapper from '../common/ContentWrapper';
import { GroupedInstitutionUnitTypes } from '@/pages';
import Link from 'next/link';

interface IClinicListProps {
	firstLetters: string[];
	groupedItems: GroupedInstitutionUnitTypes;
}

export default function ClinicList({ firstLetters, groupedItems }: IClinicListProps) {
	return (
		<ContentWrapper fullWidth wrapperClassName="mt-[80px]">
			<h1 className="fontUbuntuBold25 text-center min-[769px]:text-left min-[769px]:fontInterBold45">
				Клініки за алфавітом
			</h1>
			<ul className="my-20 grid grid-cols-4 justify-items-center gap-y-6 min-[769px]:gap-y-[60px] min-[769px]:flex min-[769px]:flex-wrap min-[769px]:gap-x-[70px] max-[768px]:mt-10">
				{firstLetters.map((item) => (
					<li
						key={item}
						className="fontInterBold45 w-[55px] text-center text-[var(--black)] transition-all hover:text-main hover:scale-110 cursor-pointer"
						onClick={() => {
							const element = document.querySelector(`[data-scrollto="${item}"]`);
							element?.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						{item}
					</li>
				))}
			</ul>
			<ul className="flex flex-col">
				{firstLetters.map((letter) => (
					<li
						key={letter}
						className="flex gap-6 py-[30px] border-t border-[var(--light-gray)] max-[768px]:flex-col min-[769px]:pl-[111px] min-[769px]:gap-[75px"
						data-scrollto={letter}
					>
						<h2 className="fontInterBold45 text-[var(--black)] w-[50px]">{letter}</h2>
						<ul className="flex flex-col gap-4 justify-center">
							{groupedItems[letter]?.map((item) => (
								<li key={item.slug}>
									<Link
										href={`${item.slug}-t${item.oldId}`}
										className="fontInterMedium16 text-[var(--main)] hover-effect min-[769px]:text-lg"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</ContentWrapper>
	);
}
