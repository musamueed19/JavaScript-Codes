// class GenericNumber<T> {
//     zeroValue: T;
//     add: (x: T, y: T) => T;
// }

// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x, y) { return x + y; };

// console.log(myGenericNumber.add(myGenericNumber.zeroValue, 5));


interface Identity<T> {
    addIdentity: (value: T) => void;
    removeIdentity: () => T | undefined;
    asArray: () => T[];
}

class IdentityClass<T> implements Identity<T> {
    private _value: T[] = [];

    addIdentity: (value: T) => void = (value: T) => {
        this._value.push(value);
    }

    removeIdentity: () => T | undefined = () => {
        return this._value.pop();
    }

    asArray: () => T[] = () => {
        return this._value;
    }

}


const myIdentity: Identity<string> = new IdentityClass<string>();
myIdentity.addIdentity('Hello');
myIdentity.addIdentity('World');
console.log(myIdentity.asArray().join(', '))
