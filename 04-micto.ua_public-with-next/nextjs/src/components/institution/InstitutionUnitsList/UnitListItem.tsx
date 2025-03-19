import EntityContacts from '@/components/common/EntityContacts/EntityContacts';
import EntityShedule from '@/components/common/EntityShedule';
import { Button } from '@/components/ui/button';
import { InstitutionUnit } from '@/graphql/generated/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UnitListItem = ({ item, className }: { item: InstitutionUnit; className?: string }) => {
	return (
		<div
			className={
				'border-b flex flex-col gap-4 lg:gap-0 border-muted pb-10 mb-10 w-full ' +
				(className ? className : '')
			}
		>
			<div className="flex flex-col gap-4 lg:gap-0 flex-wrap lg:flex-nowrap w-full lg:mb-4 relative">
				<div className="fontUbuntuMedium20 lg:max-w-[calc(100%-216px)] w-full lg:mb-6">
					<Link href={`/${item.slug}-i${item.oldId || item.id}`}>{item.name}</Link>
				</div>
				<Button
					variant="default"
					className="w-[200px] lg:ml-auto lg:absolute lg:right-0 order-1"
					onClick={(e) => {
						e.preventDefault();
					}}
				>
					<Link
						className="w-full h-full flex justify-center items-center"
						href={`/${item.slug}-i${item.oldId || item.id}`}
					>
						Детальніше
					</Link>
				</Button>

				<div className="flex flex-col w-full">
					<EntityShedule className="flex gap-2 mb-4" items={item?.schedule} />
					<EntityContacts emails={item.contacts?.emails} phones={item.contacts?.phones} />

					{/* TODO: Create component for address */}
					{item.address?.address && (
						<div className="flex gap-2 items-start">
							{/* Replace with svg component */}
							<Image width={24} height={24} src={'/map-pin.svg'} alt="Маркер мапи" />

							<span className="fontInterMedium18 flex gap-4 ">
								Адреса:
								<ul className="flex flex-col">
									{item.address?.zipCode && (
										<>
											<li>{item.address?.zipCode}</li>
										</>
									)}
									<li>{item.address?.address}</li>
								</ul>
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UnitListItem;
