import SortComments from '@/controllers/component/Elements/SortComments';
import Filter from '@/controllers/component/module/Filter';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import {
	fetchInstitutionUnitsFilter,
	resetFilters,
} from '@/reduxToolkit/slices/filterCommentsSlice';
import qs from 'qs';
import React from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import mock from '../../../../mockFilter.json';
import CommentCounter from '../Elements/Comments/CommentCounter';
import CommentsList from '../Elements/Comments/CommentsList';
import { CommentOrderField, EntityType } from '@/Types/cabinetTypes';

interface IPropsComments {}

const AllComments: React.FC<IPropsComments> = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { filter, order, entityType } = useAppSelector((state) => state.filterComments);
	const { currentInstitutionId } = useAppSelector((state) => state.myInstitutions);
	const { institutionId } = useParams();
	const [searchParams] = useSearchParams();

	React.useEffect(() => {
		if (currentInstitutionId) {
			if (currentInstitutionId.toString() !== institutionId) {
				dispatch(resetFilters(Number(currentInstitutionId)));

				navigate(`/cabinet/comments/${currentInstitutionId}`, {
					replace: true,
				});
			}

			dispatch(
				fetchInstitutionUnitsFilter({
					institutionId: Number(currentInstitutionId),
				})
			);
		}
	}, [currentInstitutionId]);

	// React.useEffect(() => {
	// 	const queryString = qs.stringify(filters, {
	// 		arrayFormat: 'comma',
	// 	});

	// 	if (location.search !== `?${queryString}`) {
	// 		navigate(`${location.pathname}?${queryString}`, { replace: true });
	// 	}
	// }, [filters]);

	return (
		<>
			<div className="flex flex-wrap desktop:grid desktop:grid-cols-[1fr,1fr,300px] desktop:grid-rows-[24px] desktop:gap-x-6 desktop:gap-y-4 desktop:items-start">
				<CommentCounter />

				<div className="col-start-2 col-end-3 flex items-center ml-auto mr-4">
					<SortComments />
				</div>

				<div className="col-start-3 col-end-4 flex items-center row-start-1 row-end-3 desktop:items-start desktop:h-full">
					<Filter
						typeComment={mock.typeComment}
						unit={mock.units}
						department={mock.departments}
					/>
				</div>

				<div className="w-full col-start-1 col-end-3 row-start-2 ">
					<CommentsList />
				</div>
			</div>
		</>
	);
};

export default AllComments;
