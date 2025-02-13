export function classListToModules(initial, classList, moduleObj) {
    if (classList) {
        const splitted = classList.split(" ");
        const modules = splitted.map(item => `${moduleObj[item]}`).join(" ");

        return `${initial} ${modules}`;
    } else {
        return initial;
    }
}