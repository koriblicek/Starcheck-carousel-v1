const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default function isDev(): boolean {
    return development;
}

export function splitArray<T>(arr: T[], size: number) {
    let arr2 = arr.slice(0);
    let arrays = [];
    while (arr2.length > 0) {
        arrays.push(arr2.splice(0, size));
    }
    return arrays;
}