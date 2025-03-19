import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { fetchComments } from '@/reduxToolkit/slices/commentsUnitSlice';
import { setEntityId } from '@/reduxToolkit/slices/filterCommentsSlice';
import { EntityType } from '@/Types/cabinetTypes';
import React from 'react';
import { Link } from 'react-router-dom';
import EmptyComments from './EmptyComments';
import Comment from './Comment';

export default function CommentsList() {
	const dispatch = useAppDispatch();
	const { currentInstitutionId } = useAppSelector((state) => state.myInstitutions);

	const { loading, entityComments, errors } = useAppSelector((state) => state.myComments);
	const { order, filter, entityType, entityId } = useAppSelector((state) => state.filterComments);

	React.useEffect(() => {
		if (entityId) {
			dispatch(
				fetchComments({
					entityId: Number(entityId),
					filter: {
						commentType: filter.typeOfComment,
						dateFrom: filter.date.from,
						dateTo: filter.date?.to ? filter.date.to : null,
						withChildrenUnits: true,
						unitDepartment: filter?.unitDepartments ? filter?.unitDepartments : null,
					},
					order: order,
					entityType: entityType ? EntityType[entityType] : EntityType.INSTITUTION,
				})
			);
		}
	}, [filter, entityId, order]);

	React.useEffect(() => {
		if (currentInstitutionId) {
			dispatch(setEntityId(currentInstitutionId));
		}
	}, [currentInstitutionId]);

	if (loading) {
		return (
			<>
				<div className="flex flex-col gap-5 mt-5">
					<Skeleton className="w-full min-h-[317px] rounded-[var(--default-round)]" />
					<Skeleton className="w-full min-h-[317px] rounded-[var(--default-round)]" />
				</div>
			</>
		);
	}

	return (
		<>
			{!entityComments?.items.length ? (
				<div className="flex flex-col w-full">
					{filter.date || filter.typeOfComment ? (
						<EmptyComments filtered={true} />
					) : (
						<EmptyComments />
					)}
				</div>
			) : (
				<>
					<div className="flex flex-col gap-4 mt-5 desktop:mt-0">
						{entityComments.items.map((comment) => (
							<Comment
								key={comment.id}
								comment={comment}
								isCommentsPage={true}
								isNew={true}
							>
								<Link
									className="fontRegular2Bold text-[var(--color10)] text-[14px]"
									to={`/cabinet/comment/${comment.id}`}
								>
									{comment.replies.items.length} відповідей
								</Link>
							</Comment>
						))}
					</div>
				</>
			)}
		</>
	);
}
