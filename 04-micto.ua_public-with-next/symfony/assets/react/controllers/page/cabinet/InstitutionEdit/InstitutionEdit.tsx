import * as React from 'react';
import HeaderTabs from '@/controllers/component/Elements/HeaderTabs';
import EditTabs from '@/controllers/component/Elements/EditTabs';
import DepartmentList from '@/controllers/component/Elements/UnitDepartment/DepartmentList';
import FormInstitutionUnitEdit from '@/controllers/component/Forms/InstitutionEdit/FormInstitutionEdit';
import { useAppSelector } from '@/reduxToolkit/hooks';

interface InstitutionEditProps {
	createMode?: boolean;
}

export default function InstitutionEdit({ createMode }: InstitutionEditProps) {
	const [isInstitution, setIsInstitution] = React.useState(true);

	const { currentInstitutionId } = useAppSelector((state) => state.myInstitutions);

	return (
		<>
			<HeaderTabs
				headerTitle="Підрозділ"
				headerImgUrl="/img/cabinet/arrow-left.svg"
				flexibleRedirectLink={`/cabinet/institution/${currentInstitutionId}/unit/list`}
			/>

			{!createMode && (
				<EditTabs
					tabs={['Про підрозділ', 'Відділення']}
					isActive={isInstitution}
					setIsActive={setIsInstitution}
				/>
			)}

			{isInstitution ? (
				<FormInstitutionUnitEdit createMode={createMode} />
			) : (
				<DepartmentList />
			)}
		</>
	);
}
