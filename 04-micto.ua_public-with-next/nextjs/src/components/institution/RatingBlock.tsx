import getWordForm from '@/utils/getWordForm';
import React from 'react';
import { STAR_SVG } from '../common/SVG';

const RatingBlock = ({
	rating,
	reviewsCount,
	className = '',
}: {
	rating: number;
	reviewsCount: number;
	className?: string;
}) => {
	const correctWordForm = getWordForm(reviewsCount, ['відгук', 'відгуки', 'відгуків']);

	return (
		<div className={'flex gap-2 ' + className}>
			{rating}
			<STAR_SVG />
			<span className="inline-flex text-[var(--gray2)]">
				{reviewsCount} {correctWordForm}
			</span>
		</div>
	);
};

export default RatingBlock;
