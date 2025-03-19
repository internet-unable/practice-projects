import {
	INFO_SVG,
	PERSONAL_SVG,
	PUBLIC_PART_SVG,
	RAVIEWS_SVG,
	SING_OUT_SVG,
	UNIT_SVG,
	VACANCY_SVG,
} from '@/components/utils/SVG';
import CabinetItem from '@/controllers/component/Cabinet/CabinetItem';
import Container from '@/controllers/component/Elements/Container';
import { useAppSelector } from '@/reduxToolkit/hooks';
import React from 'react';

const CabinetTabs = () => {
	const { currentInstitutionId } = useAppSelector((state) => state.myInstitutions);

	return (
		<div className="px-6 desktop:px-0">
			<Container className="mt-6 mb-10 flex flex-col gap-5 w-full desktop:gap-[40px] desktop:mb-0">
				<div className="flex flex-col gap-5 w-full desktop:flex-row desktop:gap-x-[30px] desktop:gap-y-[40px] desktop:flex-wrap">
					<h2 className="hidden fontUbuntu30Bold text-[var(--color5)] desktop:block w-full">
						Система керування
					</h2>
					<CabinetItem
						imgUrl="/img/cabinet/unit.svg"
						linkUrl={`institution/${currentInstitutionId}/unit/list`}
						title="Підрозділи"
					>
						<UNIT_SVG />
					</CabinetItem>
					<CabinetItem
						imgUrl="/img/cabinet/reviews.svg"
						linkUrl={`/cabinet/comments/${currentInstitutionId}?entityType=INSTITUTION`}
						title="Відгуки"
					>
						<RAVIEWS_SVG />
					</CabinetItem>
					<CabinetItem
						imgUrl="/img/cabinet/vacancy.svg"
						linkUrl="/cabinetvacancy"
						title="Вакансії"
					>
						<VACANCY_SVG />
					</CabinetItem>
					<CabinetItem
						imgUrl="/img/cabinet/info.svg"
						linkUrl={`institution/${currentInstitutionId}/info`}
						title="Інформація про медзаклад"
					>
						<INFO_SVG />
					</CabinetItem>
				</div>
				<div className="flex flex-col gap-5 w-full desktop:flex-row desktop:gap-x-[30px] desktop:gap-y-[40px] desktop:flex-wrap">
					<h2 className="hidden fontUbuntu30Bold text-[var(--color5)] desktop:block w-full">
						Особиста інформація
					</h2>
					<CabinetItem
						imgUrl="/img/cabinet/personal.svg"
						linkUrl="/cabinet/personal"
						title="Ваші особисті дані"
					>
						<PERSONAL_SVG />
					</CabinetItem>
					<CabinetItem
						imgUrl="/img/cabinet/public-part.svg"
						linkUrl="/"
						title="Перейти на публічну частину"
						className="mt-7 desktop:mt-0"
					>
						<PUBLIC_PART_SVG />
					</CabinetItem>
					<CabinetItem
						imgUrl="/img/cabinet/sign-out.svg"
						linkUrl="/"
						title="Вийти"
						customStyle="text-[var(--error)] desktop:text-[var(--black)]"
					>
						<SING_OUT_SVG />
					</CabinetItem>
				</div>
			</Container>
		</div>
	);
};

export default CabinetTabs;
