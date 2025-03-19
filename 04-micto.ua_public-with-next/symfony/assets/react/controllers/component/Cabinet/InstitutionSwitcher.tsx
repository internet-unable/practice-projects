import BageSwitcher from '@/controllers/component/Cabinet/BageSwitcher';
import SelectedInstitution from '@/controllers/component/Cabinet/SelectedInstitution';
import Container from '@/controllers/component/Elements/Container';
import React from 'react';

const InstitutionSwitcher = () => {
	return (
		<Container className="mt-6 min-h-[110px] bg-white px-6 py-3 desktop:hidden">
			<BageSwitcher />
			<SelectedInstitution />
		</Container>
	);
};

export default InstitutionSwitcher;
