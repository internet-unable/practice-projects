import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/controllers/component/Elements/Container';
import CustomButton from '@/controllers/component/Elements/CustomButton';
import CustomDialog from '@/controllers/component/Elements/CustomDialog';
import HeaderTabs from '@/controllers/component/Elements/HeaderTabs';
import InstitutionListItem from '@/controllers/component/Elements/InstitutionListItem';
import InstitutionHeader from '@/controllers/component/module/InstitutionHeader';
import { useDialog } from '@/hooks/useDialog';
import { useListSearch } from '@/hooks/useListSearch';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { fetchMyInstitutionUnits } from '@/reduxToolkit/slices/institutionSlice';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function InstitutionList() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { onOpen, dialogOpen, onClose } = useDialog();

	const { institutionsUnits, loadingInstitutionUnit } = useAppSelector(
		(state) => state.myInstitutions
	);

	const { currentInstitutionId } = useAppSelector((state) => state.myInstitutions);

	const { institutionId, unitId } = useParams();

	const { filteredItems, searchString, setSearchString } = useListSearch({
		items: institutionsUnits,
		searchKey: 'name',
	});

	React.useEffect(() => {
		if (institutionId && !currentInstitutionId) {
			dispatch(
				fetchMyInstitutionUnits({
					institutionId: Number(institutionId),
				})
			);
		} else if (currentInstitutionId) {
			dispatch(
				fetchMyInstitutionUnits({
					institutionId: Number(currentInstitutionId),
				})
			);
		}
	}, [currentInstitutionId]);

	return (
		<>
			<HeaderTabs
				headerTitle="Підрозділи"
				headerImgUrl="/img/cabinet/arrow-left.svg"
				className="desktop:bg-[var(--bg-color)]"
				flexibleRedirectLink={'/cabinet/'}
			/>

			<Container className="px-6 desktop:px-[115px]">
				<InstitutionHeader
					onOpen={onOpen}
					institutionsLength={institutionsUnits.length}
					loading={loadingInstitutionUnit}
					setSearchString={setSearchString}
				/>

				<div className="flex flex-col mt-10 gap-5">
					{loadingInstitutionUnit ? (
						<>
							<div className="flex flex-col gap-5">
								<Skeleton className="w-full min-h-[235px] rounded-[var(--default-round)]" />
								<Skeleton className="w-full min-h-[235px] rounded-[var(--default-round)]" />
							</div>
						</>
					) : (
						<>
							{filteredItems.map((institutionsUnit) => (
								<InstitutionListItem
									key={institutionsUnit.id}
									instituitionUnit={institutionsUnit}
								/>
							))}
						</>
					)}
				</div>

				<CustomDialog
					title="Бажаєте створити підрозділ ?"
					dialogOpen={dialogOpen}
					onOpen={onOpen}
					onClose={onClose}
				>
					<Link
						to={`/cabinet/institution/${institutionId}/unit/create`}
						className="!w-full"
					>
						<CustomButton
							text="Так"
							className="w-full h-[44px]  bg-[var(--color5)] border border-[var(--color5)] text-[var(--white)]  desktop:w-[280px]"
						/>
					</Link>
					<CustomButton
						text="Скасувати"
						classNameContainer="sm:!m-0"
						className="w-full h-[44px]  bg-[var(--white)] border border-[var(--color5)] text-[var(--color5)]  desktop:w-[280px] hover:!text-[var(--hover)] hover:!bg-white hover:border-[var(--hover)]"
						onClick={onClose}
					/>
				</CustomDialog>
			</Container>
		</>
	);
}
