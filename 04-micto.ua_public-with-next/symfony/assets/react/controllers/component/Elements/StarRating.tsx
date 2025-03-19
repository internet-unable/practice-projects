import React from 'react';
import { STAR_SVG } from '@/components/utils/SVG';

type StarRatingProps = {
	marks: number;
	maxMarks?: number;
};

const StarRating: React.FC<StarRatingProps> = ({ marks, maxMarks = 5 }) => {
	const stars = Array.from({ length: maxMarks }, (_, index) => index < marks);

	return (
		<div className="flex items-center gap-2">
			<div className="flex">
				{stars.map((filled, index) => (
					<STAR_SVG key={index} filled />
				))}
			</div>
			<span className="fontRegular2 text-[var(--color10)]">{marks}</span>
		</div>
	);
};

export default StarRating;
