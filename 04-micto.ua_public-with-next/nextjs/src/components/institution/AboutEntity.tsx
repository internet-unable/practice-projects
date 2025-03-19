import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { Institution, InstitutionUnit, UnitDepartment } from '@/graphql/generated/types';
import EntityShedule from '../common/EntityShedule';
import EntityPhones from '../common/EntityContacts/EntityPhones';
import EntityEmails from '../common/EntityContacts/EntityEmails';
import { Maybe } from 'graphql/jsutils/Maybe';

// TODO:
// Add links to values if needed

interface AboutTableRow {
	label: string;
	value: React.ReactElement | Maybe<string>;
}

const AboutEntity = ({ entity }: { entity: Institution | InstitutionUnit | UnitDepartment }) => {
	const tableRows = [
		entity.fullName && { label: 'Повна назва', value: entity.fullName },
		'type' in entity && entity?.type && { label: 'Тип закладу', value: entity.type?.name },
		(('legalForm' in entity && entity?.legalForm) ||
			('institution' in entity && entity?.institution?.ownershipForm?.title)) && {
			label: 'Форма власності',
			value: entity.legalForm?.title || entity.institution.ownershipForm.title,
		},
		'edrpou' in entity && entity.edrpou && { label: 'Код ЄДРПО', value: entity.edrpou },
		'city' in entity &&
			entity?.city?.area && { label: 'Область', value: entity.city.area.name },
		'city' in entity &&
			entity?.city?.district && { label: 'Район', value: entity.city.district.name },
		'city' in entity && entity?.city?.name && { label: 'Місто', value: entity.city.name },
		'cityDistrict' in entity &&
			entity?.cityDistrict && { label: 'Район міста', value: entity.cityDistrict.name },
		'address' in entity &&
			entity.address && {
				label: 'Адреса',
				value: `${entity.address.zipCode ? entity.address.zipCode + ', ' : ''}${
					entity.address.address
				}`,
			},
		'schedule' in entity &&
			entity.schedule &&
			entity.schedule?.length > 0 && {
				label: 'Графік роботи',
				value: <EntityShedule items={entity.schedule} onlyValues={true} />,
			},
		'contacts' in entity &&
			entity.contacts?.phones &&
			entity.contacts?.phones.length > 0 && {
				label: 'Телефони',
				value: <EntityPhones phones={entity.contacts.phones} onlyValues={true} />,
			},
		'contacts' in entity &&
			entity.contacts?.emails &&
			entity.contacts?.emails?.length > 0 && {
				label: 'E-mail',
				value: <EntityEmails emails={entity.contacts.emails} onlyValues={true} />,
			},
	].filter(Boolean); // Remove falsy values (e.g., undefined)

	if (tableRows.length === 0) {
		return <div className="w-full bg-white rounded-lg p-6">Немає інформації про заклад</div>;
	}

	return (
		<div className="w-full bg-white rounded-lg p-6">
			<Table className={`${entity.description ? 'mb-4' : ''}`}>
				<TableBody>
					{tableRows.length > 0 &&
						tableRows.map((row, index) => {
							if (row)
								return (
									<AboutTableRow
										rowLabel={row.label}
										rowValue={row.value}
										key={'about_table_row_' + index}
									/>
								);
						})}
				</TableBody>
			</Table>

			{entity.description && (
				<div className="fontInterRegular16">{entity.description && entity.description}</div>
			)}
		</div>
	);
};

const AboutTableRow = ({
	rowLabel = '',
	rowValue = '',
}: {
	rowLabel?: string;
	rowValue?: React.ReactElement | Maybe<string>;
}) => {
	return (
		<TableRow className={'fontInterRegular18 border-none hover:bg-transparent rounded-lg '}>
			<TableCell className="w-[25%] whitespace-nowrap rounded-l-lg px-0 py-4 ">
				{rowLabel}
			</TableCell>
			<TableCell className="rounded-r-lg pl-6 pr-0 py-4">{rowValue}</TableCell>
		</TableRow>
	);
};

export default AboutEntity;
