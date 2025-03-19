import * as React from 'react';
import '../../../../styles/app.scss';
import '../../../../styles/page/cabinet.scss';
import InstitutionSwitcher from "@/controllers/component/Cabinet/InstitutionSwitcher";
import Header from "@/controllers/component/Cabinet/Header";
import CabinetTabs from "@/controllers/component/Cabinet/CabinetTabs";
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { fetchMyInstitutions } from '@/reduxToolkit/slices/institutionSlice';

type Props = {
    isLoading: boolean;
};

export default function Cabinet({isLoading}: Props) {
    const dispatch = useAppDispatch();

    const { institutions, currentInstitutionId, loading } = useAppSelector(
        (state) => state.myInstitutions,
      );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    React.useEffect(() => {
        if (institutions.length === 0) {
            dispatch(fetchMyInstitutions());
        }
    }, []);

    return (
        <>
            <Header classname=' desktop:hidden'/>
            <InstitutionSwitcher/>
            <CabinetTabs/>
        </>);
}
