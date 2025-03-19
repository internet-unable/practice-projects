import type { Metadata } from 'next';
import React from 'react';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';

export const metadata: Metadata = {
	title: 'Медичні заклади України - Місто.юа',
	description:
		'Каталог медичних закладів та їх підрозділів - Контакти, адреси, телефони, факси, коди ЄДРПОУ',
};

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="bg-[var(--gray-background)]">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
