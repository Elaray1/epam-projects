!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=53)}([function(e,t,n){var r=n(8)(Object,"create");e.exports=r},function(e,t,n){var r=n(39);e.exports=function(e,t){for(var n=e.length;n--;)if(r(e[n][0],t))return n;return-1}},function(e,t,n){var r=n(45);e.exports=function(e,t){var n=e.__data__;return r(t)?n["string"==typeof t?"string":"hash"]:n.map}},function(e,t){var n=Array.isArray;e.exports=n},function(e,t,n){var r=n(7),a=n(18),i="[object Symbol]";e.exports=function(e){return"symbol"==typeof e||a(e)&&r(e)==i}},function(e,t,n){var r=n(6).Symbol;e.exports=r},function(e,t,n){var r=n(14),a="object"==typeof self&&self&&self.Object===Object&&self,i=r||a||Function("return this")();e.exports=i},function(e,t,n){var r=n(5),a=n(16),i=n(17),o="[object Null]",s="[object Undefined]",c=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?s:o:c&&c in Object(e)?a(e):i(e)}},function(e,t,n){var r=n(26),a=n(31);e.exports=function(e,t){var n=a(e,t);return r(n)?n:void 0}},function(e,t){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},function(e,t,n){var r=n(11);e.exports=function(e,t,n){var a=null==e?void 0:r(e,t);return void 0===a?n:a}},function(e,t,n){var r=n(12),a=n(52);e.exports=function(e,t){for(var n=0,i=(t=r(t,e)).length;null!=e&&n<i;)e=e[a(t[n++])];return n&&n==i?e:void 0}},function(e,t,n){var r=n(3),a=n(13),i=n(19),o=n(49);e.exports=function(e,t){return r(e)?e:a(e,t)?[e]:i(o(e))}},function(e,t,n){var r=n(3),a=n(4),i=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,o=/^\w*$/;e.exports=function(e,t){if(r(e))return!1;var n=typeof e;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=e&&!a(e))||(o.test(e)||!i.test(e)||null!=t&&e in Object(t))}},function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n(15))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){var r=n(5),a=Object.prototype,i=a.hasOwnProperty,o=a.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,s),n=e[s];try{e[s]=void 0;var r=!0}catch(e){}var a=o.call(e);return r&&(t?e[s]=n:delete e[s]),a}},function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},function(e,t,n){var r=n(20),a=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,i=/\\(\\)?/g,o=r((function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(a,(function(e,n,r,a){t.push(r?a.replace(i,"$1"):n||e)})),t}));e.exports=o},function(e,t,n){var r=n(21),a=500;e.exports=function(e){var t=r(e,(function(e){return n.size===a&&n.clear(),e})),n=t.cache;return t}},function(e,t,n){var r=n(22),a="Expected a function";function i(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError(a);var n=function(){var r=arguments,a=t?t.apply(this,r):r[0],i=n.cache;if(i.has(a))return i.get(a);var o=e.apply(this,r);return n.cache=i.set(a,o)||i,o};return n.cache=new(i.Cache||r),n}i.Cache=r,e.exports=i},function(e,t,n){var r=n(23),a=n(44),i=n(46),o=n(47),s=n(48);function c(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}c.prototype.clear=r,c.prototype.delete=a,c.prototype.get=i,c.prototype.has=o,c.prototype.set=s,e.exports=c},function(e,t,n){var r=n(24),a=n(36),i=n(43);e.exports=function(){this.size=0,this.__data__={hash:new r,map:new(i||a),string:new r}}},function(e,t,n){var r=n(25),a=n(32),i=n(33),o=n(34),s=n(35);function c(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}c.prototype.clear=r,c.prototype.delete=a,c.prototype.get=i,c.prototype.has=o,c.prototype.set=s,e.exports=c},function(e,t,n){var r=n(0);e.exports=function(){this.__data__=r?r(null):{},this.size=0}},function(e,t,n){var r=n(27),a=n(28),i=n(9),o=n(30),s=/^\[object .+?Constructor\]$/,c=Function.prototype,u=Object.prototype,l=c.toString,d=u.hasOwnProperty,h=RegExp("^"+l.call(d).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=function(e){return!(!i(e)||a(e))&&(r(e)?h:s).test(o(e))}},function(e,t,n){var r=n(7),a=n(9),i="[object AsyncFunction]",o="[object Function]",s="[object GeneratorFunction]",c="[object Proxy]";e.exports=function(e){if(!a(e))return!1;var t=r(e);return t==o||t==s||t==i||t==c}},function(e,t,n){var r,a=n(29),i=(r=/[^.]+$/.exec(a&&a.keys&&a.keys.IE_PROTO||""))?"Symbol(src)_1."+r:"";e.exports=function(e){return!!i&&i in e}},function(e,t,n){var r=n(6)["__core-js_shared__"];e.exports=r},function(e,t){var n=Function.prototype.toString;e.exports=function(e){if(null!=e){try{return n.call(e)}catch(e){}try{return e+""}catch(e){}}return""}},function(e,t){e.exports=function(e,t){return null==e?void 0:e[t]}},function(e,t){e.exports=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}},function(e,t,n){var r=n(0),a="__lodash_hash_undefined__",i=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;if(r){var n=t[e];return n===a?void 0:n}return i.call(t,e)?t[e]:void 0}},function(e,t,n){var r=n(0),a=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;return r?void 0!==t[e]:a.call(t,e)}},function(e,t,n){var r=n(0),a="__lodash_hash_undefined__";e.exports=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=r&&void 0===t?a:t,this}},function(e,t,n){var r=n(37),a=n(38),i=n(40),o=n(41),s=n(42);function c(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}c.prototype.clear=r,c.prototype.delete=a,c.prototype.get=i,c.prototype.has=o,c.prototype.set=s,e.exports=c},function(e,t){e.exports=function(){this.__data__=[],this.size=0}},function(e,t,n){var r=n(1),a=Array.prototype.splice;e.exports=function(e){var t=this.__data__,n=r(t,e);return!(n<0)&&(n==t.length-1?t.pop():a.call(t,n,1),--this.size,!0)}},function(e,t){e.exports=function(e,t){return e===t||e!=e&&t!=t}},function(e,t,n){var r=n(1);e.exports=function(e){var t=this.__data__,n=r(t,e);return n<0?void 0:t[n][1]}},function(e,t,n){var r=n(1);e.exports=function(e){return r(this.__data__,e)>-1}},function(e,t,n){var r=n(1);e.exports=function(e,t){var n=this.__data__,a=r(n,e);return a<0?(++this.size,n.push([e,t])):n[a][1]=t,this}},function(e,t,n){var r=n(8)(n(6),"Map");e.exports=r},function(e,t,n){var r=n(2);e.exports=function(e){var t=r(this,e).delete(e);return this.size-=t?1:0,t}},function(e,t){e.exports=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}},function(e,t,n){var r=n(2);e.exports=function(e){return r(this,e).get(e)}},function(e,t,n){var r=n(2);e.exports=function(e){return r(this,e).has(e)}},function(e,t,n){var r=n(2);e.exports=function(e,t){var n=r(this,e),a=n.size;return n.set(e,t),this.size+=n.size==a?0:1,this}},function(e,t,n){var r=n(50);e.exports=function(e){return null==e?"":r(e)}},function(e,t,n){var r=n(5),a=n(51),i=n(3),o=n(4),s=1/0,c=r?r.prototype:void 0,u=c?c.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(i(t))return a(t,e)+"";if(o(t))return u?u.call(t):"";var n=t+"";return"0"==n&&1/t==-s?"-0":n}},function(e,t){e.exports=function(e,t){for(var n=-1,r=null==e?0:e.length,a=Array(r);++n<r;)a[n]=t(e[n],n,e);return a}},function(e,t,n){var r=n(4),a=1/0;e.exports=function(e){if("string"==typeof e||r(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}},function(e,t,n){"use strict";n.r(t);const r=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a=["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],i=["Нядзеля","Панядзелак","Аўторак","Серада","Чацвер","Пятніца","Субота"],o=["Ндз","Пнд","Аўт","Срд","Чц","Птн","Сбт"],s=["Стдудзеня","Лютага","Сакавіка","Красавіка","Мая","Чэрвеня","Ліпеня","Жниўня","Верасня","Кастрычніка","Лістапада","Снежня"],c={1:"winter",2:"winter",3:"spring",4:"spring",5:"spring",6:"summer",7:"summer",8:"summer",9:"autumn",10:"autumn",11:"autumn",12:"winter"};let u=new Date;const l=()=>{const e=(new Date).getMonth()+1;return c[e]},d=e=>e<6?"night":e<12?"morning":e<18?"day":e<23?"evening":"night";async function h(e,t){let n;if(arguments.length<2?(u=new Date,n=await E()):(n=await E(t),u=10800===n?new Date(Date.now()):new Date(Date.now()-108e5+1e3*n)),"be"===e)return`${o[u.getDay()]}, ${u.getDate()} ${s[u.getMonth()]}, ${u.getHours()}:${u.getMinutes()} `;return u.toLocaleString(e,{weekday:"short",hour:"2-digit",minute:"2-digit",month:"long",day:"numeric",hour12:!1})}const p=(e,t)=>{let n;switch(t){case"en":n=r;break;case"ru":n=a;break;case"be":n=i;break;default:throw new Error("Incorrect language")}let o=u.getDay()+e;if(o<n.length)return n[o];for(;o>=n.length;)o-=n.length;return n[o]},f=n(10),m="https://ipinfo.io/json?token=3ad064711c140a",y="230f4057a5f3db6356e7ecc599dfea70f56ec7c5aa39f52fe4519034685dfd49",g="pk.eyJ1IjoiZWxhcmF5IiwiYSI6ImNrNDEyOWc2ZzA3ZGcza3BmeWNnc3U4cWIifQ.PyPYQwDUFrQnaFXpILz-_g",v="400",w="404";async function S(){const e=await fetch(m).then(e=>e.json()).catch(e=>{throw new Error(e)});if(!e)throw new Error("Cant get users city");return e.city}async function E(e){if(!arguments.length){return(await fetch(m).then(e=>e.json()).catch(e=>{throw new Error(e)})).timezone}const t=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`,n=await fetch(t).then(e=>e.json()).catch(e=>{throw new Error(e)});if(!f(n,"city.timezone",""))throw new Error("Cant get timezone!");return n.city.timezone}async function T(...e){let t;if(!e.length){const e=await fetch(m).then(e=>e.json()).catch(e=>{throw new Error(e)});return[e.city,e.country]}if(1===e.length){t=`https://api.openweathermap.org/data/2.5/forecast?q=${e[0]}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`}else{const n=e[0];t=`https://api.openweathermap.org/data/2.5/forecast?lat=${e[1]}&lon=${n}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`}const n=await fetch(t).then(e=>e.json()).catch(e=>{throw new Error(e)});if(!n)throw new Error("Cant get county and city using this data");if(!f(n,"city.name","")||!f(n,"city.country",""))throw new Error("Cant get city or country name!");return[n.city.name,n.city.country]}async function b(e){arguments.length||(e=await S());const t=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;return await fetch(t).then(e=>e.json()).catch(e=>{throw new Error(e)})}async function I(e){arguments.length||(e=await S());const t=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`,n=await fetch(t).then(e=>e.json()).catch(e=>{throw new Error(e)});if(!f(n,"list[0].main.temp","")||!f(n,"list[0].weather[0].icon",""))throw new Error("Cant get weather or weather icon!");return[[Math.round(n.list[0].main.temp),n.list[0].weather[0].icon],[Math.round(n.list[8].main.temp),n.list[8].weather[0].icon],[Math.round(n.list[16].main.temp),n.list[16].weather[0].icon],[Math.round(n.list[24].main.temp),n.list[24].weather[0].icon]]}async function x(e){let t,n;if(arguments.length?(t=(t=await b(e)).city.name,n=await b(t)):(t=await S(),n=await b()),!f(n,"list[0].weather[0].main",""))throw new Error("Cant get weather!");n=n.list[0].weather[0].main;const r=`https://api.unsplash.com/photos/random?query=${await l()},${n},${d((new Date).getHours())},${t}&client_id=${y}`,a=await fetch(r).then(e=>e.json()).catch(e=>{throw new Error(e)});document.querySelector("body").style.backgroundImage=`url(${a.urls.full})`}const A=e=>{const t=0|e;return`${t}°${60*Math.abs(e-t)|0}'`};async function R(e,t){if(!arguments.length){const n=await b();if(!n)throw new Error("Cant get weather by users city");if(e=f(n,"city.coord.lon",""),t=f(n,"city.coord.lat",""),!e||!t)throw new Error("Cant get coordinates of the city!")}return mapboxgl.accessToken=g,new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/streets-v11",center:[e,t],zoom:9})}async function M(e){const t=await b(e);if(t.cod===w||t.cod===v)return-1;const n=f(t,"city.coord.lon",""),r=f(t,"city.coord.lat","");if(!n||!r)throw new Error("Cant get coordinates of the city!");return[n,r]}const N={BD:"Bangladesh",BE:"Belgium",BF:"Burkina Faso",BG:"Bulgaria",BA:"Bosnia and Herzegovina",BB:"Barbados",WF:"Wallis and Futuna",BL:"Saint Barthelemy",BM:"Bermuda",BN:"Brunei",BO:"Bolivia",BH:"Bahrain",BI:"Burundi",BJ:"Benin",BT:"Bhutan",JM:"Jamaica",BV:"Bouvet Island",BW:"Botswana",WS:"Samoa",BQ:"Bonaire, Saint Eustatius and Saba ",BR:"Brazil",BS:"Bahamas",JE:"Jersey",BY:"Belarus",BZ:"Belize",RU:"Russia",RW:"Rwanda",RS:"Serbia",TL:"East Timor",RE:"Reunion",TM:"Turkmenistan",TJ:"Tajikistan",RO:"Romania",TK:"Tokelau",GW:"Guinea-Bissau",GU:"Guam",GT:"Guatemala",GS:"South Georgia and the South Sandwich Islands",GR:"Greece",GQ:"Equatorial Guinea",GP:"Guadeloupe",JP:"Japan",GY:"Guyana",GG:"Guernsey",GF:"French Guiana",GE:"Georgia",GD:"Grenada",GB:"United Kingdom",GA:"Gabon",SV:"El Salvador",GN:"Guinea",GM:"Gambia",GL:"Greenland",GI:"Gibraltar",GH:"Ghana",OM:"Oman",TN:"Tunisia",JO:"Jordan",HR:"Croatia",HT:"Haiti",HU:"Hungary",HK:"Hong Kong",HN:"Honduras",HM:"Heard Island and McDonald Islands",VE:"Venezuela",PR:"Puerto Rico",PS:"Palestinian Territory",PW:"Palau",PT:"Portugal",SJ:"Svalbard and Jan Mayen",PY:"Paraguay",IQ:"Iraq",PA:"Panama",PF:"French Polynesia",PG:"Papua New Guinea",PE:"Peru",PK:"Pakistan",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PM:"Saint Pierre and Miquelon",ZM:"Zambia",EH:"Western Sahara",EE:"Estonia",EG:"Egypt",ZA:"South Africa",EC:"Ecuador",IT:"Italy",VN:"Vietnam",SB:"Solomon Islands",ET:"Ethiopia",SO:"Somalia",ZW:"Zimbabwe",SA:"Saudi Arabia",ES:"Spain",ER:"Eritrea",ME:"Montenegro",MD:"Moldova",MG:"Madagascar",MF:"Saint Martin",MA:"Morocco",MC:"Monaco",UZ:"Uzbekistan",MM:"Myanmar",ML:"Mali",MO:"Macao",MN:"Mongolia",MH:"Marshall Islands",MK:"Macedonia",MU:"Mauritius",MT:"Malta",MW:"Malawi",MV:"Maldives",MQ:"Martinique",MP:"Northern Mariana Islands",MS:"Montserrat",MR:"Mauritania",IM:"Isle of Man",UG:"Uganda",TZ:"Tanzania",MY:"Malaysia",MX:"Mexico",IL:"Israel",FR:"France",IO:"British Indian Ocean Territory",SH:"Saint Helena",FI:"Finland",FJ:"Fiji",FK:"Falkland Islands",FM:"Micronesia",FO:"Faroe Islands",NI:"Nicaragua",NL:"Netherlands",NO:"Norway",NA:"Namibia",VU:"Vanuatu",NC:"New Caledonia",NE:"Niger",NF:"Norfolk Island",NG:"Nigeria",NZ:"New Zealand",NP:"Nepal",NR:"Nauru",NU:"Niue",CK:"Cook Islands",XK:"Kosovo",CI:"Ivory Coast",CH:"Switzerland",CO:"Colombia",CN:"China",CM:"Cameroon",CL:"Chile",CC:"Cocos Islands",CA:"Canada",CG:"Republic of the Congo",CF:"Central African Republic",CD:"Democratic Republic of the Congo",CZ:"Czech Republic",CY:"Cyprus",CX:"Christmas Island",CR:"Costa Rica",CW:"Curacao",CV:"Cape Verde",CU:"Cuba",SZ:"Swaziland",SY:"Syria",SX:"Sint Maarten",KG:"Kyrgyzstan",KE:"Kenya",SS:"South Sudan",SR:"Suriname",KI:"Kiribati",KH:"Cambodia",KN:"Saint Kitts and Nevis",KM:"Comoros",ST:"Sao Tome and Principe",SK:"Slovakia",KR:"South Korea",SI:"Slovenia",KP:"North Korea",KW:"Kuwait",SN:"Senegal",SM:"San Marino",SL:"Sierra Leone",SC:"Seychelles",KZ:"Kazakhstan",KY:"Cayman Islands",SG:"Singapore",SE:"Sweden",SD:"Sudan",DO:"Dominican Republic",DM:"Dominica",DJ:"Djibouti",DK:"Denmark",VG:"British Virgin Islands",DE:"Germany",YE:"Yemen",DZ:"Algeria",US:"United States",UY:"Uruguay",YT:"Mayotte",UM:"United States Minor Outlying Islands",LB:"Lebanon",LC:"Saint Lucia",LA:"Laos",TV:"Tuvalu",TW:"Taiwan",TT:"Trinidad and Tobago",TR:"Turkey",LK:"Sri Lanka",LI:"Liechtenstein",LV:"Latvia",TO:"Tonga",LT:"Lithuania",LU:"Luxembourg",LR:"Liberia",LS:"Lesotho",TH:"Thailand",TF:"French Southern Territories",TG:"Togo",TD:"Chad",TC:"Turks and Caicos Islands",LY:"Libya",VA:"Vatican",VC:"Saint Vincent and the Grenadines",AE:"United Arab Emirates",AD:"Andorra",AG:"Antigua and Barbuda",AF:"Afghanistan",AI:"Anguilla",VI:"U.S. Virgin Islands",IS:"Iceland",IR:"Iran",AM:"Armenia",AL:"Albania",AO:"Angola",AQ:"Antarctica",AS:"American Samoa",AR:"Argentina",AU:"Australia",AT:"Austria",AW:"Aruba",IN:"India",AX:"Aland Islands",AZ:"Azerbaijan",IE:"Ireland",ID:"Indonesia",UA:"Ukraine",QA:"Qatar",MZ:"Mozambique"},C=["THUNDERSTORM WITH LIGHT RAIN","THUNDERSTORM WITH RAIN","THUNDERSTORM WITH HEAVY RAIN","LIGHT THUNDERSTORM","THUNDERSTORM","HEAVY THUNDERSTORM","RAGGED THUNDERSTORM","THUNDERSTORM WITH LIGHT DRIZZLE","THUNDERSTORM WITH DRIZZLE","THUNDERSTORM WITH HEAVY DRIZZLE","LIGHT INTENSITY DRIZZLE","DRIZZLE","HEAVY INTENSITY DRIZZLE","LIGHT INTENSITY DRIZZLE RAIN","DRIZZLE RAIN","HEAVY INTENSITY DRIZZLE RAIN","SHOWER RAIN AND DRIZZLE","HEAVY SHOWER RAIN AND DRIZZLE","SHOWER DRIZZLE","LIGHT RAIN","MODERATE RAIN","HEAVY INTENSITY RAIN","VERY HEAVY RAIN","EXTREME RAIN","FREEZING RAIN","LIGHT INTENSITY SHOWER RAIN","SHOWER RAIN","HEAVY INTENSITY SHOWER RAIN","RAGGED SHOWER RAIN","LIGHT SNOW","SNOW","HEAVY SNOW","SLEET","LIGHT SHOWER SLEET","SHOWER SLEET","LIGHT RAIN AND SNOW","RAIN AND SNOW","LIGHT SHOWER SNOW","SHOWER SNOW","HEAVY SHOWER SNOW","MIST","SMOKE","HAZE","SAND/ DUST WHIRLS","FOG","SAND","DUST","VOLCANIC ASH","SQUALLS","TORNADO","CLEAR SKY","FEW CLOUDS","SCATTERED CLOUDS","BROKEN CLOUDS","OVERCAST CLOUDS"],_=["ГРОЗА С ЛЕГКИМ ДОЖДЕМ","ГРОЗА С ДОЖДЕМ","ГРОЗА С СИЛЬНЫМ ДОЖДЕМ","ЛЕГКАЯ ГРОЗА","ГРОЗА","СИЛЬНАЯ ГРОЗА","РВАНАЯ ГРОЗА","ГРОЗА С МЕЛКИМ ДОЖДЕМ","ГРОЗА С МЕЛКИМ ДОЖДЕМ","ГРОЗА С МЕЛКИМ ДОЖДЕМ","ГРОЗА С СИЛЬНЫМ ДОЖДЕМ","МЕЛКИЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","ДОЖДЬ И МОРОСЬ","ДОЖДЬ С ДОЖДЕМ"," НЕБОЛЬШОЙ ДОЖДЬ","УМЕРЕННЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","ОЧЕНЬ СИЛЬНЫЙ ДОЖДЬ","ЭКСТРЕМАЛЬНЫЙ ДОЖДЬ","ЛЕДЯНОЙ ДОЖДЬ","ЛИВЕНЬ С ИНТЕНСИВНЫМ ЛИВНЕМ","ЛИВЕНЬ С ИНТЕНСИВНЫМ ЛИВНЕМ","ДОЖДЬ С ИНТЕНСИВНЫМ ЛИВНЕМ","РВАНЫЙ ЛИВЕНЬ","ЛЕГКИЙ СНЕГ","СНЕГ","СИЛЬНЫЙ СНЕГ","МОКРЫЙ СНЕГ","ДОЖДЬ СО СНЕГОМ","ДОЖДЬ СО СНЕГОМ","ЛЕГКИЙ ДОЖДЬ СО СНЕГОМ","ДОЖДЬ СО СНЕГОМ","ДОЖДЬ СО СНЕГОМ","СИЛЬНЫЙ ДОЖДЬ СО СНЕГОМ","ТУМАН","ДЫМ","ДЫМКА","ПЕСЧАНЫЕ ВИХРИ","ТУМАН","ПЕСОК","ПЫЛЬ","ВУЛКАНИЧЕСКИЙ ПЕПЕЛ","ШКВАЛЫ","ТОРНАДО","ЧИСТОЕ НЕБО","МАЛО ОБЛАКОВ","РАССЕЯННЫЕ ОБЛАКА","РАЗОРВАННЫЕ ОБЛАКА","ПАСМУРНЫЕ ОБЛАКА"],O=["НАВАЛЬНІЦА З ЛЁГКІМ ДАЖДЖОМ","НАВАЛЬНІЦА З ДАЖДЖОМ","НАВАЛЬНІЦА З МОЦНЫМ ДАЖДЖОМ","ЛЁГКАЯ НАВАЛЬНІЦА","НАВАЛЬНІЦА","МОЦНАЯ НАВАЛЬНІЦА","ІРВАНАЯ НАВАЛЬНІЦА","НАВАЛЬНІЦА З ДРОБНЫМ ДАЖДЖОМ","НАВАЛЬНІЦА З ДРОБНЫМ ДАЖДЖОМ","НАВАЛЬНІЦА З ДРОБНЫМ ДАЖДЖОМ","НАВАЛЬНІЦА З МОЦНЫМ ДАЖДЖОМ","ДРОБНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","ДОЖДЖ І ІМЖА","ДОЖДЖ З ДАЖДЖОМ","НЕВЯЛІКІ ДОЖДЖ"," ЎМЕРАНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","ВЕЛЬМІ МОЦНЫ ДОЖДЖ","ЭКСТРЭМАЛЬНЫ ДОЖДЖ","ЛЕДЗЯНЫ ДОЖДЖ","ЛІВЕНЬ З ІНТЭНСІЎНЫМ ЛІЎНЕМ","ЛІВЕНЬ З ІНТЭНСІЎНЫМ ЛІЎНЕМ","ДОЖДЖ З ІНТЭНСІЎНЫМ ЛІЎНЕМ","ІРВАНЫ ЛІВЕНЬ","ЛЁГКІ СНЕГ","СНЕГ","МОЦНЫ СНЕГ","МОКРЫ СНЕГ","ДОЖДЖ СА СНЕГАМ","ДОЖДЖ СА СНЕГАМ","ЛЁГКІ ДОЖДЖ СА СНЕГАМ","ДОЖДЖ СА СНЕГАМ","ДОЖДЖ СА СНЕГАМ","МОЦНЫ ДОЖДЖ СА СНЕГАМ","ТУМАН","ДЫМ","СМУГА","ПЯСЧАНЫЯ ВІХУРЫ","ТУМАН","ПЯСОК","ПЫЛ","ВУЛКАНІЧНЫ ПОПЕЛ","ШКВАЛЫ","ТАРНАДА","ЧЫСТАЕ НЕБА","МАЛА АБЛОКАЎ","РАССЕЯНЫЯ АБЛОКІ","РАЗАРВАНЫЯ АБЛОКІ","ПАХМУРНЫЯ АБЛОКІ"];!async function(){document.querySelector(".content-wrapper").insertAdjacentHTML("afterbegin",'<div class="control-block">\n    <div class="control-block_buttons">\n      <img id="refresh-bg" src="../fancy-weather/assets/Refresh_BG.png" width="45" height="45">\n      <select class="control-block_languages">\n        <option value="en">EN</option>\n        <option value="ru">RU</option>\n        <option value="be">BE</option>\n      </select>\n      <div class="control-block_choose-degrees">\n        <div class="labels-for-degrees-inputs">\n          <input id="celsius" type="radio" name="degrees" value="c" checked>\n          <label for="celsius">\n            <div class="celsius">\n              <p>°C</p>\n            </div>\n          </label>\n          <input id="fahrenheit" type="radio" name="degrees" value="f">\n          <label for="fahrenheit">\n            <div class="fahrenheit">\n              <p>°F</p>\n            </div>\n          </label>\n        </div>\n      </div>\n      <label class="change-color">\n        <input type="color" value="#ffffff">\n        <div class="circle"></div>\n      </label>\n    </div>\n    <div class="control-block_search">\n      <div class="search-input">\n        <input id="search-input" type="text">\n        <img id="microfon-img" src="../fancy-weather/assets/micrrofon.png" width="14.5" height="17">\n      </div>\n      <div id="search-btn" class="search-btn">\n        <p>SEARCH</p>\n      </div>\n    </div>\n  </div><div class="weather-and-map"><div class="weather-for-4-days"><div class="weather-for-today">\n          <h2></h2>\n          <h4></h4>\n          <div class="weather-for-today_weather-description-block">\n            <div class="temperature">\n              <p></p>\n              <img src="">\n            </div>\n            <div class="weather-description">\n              <div class="weather-description-params">\n                <p class="description"></p>\n                <p class="feels-like-temp"></p>\n                <p class="wind-speed"></p>\n                <p class="humidity"></p>\n              </div>\n            </div>\n          </div>\n        </div><div class="next-three-days-weather">\n      <div class="next-three-days-weather_element next-three-days-weather_item-1">\n        <p></p>\n        <div class="temperature-next-days">\n          <p></p>\n          <img src="" alt="">\n        </div>\n      </div>\n      <div class="next-three-days-weather_element next-three-days-weather_item-2">\n        <p></p>\n        <div class="temperature-next-days">\n          <p></p>\n          <img src="" alt="">\n        </div>\n      </div>\n      <div class="next-three-days-weather_element next-three-days-weather_item-3">\n        <p></p>\n        <div class="temperature-next-days">\n          <p></p>\n          <img src="" alt="">\n        </div>\n      </div>\n    </div></div><div class="map-container">\n      <div id="map"></div>\n      <p class="lon">Longitude:</p>\n      <p class="lat">Latitude:</p>\n    </div></div>');const e=document.getElementById("refresh-bg"),t=document.querySelector(".weather-for-today h2"),n=document.querySelector(".weather-for-today h4"),r=document.querySelector(".temperature p"),a=document.querySelector(".temperature img"),i=document.querySelector(".description"),o=document.querySelector('input[type="color"]'),s=document.querySelector(".feels-like-temp"),c=document.querySelector(".wind-speed"),u=document.getElementById("celsius"),l=document.querySelector(".humidity"),d=document.getElementById("search-input"),m=document.getElementById("search-btn"),y=document.querySelector("select"),g=document.getElementById("microfon-img"),v=new webkitSpeechRecognition,w=await S();let E,b,L,$,H,D,G,B,P,j,W=!1,[k,U]=await M(w),Z=await I(),F=await T(),q=F[0],K=F[1];const V=()=>{for(let e=1;e<=3;e+=1){const t=document.querySelector(`.next-three-days-weather_item-${e}`);t.firstElementChild.innerText=p(e,E),t.lastElementChild.firstElementChild.innerText="celsius"===b?`${Z[e][0]}°`:`${Math.round(1.8*Z[e][0]+32)}°`,t.lastElementChild.lastElementChild.setAttribute("src",`http://openweathermap.org/img/wn/${Z[e][1]}@2x.png`)}},Y=async e=>{j=await async function(e){let t;const n=`https://api.openweathermap.org/data/2.5/forecast?q=${t=arguments.length?e:await S()}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`,r=await fetch(n).then(e=>e.json()).catch(e=>{throw new Error(e)});if(!(f(r,"list[0].main.temp","")&&f(r,"list[0].main","")&&f(r,"list[0].wind.speed","")&&f(r,"list[0].weather[0].description","")))throw new Error("Cant get weather description!");const a=r.list[0].main.temp,{humidity:i}=r.list[0].main,o=r.list[0].wind.speed,s=a-.4*(a-10)*(1-i/100);return[r.list[0].weather[0].description,Math.round(s),Math.round(o),i]}(e),i.innerText=j[0],s.innerText="celsius"===b?`${L}: ${j[1]}°`:`${L}: ${Math.round(1.8*j[1]+32)}°`,c.innerText=`${$}: ${j[2]} ${G}`,l.innerText=`${H}: ${j[3]}%`},z=async()=>{let e;switch(E){case"en":L="Feels like",$="Wind",H="Humidity",D="Search",G="m/s",B="Longitude",P="Latitude",e=j[0];break;case"ru":L="Чувствуется как",$="Ветер",H="Влажность",D="Найти",G="м/с",B="Долгота",P="Широта",e=_[C.indexOf(j[0].toUpperCase())];break;case"be":L="Адчуваецаа як",$="Вецер",H="Вільготнасць",D="Знайсці",G="м/с",B="Даўгата",P="Шырата",e=O[C.indexOf(j[0].toUpperCase())];break;default:throw new Error("Incorrect language")}t.innerText=await async function(e,t){const n=`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${t}&text=${e}&key=trnsl.1.1.20191213T134804Z.f3c0207ae1bd61a1.4a6247447729b96142973c7e4dbea3a2683640a1`;return(await fetch(n).then(e=>e.json()).catch(e=>{throw new Error(e)})).text[0]}(t.innerText,E),document.querySelector("#search-btn p").innerText=D,i.innerText=e,s.innerText=`${L}: ${j[1]}°`,c.innerText=`${$}: ${j[2]} ${G}`,l.innerText=`${H}: ${j[3]}%`;for(let e=1;e<=3;e+=1){document.querySelector(`.next-three-days-weather_item-${e}`).firstElementChild.innerText=p(e,E)}document.querySelector(".lon").innerText=`${B}: ${A(k)}`,document.querySelector(".lat").innerText=`${P}: ${A(U)}`,n.innerText=await h(E,q)};E=null!==localStorage.getItem("language")?localStorage.getItem("language"):"en",y.value=E,"celsius"===(b=null!==localStorage.getItem("degreesFormat")?localStorage.getItem("degreesFormat"):"celsius")?(r.innerText=`${Z[0][0]}°`,u.setAttribute("checked",!0)):(r.innerText=`${Math.round(1.8*Z[0][0]+32)}°`,document.getElementById("fahrenheit").setAttribute("checked",!0)),x(),V(),await Y(await T()),n.innerText=await h(E),t.innerText=`${q}, ${N[K]}`,z(),a.setAttribute("src",`http://openweathermap.org/img/wn/${Z[0][1]}@2x.png`),R(),document.querySelector(".lon").innerText=`${B}: ${A(k)}`,document.querySelector(".lat").innerText=`${P}: ${A(U)}`,setInterval(async()=>{n.innerText=await h(E,q)},6e4),m.addEventListener("click",async()=>{W&&(g.setAttribute("src","assets/micrrofon.png"),v.stop()),-1!==await M(d.value)?([k,U]=await M(d.value),d.value="",R(k,U),document.querySelector(".lon").innerText=`${B}: ${A(k)}`,document.querySelector(".lat").innerText=`${P}: ${A(U)}`,F=await T(k,U),q=F[0],K=F[1],n.innerText=await h(E,q),x(q),Z=await I(q),t.innerText=`${q}, ${N[K]}`,r.innerText="celsius"===b?`${Z[0][0]}°`:`${Math.round(1.8*Z[0][0]+32)}°`,a.setAttribute("src",`http://openweathermap.org/img/wn/${Z[0][1]}@2x.png`),await Y(q),V(),z()):d.value="en"===E?"Incorrect city name":"ru"===E?"Неправильное название города":"Няправільная назва горада"}),document.querySelector(".labels-for-degrees-inputs").addEventListener("change",()=>{if(u.checked){b="celsius",r.innerText=`${Math.round(5/9*(r.innerText.substr(0,r.innerText.length-1)-32))}°`;for(let e=1;e<=3;e+=1){const t=document.querySelector(`.next-three-days-weather_item-${e}`);t.lastElementChild.firstElementChild.innerText=`${Math.round(5/9*(t.lastElementChild.firstElementChild.innerText.substr(0,t.lastElementChild.firstElementChild.innerText.length-1)-32))}°`}s.innerText=`${L}: ${j[1]}°`}else{b="fahrenheit",r.innerText=`${Math.round(1.8*r.innerText.substr(0,r.innerText.length-1)+32)}°`;for(let e=1;e<=3;e+=1){const t=document.querySelector(`.next-three-days-weather_item-${e}`);t.lastElementChild.firstElementChild.innerText=`${Math.round(1.8*t.lastElementChild.firstElementChild.innerText.substr(0,t.lastElementChild.firstElementChild.innerText.length-1)+32)}°`}s.innerText=`${L}: ${Math.round(1.8*j[1]+32)}°`}}),y.addEventListener("change",()=>{E=y.value,z()}),e.addEventListener("click",()=>{x(q)}),o.addEventListener("change",()=>{document.querySelector("body").style.color=o.value,y.style.color=o.value,d.style.color=o.value}),v.start(),g.addEventListener("click",()=>{(W=!W)?(v.interimResults=!0,g.setAttribute("src","assets/micro_active.png")):(g.setAttribute("src","assets/micrrofon.png"),v.abort())}),v.addEventListener("result",e=>{const t=Array.from(e.results[0][0].transcript);W&&(d.value=t)}),v.addEventListener("end",v.start),window.addEventListener("beforeunload",()=>{localStorage.setItem("degreesFormat",b),localStorage.setItem("language",E)})}()}]);