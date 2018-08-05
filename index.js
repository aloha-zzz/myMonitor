console.log('monitor start')

import {recordInit} from './recordStart'
import { actionInit } from './action';
import errorInit from './error';
actionInit();
errorInit();
recordInit()

