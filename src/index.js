console.log('monitor start')

import {recordInit} from './recordStart'
import { actionInit } from './action';
import errorInit from './error';

errorInit(); // 捕获错误
actionInit(); // 记录DOM修改
recordInit() // 记录网页时间

