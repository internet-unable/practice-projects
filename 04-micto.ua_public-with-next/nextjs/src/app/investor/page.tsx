import React from 'react';

import HeroSection from '../components/static-pages/investor/HeroSection';
import ProjectOverview from '../components/static-pages/investor/ProjectOverview';
import Button from '../components/global/Button';
import InteractiveContent from '../components/static-pages/investor/InteractiveContent';
import HealthProjectDetails from '../components/static-pages/investor/HealthProjectDetails';
import ProjectBasics from '../components/static-pages/investor/ProjectBasics';
import ProjectSolutions from '../components/static-pages/investor/ProjectSolutions';
import HealthcareUnification from '../components/static-pages/investor/HealthcareUnification';
import HealthTrustIndex from '../components/static-pages/investor/HealthTrustIndex';
import SelectionCriteria from '../components/static-pages/investor/SelectionCriteria';
import ProjectStructure from '../components/static-pages/investor/ProjectStructure';
import MonetizationAndBusinessModel from '../components/static-pages/investor/MonetizationAndBusinessModel';

const Investor = () => {
	return (
		<>
			<section className="max-w-[1290] mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="font-inter font-bold lg:text-[45px] text-[40px] leading-[120%] mb-[40]">
					Інвесторам
				</h1>
				<HeroSection />
				<ProjectOverview />
				<Button label="Стати інвестором проєкту" />
				<InteractiveContent />
				<HealthProjectDetails />
				<ProjectBasics />
				<ProjectSolutions />
				<HealthcareUnification />
				<HealthTrustIndex />
				<SelectionCriteria />
				<ProjectStructure />
				<MonetizationAndBusinessModel />
				<Button label="Стати інвестором проєкту" />
			</section>
		</>
	);
};

export default Investor;
