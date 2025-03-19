import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import React from 'react';
import CustomCheckbox from './CustomCheckbox';
import { UnitDepartment } from '@/Types/cabinetTypes';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/reduxToolkit/hooks';

const CollapsibleListBlock = ({
	items = [],
	previewAmount = 5,
	onClick,
}: {
	items: any[];
	previewAmount?: number;
	onClick?: (departmentId: string, value: boolean) => void;
}) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const { filter } = useAppSelector((state) => state.filterComments);

	if (!items) {
		return;
	}

	return (
		<Collapsible className="flex flex-col items-start gap-4">
			{items.slice(0, previewAmount).map((item, index) => (
				<div key={item.id} className="flex items-center space-x-2">
					<CustomCheckbox
						label={item.name}
						onChange={(value) => {
							onClick(item.id.toString(), value);
						}}
						checked={
							filter?.unitDepartments
								? !!filter.unitDepartments.find((el) => el == item.id)
								: false
						}
					/>
				</div>
			))}

			<CollapsibleTrigger
				className={'text-[--color5] ' + (isOpen ? 'order-5' : '')}
				onClick={() => {
					setIsOpen((prev) => {
						return !prev;
					});
				}}
			>
				{isOpen ? 'Приховати' : 'Показати всі'}
			</CollapsibleTrigger>
			<CollapsibleContent className="[&[data-state=open]]:flex flex-col items-start gap-4">
				{items.slice(previewAmount, -1).map((item, index) => (
					<div key={item.id} className="flex items-center space-x-2">
						<CustomCheckbox
							label={item.name}
							onChange={(value) => {
								onClick(item.id.toString(), value);
							}}
							checked={
								filter?.unitDepartments
									? !!filter.unitDepartments.find((el) => el == item.id)
									: false
							}
						/>
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default CollapsibleListBlock;
