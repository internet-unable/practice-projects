import '../styles/page/admin.scss';

import AutocompleteWithDependency from '../admin/autocomplete-with-dependency';

document.addEventListener('DOMContentLoaded', () => {
	const autocomplete = new AutocompleteWithDependency();
	document
		.querySelectorAll('[data-ea-widget="ea-autocomplete-with-dependency"]')
		.forEach((autocompleteElement) => {
			autocomplete.create(autocompleteElement);
		});
});
