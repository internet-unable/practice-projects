import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import Container from '@/controllers/component/Elements/Container';
import { useDialog } from '@/hooks/useDialog';
import CustomDialog from '@/controllers/component/Elements/CustomDialog';
import CustomButton from '@/controllers/component/Elements/CustomButton';
import InstitutionHeader from '@/controllers/component/module/InstitutionHeader';
import { Link, useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import DepartmentListItem from './DepartmentListItem';
import EmptyDepartments from './EmptyDepartments';
import CustomInput from '../CustomInput';
import DepartmentCounter from './DepartmentCounter';
import { useListSearch } from '@/hooks/useListSearch';
import AddCustomButton from '../AddCustomButton';

export default function DepartmentList() {
	const dispatch = useAppDispatch();

	const { onOpen, dialogOpen, onClose } = useDialog();

	const { loading: unitLoading, unit } = useAppSelector((state) => state.institutionUnit);

	const { filteredItems, searchString, setSearchString } = useListSearch({
		items: unit?.departments?.items,
		searchKey: 'name',
	});

	const { institutionId, unitId } = useParams();

	return (
		<>
			<Container className="flex flex-col mt-6 px-4 gap-5 pb-10">
				<CustomInput
					placeholder="Я хочу знайти..."
					isSearchIcon={true}
					type="text"
					className="gap-0 desktop:w-full desktop:min-h-[50px] desktop:mb-0"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchString(e.currentTarget.value);
					}}
				/>

				<AddCustomButton
					className="w-full mt-4 h-[44px] gap-3 desktop:mt-0 desktop:w-[300px] desktop:h-[50px]"
					title="Додати відділення"
					onClick={onOpen}
				/>

				<DepartmentCounter filteredAmount={filteredItems.length} />

				{unitLoading ? (
					<>
						<div className="flex flex-col gap-5">
							<Skeleton className="w-full min-h-[235px] rounded-[var(--default-round)]" />
							<Skeleton className="w-full min-h-[235px] rounded-[var(--default-round)]" />
						</div>
					</>
				) : (
					unit?.departments.items && (
						<>
							{!!unit.departments.items.length ? (
								filteredItems.map((deparnment) => (
									<DepartmentListItem
										key={deparnment.id}
										unitDepartment={deparnment}
									/>
								))
							) : (
								<>
									<EmptyDepartments onOpen={onOpen} />
								</>
							)}
						</>
					)
				)}
			</Container>

			<CustomDialog
				title="Бажаєте створити відділення ?"
				dialogOpen={dialogOpen}
				onOpen={onOpen}
				onClose={onClose}
			>
				{/* TODO: Потрібна перевірка чи юзер має право це робити, потім редірект або помилка */}
				<Link
					to={`/cabinet/institution/${institutionId}/unit/${unit.id}/department/create`}
					className="!w-full"
				>
					<CustomButton
						text="Так"
						className="w-full h-[44px] rounded-[var(--default-round)] bg-[var(--color5)] border border-[var(--color5)] text-[var(--white)]"
					/>
				</Link>
				<CustomButton
					text="Скасувати"
					className="w-full h-[44px] rounded-[var(--default-round)] bg-[var(--white)] border border-[var(--color5)] text-[var(--color5)]"
					onClick={onClose}
				/>
			</CustomDialog>
		</>
	);
}
