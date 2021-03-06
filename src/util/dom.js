function isInViewPortOfOne(el, pad = 100) {
    const viewPortHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
    const { offsetTop } = el;
    const { scrollTop } = document.documentElement;
    const top = offsetTop - scrollTop;
    return top <= viewPortHeight + pad;
  }
  
  function download(href, cb) {
    const eleLink = document.createElement('a');
    eleLink.download = '';
    eleLink.href = href;
    eleLink.click();
    eleLink.remove();
    cb && cb();
  }
  
  function downloadByData(url, cb) {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
      const dataURL = canvas.toDataURL(`image/${ext}`);
      download(dataURL, cb);
    };
  }
  
  function downloadByBlob(url, cb) {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, image.width, image.height);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        download(url, cb);
        // 用完释放URL对象
        URL.revokeObjectURL(url);
      });
    };
  }
  
  function getClient() {
    return {
      width: document.body.clientWidth || document.documentElement.clientWidth,
      height: document.body.clientHeight || document.documentElement.clientHeight,
    };
  }


  function getScrollTop(){
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

function getScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight :documentScrollHeight;
    return scrollHeight;
}

function getWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == 'CSS1Compat'){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight =document.body.clientHeight;
    }
    return windowHeight;
}

  
  export {
    downloadByBlob,
    downloadByData,
    download,
    isInViewPortOfOne,
    getClient,
    getScrollHeight,
    getWindowHeight,
    getScrollTop,
  };