export default function rotateString(str, type) {
    str = str.split(type).reverse().join(type)
    return str
}