import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import '../styles/globals.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div className="bg-[var(--gray-background)]">
					<Header />
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
