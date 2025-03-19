import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CustomButton from '@/controllers/component/Elements/CustomButton';
import CustomDialog from '@/controllers/component/Elements/CustomDialog';
import { useDialog } from '@/hooks/useDialog';
import { InstitutionUnit } from '@/Types/cabinetTypes';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface IPropsInstitutionListItem {
	instituitionUnit: InstitutionUnit;
}

const InstitutionListItem: React.FC<IPropsInstitutionListItem> = ({ instituitionUnit }) => {
	const { onOpen, dialogOpen, onClose } = useDialog();
	const { institutionId } = useParams();

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onOpen();
	};

	return (
		<div
			key={instituitionUnit.id}
			className="relative w-full flex flex-col justify-between gap-3 p-6 min-h-[132px] bg-[var(--white)] rounded-[var(--default-round)] !shadow-cabinet-desktop border-[var(--gray3)]"
		>
			<h3 className="max-w-[90%] fontMedium !text-[16px] desktop:!text-[18px]">
				{instituitionUnit.name}
			</h3>
			<span className="fontRegular !text-[12px] !text-[var(--gray3)] desktop:!text-[16px]">
				{instituitionUnit.address.address}
			</span>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="absolute w-6 h-6 top-5 right-5 flex flex-col items-center space-y-[2px]">
						<div className="w-1 h-1 bg-[var(--color10)] rounded-full" />
						<div className="w-1 h-1 bg-[var(--color10)] rounded-full" />
						<div className="w-1 h-1 bg-[var(--color10)] rounded-full" />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="px-5 py-3 transform -translate-x-[40px] -translate-y-[-10px] rounded-[var(--default-round)] border-none desktop:w-[334px] desktop:h-[105px] desktop:p-3">
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Link
								to={`/cabinet/institution/${institutionId}/unit/${instituitionUnit.id}/edit`}
							>
								<div className="flex justify-start items-center gap-3">
									<img src="/img/cabinet/edit.svg" alt="edit" />
									<span className="fontRegular2 text-[var(--color10)]">
										Редагувати підрозділ
									</span>
								</div>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex justify-start items-center gap-3 desktop:mt-2">
							<button className="flex items-center gap-3" onClick={onOpen}>
								<img src="/img/cabinet/delete.svg" alt="delete" />
								<span className="fontRegular2 text-[var(--error)]">
									Видалити підрозділ
								</span>
							</button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>

			<CustomDialog
				dialogOpen={dialogOpen}
				onOpen={onOpen}
				onClose={onClose}
				title="Ви дійсно бажаєте видалити цей підрозділ/відділення?"
			>
				<CustomButton
					text="Так"
					className="w-full h-[44px] rounded-[var(--default-round)] bg-[var(--color5)] border border-[var(--color5)] text-[var(--white)]"
					onClick={onClose}
				/>
				<CustomButton
					text="Скасувати"
					className="w-full h-[44px] rounded-[var(--default-round)] bg-[var(--white)] border border-[var(--color5)] text-[var(--color5)]"
					onClick={onClose}
				/>
			</CustomDialog>
		</div>
	);
};

export default InstitutionListItem;
