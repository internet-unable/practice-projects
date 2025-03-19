import React from 'react';
import { Button } from '@/components/ui/button';

export interface listItem {
	title: string;
	id?: string;
	link: string;
	className?: string;
}

const ItemsList = ({
	items,
	title,
	ulClassName,
	ilClassName,
	showButton,
}: {
	items: listItem[];
	title?: string;
	ulClassName?: string;
	ilClassName?: string;
	showButton?: boolean;
}) => {
	if (items.length === 0) {
		return <></>;
	}
	return (
		<div className="flex flex-col gap-10">
			{title && <h2 className="fontUbuntuBold20 lg:fontInterBold30">{title}</h2>}
			<ul className={`flex gap-4 flex-wrap ${ulClassName || ''}`}>
				{items.map((el) => {
					return (
						<li
							key={el.id || el.title}
							className={`flex-[1_1_100%] lg:flex-[0_1_24%] text-[var(--main)] font-intermedium ${ilClassName}`}
						>
							<div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
								<a className="cursor-pointer" href={el.link}>
									{el.title}
								</a>
								{showButton && (
									<Button
										variant="default"
										size="default"
										asChild
										className="w-[144px] mt-2 md:ml-4"
										onClick={(e) => {
											e.preventDefault();
											return;
										}}
									>
										<a href={el.link} className="text-white w-full h-full">
											Детальніше
										</a>
									</Button>
								)}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ItemsList;
