'use client';
import { useRouter } from 'next/navigation';

interface IBackButtonProps {
	className?: string;
	children: React.ReactNode;
}
export const BackButton = ({ children, className }: IBackButtonProps) => {
	const router = useRouter();
	return (
		<button className={className} onClick={() => router.back()}>
			{children}
		</button>
	);
};
