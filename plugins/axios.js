import {Message} from "element-ui";
//这个文件是拦截器 拦截错误的  文件名是随意起的。
export default function({$axios,redirect}){
    $axios.onError(err=>{
        const {statusCode, message} = err.response.data;
       if(statusCode===400){
        Message.warning(message)
       }
        
    })
     // console.log(err); 打印如下：Error是浏览器对象
    // Error: Request failed with status code 400
    // at createError (createError.js?2d83:16)
    // at settle (settle.js?467f:17)
    // at XMLHttpRequest.handleLoad (xhr.js?b50d:61)
}