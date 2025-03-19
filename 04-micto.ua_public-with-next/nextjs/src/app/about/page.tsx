import React from 'react';
import Image from 'next/image';

import AboutProject from '../components/static-pages/about/AboutProject';
import Statistics from '../components/static-pages/about/Statistics';
import InvestmentStages from '../components/static-pages/about/InvestmentStages';
import MindMao from '../components/static-pages/about/MindMao';
import CreateLogo from '../components/static-pages/about/CreateLogo';
import DevelopmentPlan from '../components/static-pages/about/DevelopmentPlan';
import Button from '../components/global/Button';

export default function about() {
	return (
		<>
			<div className="max-w-[1290] mx-auto items-center px-4 sm:px-6 md:px-8">
				<AboutProject />
				<Statistics />
				<InvestmentStages />
				<Button label="Стань інвестором проєкту" />
				<MindMao />
				<CreateLogo />
				<DevelopmentPlan />
				<Button label={'Стань інвестором проєкту'} />
			</div>
		</>
	);
}
