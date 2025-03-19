import { CALENDAR_SVG, CHEVRON_SVG, STAR_SVG } from '@/components/common/SVG';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import CommentReply from './CommentReply';
import getWordForm from '@/utils/getWordForm';
import CommentReactionBlock from './CommentReactionBlock';
import { Comment } from '@/graphql/generated/types';
import Link from 'next/link';
import modifyDepartmentSlug from '@/utils/formatDepartmentSlug';
import CommentBadges from './CommentBadges';

const tempRepliesArray = [1, 2, 3];

const CommentItem = ({ comment }: { comment: Comment }) => {
	const [repliesOpen, setRepliesOpen] = React.useState(false);
	const repliesWrapperRef = React.useRef<HTMLDivElement>(null);

	const [maxHeight, setMaxHeight] = React.useState(0);

	React.useEffect(() => {
		if (repliesWrapperRef.current) {
			setMaxHeight(
				repliesOpen ? repliesWrapperRef.current.getBoundingClientRect().height : 0
			);
		}
	}, [repliesOpen]);

	const mark = comment.mark ?? 0;

	return (
		<div
			className="flex flex-col lg:gap-4 lg:flex-row lg:flex-nowrap pb-10 border-b border-muted mb-10"
			data-comment-id={comment.id}
		>
			<div className="max-w-[284px] flex-[0_0_284px] w-full">
				<h5 className="fontInterBold18">{comment.name}</h5>
				<div className="flex items-center">
					{comment.mark &&
						[...Array(5)].map((_, index) => (
							<STAR_SVG
								key={index}
								width={14}
								height={14}
								color={index < mark ? '#FBC756' : 'white'}
							/>
						))}

					<span className="ml-2">{comment.mark}</span>
				</div>
				<div className="text-muted-foreground">
					Дата публікації :{' '}
					<span className="text-black">
						{new Date(comment.dateCreated.replace(' ', 'T')).toLocaleDateString(
							'uk-UA'
						)}
					</span>
				</div>
			</div>

			<div className="w-full lg:max-w-[calc(100%-284px)]">
				<CommentBadges badges={[comment.type as string]} />

				<div className="mb-6 fontInterRegular18">{comment.text}</div>

				{comment.monthOfVisit && comment.yearOfVisit && (
					<div className="flex gap-2 mb-4 text-muted-foreground fontInterRegular16">
						<CALENDAR_SVG />
						Відвідування було: {comment.monthOfVisit} {comment.yearOfVisit}
					</div>
				)}

				{comment.department && (
					<div className="flex gap-2 mb-6 text-muted-foreground fontInterRegular16">
						Відділення:
						<Link
							href={`/${comment.department.unit.slug}-i${
								comment.department.unit.oldId || comment.department.unit.id
							}/${modifyDepartmentSlug(comment.department.slug)}`}
							className="text-main"
						>
							{comment.department.name}
						</Link>
					</div>
				)}

				<CommentReactionBlock
					numLikes={comment.numLikes}
					numDislikes={comment.numDislikes}
				/>

				{comment.replies.pageInfo.totalItems > 0 && (
					<>
						<Button
							variant={'plainText'}
							size={'fit'}
							onClick={(e) => {
								setRepliesOpen(!repliesOpen);
							}}
							className="mt-4"
						>
							<CHEVRON_SVG
								className={`${repliesOpen ? 'rotate-180' : ''} duration-300`}
							/>
							<span className="fontInterBold16">
								{comment.replies.pageInfo.totalItems +
									' ' +
									getWordForm(comment.replies.pageInfo.totalItems, [
										'відповідь',
										'відповіді',
										'відповідей',
									])}
							</span>
						</Button>

						<AnimatePresence>
							{repliesOpen && (
								<motion.div
									initial={{ maxHeight: 0 }}
									animate={{
										maxHeight: maxHeight,
									}}
									exit={{ maxHeight: 0 }}
									transition={{ duration: 0.3 }}
									style={{ overflow: 'hidden' }}
								>
									<div
										className="flex flex-col pt-6 pl-4 gap-8"
										ref={repliesWrapperRef}
									>
										{comment.replies?.items &&
											comment.replies.items.map((el) => {
												return (
													<CommentReply
														key={`reply_${el.id}`}
														comment={el}
													/>
												);
											})}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</>
				)}
			</div>
		</div>
	);
};

export default CommentItem;
