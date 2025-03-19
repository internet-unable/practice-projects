import EntityShedule from '@/components/common/EntityShedule';
import { Button } from '@/components/ui/button';
import { UnitDepartment } from '@/graphql/generated/types';
import modifyDepartmentSlug from '@/utils/formatDepartmentSlug';
import Link from 'next/link';
import React from 'react';

const DepartmentListItem = ({ item, className }: { item: UnitDepartment; className?: string }) => {
	return (
		<div
			className={
				'border-b border-muted pb-6 mb-6 lg:pb-10 lg:mb-10 w-full ' +
				(className ? className : '')
			}
		>
			<div className="flex gap-4 lg:gap-0 flex-wrap lg:flex-nowrap w-full lg:mb-6 relative">
				<div className="fontUbuntuMedium20 lg:max-w-[calc(100%-216px)] w-full">
					<Link
						href={`/${item.unit.slug}-i${
							item.unit.oldId || item.unit.id
						}/${modifyDepartmentSlug(item.slug)}`}
					>
						{item.name}
					</Link>
				</div>
				<Button variant="default" className="w-[200px] lg:ml-auto lg:absolute lg:right-0">
					<Link
						href={`/${item.unit.slug}-i${
							item.unit.oldId || item.unit.id
						}/${modifyDepartmentSlug(item.slug)}`}
						className="w-full h-full flex justify-center items-center"
					>
						Детальніше
					</Link>
				</Button>
			</div>
			<div className="flex flex-col w-full">
				<EntityShedule className="flex gap-2 mb-4" items={item?.schedule} />
			</div>
		</div>
	);
};

export default DepartmentListItem;
