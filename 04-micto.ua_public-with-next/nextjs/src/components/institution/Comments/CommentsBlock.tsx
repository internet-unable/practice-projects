'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { COMMENT_SVG, QUESTION_MARK_CIRCLE_SVG, STAR_SVG } from '@/components/common/SVG';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import {
	Comment,
	CommentFilterInput,
	EntityType,
	Institution,
	InstitutionUnit,
	TypeOfComment,
	UnitDepartment,
} from '@/graphql/generated/types';
import QuestionForm from './QuestionForm';

export enum TabType {
	QUESTIONS = 'QUESTIONS',
	REVIEWS = 'REVIEWS',
}

export const CommentTabDetails: Record<TabType, { filter: CommentFilterInput }> = {
	[TabType.REVIEWS]: {
		filter: {
			commentType: [TypeOfComment.Review, TypeOfComment.Complaint, TypeOfComment.Gratitude],
		},
	},
	[TabType.QUESTIONS]: {
		filter: {
			commentType: [TypeOfComment.Question],
		},
	},
};

const CommentsBlock = ({
	entity,
	entityType,
	commentsCount = 0,
	initialData = [],
}: {
	entity: InstitutionUnit | Institution | UnitDepartment;
	entityType: EntityType;
	commentsCount?: number;
	initialData?: Comment[];
}) => {
	const [currentTab, setCurrentTab] = React.useState<TabType>(TabType.REVIEWS);

	const buttonOnClick = (selectedButton: TabType) => {
		setCurrentTab(selectedButton);
	};

	return (
		<>
			<div className="w-full bg-white rounded-lg p-6 mt-6">
				<h3 className="fontInterBold25 mb-10">Відгуки та питання</h3>

				<div className="flex flex-wrap gap-4 lg:flex-nowrap lg:mb-10">
					<div className="flex gap-1 flex-col">
						<span className="fontInterMedium18">Рейтинг лікарні</span>
						<div className="flex gap-2 items-center">
							<STAR_SVG height={32} width={32} />
							<span className="fontUbuntuBold25">
								{entity.rating ? entity.rating : '-'}
							</span>
						</div>
					</div>

					<div className="flex gap-1 flex-col lg:ml-10">
						<span className="fontInterMedium18">Кількість дописів</span>
						<div className="flex gap-2 items-center">
							<COMMENT_SVG height={22} width={22} />
							<span className="fontUbuntuBold25">
								{commentsCount ? commentsCount : 0}
							</span>
						</div>
					</div>

					<div className="lg:ml-20 flex gap-2 lg:max-w-[50%] mb-6 lg:mb-0">
						<QUESTION_MARK_CIRCLE_SVG className="flex-[0_0_24px]" />
						<span className="text-muted-foreground fontInterMedium18 mt-[3px]">
							Ми публікуємо всі змістовні відгуки задля формування чесного рейтингу
							про медзаклади України
						</span>
					</div>
				</div>

				<div className="flex gap-4 mb-10">
					<Button
						className="w-[190px]"
						variant={currentTab === TabType.REVIEWS ? 'secondary' : 'mutedOutline'}
						onClick={() => {
							buttonOnClick(TabType.REVIEWS);
						}}
					>
						Відгуки
					</Button>
					<Button
						className="w-[190px]"
						variant={currentTab === TabType.QUESTIONS ? 'secondary' : 'mutedOutline'}
						onClick={() => {
							buttonOnClick(TabType.QUESTIONS);
						}}
					>
						Питання
					</Button>
				</div>

				{currentTab === TabType.REVIEWS ? <CommentForm /> : <QuestionForm />}
			</div>

			<CommentsList
				initialData={initialData}
				currentTab={currentTab}
				entityId={entity.id ? entity.id : null}
				entityType={entityType}
			/>
		</>
	);
};

export default CommentsBlock;
