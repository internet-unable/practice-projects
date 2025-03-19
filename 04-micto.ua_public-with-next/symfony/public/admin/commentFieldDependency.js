document.addEventListener('DOMContentLoaded', function () {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);

    if (params.get('crudAction') === 'edit') {
        const typeField = document.querySelector('select[name="Comment[type]"]');
        const markField = document.querySelector('select[name="Comment[mark]"]');
    
        function toggleMarkField() {
            const parent = markField.closest('.form-widget')
            const libSelect = parent.querySelector('.ts-wrapper.form-select')
            if (typeField.value === 'question' || typeField.value === 'reply') {
                libSelect.classList.add('disabled');
                libSelect.classList.add('locked');

                const currentSelectedItem = parent.querySelector('.ts-dropdown [data-value="0"]')
                const currentLibItem = libSelect.querySelector('.ts-control .item')

                do {
                    errorOccurred = false; // Reset the error flag
                
                    try {
                        if (!currentSelectedItem) {
                            currentLibItem.textContent = '';

                        } else {
                            currentLibItem.textContent = currentSelectedItem.textContent;
                        }
                        currentLibItem.dataset.value = 0;
                        markField.value = '';
                    } catch (error) {
                        console.error("An error occurred:", error);
                    }
                } while (errorOccurred);

            } else {
                libSelect.classList.remove('disabled');
                libSelect.classList.remove('locked');
            }
        }
    
        toggleMarkField();
    
        typeField.addEventListener('change', toggleMarkField);
    }
});