import ContentWrapper from '@/components/common/ContentWrapper';
import { PENCIL_SVG } from '@/components/common/SVG';
import AboutEntity from '@/components/institution/AboutEntity';
import CommentsBlock from '@/components/institution/Comments/CommentsBlock';
import EntityBadges from '@/components/institution/EntityBadges';
import EntityImages from '@/components/institution/EntityImages';
import EntityName from '@/components/institution/EntityName';
import MsekReformBlock from '@/components/institution/MsekReformBlock';
import RatingBlock from '@/components/institution/RatingBlock';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommentList, EntityType, UnitDepartment } from '@/graphql/generated/types';
import { GET_ENTITY_COMMENTS, GET_UNIT_DEPARTMENT_BY_OLDID } from '@/graphql/query';
import client from '@/lib/apolloClient';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { cache } from 'react';

interface DepartmentPageProps {
	department: UnitDepartment;
	comments: CommentList;
}

const fetchUnitDepartment = cache(
	async (
		oldId: number
	): Promise<{
		department: UnitDepartment;
		comments: CommentList;
	}> => {
		const [departmentResponse, commentsResponse] = await Promise.all([
			client.query({
				query: GET_UNIT_DEPARTMENT_BY_OLDID,
				variables: { oldId: Number(oldId) },
			}),
			client.query({
				query: GET_ENTITY_COMMENTS,
				variables: {
					entityType: EntityType.UnitDepartment,
					id: oldId,
					filter: {
						commentType: ['REVIEW', 'COMPLAINT', 'GRATITUDE'],
					},
				},
			}),
		]);

		return {
			department: departmentResponse.data.unitDepartment,
			comments: commentsResponse.data.entityComments,
		};
	}
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		if (params?.id) {
			const { department, comments } = await fetchUnitDepartment(Number(params.id));

			if (!department) {
				return { notFound: true };
			}

			return {
				props: { department, comments },
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

export default function UnitDepartmentPage({ department, comments }: DepartmentPageProps) {
	return (
		<>
			<ContentWrapper>
				<div className="flex flex-col mb-10">
					<div className="flex flex-wrap lg:flex-nowrap gap-2 duration-300">
						<div className="flex flex-col w-full items-start gap-2 duration-300">
							<div className="flex flex-col w-full items-start p-6 bg-white rounded-lg duration-300 h-fit">
								<RatingBlock
									rating={department.rating}
									reviewsCount={comments.pageInfo.totalItems}
									className="mb-4"
								/>

								<EntityBadges badges={[]} className="mb-4" />

								<EntityName
									shortName={department.name}
									fullName={department.fullName ? department.fullName : null}
									className="mb-4"
								/>
							</div>

							<div className="flex flex-col w-full items-start p-6 bg-[var(--blue1)] rounded-lg duration-300 h-fit">
								<div>
									<p className="fontInterRegular18">
										Якщо Ви працівник або пацієнт цього медзакладу і знаєте його
										актуальні контакти — надішліть їх нам через кнопку{' '}
										<span className="text-main fontInterBold18 cursor-pointer">
											`&quot;`Запропонувати правки`&quot;`
										</span>
										.
									</p>
								</div>
							</div>

							<div className="flex flex-col w-full items-start rounded-lg duration-300 h-fit">
								<Tabs className="w-full" defaultValue={'about'}>
									<TabsList className="grid w-full grid-cols-1">
										<TabsTrigger value="about">Про заклад</TabsTrigger>
									</TabsList>
									<TabsContent value="about">
										<AboutEntity entity={department} />
									</TabsContent>
								</Tabs>
							</div>
						</div>

						<div className="flex flex-col flex-[1_1_432px] gap-2 lg:flex-[0_0_432px]">
							{/* TODO: Add if */}
							{/* <MsekReformBlock /> */}

							<div className="sticky top-4">
								<EntityImages wrapperClassName="p-6 bg-white rounded-lg flex justify-center" />

								<div className="flex flex-col gap-4 p-6 bg-white rounded-lg">
									<Button variant="default" className="w-full">
										<PENCIL_SVG color="white" />
										Написати відгук
									</Button>
									<Button variant="outline" className="w-full">
										Це мій медзаклад
									</Button>
									<Button variant="outline" className="w-full">
										Запропонувати правки
									</Button>
								</div>
							</div>
						</div>
					</div>

					<CommentsBlock
						entity={department}
						entityType={EntityType.UnitDepartment}
						commentsCount={comments.pageInfo.totalItems}
						initialData={comments.items ? comments.items : []}
					/>
				</div>
			</ContentWrapper>
		</>
	);
}
