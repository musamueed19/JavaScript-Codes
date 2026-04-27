function getArray<T>(items: T[]): T[] {
    return new Array<T>().concat(items);
}

console.log(getArray([19, 2.5]))