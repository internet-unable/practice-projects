import { InstitutionIcon } from '@/components/icons/InstitutionIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import Image from 'next/image';
import Link from 'next/link';

export default function Registration() {
	return (
		<div className="flex sm:justify-between items-center max-sm:flex-col max-sm:gap-8">
			<Image src="/registration-pic.svg" alt="MICTO.UA" className="max-sm:w-[135px]" />
			<div className="flex flex-col gap-8 max-w-[582px] w-full">
				<h1 className="fontUbuntuBold25 text-center sm:fontInterBold45 text-[var(--main)]">
					Зареєструйтесь як:
				</h1>
				<div className="flex flex-col gap-4  w-full">
					<Link
						href="/registration/user"
						className="border border-[var(--bloo8)] rounded-lg flex gap-5 p-4 text-[var(--bloo8)] transition-colors hover:border-[var(--main)] group"
					>
						<UserIcon svgClassName="group-hover:text-[var(--main)] p-1 box-content" />
						<div className="flex flex-col gap-2 group-hover:text-[var(--main)] transition-colors">
							<h5 className="fontUbuntuBold20">Пацієнт</h5>
							<p className="fontInterRegular16">
								У пошуку клініки, або лікаря для запису
							</p>
						</div>
					</Link>
					<Link
						href="/registration/institution"
						className="border border-[var(--bloo8)] rounded-lg flex gap-5 p-4 text-[var(--bloo8)] transition-colors hover:border-[var(--main)] group"
					>
						<InstitutionIcon svgClassName="group-hover:text-[var(--main)] py-[5px] pl-1 box-content" />
						<div className="flex flex-col gap-2 group-hover:text-[var(--main)] transition-colors">
							<h5 className="fontUbuntuBold20 ">Медзаклад</h5>
							<p className="fontInterRegular16">
								Публікація інформації про клініку та її працівників
							</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
