import React from 'react';
import CommentReactionBlock from './CommentReactionBlock';
import { Comment } from '@/graphql/generated/types';
import CommentBadges from './CommentBadges';
import scrollToComment from '@/utils/scrollToComment';

const CommentReply = ({ comment }: { comment: Comment }) => {
	return (
		<div className="w-full max-w-[100%]" data-comment-id={comment.id}>
			<h5 className="fontInterBold18 mb-[14px]">{comment.name}</h5>

			<CommentBadges badges={['REPLY']} />

			<div className="text-muted-foreground mb-4">
				Дата публікації :{' '}
				<span>
					{new Date(comment.dateCreated.replace(' ', 'T')).toLocaleDateString('uk-UA')}
				</span>
			</div>

			<div className="mb-6 fontInterRegular18 break-words">
				{comment.replyTo ? (
					<span
						className="text-main cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							if (comment.replyTo) {
								if (comment.replyTo.id) scrollToComment(comment.replyTo.id);
							}
						}}
					>{`@${comment.replyTo.name}`}</span>
				) : (
					''
				)}{' '}
				{comment.text}
			</div>

			<CommentReactionBlock numLikes={comment.numLikes} numDislikes={comment.numDislikes} />
		</div>
	);
};

export default CommentReply;
