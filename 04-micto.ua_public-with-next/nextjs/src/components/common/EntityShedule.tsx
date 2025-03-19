import Image from 'next/image';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CHEVRON_SVG } from './SVG';
import { Schedule } from '@/graphql/generated/types';
import { Maybe } from 'graphql/jsutils/Maybe';

enum dayNames {
	MON = 'Понеділок',
	TUE = 'Вівторок',
	WED = 'Середа',
	THU = 'Четвер',
	FRI = 'П’ятниця',
	SAT = 'Субота',
	SUN = 'Неділя',
}

const weekOrder = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота', 'Неділя'];

const EntityShedule = ({
	className,
	items,
	onlyValues = false,
}: {
	className?: string;
	items: Maybe<Schedule[]>;
	onlyValues?: boolean;
}) => {
	const sortedItems = items
		? [...items].sort(
				(a, b) =>
					weekOrder.indexOf(dayNames[a.dayOfWeek]) -
					weekOrder.indexOf(dayNames[b.dayOfWeek])
		  )
		: [];

	return (
		<>
			{sortedItems && sortedItems?.length > 0 && (
				<div className={className}>
					<>
						{!onlyValues && (
							<>
								{/* Replace with svg component */}
								<Image width={24} height={24} src={'/clock.svg'} alt="Годинник" />
							</>
						)}

						<span className="fontInterMedium18 flex gap-4">
							{!onlyValues && <>Графік роботи:</>}

							<Popover>
								<PopoverTrigger asChild>
									<span className="fontInterRegular18 text-main flex gap-4 items-center cursor-pointer">
										{dayNames[sortedItems[0].dayOfWeek]} <CHEVRON_SVG />
									</span>
								</PopoverTrigger>
								<PopoverContent className="w-fit">
									<ul className="grid gap-3 fontInterRegular18">
										{sortedItems.map((el) => {
											return (
												<li
													className="flex flex-1 whitespace-nowrap gap-x-1"
													key={el.dayOfWeek}
												>
													<span className="min-w-[100px]">
														{dayNames[el.dayOfWeek]}:
													</span>{' '}
													<span className="min-w-[55px] flex justify-center items-center">
														{el.startTime}
													</span>{' '}
													-{' '}
													<span className="min-w-[55px]    flex justify-center items-center">
														{el.endTime}
													</span>
												</li>
											);
										})}
									</ul>
								</PopoverContent>
							</Popover>
						</span>
					</>
				</div>
			)}
		</>
	);
};

export default EntityShedule;
