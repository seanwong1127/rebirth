!function(e){var t={};function a(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(r,o,function(t){return e[t]}.bind(null,o));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=2)}({2:function(e,t,a){"use strict";a.r(t);var r=function(e,t,a,r){return new(a||(a=Promise))((function(o,i){function n(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(n,s)}c((r=r.apply(e,t||[])).next())}))};const o=(e,t,a="info")=>{i("http://127.0.0.1/logHandle",{name:e,payload:t,level:a}).catch(e=>{console.error(e)})},i=(e,t)=>fetch(e,{body:JSON.stringify(t),method:"POST",cache:"no-cache",headers:{"content-type":"application/json"},mode:"cors",credentials:"include"});var n=new class{constructor(){this.tabs=Object.create(null)}getTab(e){return this.tabs[e]||null}getMediaRecorder(e){return this.getTab(e)&&this.getTab(e).mediaRecorder?this.getTab(e).mediaRecorder:null}getExtraInfo(e){return this.getTab(e)&&this.getTab(e).extraInfo?this.getTab(e).extraInfo:{}}getFileName(e){return this.getTab(e)&&this.getTab(e).fileName?this.getTab(e).fileName:"fileName_is_null"}getInitTimeoutId(e){return this.getTab(e)&&this.getTab(e).initTimeoutId?this.getTab(e).initTimeoutId:0}createTab(e){this.tabs[e]=Object.create(null)}setAction(e,t){null===this.getTab(e)&&this.createTab(e),t!==this.tabs[e].action&&(this.tabs[e].action=t),o(`set action to ${t}`)}setMediaRecorder(e,t){null===this.getTab(e)&&this.createTab(e),this.tabs[e].mediaRecorder=t}setExtraInfo(e,t){null===this.getTab(e)&&this.createTab(e),this.tabs[e].extraInfo=Object.assign(Object.assign({},this.tabs[e].extraInfo),t)}setFileName(e,t){null===this.getTab(e)&&this.createTab(e),t!==this.tabs[e].fileName&&(this.tabs[e].fileName=(e=>{let t="";const a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=a.length;for(let o=0;o<e;o++)t+=a.charAt(Math.floor(Math.random()*r));return t})(8)+t)}setInitTimeoutId(e,t){null===this.getTab(e)&&this.createTab(e),t!==this.tabs[e].initTimeoutId&&(this.tabs[e].initTimeoutId=t)}};const s={audioBitsPerSecond:128e3,videoBitsPerSecond:25e5,mimeType:"video/webm;codecs=h264"},c={type:"video/webm"};var l={start:(e,t,a)=>{var r,l;n.setAction(e,"start"),chrome.tabs.update(e,{active:!0}),chrome.tabCapture.capture({video:!0,audio:!0,videoConstraints:{mandatory:{minWidth:r=t,minHeight:l=a,maxWidth:r,maxHeight:l,maxFrameRate:30,minFrameRate:30}}},t=>{if(null===t)return chrome.tabs.sendMessage(e,{error:chrome.runtime.lastError}),o("capture fail",{captureError:chrome.runtime.lastError},"error"),!1;const a=[],r=new MediaRecorder(t,s);r.ondataavailable=e=>{e.data&&e.data.size>0&&a.push(e.data)},r.onstop=()=>{const t=n.getFileName(e),r=new Blob(a,c),s=document.createElement("a");var l;s.href=URL.createObjectURL(r),s.setAttribute("download",`${t}.webm`),s.click(),(l=t,o("checkFileDownload",{filenameRegex:l}),new Promise(e=>{const t=setTimeout(()=>{o("file download timeout",{filenameRegex:l},"warn"),e()},3e4),a=r=>{chrome.downloads.search({filenameRegex:r},i=>{0!==i.length&&"complete"===i[0].state?(clearTimeout(t),setTimeout(()=>{o("the file has been downloaded",{filenameRegex:r,downloadInfo:i[0]}),e()},3e3)):a(r)})};a(l)})).then(()=>{((e,t)=>{i("http://127.0.0.1/completeRecord",{extraInfo:n.getExtraInfo(t),fileName:e}).catch(e=>{o("complete record task request send fail",{completeRecordTaskError:e.message},"error")})})(t,e)}).catch(e=>{o("file download fail",{fileName:t,fileDownloadFailMessage:e.message},"error")}),setTimeout(()=>{chrome.tabs.remove(e)},2e3)},n.setMediaRecorder(e,r),r.start()})},pause:(e,t)=>{n.setAction(e,"pause"),t.pause()},resume:(e,t)=>{n.setAction(e,"resume"),t.resume()},stop:(e,t,a)=>{n.setAction(e,"stop"),n.setFileName(e,a),t.stop(),t.stream.getTracks().forEach(e=>{e.stop()})},fail:e=>{(e=>{i("http://127.0.0.1/recordFail",{extraInfo:n.getExtraInfo(e)}).catch(e=>{o("record fail request send fail",{recordFail:e.message},"error")})})(e)}};const d=()=>{new Promise((e,t)=>{i("http://127.0.0.1/getRecord",{}).then(a=>r(void 0,void 0,void 0,(function*(){const r=yield a.json();return a.ok?e(r):t(r)}))).catch(e=>t(e))}).then(e=>{chrome.tabs.create({url:e.material_url},t=>{const a=t.id;n.setAction(a,"waiting"),o("open url",{recordInfo:e});const r=setTimeout(()=>{o("initTimeout"),l.fail(a)},3e5);n.setInitTimeoutId(a,r)})}).catch(e=>{o("get record tasks fail",{getRecordTasksFail:e},"error")})};setTimeout(()=>{d()},3e3),chrome.runtime.onConnect.addListener(e=>{e.onMessage.addListener(t=>{const a=e.sender.tab.id,r=[a,n.getMediaRecorder(a)];return["pause","resume","fail"].includes(t.action)?l[t.action](...r):"start"===t.action?l.start(a,t.pageWidth,t.pageHeight):"stop"===t.action?l.stop(...r,t.fileName):"setExtraInfo"===t.action?n.setExtraInfo(a,t.extraInfo):("ready"===t.action&&e.postMessage({type:"ready"}),void("init"===t.action&&clearTimeout(n.getInitTimeoutId(a))))})})}});