import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CLOSE_SVG, VIEW_STATUS_SVG } from '@/components/utils/SVG';
import React from 'react';
import { useMedia } from 'react-use';
import Notification from '../Elements/Notification';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import {
	fetchUserNotifications,
	markNotificationsAsRead,
} from '@/reduxToolkit/slices/notificationsSlice';

const Notifications = () => {
	const dispatch = useAppDispatch();
	const { notifications } = useAppSelector((state) => state.notifications);
	const popoverRef = React.useRef<HTMLButtonElement>();
	const isMedia991 = useMedia('(min-width: 991px)');

	React.useEffect(() => {
		dispatch(fetchUserNotifications());
	}, []);

	const markAllAsRead = () => {
		const allIds = notifications.map((el) => el.id);
		dispatch(markNotificationsAsRead(allIds));
	};

	return (
		<>
			{!isMedia991 ? (
				<Drawer>
					<DrawerTrigger>
						<div className="relative">
							<img className="" src="/img/bell.svg" alt="Bell" />
							<span className="block w-4 h-4 rounded-full absolute top-[-1px] right-[-4px] bg-[#76CA66]" />
						</div>
					</DrawerTrigger>
					<DrawerContent className="top-[73px] mt-0  h-full overflow-y-auto after:!content-none">
						<div className="p-6 relative">
							<DrawerHeader className="flex items-center justify-between p-0">
								<div className="flex items-center gap-3">
									<DrawerClose>
										<CLOSE_SVG />
									</DrawerClose>
									<DrawerTitle className="fontUbuntu20Bold text-[var(--color10)]">
										Сповіщення
										<span className="fontMediumRegular text-[14px] ml-2">
											{notifications.length}
										</span>
									</DrawerTitle>
								</div>
								<Button
									className="ml-auto focus-visible:ring-0"
									variant="ghost"
									size="icon"
									aria-label="Позначити всі як прочитані"
									onClick={markAllAsRead}
								>
									<VIEW_STATUS_SVG className="!w-[24px]" />
								</Button>
							</DrawerHeader>
							<div className="flex flex-col gap-4 mt-8 mb-14 overflow-hidden overflow-y-auto">
								{notifications.map((el) => {
									return (
										<Notification
											notification={el}
											key={'notification_' + el.id}
										/>
									);
								})}
							</div>
						</div>
					</DrawerContent>
				</Drawer>
			) : (
				<Popover>
					<PopoverTrigger asChild ref={popoverRef}>
						<div className="relative cursor-pointer">
							<img className="" src="/img/bell.svg" alt="Bell" />
							<span className="block w-4 h-4 rounded-full absolute top-[-1px] right-[-4px] bg-[#76CA66]" />
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-[420px] max-h-[625px] overflow-hidden overflow-y-auto">
						<div className="w-full flex items-center gap-2 mb-4">
							<Button
								className="focus-visible:ring-0 rounded-lg"
								variant="ghost"
								size="icon"
								onClick={(e) => {
									if (popoverRef.current) popoverRef.current.click();
								}}
							>
								<CLOSE_SVG />
							</Button>

							<span className="fontUbuntu20Bold">
								Сповіщення
								<span className="fontMediumRegular text-[14px] ml-2">
									{notifications.length}
								</span>
							</span>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											className="ml-auto focus-visible:ring-0"
											variant="ghost"
											size="icon"
											aria-label="Позначити всі як прочитані"
											onClick={markAllAsRead}
										>
											<VIEW_STATUS_SVG />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Позначити всі як прочитані</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<div className="flex flex-col gap-4">
							{notifications.map((el) => {
								return (
									<Notification notification={el} key={'notification_' + el.id} />
								);
							})}
						</div>
					</PopoverContent>
				</Popover>
			)}
		</>
	);
};

export default Notifications;
