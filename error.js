// 捕获错误

import { Lru } from './action'
import collectInfo from "./util";

/**
    * @param {String}  errorMessage   错误信息
    * @param {String}  scriptURI      出错的文件
    * @param {Long}    lineNumber     出错代码的行号
    * @param {Long}    columnNumber   出错代码的列号
    * @param {Object}  errorObj       错误的详细信息，Anything
    */
export default function init() {
    window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        let Error = {
            errorInfo: errorMessage,
            errorFile: scriptURI,
            errorLine: lineNumber,
            errorCol: columnNumber,
            errorDetail: errorObj
        }
        collectInfo('errorInfo', JSON.stringify(Error) + Lru.getHeadVal())
    }
}


