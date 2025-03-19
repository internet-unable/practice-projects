import client from '@/lib/apolloClient';
import { GET_ALL_INSITUTION_UNIT_TYPES, GET_AREAS, GET_AREAS_CENTERS } from '@/graphql/query';
import {
	Area,
	AreaList,
	CityList,
	GetAllInstitutionUnitTypesQuery,
	GetAreasCenterQuery,
	GetAreasQuery,
	InstitutionUnitTypeList,
} from '@/graphql/generated/types';
import { Catalog } from '@/components/Main/Catalog';
import ClinicList from '@/components/Main/ClinicList';
import Map from '@/components/Main/Map';
import { Partner } from '@/components/Main/Partner';
import groupByFirstLetter from '@/utils/GroupByFirstLetter';
import { GetStaticProps } from 'next';

interface HomePageProps {
	institutionUnitTypes: InstitutionUnitTypeList;
	areas: AreaList;
	areaCenters: CityList;
}

const fetchData = async () => {
	const [institutionUnitTypesResponse, areasResponse, areaCentersResponse] = await Promise.all([
		client.query<GetAllInstitutionUnitTypesQuery>({
			query: GET_ALL_INSITUTION_UNIT_TYPES,
		}),
		client.query<GetAreasQuery>({
			query: GET_AREAS,
		}),
		client.query<GetAreasCenterQuery>({
			query: GET_AREAS_CENTERS,
		}),
	]);
	return {
		institutionUnitTypes: institutionUnitTypesResponse.data.institutionUnitTypes,
		areas: areasResponse.data.areas,
		areaCenters: areaCentersResponse.data.areaCenters,
	};
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { institutionUnitTypes, areas, areaCenters } = await fetchData();
		if (!institutionUnitTypes) {
			return { notFound: true };
		}

		return {
			props: { institutionUnitTypes, areas, areaCenters },
			revalidate: 60,
		};
	} catch (error) {
		console.error('Apollo Fetch Error:', error);

		if (error instanceof Error) {
			console.error('Error message:', error.message);
			console.error('Stack trace:', error.stack);
		} else {
			console.error('Non-Error object caught:', JSON.stringify(error, null, 2));
		}

		return { props: { unitTypes: null } };
	}
};

export type GroupedInstitutionUnitTypes = Record<
	string,
	GetAllInstitutionUnitTypesQuery['institutionUnitTypes']['items']
>;

export default function Home({ areas, institutionUnitTypes, areaCenters }: HomePageProps) {
	const list = institutionUnitTypes.items;
	const [groupedItems, firstLetters] = groupByFirstLetter(list!, 'name');

	return (
		<>
			<Catalog />
			<Map areaCenters={areaCenters} areas={areas} />
			<ClinicList firstLetters={firstLetters} groupedItems={groupedItems} />
			<Partner />
		</>
	);
}
