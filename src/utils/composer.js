export const compose = (...functions) => initalValue =>
    functions.reduceRight((next, fn) => Promise.resolve(next).then(fn).catch(fn), initalValue);
