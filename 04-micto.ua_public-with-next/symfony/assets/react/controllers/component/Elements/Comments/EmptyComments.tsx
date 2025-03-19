import CustomButton from '@/controllers/component/Elements/CustomButton';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { resetFilters } from '@/reduxToolkit/slices/filterCommentsSlice';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const EmptyComments = ({ filtered = false }: { filtered?: boolean }) => {
	const dispatch = useAppDispatch();
	const { currentInstitutionId } = useAppSelector((state) => state.myInstitutions);

	const resetQueryParams = () => {
		dispatch(resetFilters(currentInstitutionId));
	};

	return (
		<div className="flex flex-col justify-start items-center gap-6 h-[173px] bg-[var(--white)] rounded-[var(--default-round)] pt-8 px-8 mt-4 desktop:w-[630px] desktop:mx-auto desktop:mt-10">
			<h4 className="text-[var(--color10)] fontUbuntuMedium">
				{filtered ? 'Відгуків не знайдено' : 'У вас ще нема відгуків'}
			</h4>
			{filtered ? (
				<CustomButton
					className="w-[265px] "
					text="Скинути фільтри"
					onClick={resetQueryParams}
				/>
			) : (
				<Link to="/cabinet">
					<CustomButton className="w-[265px] " text="До кабінету" />
				</Link>
			)}
		</div>
	);
};

export default EmptyComments;
