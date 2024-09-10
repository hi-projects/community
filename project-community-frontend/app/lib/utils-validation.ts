const telReg = /^1[3-9]\d{9}$/;			        // 手机号正则表达式
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // 邮箱正则表达式

export function isTel(s:string):boolean{
    return telReg.test(s)
} 
export function isEmail(s:string):boolean{
    return emailReg.test(s);
}