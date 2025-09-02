export class Range extends Array {
    static range(from, to, step) {
        return Array.from({ length: Math.floor((to - from) / step) + 1 }, (v, k) => from + k * step)
    }
}
