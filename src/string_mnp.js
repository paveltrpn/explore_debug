export function removePunctuation(str) {
    return str.replace(/[/.,!?;]*/g, "")
}

export function splitBySpace(str) {
    return str.split(" ")
}

export function isAlpha(ch) {
    return typeof ch === "string" && ch.length === 1 && ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z"))
}

export function isDigit(ch) {
    return typeof ch === "string" && ch.length === 1 && ch >= "0" && ch <= "9"
}
