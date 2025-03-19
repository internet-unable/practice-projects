import React, { ReactElement } from 'react';
import { COLLECTIVE_ENTITY, PRIVATE_ENTITY, UA_EMBLEM_SVG } from '../common/SVG';

export enum BadgeType {
	STATE = 'STATE',
	PRIVATE = 'PRIVATE',
	COLLECTIVE = 'COLLECTIVE',
	DAMAGED = 'DAMAGED',
	MSEK = 'MSEK',
}

export const EntityBadgeDetails: Record<BadgeType, { title: string; icon: ReactElement }> = {
	[BadgeType.STATE]: {
		title: 'Державний заклад',
		icon: <UA_EMBLEM_SVG color="#000305" />,
	},
	[BadgeType.PRIVATE]: {
		title: 'Приватний заклад',
		icon: <PRIVATE_ENTITY />,
	},
	[BadgeType.COLLECTIVE]: {
		title: 'Комунальний заклад',
		icon: <COLLECTIVE_ENTITY />,
	},
	[BadgeType.DAMAGED]: {
		title: 'Пошкодженний',
		icon: <></>,
	},
	[BadgeType.MSEK]: {
		title: 'Реформа МСЕК',
		icon: <></>,
	},
};

const EntityBadges = ({ badges, className }: { badges: BadgeType[]; className?: string }) => {
	if (badges.length > 0) {
		return (
			<ul className={'flex flex-wrap gap-6 ' + className}>
				{badges.map((el) => (
					<li className="flex gap-2 items-center" key={`Badge_${el.toString()}`}>
						{EntityBadgeDetails[el].icon}
						<span>{EntityBadgeDetails[el].title}</span>
					</li>
				))}
			</ul>
		);
	}

	return <></>;
};

export default EntityBadges;
