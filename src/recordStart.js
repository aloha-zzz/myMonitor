// 记录时间
import collectInfo from './util';

export function recordInit() {
        requestIdleCallback(() => {
            let t = performance.timing;
            let info = {
                '白屏时间': t.responseStart - t.navigationStart,
                'domReady': t.domContentLoadedEventEnd - t.navigationStart,
                'onload': t.loadEventEnd - t.navigationStart
            }
            
            let bool = Object.values(info).some ((item) => {
                return item < 0 
            })
            if(bool) {
                recordInit();
                return;
            }
            collectInfo('record', JSON.stringify(info)) 
        })
   
}
