import ContentWrapper from '@/components/common/ContentWrapper';
import FullWidthPageHeader from '@/components/common/FullWidthPageHeader';
import ItemsList from '@/components/common/ItemsList';
import { Area } from '@/graphql/generated/types';
import { GET_AREA_BY_ID } from '@/graphql/query';
import client from '@/lib/apolloClient';
import { GetStaticPaths, GetStaticProps, Metadata } from 'next';
import { useRouter } from 'next/router';
import React, { cache } from 'react';

interface AreaPageProps {
	area: Area;
}

const fetchAreaData = cache(async (id: number): Promise<Area> => {
	const { data } = await client.query({
		query: GET_AREA_BY_ID,
		variables: { id: Number(id) },
	});
	return data.area;
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		if (params?.id) {
			const area = await fetchAreaData(Number(params.id));

			if (!area) {
				return { notFound: true };
			}

			return {
				props: { area },
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

export async function generateMetadata({
	params,
}: {
	params: { slug: string; id: number };
}): Promise<Metadata> {
	const id = (await params).id;
	const areaData = await fetchAreaData(id);

	if (areaData) {
		return {
			title: `Медичні заклади ${areaData.fullName}, лікарні, поліклініки | ${process.env.SITE_NAME}`,
			// description: areaData.description || 'Default description for the area',
			// openGraph: {
			// 	title: areaData.name,
			// 	description: areaData.description || 'Default description for the area',
			// 	images: areaData.imageUrl ? [{ url: areaData.imageUrl }] : [],
			// },
		};
	}

	return {
		title: `Медичні заклади лікарні, поліклініки | ${process.env.SITE_NAME}`,
		description: 'Default description for the area',
	};
}

export default function AreaPage({ area }: AreaPageProps) {
	let citiesList: any[] = [];

	if (area.districts.items) {
		area?.districts?.items.forEach((el: any) => {
			citiesList = [...citiesList, ...el.cities.items];
		});
	}

	if (area) {
		return (
			<>
				<FullWidthPageHeader
					title={area.fullName ? area.fullName : ''}
					itemsCount={area.numberOfInstitutionUnits}
					titleVariants={['лікарня', 'лікарні', 'лікарень']}
					className="mb-20"
				/>

				{area?.districts?.items && area?.districts?.items.length > 0 && (
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
								items={area.districts.items.map((el: any) => {
									return {
										title: el.shortName,
										link: `/${el.slug}-r${el.oldId}`,
										id: el.id,
									};
								})}
								title="Оберіть район області"
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
	} else {
		<>
			<FullWidthPageHeader title="Область не знайдено" className="mb-20" />
		</>;
	}
}

export const revalidate = 20;
