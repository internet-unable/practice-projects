import ContentWrapper from '@/components/common/ContentWrapper';
import { BackButton } from '@/components/ui/BackButton';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthPage() {
	return (
		<>
			<ContentWrapper fullWidth wrapperClassName="bg-[var(--gray-background)] py-6">
				<BackButton className="flex gap-4 items-center text-[var(--main)] fontInterMedium20 pb-10">
					<Image src="/icon-arrow-left2.svg" alt="icon-left" />
					Повернутись
				</BackButton>
				<div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 sm:grid-rows-2 justify-items-center">
					<Image
						src="/auth-page-pic.svg"
						alt="MICTO.UA"
						className="row-span-1 col-span-1 self-center sm:justify-items-start sm:row-span-2 max-sm:px-5"
					/>
					<h1 className="text-[var(--main)] col-span-1 fontUbuntuBold25 desktop:text-5xl md:fontInterBold30 self-end mb-10 sm:mb-5 text-center max-sm:row-start-1">
						Станьте частиною MICTO.UA
					</h1>
					<div className="flex gap-[30px] max-sm:items-center w-full justify-center col-span-1 mt-24 sm:mt-5 max-sm:flex-col max-sm:gap-4">
						<Button
							asChild
							className="max-w-[272px] sm:max-w-[300px] w-full max-desktop:text-base"
						>
							<Link href="/auth/login">Увійти</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							className="max-w-[272px] sm:max-w-[300px] w-full max-desktop:text-base"
						>
							<Link href="/auth/registration">Зареєструватись</Link>
						</Button>
					</div>
				</div>
			</ContentWrapper>
		</>
	);
}
