"use strict";var e=require("crypto");const t=new Set([""]),r=(n={})=>{const i=n.algorithm,s=n.onlyUpdate,a=n.usedUniques,o=!1!==n.reduplicateExit,l=n.throwErrorHandler||(e=>{}),c=n.reduplicateHandler||(e=>e),d=n.listenCacherHandler||(e=>{}),g=!0===o||"function"!=typeof n.reduplicateHandler;let m=n.radix||16,u=n.random||"?",p=n.format||null,f="number"==typeof n.tryCount?n.tryCount:10;if(!0===s)try{return a instanceof Array&&a.forEach((e=>"string"==typeof e&&t.add(e.trim()))),a instanceof Set&&a.forEach((e=>"string"==typeof e&&t.add(e.trim()))),d(new Set(t)),""}catch{throw l(new Set(t)),new Error("[Options.listenCacherHandler] is Call Error")}if([10,16,26,36].includes(m)||(m=16),["?","*","#"].includes(u)||(u="?"),String(p)!==p&&(p="????????-????-[1-5]???-[8-b]???-????????????",p=p.replace(/\?/g,u)),a instanceof Array)try{a.forEach((e=>"string"==typeof e&&t.add(e.trim()))),d(new Set(t))}catch{throw l(new Set(t)),new Error("[Options.listenCacherHandler] is Call Error")}if(a instanceof Set)try{a.forEach((e=>"string"==typeof e&&t.add(e.trim()))),d(new Set(t))}catch{throw l(new Set(t)),new Error("[Options.listenCacherHandler] is Call Error")}let h="",w=!0,y=!1;const E=26===m?10:0,S=Array.from({length:36},((e,t)=>t.toString(36))),$=t.add.bind(t),M=t=>{const r=t.min,n=t.max,i=t.bytes;return"crypto.getRandomValues"===t.algorithm?i[e.getRandomValues(new Uint8Array(1))[0]%(n-r+1)+r|0]:i[Math.random()*(n-r+1)+r|0]};for(;w&&f-- >0;){const e=p.replace(/\[([^\]]+?)\]/g,((e,t)=>{if("string"==typeof t){const e=new Set,r=e.add.bind(e),n=t.toLowerCase().split(/\s*,\s*/g).filter((e=>/^[a-zA-Z0-9\s/|\-*?#=:;]+$/iu.test(e))),s=e=>/^\s*[a-zA-Z0-9]\s*-\s*[a-zA-Z0-9]\s*$/.test(e);if((e=>/^\s*time\s*:\s*(YYYY|MM|DD|HH|mm|ss|iii|stamp|:|-|\||\/|\s)+\s*$/.test(e))(t.trim())){const e=new Date,r=`${e.getTime()}`,n=`${e.getFullYear()}`,i=e.getMonth()+1>9?`${e.getMonth()+1}`:`0${e.getMonth()+1}`,s=e.getMinutes()>9?`${e.getMinutes()}`:`0${e.getMinutes()}`,a=e.getSeconds()>9?`${e.getSeconds()}`:`0${e.getSeconds()}`,o=e.getMilliseconds()>99?`${e.getMilliseconds()}`:e.getMilliseconds()>9?`0${e.getMilliseconds()}`:`00${e.getMilliseconds()}`,l=e.getHours()>9?`${e.getHours()}`:`0${e.getHours()}`,c=e.getDate()>9?`${e.getDate()}`:`0${e.getDate()}`;return t.trim().replace(/^\s*time\s*:\s*/,"").replace(/stamp/g,r).replace(/YYYY/g,n).replace(/MM/g,i).replace(/DD/g,c).replace(/HH/g,l).replace(/mm/g,s).replace(/ss/g,a).replace(/iii/g,o).replace(/\s+/g," ")}const a=n.reduce(((e,t)=>{if(s(t.trim())){const e=t.trim().split(/\s*-\s*/)[0],n=t.trim().split(/\s*-\s*/)[1],i=S.indexOf(e.trim()),s=S.indexOf(n.trim()),a=Math.min(i,s),o=Math.max(i,s)+1;S.slice(a,o).forEach(r)}return s(t.trim())||r(t.trim()),e}),e),o=Array.from(a).filter((e=>!!e));return M({bytes:o,algorithm:i,max:o.length-1,min:0})}return e})),r=0,n=m-1,s=S.slice(E);if(h=[...e.toLowerCase()].filter((e=>/^[a-zA-Z0-9\s/|\-*?#=:;]+$/iu.test(e))).map((e=>e===u?M({bytes:s,algorithm:i,max:n,min:r}):e)).join("").trim(),!t.has(h))try{w=!1,$(h),d(new Set(t))}catch{throw l(new Set(t)),new Error("[Options.listenCacherHandler] is Call Error")}}if(w&&g)throw l(new Set(t)),new Error("[Uniquener generate unique] is Reduplicated");if(w&&!g)try{const e=c(n),t={reduplicateExit:!0};return y=!0,r({...n,...e,...t})}catch{throw!y&&l(new Set(t)),new Error(y?"[Uniquener generate unique] is Reduplicated":"[Options.reduplicateHandler] is Call Error")}return h};module.exports=r;
