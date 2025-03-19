import { COMPLAINT_SVG } from '@/components/common/SVG';
import { cn } from '@/lib/utils';
import React, { ReactElement } from 'react';

export enum CommentBadgeType {
	ADMIN = 'ADMIN',
	INSTITUTION = 'INSTITUTION',
	COMPLAINT = 'COMPLAINT',
	GRATITUDE = 'GRATITUDE',
	QUESTION = 'QUESTION',
	REVIEW = 'REVIEW',
	REPLY = 'REPLY',
}

const BadgeDetails: Record<
	CommentBadgeType,
	{ title: string; icon: ReactElement; className: string }
> = {
	[CommentBadgeType.ADMIN]: {
		title: 'Адміністрація MICTO.UA',
		icon: <></>,
		className: 'text-[var(--blue6)]',
	},
	[CommentBadgeType.INSTITUTION]: {
		title: 'Представник медзакладу',
		icon: <></>,
		className: 'text-[var(--green)]',
	},
	[CommentBadgeType.COMPLAINT]: {
		title: 'Скарга',
		icon: <COMPLAINT_SVG />,
		className: 'text-[var(--red)]',
	},
	[CommentBadgeType.GRATITUDE]: {
		title: 'Подяка',
		icon: <></>,
		className: 'text-[var(--blue3)]',
	},
	[CommentBadgeType.QUESTION]: {
		title: 'Питання',
		icon: <></>,
		className: 'text-[var(--blue7)]',
	},
	[CommentBadgeType.REVIEW]: {
		title: '',
		icon: <></>,
		className: 'text-[var(--blue7)]',
	},
	[CommentBadgeType.REPLY]: {
		title: '',
		icon: <></>,
		className: 'text-[var(--blue7)]',
	},
};

const CommentBadges = ({ badges, className = '' }: { badges: string[]; className?: string }) => {
	if (badges.length > 0) {
		if (
			badges.length === 1 &&
			(badges[0] === CommentBadgeType.REVIEW || badges[0] === CommentBadgeType.REPLY)
		) {
			return;
		}

		return (
			<ul className={cn(['flex flex-wrap gap-6 mb-4', className])}>
				{badges.map((el) => {
					return (
						<li
							className={cn(
								'flex gap-2 items-center fontInterMedium18',
								BadgeDetails[el as CommentBadgeType].className
							)}
							key={`Badge_${el.toString()}`}
						>
							{BadgeDetails[el as CommentBadgeType].icon}
							<span>{BadgeDetails[el as CommentBadgeType].title}</span>
						</li>
					);
				})}
			</ul>
		);
	}

	return <></>;
};

export default CommentBadges;
