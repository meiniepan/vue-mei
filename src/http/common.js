let formatDate = (date) => {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
};

let timestampToString = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let minutes = date.getMinutes();
    let s = date.getSeconds();

    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (s < 10 ? '0' + s : s);
};

export {
    formatDate,
    timestampToString,
};