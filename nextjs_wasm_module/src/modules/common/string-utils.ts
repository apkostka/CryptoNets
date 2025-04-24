export const snakeToCamel = (str: string) =>
    str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

export const snakeToPascal = (str: string) => {
    const camelCase = snakeToCamel(str);
    const pascalCase = camelCase[0].toUpperCase() + camelCase.substr(1);

    return pascalCase;
};
