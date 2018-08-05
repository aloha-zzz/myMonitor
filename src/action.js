
export function actionInit() {
    // window.addEventListener('click', (e) => {
    //     let targetContent = e.target.tagName + '/';
    //     for (let i of e.target.attributes) {
    //         targetContent += `${i.nodeName}: ${i.value}`
    //     }
    //     let data = {
    //         x: e.clientX,
    //         y: e.clientY,
    //         type: e.type,
    //         target: targetContent,
    //         path: e.path.map(item => item.tagName)
    //     }
    //     Info.push('clickInfo:' + JSON.stringify(data))
    //     // console.log(Info)
    // }, true)
    let observer = new MutationObserver(function(mutations) {
        let mutionInfo = 'observerInfo: '
        mutations.forEach(item => {
            let infoObj = item.target;
            let content = infoObj.tagName + '/';
            for (let i of infoObj.attributes) {
                content += `${i.nodeName}: ${i.value}`;
            }
            mutionInfo += content;
        })
        Lru.get(mutionInfo);
    });
    observer.observe(document, {
        subtree: true, 
        childList: true 
    });

    
}


function Node(val) {
    this.prev = null
    this.next = null;
    this.val = val;
}

class LruCache {
    constructor(limit) {
        this.limit = limit || 10
        this.head = this.tail = null;
        this.map = {}
        this.size = 0
    }
    getHeadVal() {
        return this.head.val;
    }

    get(val) {
        if (this.map[val] === undefined) { // 无对应节点
            if (this.size === this.limit) { // 达到限制
                this.deleteLast();
                this.insertFromHead(val)
               
            } else if (this.size === 0) {
                this.head = this.tail = this.map[val] = new Node(val);
                this.size++;
            } else { // 没有限制
                this.insertFromHead(val)
                this.size++;
            }
        } else { // 有对应的节点
            let findNode = this.map[val];
            if (this.head === findNode) {
                return;
            } else if (this.tail === findNode) {
                findNode.prev.next = null;
                this.tail = this.tail.prev
                findNode.prev = null;
                this.insertFromHead(findNode.val)
            } else {
                this.deleteInnerNode(findNode)
            }
        }
    }

    deleteInnerNode(node) { //删除内部节点
        let temp = node;
        temp.prev.next = temp.next;
        temp.next.prev = temp.prev;
        this.insertFromHead(node.val);
    }

    insertFromHead(val) { // 从头部插入
        let temp = this.map[val] = new Node(val);
        temp.next = this.head;
        this.head.prev = temp;
        this.head = this.head.prev;
    }

    deleteLast() { // 删除尾节点
        delete this.map[this.tail.val];
        this.tail = this.tail.prev;
        this.tail.next = null;
    }
}

const Lru = new LruCache()
export {
    Lru
}
