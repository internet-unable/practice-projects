import * as React from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { useAppDispatch } from '../../reduxToolkit/hooks';
import { InstitutionUnit, ResponseError } from '../../Types/cabinetTypes';

import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '../component/Elements/Footer';
import Header from '../component/Cabinet/Header';
import {
	fetchMyInstitutions,
	setCurrentInstitutionId,
} from '@/reduxToolkit/slices/institutionSlice';

type ContextType = {
	institutionUnitState: {
		institutionUnit: InstitutionUnit;
		institutionIsLoading: boolean;
		errors?: ResponseError[];
	};
	institutionUnit: InstitutionUnit;
};

type StateError = {
	extensions: {
		field: string;
	};
	message: string;
};

const Layout = () => {
	const dispatch = useAppDispatch();

	const { institutionId } = useParams();

	React.useEffect(() => {
		if (Number(institutionId)) {
			dispatch(fetchMyInstitutions());
			dispatch(setCurrentInstitutionId(Number(institutionId)));
		}
	}, []);

	return (
		<div className="bg-[var(--bg-color)] h-full desktop:flex flex-col min-h-[100vh]">
			<Header classname="hidden desktop:block" />

			<div className="max-w-[1322px] w-full m-auto mb-auto desktop:mt-6 desktop:px-4 desktop:pb-10">
				<Outlet />
			</div>

			<Footer />

			<ToastContainer transition={Slide} />
		</div>
	);
};

export function useInstitutionData() {
	return useOutletContext<ContextType>();
}

export default Layout;
