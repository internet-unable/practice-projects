import React, { ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { LIKE_SVG, MESSAGE_SVG, QUESTION_SVG } from '@/components/utils/SVG';
import {
	CommentType,
	markNotificationAsReadResponse,
	UserNotification,
} from '@/Types/cabinetTypes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/reduxToolkit/hooks';
import { markNotificationsAsRead } from '@/reduxToolkit/slices/notificationsSlice';
import { setCurrentInstitutionId } from '@/reduxToolkit/slices/institutionSlice';

interface INotificationProps {
	className?: string;
	notification: UserNotification;
}

interface IconProps {
	color?: string;
	className?: string;
}

const commentDetails: Record<CommentType, { title: string; icon: ReactElement }> = {
	[CommentType.COMPLAINT]: {
		title: 'Вам залишили скаргу',
		icon: <MESSAGE_SVG color="E0625F" />,
	},
	[CommentType.QUESTION]: {
		title: 'Вам залишили питання',
		icon: <QUESTION_SVG color={'84D7FB'} />,
	},
	[CommentType.GRATITUDE]: {
		title: 'Вам залишили подяку',
		icon: <LIKE_SVG filled={false} color={'84D7FB'} />,
	},
	[CommentType.REPLY]: {
		title: 'Вам залишили відгук (відповідь)',
		icon: <MESSAGE_SVG />,
	},
	[CommentType.REVIEW]: {
		title: 'Вам залишили відгук',
		icon: <MESSAGE_SVG />,
	},
};

const Notification: React.FC<INotificationProps> = ({ className, notification }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { title, icon: Icon } = commentDetails[notification.notification.comment.type];

	const handleClick = async () => {
		if (notification.notification.comment.id) {
			dispatch(markNotificationsAsRead([notification.id])).then((res) => {
				const data = res.payload as markNotificationAsReadResponse;

				if (data.data.markNotificationAsRead) {
					dispatch(
						setCurrentInstitutionId(notification.notification.comment.institution.id)
					);
					navigate(`/cabinet/comment/${notification.notification.comment.id}`);
				}
			});
		}
	};

	return (
		<div
			onClick={handleClick}
			className={cn(
				`flex flex-col gap-3 relative p-4 rounded-[var(--default-round)] cursor-pointer ${
					!notification.isRead ? 'bg-[var(--bg-color)]' : 'bg-[var(--bg-white)]'
				}`,
				className
			)}
		>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-3">
					{Icon}

					<h5 className="fontMedium text-[16px] text-[var(--color10)]">{title}</h5>
					<h4>id: {notification.id}</h4>
				</div>

				{!notification.isRead && <span className="w-2 h-2 rounded-full bg-[#76CA66] " />}
			</div>

			<p className="fontRegular line-clamp-3 pl-8 text-[var(--color10)]">
				{notification.notification.comment.text}
			</p>
			<span className="fontRegular pl-8 text-[var(--gray4)]">
				{notification.notification.creationDate}
			</span>
		</div>
	);
};

export default Notification;
