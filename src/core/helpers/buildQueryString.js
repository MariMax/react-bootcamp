export const buildQueryString = (...args) => {
    const result = args.reduce((result, item) => {
        return item ? `${result}&${item.name}=${item.value}` : result;
    }, '?');
    return result
        .replace(/[&]{1,}/, `&`)
        .replace(/^\?&/, `?`)
        .replace(/&$/, ``)
        .replace(/\?$/, ``);
}