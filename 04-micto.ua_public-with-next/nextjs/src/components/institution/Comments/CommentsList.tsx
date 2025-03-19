import React from 'react';
import CommentItem from './CommentItem';
import { Comment, EntityType } from '@/graphql/generated/types';
import { CommentTabDetails, TabType } from './CommentsBlock';
import { GET_ENTITY_COMMENTS } from '@/graphql/query';
import { useQuery } from '@apollo/client';
import { reactApolloClient } from '@/lib/apolloClient';
import { Skeleton } from '@/components/ui/skeleton';

const CommentsList = ({
	initialData,
	currentTab,
	entityType,
	entityId,
}: {
	initialData: Comment[];
	currentTab: TabType;
	entityType: EntityType;
	entityId: number | null;
}) => {
	const [items, setItems] = React.useState<Comment[]>(initialData);

	const { loading, error, data } = useQuery(GET_ENTITY_COMMENTS, {
		client: reactApolloClient,
		variables: {
			entityType: entityType,
			id: entityId,
			filter: { ...CommentTabDetails[currentTab].filter },
		},
	});

	if (loading) {
		return (
			<div className="w-full bg-white rounded-lg p-6 mt-2">
				<div className="flex flex-col gap-16">
					<CommentSkeletonElement />
				</div>
			</div>
		);
	}

	return (
		<div className="w-full bg-white rounded-lg p-6 mt-2">
			<h3 className="fontInterBold25 mb-10">
				Перевірені {currentTab === TabType.REVIEWS ? `відгуки` : 'питання'}
			</h3>

			{items.length ? (
				items.map((el) => {
					return <CommentItem comment={el} key={`comment_${el.id}`} />;
				})
			) : (
				<div>Немає відгуків</div>
			)}
		</div>
	);
};

export default CommentsList;

const CommentSkeletonElement = () => {
	return (
		<div className="flex w-full">
			<div className="flex flex-col gap-4 w-full max-w-[300px]">
				<Skeleton className="w-full h-[24px] max-w-[170px]" />
				<Skeleton className="w-full h-[24px] max-w-[60px]" />
			</div>
			<div className="flex flex-col gap-4 w-full max-w-[calc(100%-300px)]">
				<Skeleton className="w-full h-[24px] " />
				<Skeleton className="w-full h-[24px] max-w-[90%]" />
				<Skeleton className="w-full h-[24px] max-w-[60%]" />
			</div>
		</div>
	);
};
