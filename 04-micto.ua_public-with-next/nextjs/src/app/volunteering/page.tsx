import React from 'react';

import HelpRequest from '../components/static-pages/volunteering/HelpRequest';
import VolunteerSupportText from '../components/static-pages/volunteering/VolunteerSupportText';

const Volunteering = () => {
	return (
		<>
			<section className="max-w-[1290] mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="font-inter font-bold lg:text-[45px] text-[35px] leading-[120%] mb-[40] lg:mb-[80]">
					Волонтерство
				</h1>
				<HelpRequest />
				<VolunteerSupportText />
				<HelpRequest />
			</section>
		</>
	);
};

export default Volunteering;
