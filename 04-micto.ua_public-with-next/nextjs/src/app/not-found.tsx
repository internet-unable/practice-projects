import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<section className="flex flex-col items-center bg-cover bg-center bg-[url('/not-found-bg.png')] h-[490px] max-w-[1290px] w-full mx-auto my-10">
			<h1 className="[text-shadow:0_4px_4px_rgba(0,0,0,0.25)] text-[rgb(0,125,207)] font-bold text-[250px] leading-[300px] scale-x-[1.15] ">
				404
			</h1>
			<h5 className="font-bold text-3xl mb-4">Йой !</h5>
			<p className="font-normal text-lg mb-10">Сторінка не знайдена</p>

			<Button asChild className="max-w-[300px] w-full">
				<Link href="/">На головну сторінку</Link>
			</Button>
		</section>
	);
}
