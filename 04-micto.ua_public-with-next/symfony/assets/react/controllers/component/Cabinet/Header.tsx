import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { CLOSE_SVG, VIEW_STATUS_SVG } from '@/components/utils/SVG';
import Container from '@/controllers/component/Elements/Container';
import Notification from '@/controllers/component/Elements/Notification';
import React from 'react';
import SelectedInstitution from './SelectedInstitution';
import { useLocation } from 'react-router-dom';
import { useMedia } from 'react-use';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Notifications from '../module/Notifications';

type Header = {
	classname: string;
};

const Header = ({ classname }) => {
	return (
		<header className={'bg-white px-4 ' + classname}>
			<Container className="flex items-center justify-between h-[73px] ">
				<div className="flex items-center gap-[50px]">
					<a href="/">
						<img
							className="max-w-[155px] desktop:max-w-[170px]"
							src="/img/logo.svg"
							alt="Logo"
						/>
					</a>

					<div className="hidden desktop:block">
						<SelectedInstitution />
					</div>
				</div>

				<Notifications />
			</Container>
		</header>
	);
};

export default Header;
