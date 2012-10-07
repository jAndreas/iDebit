(function(e){typeof define=="function"?define([],e):e()})(function(){function h(e){try{return Object.defineProperty(e,"sentinel",{}),"sentinel"in e}catch(t){}}Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!="function")throw new TypeError("Function.prototype.bind called on incompatible "+n);var i=r.call(arguments,1),s=function(){if(this instanceof s){var e=function(){};e.prototype=n.prototype;var o=new e,u=n.apply(o,i.concat(r.call(arguments)));return Object(u)===u?u:o}return n.apply(t,i.concat(r.call(arguments)))};return s});var e=Function.prototype.call,t=Array.prototype,n=Object.prototype,r=t.slice,i=e.bind(n.toString),s=e.bind(n.hasOwnProperty),o,u,a,f,l;if(l=s(n,"__defineGetter__"))o=e.bind(n.__defineGetter__),u=e.bind(n.__defineSetter__),a=e.bind(n.__lookupGetter__),f=e.bind(n.__lookupSetter__);Array.isArray||(Array.isArray=function(t){return i(t)=="[object Array]"}),Array.prototype.forEach||(Array.prototype.forEach=function(t){var n=A(this),r=arguments[1],s=-1,o=n.length>>>0;if(i(t)!="[object Function]")throw new TypeError;while(++s<o)s in n&&t.call(r,n[s],s,n)}),Array.prototype.map||(Array.prototype.map=function(t){var n=A(this),r=n.length>>>0,s=Array(r),o=arguments[1];if(i(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var u=0;u<r;u++)u in n&&(s[u]=t.call(o,n[u],u,n));return s}),Array.prototype.filter||(Array.prototype.filter=function(t){var n=A(this),r=n.length>>>0,s=[],o,u=arguments[1];if(i(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var a=0;a<r;a++)a in n&&(o=n[a],t.call(u,o,a,n)&&s.push(o));return s}),Array.prototype.every||(Array.prototype.every=function(t){var n=A(this),r=n.length>>>0,s=arguments[1];if(i(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var o=0;o<r;o++)if(o in n&&!t.call(s,n[o],o,n))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(t){var n=A(this),r=n.length>>>0,s=arguments[1];if(i(t)!="[object Function]")throw new TypeError(t+" is not a function");for(var o=0;o<r;o++)if(o in n&&t.call(s,n[o],o,n))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(t){var n=A(this),r=n.length>>>0;if(i(t)!="[object Function]")throw new TypeError(t+" is not a function");if(!r&&arguments.length==1)throw new TypeError("reduce of empty array with no initial value");var s=0,o;if(arguments.length>=2)o=arguments[1];else do{if(s in n){o=n[s++];break}if(++s>=r)throw new TypeError("reduce of empty array with no initial value")}while(!0);for(;s<r;s++)s in n&&(o=t.call(void 0,o,n[s],s,n));return o}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(t){var n=A(this),r=n.length>>>0;if(i(t)!="[object Function]")throw new TypeError(t+" is not a function");if(!r&&arguments.length==1)throw new TypeError("reduceRight of empty array with no initial value");var s,o=r-1;if(arguments.length>=2)s=arguments[1];else do{if(o in n){s=n[o--];break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}while(!0);do o in this&&(s=t.call(void 0,s,n[o],o,n));while(o--);return s}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t){var n=A(this),r=n.length>>>0;if(!r)return-1;var i=0;arguments.length>1&&(i=k(arguments[1])),i=i>=0?i:Math.max(0,r+i);for(;i<r;i++)if(i in n&&n[i]===t)return i;return-1}),Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(t){var n=A(this),r=n.length>>>0;if(!r)return-1;var i=r-1;arguments.length>1&&(i=Math.min(i,k(arguments[1]))),i=i>=0?i:r-Math.abs(i);for(;i>=0;i--)if(i in n&&t===n[i])return i;return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(t){return t.__proto__||(t.constructor?t.constructor.prototype:n)});if(!Object.getOwnPropertyDescriptor){var c="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(t,r){if(typeof t!="object"&&typeof t!="function"||t===null)throw new TypeError(c+t);if(!s(t,r))return;var i={enumerable:!0,configurable:!0};if(l){var o=t.__proto__;t.__proto__=n;var u=a(t,r),h=f(t,r);t.__proto__=o;if(u||h)return u&&(i.get=u),h&&(i.set=h),i}return i.value=t[r],i}}Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(t){return Object.keys(t)}),Object.create||(Object.create=function(t,n){var r;if(t===null)r={__proto__:null};else{if(typeof t!="object")throw new TypeError("typeof prototype["+typeof t+"] != 'object'");var i=function(){};i.prototype=t,r=new i,r.__proto__=t}return n!==void 0&&Object.defineProperties(r,n),r});if(Object.defineProperty){var p=h({}),d=typeof document=="undefined"||h(document.createElement("div"));if(!p||!d)var v=Object.defineProperty}if(!Object.defineProperty||v){var m="Property description must be an object: ",g="Object.defineProperty called on non-object: ",y="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(t,r,i){if(typeof t!="object"&&typeof t!="function"||t===null)throw new TypeError(g+t);if(typeof i!="object"&&typeof i!="function"||i===null)throw new TypeError(m+i);if(v)try{return v.call(Object,t,r,i)}catch(c){}if(s(i,"value"))if(l&&(a(t,r)||f(t,r))){var h=t.__proto__;t.__proto__=n,delete t[r],t[r]=i.value,t.__proto__=h}else t[r]=i.value;else{if(!l)throw new TypeError(y);s(i,"get")&&o(t,r,i.get),s(i,"set")&&u(t,r,i.set)}return t}}Object.defineProperties||(Object.defineProperties=function(t,n){for(var r in n)s(n,r)&&r!="__proto__"&&Object.defineProperty(t,r,n[r]);return t}),Object.seal||(Object.seal=function(t){return t}),Object.freeze||(Object.freeze=function(t){return t});try{Object.freeze(function(){})}catch(b){Object.freeze=function(t){return function(n){return typeof n=="function"?n:t(n)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(t){return t}),Object.isSealed||(Object.isSealed=function(t){return!1}),Object.isFrozen||(Object.isFrozen=function(t){return!1}),Object.isExtensible||(Object.isExtensible=function(t){if(Object(t)!==t)throw new TypeError;var n="";while(s(t,n))n+="?";t[n]=!0;var r=s(t,n);return delete t[n],r});if(!Object.keys){var w=!0,E=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],S=E.length;for(var x in{toString:null})w=!1;Object.keys=function O(e){if(typeof e!="object"&&typeof e!="function"||e===null)throw new TypeError("Object.keys called on a non-object");var O=[];for(var t in e)s(e,t)&&O.push(t);if(w)for(var n=0,r=S;n<r;n++){var i=E[n];s(e,i)&&O.push(i)}return O}}if(!Date.prototype.toISOString||(new Date(-621987552e5)).toISOString().indexOf("-000001")===-1)Date.prototype.toISOString=function(){var t,n,r,i;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");t=[this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],i=this.getUTCFullYear(),i=(i<0?"-":i>9999?"+":"")+("00000"+Math.abs(i)).slice(0<=i&&i<=9999?-4:-6),n=t.length;while(n--)r=t[n],r<10&&(t[n]="0"+r);return i+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"};Date.now||(Date.now=function(){return(new Date).getTime()}),Date.prototype.toJSON||(Date.prototype.toJSON=function(t){if(typeof this.toISOString!="function")throw new TypeError("toISOString property is not callable");return this.toISOString()});if(!Date.parse||Date.parse("+275760-09-13T00:00:00.000Z")!==864e13)Date=function(e){var t=function i(t,n,r,s,o,u,a){var f=arguments.length;if(this instanceof e){var l=f==1&&String(t)===t?new e(i.parse(t)):f>=7?new e(t,n,r,s,o,u,a):f>=6?new e(t,n,r,s,o,u):f>=5?new e(t,n,r,s,o):f>=4?new e(t,n,r,s):f>=3?new e(t,n,r):f>=2?new e(t,n):f>=1?new e(t):new e;return l.constructor=i,l}return e.apply(this,arguments)},n=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");for(var r in e)t[r]=e[r];return t.now=e.now,t.UTC=e.UTC,t.prototype=e.prototype,t.prototype.constructor=t,t.parse=function(r){var i=n.exec(r);if(i){i.shift();for(var s=1;s<7;s++)i[s]=+(i[s]||(s<3?1:0)),s==1&&i[s]--;var o=+i.pop(),u=+i.pop(),a=i.pop(),f=0;if(a){if(u>23||o>59)return NaN;f=(u*60+o)*6e4*(a=="+"?-1:1)}var l=+i[0];return 0<=l&&l<=99?(i[0]=l+400,e.UTC.apply(this,i)+f-126227808e5):e.UTC.apply(this,i)+f}return e.parse.apply(this,arguments)},t}(Date);var T="	\n\f\r   ᠎             　\u2028\u2029﻿";if(!String.prototype.trim||T.trim()){T="["+T+"]";var N=new RegExp("^"+T+T+"*"),C=new RegExp(T+T+"*$");String.prototype.trim=function(){if(this===undefined||this===null)throw new TypeError("can't convert "+this+" to object");return String(this).replace(N,"").replace(C,"")}}var k=function(e){return e=+e,e!==e?e=0:e!==0&&e!==1/0&&e!==-1/0&&(e=(e>0||-1)*Math.floor(Math.abs(e))),e},L="a"[0]!="a",A=function(e){if(e==null)throw new TypeError("can't convert "+e+" to object");return L&&typeof e=="string"&&e?e.split(""):Object(e)}})