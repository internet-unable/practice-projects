import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { fetchAreas, fetchCities, fetchDistricts } from '@/reduxToolkit/slices/selectsSlice';
import { useEffect, useState } from 'react';

const useInstitutionUnitForm = (errors: any) => {
  const { areas, districts, cities } = useAppSelector(state => state.selects);
  const dispatch = useAppDispatch();

  const [areaId, setAreaId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [isRoundTheClock, setIsRoundTheClock] = useState(false);
  const [isAdditionalActive, setIsAdditionalActive] = useState(false);
  const [isTimeForAllWorkdays, setIsTimeForAllWorkdays] = useState({
    startTime: '00:00',
    endTime: '00:00'
  });

  useEffect(() => {
    dispatch(fetchAreas());
  }, []);

  useEffect(() => {
    if (areaId) {
      dispatch(fetchDistricts({ areaId: Number(areaId) }));
    }
  }, [areaId]);

  useEffect(() => {
    if (districtId) {
      dispatch(fetchCities({ districtId: Number(districtId) }));
    }
  }, [districtId]);

  return {
    areas,
    districts,
    cities,
    areaId,
    setAreaId,
    districtId,
    setDistrictId,
    isRoundTheClock,
    setIsRoundTheClock,
    isAdditionalActive,
    setIsAdditionalActive,
    isTimeForAllWorkdays,
    setIsTimeForAllWorkdays,
  };
};

export default useInstitutionUnitForm;
