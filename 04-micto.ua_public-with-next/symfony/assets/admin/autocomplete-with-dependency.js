import TomSelect from "tom-select/dist/js/tom-select.complete.min";

export default class AutocompleteWithDependency
{
    create(element) {
        // this avoids initializing the same field twice (TomSelect shows an error otherwise)
        if (element.classList.contains('tomselected')) {
            return;
        }

        const autocompleteEndpointUrl = element.getAttribute('data-ea-autocomplete-endpoint-url');
        if (null !== autocompleteEndpointUrl) {
            const dependsPropertyName = element.getAttribute('data-ea-depends-from-property-name');
            const dependsHtmlSelector = element.getAttribute('data-ea-depends-from-html-selector');
            const dependencyEl = dependsHtmlSelector ? document.querySelector(dependsHtmlSelector) : null;

            let ac = this.#createAutocompleteWithRemoteData(element, autocompleteEndpointUrl, dependsPropertyName, dependencyEl);

            if (dependencyEl) {
                dependencyEl.addEventListener('change', () => {
                    ac.destroy()
                    ac = this.#createAutocompleteWithRemoteData(element, autocompleteEndpointUrl, dependsPropertyName, dependencyEl);
                    ac.clear();
                    ac.clearOptions();
                    ac.onChange();
                });
            }

            return ac;
        }

        return;
    }

    #getCommonConfig(element) {
        const config = {
            render: {
                no_results: function(data, escape) {
                    return `<div class="no-results">${element.getAttribute('data-ea-i18n-no-results-found')}</div>`;
                },
            },
            plugins: {
                dropdown_input: {},
            }
        };

        if (null === element.getAttribute('required') && null === element.getAttribute('disabled')) {
            config.plugins.clear_button = { title: '' };
        }

        if (null !== element.getAttribute('multiple')) {
            config.plugins.remove_button = { title: '' };
        }

        if (null !== element.getAttribute('data-ea-autocomplete-endpoint-url')) {
            config.plugins.virtual_scroll = {};
        }

        if ('true' === element.getAttribute('data-ea-autocomplete-allow-item-create')) {
            config.create = true;
        }

        return config;
    };

    #createAutocompleteWithRemoteData(element, autocompleteEndpointUrl, dependsPropertyName, dependencyEl) {
        const urlBuildFn = this.#prepareUrl;
        const config = this.#mergeObjects(this.#getCommonConfig(element), {
            valueField: 'entityId',
            labelField: 'entityAsString',
            searchField: ['entityAsString'],
            firstUrl: (query) => {
                return urlBuildFn(
                    autocompleteEndpointUrl + '&query=' + encodeURIComponent(query),
                    dependsPropertyName,
                    dependencyEl
                );
            },
            // VERY IMPORTANT: use 'function (query, callback) { ... }' instead of the
            // '(query, callback) => { ... }' syntax because, otherwise,
            // the 'this.XXX' calls inside of this method fail
            load: function (query, callback) {
                const url = urlBuildFn(this.getUrl(query), dependsPropertyName, dependencyEl);
                fetch(url)
                    .then(response => response.json())
                    // important: next_url must be set before invoking callback()
                    .then(json => { this.setNextUrl(query, json.next_page); callback(json.results || []) })
                    .catch(() => callback());
            },
            preload: 'focus',
            maxOptions: null,
            // on remote calls, we don't want tomselect to further filter the results by "entityAsString"
            // this override causes all results to be returned with the sorting from the server
            score: function(search) {
                return function(item) {
                    return 1;
                };
            },
            render: {
                option: function(item, escape) {
                    return `<div>${item.entityAsString}</div>`;
                },
                item: function(item, escape) {
                    return `<div>${escape(item.entityAsString)}</div>`;
                },
                loading_more: function(data, escape) {
                    return `<div class="loading-more-results">${element.getAttribute('data-ea-i18n-loading-more-results')}</div>`;
                },
                no_more_results: function(data, escape) {
                    return `<div class="no-more-results">${element.getAttribute('data-ea-i18n-no-more-results')}</div>`;
                },
                no_results: function(data, escape) {
                    return `<div class="no-results">${element.getAttribute('data-ea-i18n-no-results-found')}</div>`;
                },
            },
        });

        return new TomSelect(element, config);
    }

    #prepareUrl(stringUrl, dependsPropertyName, dependencyEl) {
        if (dependencyEl) {
            let url = new URL(stringUrl);
            let params = url.searchParams;
            params.delete(dependsPropertyName);
            params.append(dependsPropertyName, encodeURIComponent(dependencyEl.value || 0));

            stringUrl = url.toString()
        }

        return stringUrl;
    }

    #mergeObjects(object1, object2) {
        return { ...object1, ...object2 };
    }
}
