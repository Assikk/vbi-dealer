function clearNumbers(e) {
    return e = e.replace(/[!,./@#$%^&*)(-=+_`]/g,'')
}
export default clearNumbers