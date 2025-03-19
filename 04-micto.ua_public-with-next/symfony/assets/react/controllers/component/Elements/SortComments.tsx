import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select';
import { COMMENTS_SORT } from '@/components/utils/SVG';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { resetOrder, setOrder } from '@/reduxToolkit/slices/filterCommentsSlice';
import { CommentOrderField, OrderDirection } from '@/Types/cabinetTypes';
import React from 'react';

const SortComments = () => {
	const dispatch = useAppDispatch();
	const { currentInstitutionId } = useAppSelector((state) => state.myInstitutions);

	const { order } = useAppSelector((state) => state.filterComments);

	const handleChangeSortValue = (value: string) => {
		if (value === 'DESC') {
			dispatch(setOrder({ ...order, direction: OrderDirection.DESC }));
		} else if (value === 'ASC') {
			dispatch(setOrder({ ...order, direction: OrderDirection.ASC }));
		} else if (value === 'DATE') {
			dispatch(resetOrder());
		} else if (value === 'ANSWERED') {
			dispatch(setOrder({ ...order, field: CommentOrderField.ANSWERED }));
		}
	};

	return (
		<Select onValueChange={handleChangeSortValue}>
			<SelectTrigger
				className="w-6 h-6 p-0 rounded-none border-none shadow-none relative"
				icon={false}
			>
				<COMMENTS_SORT />
			</SelectTrigger>
			<SelectContent className="flex flex-col gap-3 w-[173px] rounded-[var(--default-round)] shadow desktop:w-[250px] desktop:left-[-45%]">
				<SelectGroup>
					<SelectItem
						checkIcon={false}
						className="h-[44px] fontMedium text-[16px] pl-4"
						value={OrderDirection.DESC}
					>
						Спочатку нові
					</SelectItem>
					<SelectItem
						checkIcon={false}
						className="h-[44px] fontMedium text-[16px] pl-4"
						value={OrderDirection.ASC}
					>
						Спочатку старі
					</SelectItem>
					<SelectItem
						checkIcon={false}
						className="h-[44px] fontMedium text-[16px] pl-4"
						value={CommentOrderField.DATE}
					>
						Усі відгуки
					</SelectItem>
					<SelectItem
						checkIcon={false}
						className="h-[44px] fontMedium text-[16px] pl-4"
						value={CommentOrderField.ANSWERED}
					>
						Без відповіді
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SortComments;
