import { InstitutionFilters } from '@/components/Filters';
import { Area, AreaList, GetAreasQuery } from '@/graphql/generated/types';
import { GET_AREAS } from '@/graphql/query';
import client from '@/lib/apolloClient';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

interface UnitTypePageProps {
	areas: Area[];
}

const fetchData = async (id: number) => {
	const { data } = await client.query<GetAreasQuery>({
		query: GET_AREAS,
		variables: { oldId: Number(id) },
	});
	return data.areas;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		if (params?.id) {
			const areas = await fetchData(Number(params.id));

			console.log(areas);

			if (!areas) {
				return { notFound: true };
			}

			return {
				props: { areas: areas.items ? areas.items : null },
				revalidate: 60,
			};
		}
	} catch (error) {
		console.error('Apollo Fetch Error:', error);
		return { props: { data: null } };
	}

	return { notFound: true };
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [], // No predefined paths; will be generated on demand
		fallback: 'blocking', // Wait until the page is generated
	};
};

export default function UnitTypePage({ areas }: UnitTypePageProps) {
	return (
		<div>
			<h1>Unit type</h1>
			<InstitutionFilters items={areas} />
		</div>
	);
}
