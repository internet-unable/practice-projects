import ContentWrapper from '@/components/common/ContentWrapper';
import FullWidthPageHeader from '@/components/common/FullWidthPageHeader';
import ItemsList from '@/components/common/ItemsList';
import { CityDistrict, CityList, District } from '@/graphql/generated/types';
import { GET_CITIES, GET_CITY_DISTRICT_BY_ID, GET_DISTRICT_BY_ID } from '@/graphql/query';
import client from '@/lib/apolloClient';
import { GetStaticPaths, GetStaticProps, Metadata } from 'next';
import React, { cache } from 'react';

interface DistrictPageProps {
	district: District | CityDistrict;
	cities: CityList | null;
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string; id: number };
}): Promise<Metadata> {
	const id = (await params).id;
	const { district } = await fetchDistrictData(id);

	if (district) {
		return {
			title: `Медичні заклади ${district.fullName}, лікарні, поліклініки | ${process.env.SITE_NAME}`,
			// description: districtData.description || 'Default description for the area',
			// openGraph: {
			// 	title: districtData.fullName,
			// 	description: districtData.description || 'Default description for the area',
			// },
		};
	}

	return {
		title: `Медичні заклади лікарні, поліклініки | ${process.env.SITE_NAME}`,
		description: 'Default description for the area',
	};
}

const fetchDistrictData = cache(async (id: number): Promise<DistrictPageProps> => {
	const [districtResponse, cityDistrictResponse] = await Promise.all([
		client.query({
			query: GET_DISTRICT_BY_ID,
			variables: { oldId: Number(id) },
		}),
		client.query({
			query: GET_CITY_DISTRICT_BY_ID,
			variables: { oldId: Number(id) },
		}),
	]);

	if (cityDistrictResponse.data.cityDistrict) {
		const { data } = await client.query({
			query: GET_CITIES,
			variables: {
				districtId: Number(
					cityDistrictResponse.data.cityDistrict.id ||
						cityDistrictResponse.data.cityDistrict.oldId
				),
			},
		});
		return {
			district: cityDistrictResponse.data.cityDistrict,
			cities: data.cities,
		};
	}

	return {
		district: districtResponse.data.district || cityDistrictResponse.data.cityDistrict,
		cities: null,
	};
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		if (params?.id) {
			const { district, cities } = await fetchDistrictData(Number(params.id));

			if (!district) {
				return { notFound: true };
			}

			return {
				props: { district, cities },
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

export default function DistrictPage({ district, cities }: DistrictPageProps) {
	let citiesList: any[] = [];

	if ('cities' in district && district?.cities?.items) {
		district.cities.items.forEach((el: any) => {
			citiesList = [...citiesList, el];
		});
	} else if (cities?.items) {
		cities.items.forEach((el: any) => {
			citiesList = [...citiesList, el];
		});
	}

	return (
		<>
			<FullWidthPageHeader
				title={district.fullName ? district.fullName : ''}
				itemsCount={district.numberOfInstitutionUnits}
				titleVariants={['заклад', 'заклади', 'закладів']}
				className="mb-20 mt-10"
			/>

			{citiesList && citiesList.length > 0 && (
				<>
					<ContentWrapper wrapperClassName="mb-20">
						<ItemsList
							items={citiesList
								.filter((el) => {
									if (el.type === 'CITY' || el.type === 'SPECIAL') {
										return el;
									}
								})
								.map((el) => {
									return {
										title: el.shortName,
										link: `/${el.slug}-r${el.oldId}`,
										id: el.id,
									};
								})}
							title="Оберіть місто обласного значення"
						/>
					</ContentWrapper>

					<ContentWrapper wrapperClassName="mb-20">
						<ItemsList
							items={citiesList
								.filter((el) => {
									if (el.type !== 'CITY' && el.type !== 'SPECIAL') {
										return el;
									}
								})
								.map((el) => {
									console.log(el);
									return {
										title: el.shortName,
										link: `/${el.slug}-r${el.oldId}`,
										id: el.id,
									};
								})}
							title="Населені пункти"
						/>
					</ContentWrapper>
				</>
			)}
		</>
	);
}

export const revalidate = 20;
