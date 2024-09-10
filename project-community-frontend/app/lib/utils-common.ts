export function setCookie(key:string, value:string, maxAge:number) {
    if(typeof document != 'undefined'){
        // 对 cookie 值进行编码以转义其中的分号、逗号和空格
        var cookie = key + "=" + encodeURIComponent(value);
        /* 设置 max-age 属性 */
        cookie += "; max-age=" + maxAge;
        
        document.cookie = cookie;
    }
}

export function getCookie(key:string) {
    if(typeof document !== 'undefined'){
        console.log("document 为: ", document)
        console.log("document.cookie 为: ", document.cookie)
        // 拆分 cookie 字符串
        var cookieArr = document.cookie.split(";");

        // 循环遍历数组元素
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            /* 删除 cookie 名称开头的空白并将其与给定字符串进行比较 */
            if(key == cookiePair[0].trim()) {
                // 空格的URL编码为%20
                // 后端URL编码会将空格编码为+号, 而解码时不会对+号进行解码, 所以需要单独将加号编码为空格的URL编码
                const cookie = cookiePair[1].replace(/\+/g, "%20"); // 将+号转换为url编码
                return decodeURIComponent(cookie);
            }
        }
    }
    return undefined;

}

export function deleteCookie(key:string){
    setCookie(key, "", 0);
}


export function getRange(from:number, to:number){
    return Array.from(Array(to - from + 1).keys()).map(x => x + from);
}


// 