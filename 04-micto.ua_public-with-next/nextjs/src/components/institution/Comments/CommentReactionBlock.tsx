import { DISLIKE_SVG, LIKE_SVG } from '@/components/common/SVG';
import { Button } from '@/components/ui/button';
import React from 'react';

const CommentReactionBlock = ({
	numLikes,
	numDislikes,
}: {
	numLikes: number;
	numDislikes: number;
}) => {
	return (
		<div className="flex gap-4 items-center fontInterRegular16">
			<Button
				variant={'plainText'}
				size={'fit'}
				className="border-0 h-fit fontInterBold16 text-black hover:text-[var(--blue8)] [&_svg]:size-[20px]"
			>
				<span className="flex items-center gap-2 fontInterBold16 w-fit">
					<LIKE_SVG height={22} width={22} className="w-[20px]" />
					{numLikes}
				</span>
			</Button>

			<Button
				variant={'plainText'}
				size={'fit'}
				className="border-0 h-fit fontInterBold16 text-black hover:text-[var(--blue8)] [&_svg]:size-[20px]"
			>
				<span className="flex items-center gap-2 fontInterBold16">
					<DISLIKE_SVG />
					{numDislikes}
				</span>
			</Button>

			<Button
				variant={'plainText'}
				size={'fit'}
				className="border-0 h-fit fontInterBold16 text-black hover:text-[var(--blue8)]"
			>
				Відповісти
			</Button>
		</div>
	);
};

export default CommentReactionBlock;
