import * as React from 'react';

export const useListSearch = ({ items, searchKey }: { items: any[]; searchKey?: string }) => {
	const [searchString, setSearchString] = React.useState('');

	return {
		searchString,
		setSearchString,
		filteredItems: items?.length
			? items.filter((el) => el[searchKey].toLowerCase().includes(searchString.toLowerCase()))
			: [],
	};
};
