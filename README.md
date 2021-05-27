# @arcticzeroo/typeguard

A collection of TS typeguards to check duck types easily.

```ts
import { isDuckType, isDuckTypeArray } from '@arcticzeroo/typeguard';

interface IUser {
    userName: string;
    coins: number;
}

const getUserData = async (id: string): Promise<IUser> => {
    const response = await fetch(`https://myapi/users/${id}`);
    
    if (!response.ok) {
        throw new Error('Could not get user');
    }
    
    const json = await response.json();
    
    // I can't use json.userName or json.coins yet!
    
    if (!isDuckType<IUser>(json, {
        userName:   'string',
        coins:      'number'
    })) {
        throw new Error('Response is not a user');
    }
    
    // TypeScript now knows that my type is an IUser,
    // so I can use json.userName or json.coins, or just return it
    
    return json;
};

const getAllUsers = async (): Promise<IUserResponse[]> => {
    const response = await fetch(`https://myapi/users/`);

    if (!response.ok) {
        throw new Error('Could not get users');
    }

    const json = await response.json();

    if (!isDuckTypeArray<IUser>(json, {
        userName:   'string',
        coins:      'number'
    })) {
        throw new Error('Response is not an array of users');
    }

    // TypeScript now knows that my type is an IUser[],

    return json;
};
```