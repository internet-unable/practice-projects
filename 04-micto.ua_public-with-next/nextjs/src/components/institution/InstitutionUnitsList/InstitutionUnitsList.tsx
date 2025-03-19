'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { InstitutionUnit } from '@/graphql/generated/types';
import UnitListItem from './UnitListItem';
import { GET_UNITS_BY_INSTITUTION_ID } from '@/graphql/query';
import { reactApolloClient } from '@/lib/apolloClient';

const StartingLimit = 3;

const InstitutionUnitsList = ({
	institutionId,
	initialData = [],
}: {
	institutionId: number;
	initialData?: InstitutionUnit[];
}) => {
	const [items, setItems] = React.useState<InstitutionUnit[]>(initialData);
	const [showFullList, setShowFullList] = React.useState(false);
	const listRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const fetchItems = async () => {
			const { data } = await reactApolloClient.query({
				query: GET_UNITS_BY_INSTITUTION_ID,
				variables: { id: institutionId },
			});
			return data.institutionUnits.items;
		};

		fetchItems().then((items) => {
			if (items) setItems(items);
		});
	}, [institutionId]);

	return (
		<div
			className={
				'flex flex-col w-full bg-white items-start rounded-lg h-fit px-0 py-6 lg:p-6 duration-300 ease-in-out '
			}
			ref={listRef}
		>
			{items && items.length > 0 ? (
				items.length > StartingLimit && !showFullList ? (
					<>
						{items.slice(0, StartingLimit).map((el, i) => {
							return (
								<UnitListItem item={el} key={'institution_' + el.id || el.oldId} />
							);
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
									<UnitListItem
										item={el}
										className="!border-none"
										key={'institution_' + el.id}
									/>
								);
							}
							return <UnitListItem item={el} key={'institution_' + el.id} />;
						})}
					</>
				)
			) : (
				<>Підрозділів не знайдено</>
			)}
		</div>
	);
};

export default InstitutionUnitsList;
