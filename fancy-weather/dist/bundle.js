!function(e){var a={};function n(t){if(a[t])return a[t].exports;var i=a[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=a,n.d=function(e,a,t){n.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,a){if(1&a&&(e=n(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var i in e)n.d(t,i,function(a){return e[a]}.bind(null,i));return t},n.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(a,"a",a),a},n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},n.p="",n(n.s=0)}([function(e,a,n){"use strict";n.r(a);const t=()=>{return{1:"winter",2:"winter",3:"spring",4:"spring",5:"spring",6:"summer",7:"summer",8:"summer",9:"autumn",10:"autumn",11:"autumn",12:"winter"}[(new Date).getMonth()+1]},i=e=>e<6?"night":e<12?"morning":e<18?"day":e<23?"evening":"night";async function r(e){const a={weekday:"short",hour:"2-digit",minute:"2-digit",month:"long",day:"numeric",hour12:!1,timeZone:await async function(...e){if(!e.length){const e="https://ipinfo.io/json?token=3ad064711c140a";return(await fetch(e).then(e=>e.json())).timezone}const a=`https://api.openweathermap.org/data/2.5/forecast?q=${e[0]}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;return(await fetch(a).then(e=>e.json())).city.timezone}()};return(new Date).toLocaleString(e,a)}const o=e=>{const a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];let n=(new Date).getDay()+e;if(n<a.length)return a[n];for(;n>=a.length;)n-=a.length;return a[n]};async function s(){return(await fetch("https://ipinfo.io/json?token=3ad064711c140a").then(e=>e.json())).city}async function c(...e){let a;if(!e.length){a="https://ipinfo.io/json?token=3ad064711c140a";const e=await fetch(a).then(e=>e.json());return[e.city,e.country]}a=1===e.length?`https://api.openweathermap.org/data/2.5/forecast?q=${e[0]}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`:`https://api.openweathermap.org/data/2.5/forecast?lat=${e[1]}&lon=${e[0]}&APPID=332b80fd8cd78e930da57a87c99f70ec`;const n=await fetch(a).then(e=>e.json());return[n.city.name,n.city.country]}async function d(...e){let a;const n=`https://api.openweathermap.org/data/2.5/forecast?q=${a=e.length?e[0]:await s()}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`;return await fetch(n).then(e=>e.json())}async function l(...e){let a;const n=`https://api.openweathermap.org/data/2.5/forecast?q=${a=e.length>1?e[1]:await s()}&units=${e[0]}&APPID=332b80fd8cd78e930da57a87c99f70ec`,t=await fetch(n).then(e=>e.json());return[[Math.round(t.list[0].main.temp),t.list[0].weather[0].icon],[Math.round(t.list[8].main.temp),t.list[8].weather[0].icon],[Math.round(t.list[16].main.temp),t.list[16].weather[0].icon],[Math.round(t.list[24].main.temp),t.list[24].weather[0].icon]]}async function u(...e){let a,n;e.length?(a=(a=await d(e[0])).city.name,n=await d(a)):(a=await s(),n=await d()),n=n.list[0].weather[0].main;const r=`https://api.unsplash.com/photos/random?query=${await t()},${n},${i((new Date).getHours())},${a}&client_id=230f4057a5f3db6356e7ecc599dfea70f56ec7c5aa39f52fe4519034685dfd49`,o=await fetch(r).then(e=>e.json());document.querySelector("body").style.backgroundImage=`url(${o.urls.full})`}const h=e=>{const a=0|e;return`${a}°${60*Math.abs(e-a)|0}'`};async function p(...e){let a,n;if(e.length)a=e[0],n=e[1];else{const e=await d();a=e.city.coord.lon,n=e.city.coord.lat}return document.querySelector(".lon").innerText=`Longitude: ${h(a)}`,document.querySelector(".lat").innerText=`Latitude: ${h(n)}`,mapboxgl.accessToken="pk.eyJ1IjoiZWxhcmF5IiwiYSI6ImNrNDEyOWc2ZzA3ZGcza3BmeWNnc3U4cWIifQ.PyPYQwDUFrQnaFXpILz-_g",new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/streets-v11",center:[a,n],zoom:9})}async function m(e){const a=await d(e);return"404"===a.cod?-1:[a.city.coord.lon,a.city.coord.lat]}const y={BD:"Bangladesh",BE:"Belgium",BF:"Burkina Faso",BG:"Bulgaria",BA:"Bosnia and Herzegovina",BB:"Barbados",WF:"Wallis and Futuna",BL:"Saint Barthelemy",BM:"Bermuda",BN:"Brunei",BO:"Bolivia",BH:"Bahrain",BI:"Burundi",BJ:"Benin",BT:"Bhutan",JM:"Jamaica",BV:"Bouvet Island",BW:"Botswana",WS:"Samoa",BQ:"Bonaire, Saint Eustatius and Saba ",BR:"Brazil",BS:"Bahamas",JE:"Jersey",BY:"Belarus",BZ:"Belize",RU:"Russia",RW:"Rwanda",RS:"Serbia",TL:"East Timor",RE:"Reunion",TM:"Turkmenistan",TJ:"Tajikistan",RO:"Romania",TK:"Tokelau",GW:"Guinea-Bissau",GU:"Guam",GT:"Guatemala",GS:"South Georgia and the South Sandwich Islands",GR:"Greece",GQ:"Equatorial Guinea",GP:"Guadeloupe",JP:"Japan",GY:"Guyana",GG:"Guernsey",GF:"French Guiana",GE:"Georgia",GD:"Grenada",GB:"United Kingdom",GA:"Gabon",SV:"El Salvador",GN:"Guinea",GM:"Gambia",GL:"Greenland",GI:"Gibraltar",GH:"Ghana",OM:"Oman",TN:"Tunisia",JO:"Jordan",HR:"Croatia",HT:"Haiti",HU:"Hungary",HK:"Hong Kong",HN:"Honduras",HM:"Heard Island and McDonald Islands",VE:"Venezuela",PR:"Puerto Rico",PS:"Palestinian Territory",PW:"Palau",PT:"Portugal",SJ:"Svalbard and Jan Mayen",PY:"Paraguay",IQ:"Iraq",PA:"Panama",PF:"French Polynesia",PG:"Papua New Guinea",PE:"Peru",PK:"Pakistan",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PM:"Saint Pierre and Miquelon",ZM:"Zambia",EH:"Western Sahara",EE:"Estonia",EG:"Egypt",ZA:"South Africa",EC:"Ecuador",IT:"Italy",VN:"Vietnam",SB:"Solomon Islands",ET:"Ethiopia",SO:"Somalia",ZW:"Zimbabwe",SA:"Saudi Arabia",ES:"Spain",ER:"Eritrea",ME:"Montenegro",MD:"Moldova",MG:"Madagascar",MF:"Saint Martin",MA:"Morocco",MC:"Monaco",UZ:"Uzbekistan",MM:"Myanmar",ML:"Mali",MO:"Macao",MN:"Mongolia",MH:"Marshall Islands",MK:"Macedonia",MU:"Mauritius",MT:"Malta",MW:"Malawi",MV:"Maldives",MQ:"Martinique",MP:"Northern Mariana Islands",MS:"Montserrat",MR:"Mauritania",IM:"Isle of Man",UG:"Uganda",TZ:"Tanzania",MY:"Malaysia",MX:"Mexico",IL:"Israel",FR:"France",IO:"British Indian Ocean Territory",SH:"Saint Helena",FI:"Finland",FJ:"Fiji",FK:"Falkland Islands",FM:"Micronesia",FO:"Faroe Islands",NI:"Nicaragua",NL:"Netherlands",NO:"Norway",NA:"Namibia",VU:"Vanuatu",NC:"New Caledonia",NE:"Niger",NF:"Norfolk Island",NG:"Nigeria",NZ:"New Zealand",NP:"Nepal",NR:"Nauru",NU:"Niue",CK:"Cook Islands",XK:"Kosovo",CI:"Ivory Coast",CH:"Switzerland",CO:"Colombia",CN:"China",CM:"Cameroon",CL:"Chile",CC:"Cocos Islands",CA:"Canada",CG:"Republic of the Congo",CF:"Central African Republic",CD:"Democratic Republic of the Congo",CZ:"Czech Republic",CY:"Cyprus",CX:"Christmas Island",CR:"Costa Rica",CW:"Curacao",CV:"Cape Verde",CU:"Cuba",SZ:"Swaziland",SY:"Syria",SX:"Sint Maarten",KG:"Kyrgyzstan",KE:"Kenya",SS:"South Sudan",SR:"Suriname",KI:"Kiribati",KH:"Cambodia",KN:"Saint Kitts and Nevis",KM:"Comoros",ST:"Sao Tome and Principe",SK:"Slovakia",KR:"South Korea",SI:"Slovenia",KP:"North Korea",KW:"Kuwait",SN:"Senegal",SM:"San Marino",SL:"Sierra Leone",SC:"Seychelles",KZ:"Kazakhstan",KY:"Cayman Islands",SG:"Singapore",SE:"Sweden",SD:"Sudan",DO:"Dominican Republic",DM:"Dominica",DJ:"Djibouti",DK:"Denmark",VG:"British Virgin Islands",DE:"Germany",YE:"Yemen",DZ:"Algeria",US:"United States",UY:"Uruguay",YT:"Mayotte",UM:"United States Minor Outlying Islands",LB:"Lebanon",LC:"Saint Lucia",LA:"Laos",TV:"Tuvalu",TW:"Taiwan",TT:"Trinidad and Tobago",TR:"Turkey",LK:"Sri Lanka",LI:"Liechtenstein",LV:"Latvia",TO:"Tonga",LT:"Lithuania",LU:"Luxembourg",LR:"Liberia",LS:"Lesotho",TH:"Thailand",TF:"French Southern Territories",TG:"Togo",TD:"Chad",TC:"Turks and Caicos Islands",LY:"Libya",VA:"Vatican",VC:"Saint Vincent and the Grenadines",AE:"United Arab Emirates",AD:"Andorra",AG:"Antigua and Barbuda",AF:"Afghanistan",AI:"Anguilla",VI:"U.S. Virgin Islands",IS:"Iceland",IR:"Iran",AM:"Armenia",AL:"Albania",AO:"Angola",AQ:"Antarctica",AS:"American Samoa",AR:"Argentina",AU:"Australia",AT:"Austria",AW:"Aruba",IN:"India",AX:"Aland Islands",AZ:"Azerbaijan",IE:"Ireland",ID:"Indonesia",UA:"Ukraine",QA:"Qatar",MZ:"Mozambique"};window.onload=async function(){document.querySelector(".content-wrapper").insertAdjacentHTML("afterbegin",'<div class="control-block">\n    <div class="control-block_buttons">\n      <img id="refresh-bg" src="../fancy-weather/assets/Refresh_BG.png" width="45" height="45">\n      <select class="control-block_languages">\n        <option value="en">EN</option>\n        <option value="ru">RU</option>\n        <option value="be">BE</option>\n      </select>\n      <div class="control-block_choose-degrees">\n        <div class="labels-for-degrees-inputs">\n          <input id="celsius" type="radio" name="degrees" value="c" checked>\n          <label for="celsius">\n            <div class="celsius">\n              <p>°C</p>\n            </div>\n          </label>\n          <input id="fahrenheit" type="radio" name="degrees" value="f">\n          <label for="fahrenheit">\n            <div class="fahrenheit">\n              <p>°F</p>\n            </div>\n          </label>\n        </div>\n      </div>\n    </div>\n    <div class="control-block_search">\n      <div class="search-input">\n        <input id="search-input" type="text">\n        <img src="../fancy-weather/assets/micrrofon.png" width="14.5" height="17">\n      </div>\n      <div id="search-btn" class="search-btn">\n        <p>SEARCH</p>\n      </div>\n    </div>\n  </div><div class="weather-and-map"><div class="weather-for-4-days"><div class="weather-for-today">\n          <h2></h2>\n          <h4></h4>\n          <div class="weather-for-today_weather-description-block">\n            <div class="temperature">\n              <p></p>\n              <img src="">\n            </div>\n            <div class="weather-description">\n              <div class="weather-description-params">\n                <p class="description"></p>\n                <p class="feels-like-temp"></p>\n                <p class="wind-speed"></p>\n                <p class="humidity"></p>\n              </div>\n            </div>\n          </div>\n        </div><div class="weather-for-3-days">\n      <div class="weather-for-3-days_element weather-for-3-days_element-1">\n        <p></p>\n        <div class="temperature-next-days">\n          <p></p>\n          <img src="" alt="">\n        </div>\n      </div>\n      <div class="weather-for-3-days_element weather-for-3-days_element-2">\n        <p></p>\n        <div class="temperature-next-days">\n          <p></p>\n          <img src="" alt="">\n        </div>\n      </div>\n      <div class="weather-for-3-days_element weather-for-3-days_element-3">\n        <p></p>\n        <div class="temperature-next-days">\n          <p></p>\n          <img src="" alt="">\n        </div>\n      </div>\n    </div></div><div class="map-container">\n      <div id="map"></div>\n      <p class="lon">Longitude:</p>\n      <p class="lat">Latitude:</p>\n    </div></div>');const e=document.getElementById("refresh-bg"),a=document.querySelector(".weather-for-today h2"),n=document.querySelector(".weather-for-today h4"),t=document.querySelector(".temperature p"),i=document.querySelector(".temperature img"),d=document.querySelector(".description"),h=document.querySelector(".feels-like-temp"),f=document.querySelector(".wind-speed"),g=document.querySelector(".humidity"),S=document.getElementById("search-input"),w=document.getElementById("search-btn");let v=await l("metric");const M=()=>{for(let e=1;e<=3;e+=1){const a=document.querySelector(`.weather-for-3-days_element-${e}`);a.firstElementChild.innerText=o(e),a.lastElementChild.firstElementChild.innerText=`${v[e][0]}°`,a.lastElementChild.lastElementChild.setAttribute("src",`http://openweathermap.org/img/wn/${v[e][1]}@2x.png`)}};M();const b=async e=>{const a=await async function(...e){let a;const n=`https://api.openweathermap.org/data/2.5/forecast?q=${a=e.length?e[0]:await s()}&units=metric&APPID=332b80fd8cd78e930da57a87c99f70ec`,t=await fetch(n).then(e=>e.json()),i=t.list[0].main.temp,{humidity:r}=t.list[0].main,o=t.list[0].wind.speed,c=i-.4*(i-10)*(1-r/100);return[t.list[0].weather[0].description,Math.round(c),Math.round(o),r]}(e);d.innerText=a[0],h.innerText=`Feels like: ${a[1]}°`,f.innerText=`Wind: ${a[2]} m/s`,g.innerText=`Humidity: ${a[3]}%`};b();let T=await c(),I=T[0],A=T[1];n.innerText=await r("en"),a.innerText=`${I}, ${y[A]}`,t.innerText=`${v[0][0]}°`,i.setAttribute("src",`http://openweathermap.org/img/wn/${v[0][1]}@2x.png`),setInterval(async()=>{n.innerText=await r("en")},1e3),p(),w.addEventListener("click",async()=>{if(-1===await m(S.value))return void(S.value="");const[e,o]=await m(S.value);S.value="",p(e,o),n.innerText=await r("en"),T=await c(e,o),I=T[0],A=T[1],u(I),v=await l("metric",I),a.innerText=`${I}, ${y[A]}`,t.innerText=`${v[0][0]}°`,i.setAttribute("src",`http://openweathermap.org/img/wn/${v[0][1]}@2x.png`),b(I),M()}),e.addEventListener("click",()=>{u(I)})}}]);