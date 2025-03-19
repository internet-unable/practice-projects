import Container from '@/controllers/component/Elements/Container';
import HeaderTabs from '@/controllers/component/Elements/HeaderTabs';
import AllComments from '@/controllers/component/module/AllComments';
import { useAppSelector } from '@/reduxToolkit/hooks';
import React from 'react';

export default function Comments() {
	return (
		<>
			<HeaderTabs
				headerTitle="Відгуки"
				headerImgUrl="/img/cabinet/arrow-left.svg"
				flexibleRedirectLink={'/cabinet/'}
			/>

			<Container className="mt-8 px-6 h-full pb-10 desktop:px-0">
				<AllComments />
			</Container>
		</>
	);
}
