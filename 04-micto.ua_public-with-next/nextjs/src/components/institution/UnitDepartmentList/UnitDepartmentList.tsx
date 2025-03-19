'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { UnitDepartment } from '@/graphql/generated/types';
import DepartmentListItem from './DepartmentListItem';
import { Maybe } from 'graphql/jsutils/Maybe';

const UnitDepartmentList = ({ items }: { items: Maybe<UnitDepartment[]> | undefined }) => {
	const [showFullList, setShowFullList] = React.useState(false);
	const listRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (listRef.current) {
			listRef.current.style.maxHeight = listRef.current.getBoundingClientRect().height + 'px';
		}
	}, []);

	return (
		<div
			className={
				'flex flex-col w-full bg-white items-start rounded-lg h-fit p-6 duration-300 ease-in-out '
			}
			ref={listRef}
		>
			{items && items.length > 0 ? (
				items.length > 3 && !showFullList ? (
					<>
						{items.slice(0, 3).map((el, i) => {
							return <DepartmentListItem item={el} key={'institution_' + el.id} />;
						})}

						<Button
							variant={'outline'}
							className="w-[276px] m-auto px-6 mb-4 min-h-[44px]"
							onClick={(e) => {
								setShowFullList(true);
								if (listRef.current) {
									listRef.current.style.maxHeight = '3000px';
									setTimeout(() => {
										if (listRef.current)
											listRef.current.style.maxHeight = '100000px';
									}, 300);
								}
							}}
						>
							Показати усі...
						</Button>
					</>
				) : (
					<>
						{items.map((el, index) => {
							if (items.length === index + 1) {
								return (
									<DepartmentListItem
										item={el}
										className="!pb-0 min-h-[50px] !mb-0 !border-none"
										key={'institution_' + el.id}
									/>
								);
							}
							return <DepartmentListItem item={el} key={'institution_' + el.id} />;
						})}
					</>
				)
			) : (
				<>Підрозділів не знайдено</>
			)}
		</div>
	);
};

export default UnitDepartmentList;
