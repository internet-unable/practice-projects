import * as React from 'react';
import HeaderTabs from '@/controllers/component/Elements/HeaderTabs';
import FormDepartmentEdit from '@/controllers/component/Forms/InstitutionEdit/FormDepartmentEdit';

interface DepartmentEditProps {
	createMode?: boolean;
}

export default function DepartmentEdit({ createMode }: DepartmentEditProps) {
	return (
		<>
			<HeaderTabs
				headerTitle="Відділення"
				headerImgUrl="/img/cabinet/arrow-left.svg"
				flexibleRedirectLink=""
			/>

			<FormDepartmentEdit createMode={createMode} />
		</>
	);
}
