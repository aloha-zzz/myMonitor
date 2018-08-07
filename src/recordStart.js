// 记录时间
import collectInfo from './util';

export function recordInit() {
        requestIdleCallback(() => {
            let t = performance.timing;
            let info = {
                '白屏时间': t.responseStart - t.navigationStart, // 白屏时间，开始有页面呈现
                'domReady': t.domContentLoadedEventEnd - t.navigationStart, // 首屏时间，就是指用户在没有滚动时候看到的内容渲染完成并且可以交互的时间
                'onload': t.loadEventEnd - t.navigationStart // 完全加载完成的时间
            }
            
            let bool = Object.values(info).some ((item) => {
                return item < 0   // 防止记录数据为负数
            })
            if(bool) {
                recordInit();
                return;
            }
            collectInfo('record', JSON.stringify(info)) 
        })
   
}
