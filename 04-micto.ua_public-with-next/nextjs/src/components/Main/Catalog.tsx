import { Search } from '../Search';

export const Catalog = () => {
	return (
		<section className="bg-[#EFF8FD] w-full mb-[120px] mt-6 px-5 pt-10 md:pt-[65px]">
			<div className="max-w-[1290px] mx-auto flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between md:gap-0 md">
				<h1 className="fontInterBold56 flex-[0_0_60%] text-[var(--black)] max-[768px]:text-3xl min-[769px]:flex-[0_1_65%]">
					Каталог медичних закладів і спільнота в сфері здоров’я
				</h1>
				<div className="flex flex-col fontInterBold18 text-main gap-[5px] min-[769px]:fontUbuntuBold25">
					<p className="flex items-center">
						5700
						<span className="fontInterMedium16 text-[var(--black)] min-[769px]:fontUbuntuMedium20">
							+ лікарень
						</span>
					</p>
					<p className="flex items-center">
						80.000
						<span className="fontInterMedium16 text-[var(--black)] min-[769px]:fontUbuntuMedium20">
							+ відділень
						</span>
					</p>
					<p className="flex items-center">
						9.000
						<span className="fontInterMedium16 text-[var(--black)] min-[769px]:fontUbuntuMedium20">
							+ відгуків
						</span>
					</p>
				</div>
			</div>
			<div className="max-w-[1290px] w-full mx-auto flex flex-col items-center translate-y-[20px] min-[769px]:translate-y-[40px]">
				<Search wrapperClassName="max-w-[1069px] w-full" />
			</div>
		</section>
	);
};
