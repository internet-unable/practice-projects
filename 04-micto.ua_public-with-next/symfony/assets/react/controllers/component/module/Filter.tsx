import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { FILTER_SVG } from '@/components/utils/SVG';
import CustomCheckbox from '@/controllers/component/Elements/CustomCheckbox';
import FilterSection from '@/controllers/component/Elements/FilterSection';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import {
	resetFilters,
	setEntityId,
	setEntityType,
	setSelectedDepartments,
	toggleTypeOfComment,
} from '@/reduxToolkit/slices/filterCommentsSlice';
import React from 'react';
import DateRangeFilter from '../Elements/DateRangeFilter';
import { useMedia } from 'react-use';
import mock from '../../../../mockFilter.json';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { EntityType, InstitutionUnit, TypeOfComment } from '@/Types/cabinetTypes';
import CollapsibleListBlock from '../Elements/CollapsibleListBlock';
import CustomButton from '../Elements/CustomButton';

interface IItemMock {
	id?: string;
	name: string;
	type?: string;
}

interface IProps {
	className?: string;
	typeComment?: IItemMock[];
	unit?: IItemMock[];
	department?: IItemMock[];
}

const Filter: React.FC<IProps> = ({ className, typeComment, unit, department }) => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const isMedia991 = useMedia('(min-width: 991px)');

	const [isOpen, setIsOpen] = React.useState(false);

	const { filter, entityId, entityType, listItems } = useAppSelector(
		(state) => state.filterComments
	);

	const { currentInstitutionId } = useAppSelector((state) => state.myInstitutions);

	const handleUnitClick = (value: string) => {
		if (!value) {
			return;
		}

		dispatch(setEntityType(EntityType.INSTITUTION_UNIT));
		dispatch(setEntityId(Number(value)));
	};

	const handleDepartmentClick = (departmentId: string, value: boolean) => {
		if (filter?.unitDepartments) {
			let newArray = [...filter.unitDepartments];

			if (value) {
				newArray.push(Number(departmentId));
				dispatch(setSelectedDepartments(newArray));
				console.log('test1');
			} else {
				console.log('test2');
				let elementIndex = -1;
				for (let index = 0; index < newArray.length; index++) {
					if (newArray[index] === Number(departmentId)) {
						elementIndex = index;
					}
				}

				if (elementIndex > -1) {
					newArray.splice(elementIndex, 1);
				}

				dispatch(setSelectedDepartments(newArray));
			}
		} else {
			console.log('test3');
			dispatch(setSelectedDepartments([Number(departmentId)]));
		}
	};

	//sticky classes desktop:overflow-hidden desktop:overflow-y-auto desktop:sticky desktop:top-4 desktop:h-[calc(100dvh-48px)]
	if (isMedia991) {
		return (
			<>
				<div className="flex justify-between gap-8 items-start ">
					<div className="w-[300px] flex flex-col items-start shrink-0 ">
						<div className="flex items-start fontTitleBold">Фільтри</div>
						{mock.typeComment.length && (
							<FilterSection title="Тип коментаря" className="mt-8 w-full">
								{mock.typeComment.map((comment, index) => (
									<div key={index} className={cn('flex items-center gap-3')}>
										<Checkbox
											id={comment.name}
											value={comment.type}
											checked={filter.typeOfComment.includes(
												TypeOfComment[comment.type]
											)}
											onCheckedChange={() =>
												dispatch(toggleTypeOfComment(comment.type))
											}
										/>
										<Label
											htmlFor={comment.name}
											className={cn(
												'fontRegular2 text-[#6B7280] text-[var(--color10)]' +
													' text-[16px]'
											)}
										>
											{comment.name}
										</Label>
									</div>
								))}
							</FilterSection>
						)}

						<FilterSection title="Підрозділи" className="mt-8 w-full">
							{listItems.units.loading === true && (
								<>
									<Skeleton className="w-full rounded-[var(--default-round)] h-6" />
									<Skeleton className="w-full max-w-[80%] rounded-[var(--default-round)] h-6" />
									<Skeleton className="w-full max-w-[90%] rounded-[var(--default-round)] h-6" />
								</>
							)}
							{!!listItems.units.items.length && (
								<RadioGroup>
									{listItems.units.items.map((el) => (
										<div key={el.id} className="flex items-center space-x-2">
											<RadioGroupItem
												value={el.id.toString()}
												id={`radio-${el.id}`}
												onClick={(event) => {
													handleUnitClick(event.currentTarget.value);
												}}
												checked={
													el.id === entityId &&
													entityType !== EntityType.INSTITUTION
												}
											/>
											<Label
												className="text-[var(--color10)] text-[16px]"
												htmlFor={`radio-${el.id}`}
											>
												{el.name}
											</Label>
										</div>
									))}
								</RadioGroup>
							)}
						</FilterSection>

						{listItems.units.items.length && listItems.departments.items.length ? (
							<FilterSection title="Відділення" className="mt-8 w-full">
								{listItems.departments.loading === true && (
									<>
										<Skeleton className="w-full rounded-[var(--default-round)] h-6" />
										<Skeleton className="w-full max-w-[80%] rounded-[var(--default-round)] h-6" />
										<Skeleton className="w-full max-w-[90%] rounded-[var(--default-round)] h-6" />
									</>
								)}
								{!!listItems.departments.items.length ? (
									<CollapsibleListBlock
										items={listItems.departments.items}
										onClick={(departmentId, value) => {
											console.log(value);
											handleDepartmentClick(departmentId, value);
										}}
									/>
								) : (
									<>
										<span className="text-base text-[--gray4]">
											{listItems.units.items.length
												? 'У підрозділі не знайдено відділень'
												: 'Оберіть підрозділ'}
										</span>
									</>
								)}
							</FilterSection>
						) : (
							''
						)}

						<FilterSection title="Дата" className="mt-8 w-full">
							<DateRangeFilter />
						</FilterSection>

						<CustomButton
							className="w-full mt-10"
							text="Скинути фільтри"
							onClick={() => {
								dispatch(resetFilters(currentInstitutionId));
							}}
						/>
					</div>
				</div>
			</>
		);
	}

	return <></>;

	// return (
	// 	<Sheet open={isOpen} onOpenChange={setIsOpen}>
	// 		<SheetTrigger asChild>
	// 			<Button className="bg-[var(--bg-color)] border-none shadow-none p-0">
	// 				<FILTER_SVG />
	// 			</Button>
	// 		</SheetTrigger>
	// 		<SheetContent className="left-0 min-w-[300px] pt-6 px-4 animate-slide-in overflow-auto">
	// 			<SheetHeader className="flex items-start fontTitleBold">Фільтри</SheetHeader>
	// 			{typeComment.length && (
	// 				<FilterSection title="Тип коментаря" className="mt-8">
	// 					{typeComment.map((comment, index) => (
	// 						<div key={index} className={cn('flex items-center gap-3', className)}>
	// 							<Checkbox
	// 								id={comment.name}
	// 								value={comment.type}
	// 								checked={filter.typeOfComment.includes(comment.type)}
	// 								onCheckedChange={() =>
	// 									dispatch(toggleTypeOfComment(comment.type))
	// 								}
	// 							/>
	// 							<Label
	// 								htmlFor={comment.name}
	// 								className={cn('fontRegular2 text-[--gray4]' + ' text-[16px]')}
	// 							>
	// 								{comment.name}
	// 							</Label>
	// 						</div>
	// 					))}
	// 				</FilterSection>
	// 			)}
	// 			{unit.length && (
	// 				<FilterSection title="Тип коментаря" className="mt-8">
	// 					<RadioGroup>
	// 						{unit.map((el) => (
	// 							<div key={el.id} className="flex items-center space-x-2">
	// 								<RadioGroupItem value={el.id} id={`radio-${el.id}`} />
	// 								<Label
	// 									className="text-[var(--color10)] text-[16px]"
	// 									htmlFor={`radio-${el.id}`}
	// 								>
	// 									{el.name}
	// 								</Label>
	// 							</div>
	// 						))}
	// 					</RadioGroup>
	// 				</FilterSection>
	// 			)}
	// 			{departments.items.length && (
	// 				<FilterSection title="Тип коментаря" className="mt-8">
	// 					{departments.items.map((comment, index) => (
	// 						<CustomCheckbox
	// 							key={index}
	// 							label={comment.name}
	// 							className="gap-3"
	// 							classNameLabel="text-[var(--color10)] text-[16px]"
	// 						/>
	// 					))}
	// 				</FilterSection>
	// 			)}

	// 			<FilterSection title="Дата" className="mt-8">
	// 				<DateRangeFilter />
	// 			</FilterSection>
	// 		</SheetContent>
	// 	</Sheet>
	// );
};

export default Filter;
