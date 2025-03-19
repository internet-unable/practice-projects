import React from 'react';

import StarRating from '@/controllers/component/Elements/StarRating';
import { cn } from '@/lib/utils';
import { IComment } from '@/Types/cabinetTypes';
import { Link } from 'react-router-dom';
import CommentTag from './CommentTag';

interface IPropsComment {
	comment: IComment;
	isNew?: boolean;
	isCommentsPage?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const Comment: React.FC<IPropsComment> = ({
	comment,
	isNew,
	isCommentsPage,
	children,
	className,
}) => {
	return (
		<div
			className={cn(
				'relative flex flex-col bg-[var(--white)] rounded-[var(--default-round)] p-4 desktop:grid desktop:grid-cols-3 gap-6',
				className
			)}
		>
			<div>
				<div className="flex justify-between items-center desktop:justify-start desktop:flex-col-reverse desktop:items-start">
					<h5 className="fontRegular2Bold ">{comment.name}</h5>
					{isNew && isCommentsPage && (
						<div className="text-[var(--success)] fontRegular2">Новий</div>
					)}
					{comment.mark && !isCommentsPage && <StarRating marks={comment.mark} />}
				</div>

				<span className="block desktop:hidden">
					{comment.type && <CommentTag type={comment.type} />}
				</span>

				<div className="fontRegular text-[var(--color10)] mt-1">
					<span className="fontRegular text-[var(--gray3)]">Дата публікації :</span>{' '}
					{new Date(comment.dateCreated).toLocaleDateString('uk-UA')}
				</div>
			</div>

			<div className="flex flex-col gap-2 col-start-2 col-end-4">
				<span className="hidden desktop:block">
					{comment.type && <CommentTag type={comment.type} />}
				</span>
				<p className="fontRegular text-[var(--color10)] mt-3 line-clamp-4  desktop:mt-0">
					{comment.text}
				</p>
				{comment?.unit?.id && comment?.institution?.id && (
					<div>
						<span className="fontRegular text-[var(--gray3)]">Підрозділ: </span>
						<Link
							className="fontRegular text-[var(--color5)] ml-1"
							to={`/cabinet/institution/${comment.institution.id}/unit/${comment.unit.id}/edit`}
						>
							{comment.unit.name}
						</Link>
					</div>
				)}

				{children}
			</div>
		</div>
	);
};

export default Comment;
