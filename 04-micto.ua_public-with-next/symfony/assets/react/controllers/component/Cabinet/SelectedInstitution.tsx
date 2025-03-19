import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { setCurrentInstitutionId } from '@/reduxToolkit/slices/institutionSlice';
import React from 'react';

const SelectedInstitution = () => {
	const dispatch = useAppDispatch();
	const { institutions, currentInstitutionId, loading } = useAppSelector(
		(state) => state.myInstitutions
	);

	if (loading && !currentInstitutionId) {
		return <Skeleton className="w-full h-[32px] rounded-[var(--default-round)] mt-4" />;
	}

	const handleSelectChange = (institutionId: String | Number) => {
		if (!loading) {
			dispatch(setCurrentInstitutionId(Number(institutionId)));
		}
	};

	return (
		<Select value={String(currentInstitutionId)} onValueChange={handleSelectChange}>
			<SelectTrigger
				className="w-full mt-4 border-none shadow-none h-[32px] px-0 relative desktop:m-0 truncate desktop:max-w-[360px]"
				icon={true}
			>
				<SelectValue className="truncate " placeholder="Виберіть медзаклад" />
			</SelectTrigger>
			<SelectContent className="absolute left-0 min-w-1/2 bg-white rounded-md shadow-lg overflow-y-auto max-h-[60vh] p-0">
				{institutions &&
					institutions.map((instituition) => (
						<SelectItem
							key={instituition.id}
							value={instituition.id.toString()}
							className="flex gap-3 items-center p-2 hover:bg-gray-100 rounded-md"
						>
							<div className="flex items-center gap-3 w-full">
								<Avatar className="w-8 h-8 flex-shrink-0">
									<AvatarImage src="/img/avatar.svg" alt="institution-avatar" />
									<AvatarFallback>{instituition.name}</AvatarFallback>
								</Avatar>
								<span className="fontMedium line-clamp-3">{instituition.name}</span>
							</div>
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
};

export default SelectedInstitution;
