// 捕获错误

import { Lru } from './action'
import collectInfo from "./util";


export default function init() {

    window.addEventListener("unhandledrejection", function(e) {
        e.preventDefault();  // 防止控制台打印error
        console.log('catch promise error');
        collectInfo('errorInfo', 'promiseError: ' + e.reason + Lru.getHeadVal())
    })
/**
    * @param {String}  errorMessage   错误信息
    * @param {String}  scriptURI      出错的文件
    * @param {Long}    lineNumber     出错代码的行号
    * @param {Long}    columnNumber   出错代码的列号
    * @param {Object}  errorObj       错误的详细信息，Anything
    * 
    * 不同域的情况下会导致不能正确捕获异常
    */
    window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        let Error = {
            errorInfo: errorMessage,
            errorFile: scriptURI,
            errorLine: lineNumber,
            errorCol: columnNumber,
            errorDetail: errorObj
        }
        console.log('onerror emit');
        console.log(Error)
        collectInfo('errorInfo', JSON.stringify(Error) + Lru.getHeadVal());
        return true; // 控制台不显示错误
    }

    // window.addEventListener('error', function(error) {
    //     let Error = {
    //         errorInfo: error.message,
    //         errorFile: error.filename,
    //         errorLine: error.lineno,
    //         errorCol: error.colno,
    //         errorDetail: error.error
    //     }
    //     console.log(Error)
    // }, true)
}


