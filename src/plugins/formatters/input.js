function formatterInput(e, type) {
    switch(type) {
        case 'login':
            e.target.value = e.target.value.replace(/[а-яА-ЯёЁ]/g,'')
            break;
        case 'number':
            e.target.value = e.target.value.replace(/[^\d]/g,'')
            break;
        case 'NT':
            e.target.value = e.target.value.replace(/[,./!@#$%^&*()"_№;:?=<>+`~-]/g,'')
            break;
        case 'latin':
            e.target.value = e.target.value.replace(/[\\[\]а-яА-ЯёЁ0-9,./!@#$%^&*()"_№;:?|{}''=<>+`~-\s]/g,'')
            break;
        case 'latin&number':
            e.target.value = e.target.value.replace(/[\\[\]а-яА-ЯёЁ,./!@#$%^&*()"_№;:''?|{}=<>+`~-]/g,'')
            break;
        case 'latin&number&Probel':
            e.target.value = e.target.value.replace(/[\\[\]а-яА-ЯёЁ,./!@#$%^&*()"_№;:?|{}''=<>+`~-\s]/g,'')
            break;
        case 'latin&number&UpperCase':
            e.target.value = e.target.value.replace(/[\\[\]а-яА-ЯёЁ,./!@#$%^&*()"_№;:''?|{}=<>+`~-]/g,'').toUpperCase()
            break;
        case 'extradition':
            e.target.value = e.target.value.replace(/[\\[\]а-яА-ЯёЁ,./!@#$%~^&*()"_№;:?|{}=<>+-]/g,'').toUpperCase()
            break;
        case 'extraditionSIM':
            e.target.value = e.target.value.replace(/[\\[\]0-9,./!@#$%~^&*()"_№;:?|{}=<>+-]/g,'').toUpperCase()
            break;
        case 'latin&UpperCase':
            e.target.value = e.target.value.replace(/[\\[\]а-яА-ЯёЁ0-9,./!@#$%^&*()"_№;:?|{}''=<>+`~-\s]/g,'').toUpperCase()
            break;
        case 'text&UpperCase':
            e.target.value = e.target.value.replace(/[\\[\]0-9,./!@#$%^&*()"_№;:?|{}''=<>+`~-\s]/g,'').toUpperCase()
            break;
        case 'latin&Symbols&UpperCase':
            e.target.value = e.target.value.replace(/[а-яА-ЯеЁ0-9]/g,'').toUpperCase()
            break;
        case 'text&Symbols&UpperCase':
            e.target.value = e.target.value.replace(/[0-9]/g,'').toUpperCase()
            break;
        default:
    }
    return e
}
export default formatterInput