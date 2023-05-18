function clearNumbers(e, type) {
    if(type == 'text') {
        e = e.replace(/[а-яА-ЯеЁ0-9]/g,'')
    }
    if(type == 'number') {
        e = e.replace(/[а-яА-ЯеЁ0-9]/g,'')
    } else e = e.replace(/[а-яА-ЯеЁ0-9]/g,'')
    return e
}
export default clearNumbers