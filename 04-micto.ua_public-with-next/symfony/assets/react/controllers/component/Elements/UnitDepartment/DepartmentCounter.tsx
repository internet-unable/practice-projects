import { Skeleton } from '@/components/ui/skeleton';
import { useAppSelector } from '@/reduxToolkit/hooks';
import React from 'react';

const DepartmentCounter = ({ filteredAmount }: { filteredAmount?: number }) => {
	const { loading, unit } = useAppSelector((state) => state.institutionUnit);

	if (loading) {
		return <Skeleton className="w-[70px] h-5 rounded-[var(--default-round)]" />;
	}

	const finalAmount = filteredAmount || unit.departments?.items.length;

	let message;
	if (finalAmount === 0) {
		message = '0 відділеннь';
	} else if (finalAmount === 1) {
		message = '1 відділення';
	} else if (finalAmount >= 2 && finalAmount <= 4) {
		message = `${finalAmount} відділеня`;
	} else {
		message = `${finalAmount} відділень`;
	}

	return (
		<span className="fontRegular text-[var(--gray3)]">
			{/* TODO: Додати зміну тексту від кількості */}
			{message}
		</span>
	);
};

export default DepartmentCounter;
