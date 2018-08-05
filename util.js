export default function collectInfo(type, info) {
    let content = localStorage.getItem(type);
    if (content) {
        let newInfo = encodeURIComponent(info);

        if (newInfo.indexOf(content) < 0) {
            content += '/' + encodeURIComponent(newInfo);
        }
    } else {
        content = encodeURIComponent(info)
    }
    localStorage.setItem(type, content);

    const data = content.split('/')

    // sendInfo(type, data);
    // ImageSendInfo(type, data);
}

function sendInfo(type, data) {   
    fetch({
        method: 'post',
        url: `monitor/${type}`,
        data
    }).then(() => {
      clearInfo(type)  
    })
}

function clearInfo(type) {
    localStorage.removeItem(type);
}


function ImageSendInfo(type, data) {
    let image = new Image();
    let query = data.join('/');
    image.src = `host?type=${type}&data=${query}`;
    image.onload = function () {
        clearInfo(type)
    }
}


