!function(e){var t={};function o(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,o),c.l=!0,c.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)o.d(r,c,function(t){return e[t]}.bind(null,c));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";function r(e){const t=e.toString(16);return 1===t.length?"0"+t:t}function c(e,t,o){return"#"+r(e)+r(t)+r(o)}o.r(t);const n=[["00BCD4","FFEB3B","FFEB3B","00BCD4"],["FFEB3B","FFC107","FFC107","FFEB3B"],["FFEB3B","FFC107","FFC107","FFEB3B"],["00BCD4","FFEB3B","FFEB3B","00BCD4"]],l=(e,t,o)=>{if(t<0||o<0||t>=e.width||o>=e.height)return NaN;const r=e.data,c=4*(o*e.width+t);return(255&r[c+0])<<24|(255&r[c+1])<<16|(255&r[c+2])<<8|(255&r[c+3])<<0},d=(e,t,o)=>{if(t<0||o<0||t>=e.width||o>=e.height)return NaN;const r=e.data,n=4*(o*e.width+t);return"0x"+c(r[n],r[n+1],r[n+2]).substr(1)+"FF"},u=(e,t,o,r)=>{const c=4*(o*e.width+t),n=e.data;n[c+0]=r>>>24&255,n[c+1]=r>>>16&255,n[c+2]=r>>>8&255,n[c+3]=r>>>0&255},a=(e,t)=>{if(isNaN(e)||isNaN(t))return 1/0;const o=(e>>>24&255)-(t>>>24&255),r=(e>>>16&255)-(t>>>16&255),c=(e>>>8&255)-(t>>>8&255),n=(e>>>0&255)-(t>>>0&255);return o*o+r*r+c*c+n*n};function s(e,t,o){"remove"===e?document.querySelector(o).classList.remove(t):"add"===e&&document.querySelector(o).classList.add(t)}window.onload=()=>{const e=localStorage.getItem("currentCanvas"),t=document.getElementById("canvas"),o=t.getContext("2d"),r=128,i="0xff0000FF",f=document.getElementById("red_color"),g=document.getElementById("blue_color"),m=document.getElementById("prev_color");if(null===e)!function(){for(let e=0;e<n.length;e++)for(let t=0;t<n[0].length;t++)o.fillStyle="#"+n[e][t],o.fillRect(t*r,e*r,r,r)}();else{const t=e,r=new Image;r.src=t,r.onload=function(){o.drawImage(r,0,0)}}const y=document.getElementById("pencil"),b=document.getElementById("choose_color"),h=document.getElementById("paint_bucket"),v=document.getElementById("eraser"),p=document.getElementById("straight_line"),F=[y,b,h,v,p];let k=y;k.classList.add("selected-tool"),F.forEach(e=>{e.addEventListener("click",()=>{document.querySelector(".selected-tool").classList.remove("selected-tool"),e.classList.add("selected-tool"),k=e.getAttribute("id")})});let S=i;document.querySelector(".current-color").style.background="#FF0000";let E="0x808080FF";document.querySelector(".prev-color").style.background="#808080";const B=document.getElementById("select_color");function w(e,t,c){if(!_)return;const n=Math.floor(e/r)*r,l=Math.floor(t/r)*r,d=o.getImageData(n,l,r,r);for(let e=0;e<4*r*r;e+=4)d.data[e]=c>>>24&255,d.data[e+1]=c>>>16&255,d.data[e+2]=c>>>8&255,d.data[e+3]=c>>>0&255;o.putImageData(d,n,l)}B.addEventListener("input",(function(){document.querySelector(".prev-color").style.background=document.querySelector(".current-color").style.background,document.querySelector(".current-color").style.background=B.value,E=S,S="0x"+B.value.substr(1)+"FF"}),!1),f.addEventListener("click",()=>{E=S,S=i,document.querySelector(".prev-color").style.background=document.querySelector(".current-color").style.background,document.querySelector(".current-color").style.background="#"+S.substr(2,String(S).length-4)}),g.addEventListener("click",()=>{E=S,S="0x0000FFFF",document.querySelector(".prev-color").style.background=document.querySelector(".current-color").style.background,document.querySelector(".current-color").style.background="#"+S.substr(2,String(S).length-4)}),m.addEventListener("click",()=>{let e=S;S=E,E=e,e=document.querySelector(".prev-color").style.background,document.querySelector(".prev-color").style.background=document.querySelector(".current-color").style.background,document.querySelector(".current-color").style.background=e});let _=!1,q=!1,I=!1;t.addEventListener("mousemove",e=>{switch([C,D]=[e.offsetX,e.offsetY],k){case"pencil":case y:w(C,D,S);break;case"eraser":L(C,D);break;case"straight_line":x(C,D);break;default:return}}),t.addEventListener("mousedown",e=>{switch(I=!0,[C,D]=[e.offsetX,e.offsetY],k){case"pencil":case y:_=!0,w(C,D,S);break;case"eraser":q=!0,L(C,D);break;default:return}});const L=(e,t)=>{q&&(o.fillStyle="rgba(255,255,255,1)",o.fillRect(Math.floor(e/r)*r,Math.floor(t/r)*r,r,r))},x=(e,r)=>{o.getImageData(0,0,t.width,t.height)};t.addEventListener("mouseup",()=>{_=!1,q=!1,I=!1}),t.addEventListener("mouseout",()=>{_=!1,q=!1});let C=0,D=0;t.addEventListener("click",e=>{C=e.layerX,D=e.layerY,"paint_bucket"===k?function(e,t,o,r,c){let n,s,i,f,g,m,y;const b=e.getContext("2d"),h=b.getImageData(0,0,e.width,e.height);if(d(h,t,o)===r)return;const v=[];for(let t=0;t<e.width;t++)v[t]=[];const p=l(h,t,o);for(c*=c,f=[[t,o]],v[t][o]=!0;n=f.pop();)if(m=n[0],y=n[1],a(l(h,m,y),p)<=c){for(u(h,m,y,r),s=i=m;s>0&&a(l(h,s-1,y),p)<=c&&(--s,!v[s][y]);)u(h,s,y,r);for(;i<h.width-1&&a(l(h,i+1,y),p)<=c&&(++i,!v[i][y]);)u(h,i,y,r);for(m=s;m<=i;m++)y>0&&(g=l(h,m,y-1),a(g,p)<=c&&(v[m][y-1]||(f.push([m,y-1]),v[m][y-1]=!0))),y<e.height-1&&(g=l(h,m,y+1),a(g,p)<=c&&(v[m][y+1]||(f.push([m,y+1]),v[m][y+1]=!0)))}b.putImageData(h,0,0,0,0,e.width,e.height)}(t,C,D,S,1):"choose_color"===k&&function(e,t){const r=o.getImageData(e,t,1,1).data;E=S,S="0x"+c(r[0],r[1],r[2]).substr(1)+"FF",document.querySelector(".prev-color").style.background=document.querySelector(".current-color").style.background,document.querySelector(".current-color").style.background=c(r[0],r[1],r[2])}(C,D)}),document.addEventListener("keydown",(function(e){switch(e.keyCode){case 66:k="paint_bucket",s("remove","selected-tool",".selected-tool"),s("add","selected-tool","#paint_bucket");break;case 80:k="pencil",s("remove","selected-tool",".selected-tool"),s("add","selected-tool","#pencil");break;case 67:k="choose_color",s("remove","selected-tool",".selected-tool"),s("add","selected-tool","#choose_color");break;case 69:k="eraser",s("remove","selected-tool",".selected-tool"),s("add","selected-tool","#eraser");break;case 83:k="straight_line",s("remove","selected-tool",".selected-tool"),s("add","selected-tool","#straight_line")}})),o.clearRect(0,0,t.width,t.height),window.addEventListener("beforeunload",()=>{localStorage.setItem("currentCanvas",t.toDataURL())})}}]);