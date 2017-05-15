
import Moment from 'moment';

export function isEmptyString(str) {
    return str === undefined || str === "" || str === '';
}

export function isCompleteString(str) {
    return str == 'Complete';
}

export function isObjectUndefinedOrNull(obj) {
    return obj == undefined || obj == null;
}

export function getFormattedDate(dateString, format) {
    if (this.isObjectUndefinedOrNull(dateString) || this.isEmptyString(dateString)) {
        return "";
    }

    try {
        return Moment(dateString).format(format ? format : '');
    }catch (e){
        throw (e);
    }
}


export function setSiteTitle(  title) {
    document.title = title + " - SportTG";

}

export function isRealUrlPattern(url) {
    if (isEmptyString(url)) {
        return false;
    }
    let pattern = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    return pattern.test(url);
}
