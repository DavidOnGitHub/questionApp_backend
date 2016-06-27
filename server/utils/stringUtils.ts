const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function randomString(length) {
    let result = '';
    for (let i = 0; i < length; i ++) {
        result += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
    }
    return result;
};
