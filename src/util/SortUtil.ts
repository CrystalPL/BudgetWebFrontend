export function sort<T>(orderType: 'asc' | 'desc', array: T[], fieldToSort: (value: T) => any): T[] {
    return array.toSorted((a, b) => {
        if (fieldToSort(a) < fieldToSort(b)) {
            return orderType === 'asc' ? -1 : 1
        }

        if (fieldToSort(a) > fieldToSort(b)) {
            return orderType === 'asc' ? 1 : -1
        }

        return 0;
    })
}