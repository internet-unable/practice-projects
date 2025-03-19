import { GET_CITY_BY_ID, GET_INSTITUTION_UNITS } from '@/graphql/query';
import ContentWrapper from '@/components/common/ContentWrapper';
import FullWidthPageHeader from '@/components/common/FullWidthPageHeader';
import ItemsList from '@/components/common/ItemsList';
import client from '@/lib/apolloClient';
import { GetStaticPaths, GetStaticProps, Metadata } from 'next';
import React, { cache } from 'react';
import {
	City,
	InstitutionUnit,
	InstitutionUnitList,
	InstitutionUnitType,
} from '@/graphql/generated/types';
import { Button } from '@/components/ui/button';
import { BadgeType, EntityBadgeDetails } from '@/components/institution/EntityBadges';
import { CityFilters } from '@/components/Filters';

interface CityPageProps {
	city: City;
	institutionUnitsList: InstitutionUnitList;
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string; id: number };
}): Promise<Metadata> {
	const id = (await params).id;
	const { city, institutionUnitsList } = await fetchCityData(id);

	if (city) {
		return {
			title: `Медичні заклади ${city.fullName}, лікарні, поліклініки | ${process.env.SITE_NAME}`,
		};
	}

	return {
		title: `Медичні заклади лікарні, поліклініки | ${process.env.SITE_NAME}`,
		description: 'Default description for the area',
	};
}

const fetchCityData = cache(
	async (
		id: number
	): Promise<{
		city: City;
		institutionUnitsList: InstitutionUnitList;
	}> => {
		const [cityResponse, institutionUnitsListResponse] = await Promise.all([
			client.query({
				query: GET_CITY_BY_ID,
				variables: { oldId: Number(id) },
			}),
			client.query({
				query: GET_INSTITUTION_UNITS,
				variables: { cityIds: [Number(id)] },
			}),
		]);
		return {
			city: cityResponse.data.city,
			institutionUnitsList: institutionUnitsListResponse.data.institutionUnits,
		};
	}
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		if (params?.id) {
			const { city, institutionUnitsList } = await fetchCityData(Number(params.id));

			if (!city) {
				return { notFound: true };
			}

			return {
				props: {
					city,
					institutionUnitsList,
				},
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

export default function CityPage({ city, institutionUnitsList }: CityPageProps) {
	const filterItems: InstitutionUnitType[] = [
		{
			name: 'test',
			numberOfInstitutionUnits: 14,
			slug: 'test',
			id: 123,
			oldId: 321,
		},
	];

	return (
		<>
			<FullWidthPageHeader
				title={city.fullName ? city.fullName : ''}
				itemsCount={city.numberOfInstitutionUnits}
				titleVariants={['лікарня', 'лікарні', 'лікарень']}
				className="mb-20 mt-10"
			/>

			{city?.cityDistricts?.items && city?.cityDistricts?.items.length > 0 && (
				<ContentWrapper wrapperClassName="mb-20">
					<ItemsList
						items={city.cityDistricts.items.map((el: any) => ({
							title: el.shortName ? el.shortName : el.fullName ? el.fullName : '',
							link: `/${el.slug}-r${el.oldId}`,
							id: el.id,
						}))}
						title="Райони міста"
					/>
				</ContentWrapper>
			)}

			<ContentWrapper wrapperClassName="my-10 flex flex-nowrap lg:gap-x-2">
				{filterItems.length > 0 && (
					<div className="flex-[0_0_300px] bg-white p-6 rounded-lg h-fit">
						<CityFilters items={filterItems} />
					</div>
				)}
				<div className="flex flex-col w-full flex-[1_1_calc(100%-300px)] gap-y-6">
					{institutionUnitsList.items ? (
						institutionUnitsList.items.map((el: InstitutionUnit) => {
							return (
								<li
									key={el.id || el.oldId}
									className="flex-[1_1_100%] lg:flex-[0_1_24%] text-[var(--main)] font-intermedium list-none bg-white rounded-lg p-6"
								>
									<div className="flex flex-col md:flex-row md:justify-between w-full gap-4">
										<div className="flex flex-col gap-4 max-w-[calc(100%-144px)] w-full">
											{el.oldId || el.id ? (
												<a
													className="cursor-pointer w-fit fontInterMedium20 text-black"
													href={`/${el.slug}-i${el.oldId || el.id}`}
												>
													{el.name}
												</a>
											) : (
												<div className="w-fit fontInterMedium20">
													{el.name}
												</div>
											)}

											{el.institution.ownershipForm.name && (
												<div className="flex flex-nowrap gap-2">
													{/* {
														EntityBadgeDetails[
															el.institution.ownershipForm
																.name as BadgeType
														].icon
													} */}
													<span>
														{
															EntityBadgeDetails[
																el.institution.ownershipForm
																	.name as BadgeType
															].title
														}
													</span>
												</div>
											)}
										</div>

										<Button
											variant="default"
											size="default"
											asChild
											className="min-w-[144px] max-w-[144px]"
										>
											{(el.oldId || el.id) && (
												<a
													href={`/${el.slug}-i${el.oldId || el.id}`}
													className="text-white w-full h-full"
												>
													Детальніше
												</a>
											)}
										</Button>
									</div>
								</li>
							);
						})
					) : (
						<p>Медичні заклади не знайдено</p>
					)}
				</div>
			</ContentWrapper>
		</>
	);
}
