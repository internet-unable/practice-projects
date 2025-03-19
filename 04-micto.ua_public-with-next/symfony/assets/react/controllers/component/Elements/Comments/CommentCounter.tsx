import { Skeleton } from '@/components/ui/skeleton';
import { useAppSelector } from '@/reduxToolkit/hooks';
import React from 'react';

const CommentCounter = () => {
	const { loading, entityComments } = useAppSelector((state) => state.myComments);

	if (!entityComments?.items) {
		return;
	}

	const finalAmount = entityComments.items.length;

	let message;
	if (finalAmount === 0) {
		message = '0 відгуків';
	} else if (finalAmount === 1) {
		message = '1 відгук';
	} else if (finalAmount >= 2 && finalAmount <= 4) {
		message = `${finalAmount} відгуки`;
	} else {
		message = `${finalAmount} відгуків`;
	}

	if (loading) {
		return <Skeleton className="w-[70px] h-5 rounded-[var(--default-round)]" />;
	}

	return <span className="fontRegular text-[var(--gray3)] flex items-center">{message}</span>;
};

export default CommentCounter;
