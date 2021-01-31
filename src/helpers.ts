export class Helpers {
    static uniqueArray(arr: Array<any>, sort: boolean = true) {
        const result: Array<any> = [];
        arr.forEach(entry => {
            if (!result.includes(entry)) {
                result.push(entry);
            }
        });
        return sort ? result.sort() : result
    }
}