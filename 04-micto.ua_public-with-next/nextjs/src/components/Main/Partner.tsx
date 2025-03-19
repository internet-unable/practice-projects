import Link from 'next/link';
import ContentWrapper from '../common/ContentWrapper';
import { Button } from '../ui/button';
import Image from 'next/image';

export const Partner = () => {
	return (
		<ContentWrapper
			fullWidth
			wrapperClassName="bg-[var(--blue-background)] pt-[65px] pb-[66px]"
			childrenWrapperClassName="grid grid-cols-1 items-center gap-x-10 gap-y-6 md:grid-cols-[2fr_auto] md:gap-y-0"
		>
			<h1 className="fontInterBold30 text-[var(--black)] min-[769px]:py-6 min-[769px]:text-6xl sm:text-center md:text-left">
				Ставай партнером micto.ua
			</h1>
			<Image
				src="logo-img.svg"
				alt="Партнери"
				width={302}
				height={332}
				className="row-span-3 justify-self-center"
			/>
			<p className="text-[var(--black)] max-w-[848px] fontInterMedium18 text-left md:fontUbuntuBold20 sm:text-center  md:text-left  min-[769px]:py-[31px]">
				Ви лікар, клініка, аптека чи фармвиборник? Давайте співпрацювати! Doc.ua - один з
				найбільших медичних сервісів України, що має багатомільйонну аудиторію.
			</p>
			<Button
				asChild
				className="button bg-main hover:bg-[var(--blue5)] w-[214px] col-span-1 min-[769px]:mt-6 max-[769px]:w-[200px] max-[769px]:text-base max-[769px]:h-[40px] max-md:justify-self-center max-sm:justify-self-start"
			>
				<Link href="/insitution/add">Додати медзаклад</Link>
			</Button>
		</ContentWrapper>
	);
};
