!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],r=["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],i=["Нядзеля","Панядзелак","Аўторак","Серада","Чацвер","Пятніца","Субота"],o=["Ндз","Пнд","Аўт","Срд","Чц","Птн","Сбт"],s=["Стдудзеня","Лютага","Сакавіка","Красавіка","Мая","Чэрвеня","Ліпеня","Жниўня","Верасня","Кастрычніка","Лістапада","Снежня"],c={1:"winter",2:"winter",3:"spring",4:"spring",5:"spring",6:"summer",7:"summer",8:"summer",9:"autumn",10:"autumn",11:"autumn",12:"winter"};let l=new Date;const d=()=>{const e=(new Date).getMonth()+1;return c[e]},u=e=>e<6?"night":e<12?"morning":e<18?"day":e<23?"evening":"night";async function h(e,t){let n;if(arguments.length<2?(l=new Date,n=await w()):(n=await w(t),l=10800===n?new Date(Date.now()):new Date(Date.now()-108e5+1e3*n)),"be"===e)return`${o[l.getDay()]}, ${l.getDate()} ${s[l.getMonth()]}, ${l.getHours()}:${l.getMinutes()} `;return l.toLocaleString(e,{weekday:"short",hour:"2-digit",minute:"2-digit",month:"long",day:"numeric",hour12:!1})}const m=(e,t)=>{let n;switch(t){case"en":n=a;break;case"ru":n=r;break;case"be":n=i;break;default:throw new Error("Incorrect language")}let o=l.getDay()+e;if(o<n.length)return n[o];for(;o>=n.length;)o-=n.length;return n[o]},p="https://ipinfo.io/json?token=3ad064711c140a",S="230f4057a5f3db6356e7ecc599dfea70f56ec7c5aa39f52fe4519034685dfd49",g="pk.eyJ1IjoiZWxhcmF5IiwiYSI6ImNrNDEyOWc2ZzA3ZGcza3BmeWNnc3U4cWIifQ.PyPYQwDUFrQnaFXpILz-_g",y="400",E="404";async function T(){const e=await fetch(p).then(e=>e.json()).catch(e=>{throw new Error(e)});if(!e)throw new Error("Cant get users city");return e.city}async function w(e){if(!arguments.length){return(await fetch(p).then(e=>e.json()).catch(e=>{throw new Error(e)})).timezone}const t=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;return(await fetch(t).then(e=>e.json()).catch(e=>{throw new Error(e)})).city.timezone}async function f(...e){let t;if(!e.length){const e=await fetch(p).then(e=>e.json()).catch(e=>{throw new Error(e)});return[e.city,e.country]}if(1===e.length){t=`https://api.openweathermap.org/data/2.5/forecast?q=${e[0]}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`}else{const n=e[0];t=`https://api.openweathermap.org/data/2.5/forecast?lat=${e[1]}&lon=${n}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`}const n=await fetch(t).then(e=>e.json()).catch(e=>{throw new Error(e)});if(!n)throw new Error("Cant get county and city using this data");return[n.city.name,n.city.country]}async function I(e){arguments.length||(e=await T());const t=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;return await fetch(t).then(e=>e.json()).catch(e=>{throw new Error(e)})}async function A(e){arguments.length||(e=await T());const t=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`,n=await fetch(t).then(e=>e.json()).catch(e=>{throw new Error(e)});return[[Math.round(n.list[0].main.temp),n.list[0].weather[0].icon],[Math.round(n.list[8].main.temp),n.list[8].weather[0].icon],[Math.round(n.list[16].main.temp),n.list[16].weather[0].icon],[Math.round(n.list[24].main.temp),n.list[24].weather[0].icon]]}async function b(e){let t,n;arguments.length?(t=(t=await I(e)).city.name,n=await I(t)):(t=await T(),n=await I()),n=n.list[0].weather[0].main;const a=`https://api.unsplash.com/photos/random?query=${await d()},${n},${u((new Date).getHours())},${t}&client_id=${S}`,r=await fetch(a).then(e=>e.json()).catch(e=>{throw new Error(e)});document.querySelector("body").style.backgroundImage=`url(${r.urls.full})`}const M=e=>{const t=0|e;return`${t}°${60*Math.abs(e-t)|0}'`};async function R(e,t){if(!arguments.length){const n=await I();if(!n)throw new Error("Cant get weather by users city");e=n.city.coord.lon,t=n.city.coord.lat}return mapboxgl.accessToken=g,new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/streets-v11",center:[e,t],zoom:9})}async function N(e){const t=await I(e);return t.cod===E||t.cod===y?-1:[t.city.coord.lon,t.city.coord.lat]}const v={BD:"Bangladesh",BE:"Belgium",BF:"Burkina Faso",BG:"Bulgaria",BA:"Bosnia and Herzegovina",BB:"Barbados",WF:"Wallis and Futuna",BL:"Saint Barthelemy",BM:"Bermuda",BN:"Brunei",BO:"Bolivia",BH:"Bahrain",BI:"Burundi",BJ:"Benin",BT:"Bhutan",JM:"Jamaica",BV:"Bouvet Island",BW:"Botswana",WS:"Samoa",BQ:"Bonaire, Saint Eustatius and Saba ",BR:"Brazil",BS:"Bahamas",JE:"Jersey",BY:"Belarus",BZ:"Belize",RU:"Russia",RW:"Rwanda",RS:"Serbia",TL:"East Timor",RE:"Reunion",TM:"Turkmenistan",TJ:"Tajikistan",RO:"Romania",TK:"Tokelau",GW:"Guinea-Bissau",GU:"Guam",GT:"Guatemala",GS:"South Georgia and the South Sandwich Islands",GR:"Greece",GQ:"Equatorial Guinea",GP:"Guadeloupe",JP:"Japan",GY:"Guyana",GG:"Guernsey",GF:"French Guiana",GE:"Georgia",GD:"Grenada",GB:"United Kingdom",GA:"Gabon",SV:"El Salvador",GN:"Guinea",GM:"Gambia",GL:"Greenland",GI:"Gibraltar",GH:"Ghana",OM:"Oman",TN:"Tunisia",JO:"Jordan",HR:"Croatia",HT:"Haiti",HU:"Hungary",HK:"Hong Kong",HN:"Honduras",HM:"Heard Island and McDonald Islands",VE:"Venezuela",PR:"Puerto Rico",PS:"Palestinian Territory",PW:"Palau",PT:"Portugal",SJ:"Svalbard and Jan Mayen",PY:"Paraguay",IQ:"Iraq",PA:"Panama",PF:"French Polynesia",PG:"Papua New Guinea",PE:"Peru",PK:"Pakistan",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PM:"Saint Pierre and Miquelon",ZM:"Zambia",EH:"Western Sahara",EE:"Estonia",EG:"Egypt",ZA:"South Africa",EC:"Ecuador",IT:"Italy",VN:"Vietnam",SB:"Solomon Islands",ET:"Ethiopia",SO:"Somalia",ZW:"Zimbabwe",SA:"Saudi Arabia",ES:"Spain",ER:"Eritrea",ME:"Montenegro",MD:"Moldova",MG:"Madagascar",MF:"Saint Martin",MA:"Morocco",MC:"Monaco",UZ:"Uzbekistan",MM:"Myanmar",ML:"Mali",MO:"Macao",MN:"Mongolia",MH:"Marshall Islands",MK:"Macedonia",MU:"Mauritius",MT:"Malta",MW:"Malawi",MV:"Maldives",MQ:"Martinique",MP:"Northern Mariana Islands",MS:"Montserrat",MR:"Mauritania",IM:"Isle of Man",UG:"Uganda",TZ:"Tanzania",MY:"Malaysia",MX:"Mexico",IL:"Israel",FR:"France",IO:"British Indian Ocean Territory",SH:"Saint Helena",FI:"Finland",FJ:"Fiji",FK:"Falkland Islands",FM:"Micronesia",FO:"Faroe Islands",NI:"Nicaragua",NL:"Netherlands",NO:"Norway",NA:"Namibia",VU:"Vanuatu",NC:"New Caledonia",NE:"Niger",NF:"Norfolk Island",NG:"Nigeria",NZ:"New Zealand",NP:"Nepal",NR:"Nauru",NU:"Niue",CK:"Cook Islands",XK:"Kosovo",CI:"Ivory Coast",CH:"Switzerland",CO:"Colombia",CN:"China",CM:"Cameroon",CL:"Chile",CC:"Cocos Islands",CA:"Canada",CG:"Republic of the Congo",CF:"Central African Republic",CD:"Democratic Republic of the Congo",CZ:"Czech Republic",CY:"Cyprus",CX:"Christmas Island",CR:"Costa Rica",CW:"Curacao",CV:"Cape Verde",CU:"Cuba",SZ:"Swaziland",SY:"Syria",SX:"Sint Maarten",KG:"Kyrgyzstan",KE:"Kenya",SS:"South Sudan",SR:"Suriname",KI:"Kiribati",KH:"Cambodia",KN:"Saint Kitts and Nevis",KM:"Comoros",ST:"Sao Tome and Principe",SK:"Slovakia",KR:"South Korea",SI:"Slovenia",KP:"North Korea",KW:"Kuwait",SN:"Senegal",SM:"San Marino",SL:"Sierra Leone",SC:"Seychelles",KZ:"Kazakhstan",KY:"Cayman Islands",SG:"Singapore",SE:"Sweden",SD:"Sudan",DO:"Dominican Republic",DM:"Dominica",DJ:"Djibouti",DK:"Denmark",VG:"British Virgin Islands",DE:"Germany",YE:"Yemen",DZ:"Algeria",US:"United States",UY:"Uruguay",YT:"Mayotte",UM:"United States Minor Outlying Islands",LB:"Lebanon",LC:"Saint Lucia",LA:"Laos",TV:"Tuvalu",TW:"Taiwan",TT:"Trinidad and Tobago",TR:"Turkey",LK:"Sri Lanka",LI:"Liechtenstein",LV:"Latvia",TO:"Tonga",LT:"Lithuania",LU:"Luxembourg",LR:"Liberia",LS:"Lesotho",TH:"Thailand",TF:"French Southern Territories",TG:"Togo",TD:"Chad",TC:"Turks and Caicos Islands",LY:"Libya",VA:"Vatican",VC:"Saint Vincent and the Grenadines",AE:"United Arab Emirates",AD:"Andorra",AG:"Antigua and Barbuda",AF:"Afghanistan",AI:"Anguilla",VI:"U.S. Virgin Islands",IS:"Iceland",IR:"Iran",AM:"Armenia",AL:"Albania",AO:"Angola",AQ:"Antarctica",AS:"American Samoa",AR:"Argentina",AU:"Australia",AT:"Austria",AW:"Aruba",IN:"India",AX:"Aland Islands",AZ:"Azerbaijan",IE:"Ireland",ID:"Indonesia",UA:"Ukraine",QA:"Qatar",MZ:"Mozambique"},C=["THUNDERSTORM WITH LIGHT RAIN","THUNDERSTORM WITH RAIN","THUNDERSTORM WITH HEAVY RAIN","LIGHT THUNDERSTORM","THUNDERSTORM","HEAVY THUNDERSTORM","RAGGED THUNDERSTORM","THUNDERSTORM WITH LIGHT DRIZZLE","THUNDERSTORM WITH DRIZZLE","THUNDERSTORM WITH HEAVY DRIZZLE","LIGHT INTENSITY DRIZZLE","DRIZZLE","HEAVY INTENSITY DRIZZLE","LIGHT INTENSITY DRIZZLE RAIN","DRIZZLE RAIN","HEAVY INTENSITY DRIZZLE RAIN","SHOWER RAIN AND DRIZZLE","HEAVY SHOWER RAIN AND DRIZZLE","SHOWER DRIZZLE","LIGHT RAIN","MODERATE RAIN","HEAVY INTENSITY RAIN","VERY HEAVY RAIN","EXTREME RAIN","FREEZING RAIN","LIGHT INTENSITY SHOWER RAIN","SHOWER RAIN","HEAVY INTENSITY SHOWER RAIN","RAGGED SHOWER RAIN","LIGHT SNOW","SNOW","HEAVY SNOW","SLEET","LIGHT SHOWER SLEET","SHOWER SLEET","LIGHT RAIN AND SNOW","RAIN AND SNOW","LIGHT SHOWER SNOW","SHOWER SNOW","HEAVY SHOWER SNOW","MIST","SMOKE","HAZE","SAND/ DUST WHIRLS","FOG","SAND","DUST","VOLCANIC ASH","SQUALLS","TORNADO","CLEAR SKY","FEW CLOUDS","SCATTERED CLOUDS","BROKEN CLOUDS","OVERCAST CLOUDS"],L=["ГРОЗА С ЛЕГКИМ ДОЖДЕМ","ГРОЗА С ДОЖДЕМ","ГРОЗА С СИЛЬНЫМ ДОЖДЕМ","ЛЕГКАЯ ГРОЗА","ГРОЗА","СИЛЬНАЯ ГРОЗА","РВАНАЯ ГРОЗА","ГРОЗА С МЕЛКИМ ДОЖДЕМ","ГРОЗА С МЕЛКИМ ДОЖДЕМ","ГРОЗА С МЕЛКИМ ДОЖДЕМ","ГРОЗА С СИЛЬНЫМ ДОЖДЕМ","МЕЛКИЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","ДОЖДЬ И МОРОСЬ","ДОЖДЬ С ДОЖДЕМ"," НЕБОЛЬШОЙ ДОЖДЬ","УМЕРЕННЫЙ ДОЖДЬ","СИЛЬНЫЙ ДОЖДЬ","ОЧЕНЬ СИЛЬНЫЙ ДОЖДЬ","ЭКСТРЕМАЛЬНЫЙ ДОЖДЬ","ЛЕДЯНОЙ ДОЖДЬ","ЛИВЕНЬ С ИНТЕНСИВНЫМ ЛИВНЕМ","ЛИВЕНЬ С ИНТЕНСИВНЫМ ЛИВНЕМ","ДОЖДЬ С ИНТЕНСИВНЫМ ЛИВНЕМ","РВАНЫЙ ЛИВЕНЬ","ЛЕГКИЙ СНЕГ","СНЕГ","СИЛЬНЫЙ СНЕГ","МОКРЫЙ СНЕГ","ДОЖДЬ СО СНЕГОМ","ДОЖДЬ СО СНЕГОМ","ЛЕГКИЙ ДОЖДЬ СО СНЕГОМ","ДОЖДЬ СО СНЕГОМ","ДОЖДЬ СО СНЕГОМ","СИЛЬНЫЙ ДОЖДЬ СО СНЕГОМ","ТУМАН","ДЫМ","ДЫМКА","ПЕСЧАНЫЕ ВИХРИ","ТУМАН","ПЕСОК","ПЫЛЬ","ВУЛКАНИЧЕСКИЙ ПЕПЕЛ","ШКВАЛЫ","ТОРНАДО","ЧИСТОЕ НЕБО","МАЛО ОБЛАКОВ","РАССЕЯННЫЕ ОБЛАКА","РАЗОРВАННЫЕ ОБЛАКА","ПАСМУРНЫЕ ОБЛАКА"],H=["НАВАЛЬНІЦА З ЛЁГКІМ ДАЖДЖОМ","НАВАЛЬНІЦА З ДАЖДЖОМ","НАВАЛЬНІЦА З МОЦНЫМ ДАЖДЖОМ","ЛЁГКАЯ НАВАЛЬНІЦА","НАВАЛЬНІЦА","МОЦНАЯ НАВАЛЬНІЦА","ІРВАНАЯ НАВАЛЬНІЦА","НАВАЛЬНІЦА З ДРОБНЫМ ДАЖДЖОМ","НАВАЛЬНІЦА З ДРОБНЫМ ДАЖДЖОМ","НАВАЛЬНІЦА З ДРОБНЫМ ДАЖДЖОМ","НАВАЛЬНІЦА З МОЦНЫМ ДАЖДЖОМ","ДРОБНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","ДОЖДЖ І ІМЖА","ДОЖДЖ З ДАЖДЖОМ","НЕВЯЛІКІ ДОЖДЖ"," ЎМЕРАНЫ ДОЖДЖ","МОЦНЫ ДОЖДЖ","ВЕЛЬМІ МОЦНЫ ДОЖДЖ","ЭКСТРЭМАЛЬНЫ ДОЖДЖ","ЛЕДЗЯНЫ ДОЖДЖ","ЛІВЕНЬ З ІНТЭНСІЎНЫМ ЛІЎНЕМ","ЛІВЕНЬ З ІНТЭНСІЎНЫМ ЛІЎНЕМ","ДОЖДЖ З ІНТЭНСІЎНЫМ ЛІЎНЕМ","ІРВАНЫ ЛІВЕНЬ","ЛЁГКІ СНЕГ","СНЕГ","МОЦНЫ СНЕГ","МОКРЫ СНЕГ","ДОЖДЖ СА СНЕГАМ","ДОЖДЖ СА СНЕГАМ","ЛЁГКІ ДОЖДЖ СА СНЕГАМ","ДОЖДЖ СА СНЕГАМ","ДОЖДЖ СА СНЕГАМ","МОЦНЫ ДОЖДЖ СА СНЕГАМ","ТУМАН","ДЫМ","СМУГА","ПЯСЧАНЫЯ ВІХУРЫ","ТУМАН","ПЯСОК","ПЫЛ","ВУЛКАНІЧНЫ ПОПЕЛ","ШКВАЛЫ","ТАРНАДА","ЧЫСТАЕ НЕБА","МАЛА АБЛОКАЎ","РАССЕЯНЫЯ АБЛОКІ","РАЗАРВАНЫЯ АБЛОКІ","ПАХМУРНЫЯ АБЛОКІ"];!async function(){document.querySelector(".content-wrapper").insertAdjacentHTML("afterbegin",'<div class="control-block">\n    <div class="control-block_buttons">\n      <img id="refresh-bg" src="../fancy-weather/assets/Refresh_BG.png" width="45" height="45">\n      <select class="control-block_languages">\n        <option value="en">EN</option>\n        <option value="ru">RU</option>\n        <option value="be">BE</option>\n      </select>\n      <div class="control-block_choose-degrees">\n        <div class="labels-for-degrees-inputs">\n          <input id="celsius" type="radio" name="degrees" value="c" checked>\n          <label for="celsius">\n            <div class="celsius">\n              <p>°C</p>\n            </div>\n          </label>\n          <input id="fahrenheit" type="radio" name="degrees" value="f">\n          <label for="fahrenheit">\n            <div class="fahrenheit">\n              <p>°F</p>\n            </div>\n          </label>\n        </div>\n      </div>\n      <label class="change-color">\n        <input type="color" value="#ffffff">\n        <div class="circle"></div>\n      </label>\n    </div>\n    <div class="control-block_search">\n      <div class="search-input">\n        <input id="search-input" type="text">\n        <img id="microfon-img" src="../fancy-weather/assets/micrrofon.png" width="14.5" height="17">\n      </div>\n      <div id="search-btn" class="search-btn">\n        <p>SEARCH</p>\n      </div>\n    </div>\n  </div><div class="weather-and-map"><div class="weather-for-4-days"><div class="weather-for-today">\n          <h2></h2>\n          <h4></h4>\n          <div class="weather-for-today_weather-description-block">\n            <div class="temperature">\n              <p></p>\n              <img src="">\n            </div>\n            <div class="weather-description">\n              <div class="weather-description-params">\n                <p class="description"></p>\n                <p class="feels-like-temp"></p>\n                <p class="wind-speed"></p>\n                <p class="humidity"></p>\n              </div>\n            </div>\n          </div>\n        </div><div class="next-three-days-weather">\n      <div class="next-three-days-weather_element next-three-days-weather_item-1">\n        <p></p>\n        <div class="temperature-next-days">\n          <p></p>\n          <img src="" alt="">\n        </div>\n      </div>\n      <div class="next-three-days-weather_element next-three-days-weather_item-2">\n        <p></p>\n        <div class="temperature-next-days">\n          <p></p>\n          <img src="" alt="">\n        </div>\n      </div>\n      <div class="next-three-days-weather_element next-three-days-weather_item-3">\n        <p></p>\n        <div class="temperature-next-days">\n          <p></p>\n          <img src="" alt="">\n        </div>\n      </div>\n    </div></div><div class="map-container">\n      <div id="map"></div>\n      <p class="lon">Longitude:</p>\n      <p class="lat">Latitude:</p>\n    </div></div>');const e=document.getElementById("refresh-bg"),t=document.querySelector(".weather-for-today h2"),n=document.querySelector(".weather-for-today h4"),a=document.querySelector(".temperature p"),r=document.querySelector(".temperature img"),i=document.querySelector(".description"),o=document.querySelector('input[type="color"]'),s=document.querySelector(".feels-like-temp"),c=document.querySelector(".wind-speed"),l=document.getElementById("celsius"),d=document.querySelector(".humidity"),u=document.getElementById("search-input"),p=document.getElementById("search-btn"),S=document.querySelector("select"),g=document.getElementById("microfon-img"),y=new webkitSpeechRecognition,E=await T();let w,I,x,D,$,G,O,B,P,W,U=!1,[Z,k]=await N(E),F=await A(),q=await f(),K=q[0],V=q[1];const Y=()=>{for(let e=1;e<=3;e+=1){const t=document.querySelector(`.next-three-days-weather_item-${e}`);t.firstElementChild.innerText=m(e,w),t.lastElementChild.firstElementChild.innerText="celsius"===I?`${F[e][0]}°`:`${Math.round(1.8*F[e][0]+32)}°`,t.lastElementChild.lastElementChild.setAttribute("src",`http://openweathermap.org/img/wn/${F[e][1]}@2x.png`)}},j=async e=>{W=await async function(e){let t;const n=`https://api.openweathermap.org/data/2.5/forecast?q=${t=arguments.length?e:await T()}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`,a=await fetch(n).then(e=>e.json()).catch(e=>{throw new Error(e)}),r=a.list[0].main.temp,{humidity:i}=a.list[0].main,o=a.list[0].wind.speed,s=r-.4*(r-10)*(1-i/100);return[a.list[0].weather[0].description,Math.round(s),Math.round(o),i]}(e),i.innerText=W[0],s.innerText="celsius"===I?`${x}: ${W[1]}°`:`${x}: ${Math.round(1.8*W[1]+32)}°`,c.innerText=`${D}: ${W[2]} ${O}`,d.innerText=`${$}: ${W[3]}%`},_=async()=>{let e;switch(w){case"en":x="Feels like",D="Wind",$="Humidity",G="Search",O="m/s",B="Longitude",P="Latitude",e=W[0];break;case"ru":x="Чувствуется как",D="Ветер",$="Влажность",G="Найти",O="м/с",B="Долгота",P="Широта",e=L[C.indexOf(W[0].toUpperCase())];break;case"be":x="Адчуваецаа як",D="Вецер",$="Вільготнасць",G="Знайсці",O="м/с",B="Даўгата",P="Шырата",e=H[C.indexOf(W[0].toUpperCase())];break;default:throw new Error("Incorrect language")}t.innerText=await async function(e,t){const n=`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${t}&text=${e}&key=trnsl.1.1.20191213T134804Z.f3c0207ae1bd61a1.4a6247447729b96142973c7e4dbea3a2683640a1`;return(await fetch(n).then(e=>e.json()).catch(e=>{throw new Error(e)})).text[0]}(t.innerText,w),document.querySelector("#search-btn p").innerText=G,i.innerText=e,s.innerText=`${x}: ${W[1]}°`,c.innerText=`${D}: ${W[2]} ${O}`,d.innerText=`${$}: ${W[3]}%`;for(let e=1;e<=3;e+=1){document.querySelector(`.next-three-days-weather_item-${e}`).firstElementChild.innerText=m(e,w)}document.querySelector(".lon").innerText=`${B}: ${M(Z)}`,document.querySelector(".lat").innerText=`${P}: ${M(k)}`,n.innerText=await h(w,K)};w=null!==localStorage.getItem("language")?localStorage.getItem("language"):"en",S.value=w,"celsius"===(I=null!==localStorage.getItem("degreesFormat")?localStorage.getItem("degreesFormat"):"celsius")?(a.innerText=`${F[0][0]}°`,l.setAttribute("checked",!0)):(a.innerText=`${Math.round(1.8*F[0][0]+32)}°`,document.getElementById("fahrenheit").setAttribute("checked",!0)),b(),Y(),await j(await f()),n.innerText=await h(w),t.innerText=`${K}, ${v[V]}`,_(),r.setAttribute("src",`http://openweathermap.org/img/wn/${F[0][1]}@2x.png`),R(),document.querySelector(".lon").innerText=`${B}: ${M(Z)}`,document.querySelector(".lat").innerText=`${P}: ${M(k)}`,setInterval(async()=>{n.innerText=await h(w,K)},6e4),p.addEventListener("click",async()=>{U&&(g.setAttribute("src","assets/micrrofon.png"),y.stop()),-1!==await N(u.value)?([Z,k]=await N(u.value),u.value="",R(Z,k),document.querySelector(".lon").innerText=`${B}: ${M(Z)}`,document.querySelector(".lat").innerText=`${P}: ${M(k)}`,q=await f(Z,k),K=q[0],V=q[1],n.innerText=await h(w,K),b(K),F=await A(K),t.innerText=`${K}, ${v[V]}`,a.innerText="celsius"===I?`${F[0][0]}°`:`${Math.round(1.8*F[0][0]+32)}°`,r.setAttribute("src",`http://openweathermap.org/img/wn/${F[0][1]}@2x.png`),await j(K),Y(),_()):u.value="en"===w?"Incorrect city name":"ru"===w?"Неправильное название города":"Няправільная назва горада"}),document.querySelector(".labels-for-degrees-inputs").addEventListener("change",()=>{if(l.checked){I="celsius",a.innerText=`${Math.round(5/9*(a.innerText.substr(0,a.innerText.length-1)-32))}°`;for(let e=1;e<=3;e+=1){const t=document.querySelector(`.next-three-days-weather_item-${e}`);t.lastElementChild.firstElementChild.innerText=`${Math.round(5/9*(t.lastElementChild.firstElementChild.innerText.substr(0,t.lastElementChild.firstElementChild.innerText.length-1)-32))}°`}s.innerText=`${x}: ${W[1]}°`}else{I="fahrenheit",a.innerText=`${Math.round(1.8*a.innerText.substr(0,a.innerText.length-1)+32)}°`;for(let e=1;e<=3;e+=1){const t=document.querySelector(`.next-three-days-weather_item-${e}`);t.lastElementChild.firstElementChild.innerText=`${Math.round(1.8*t.lastElementChild.firstElementChild.innerText.substr(0,t.lastElementChild.firstElementChild.innerText.length-1)+32)}°`}s.innerText=`${x}: ${Math.round(1.8*W[1]+32)}°`}}),S.addEventListener("change",()=>{w=S.value,_()}),e.addEventListener("click",()=>{b(K)}),o.addEventListener("change",()=>{document.querySelector("body").style.color=o.value,S.style.color=o.value,u.style.color=o.value}),g.addEventListener("click",()=>{(U=!U)?(y.interimResults=!0,g.setAttribute("src","assets/micro_active.png")):(g.setAttribute("src","assets/micrrofon.png"),y.abort())}),y.addEventListener("result",e=>{const t=Array.from(e.results[0][0].transcript);U&&(u.value=t)}),y.addEventListener("end",y.start),window.addEventListener("beforeunload",()=>{localStorage.setItem("degreesFormat",I),localStorage.setItem("language",w)})}()}]);