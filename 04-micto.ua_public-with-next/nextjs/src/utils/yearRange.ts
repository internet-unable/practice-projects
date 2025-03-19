export interface SelectItemType {
	value: string | number;
	name: string;
}

export function generateYearRange(startYear: number = 2005): SelectItemType[] {
	const currentYear = new Date().getFullYear();
	const years: SelectItemType[] = [];
	for (let year = currentYear; year >= startYear; year--) {
		years.push({ value: year, name: year.toString() });
	}
	return years;
}
