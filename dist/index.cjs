"use strict";const r=new Set,t=(e={})=>{const n=e.includes,o=e.errorExit,i=e.onlyUpdate,a=e.errorListen,s=e.errorHandler,l=e.listenHandler||(r=>{}),c=!0===o||"function"!=typeof s;let d=e.radix||16,f=e.random||"?",h=e.format||null,w=e.tryCount||10;if(!0===i)try{return n instanceof Array&&n.forEach((t=>"string"==typeof t&&r.add(t))),n instanceof Set&&n.forEach((t=>"string"==typeof t&&r.add(t))),l(new Set(r)),""}catch{throw new Error("[Options.listenHandler] is Call Error")}if([10,16,36].includes(d)||(d=16),["?","*","#"].includes(f)||(f="?"),String(h)!==h&&(h="????????-????-[1-5]???-[8-b]???-????????????",h=h.replace(/\?/g,f)),n instanceof Array)try{n.forEach((t=>"string"==typeof t&&r.add(t))),l(new Set(r))}catch{throw new Error("[Options.listenHandler] is Call Error")}if(n instanceof Set)try{n.forEach((t=>"string"==typeof t&&r.add(t))),l(new Set(r))}catch{throw new Error("[Options.listenHandler] is Call Error")}let E="",p=!0,u=!1;const y=Array.from({length:36},((r,t)=>t.toString(36))),g=r.add.bind(r);for(;p&&w--;){if(E=[...h.replace(/\[([^\]]+?)\]/g,((r,t)=>{if("string"==typeof t){const r=new Set,e=r.add.bind(r),n=t.toLowerCase().split(/\s*,\s*|\s+/g).filter((r=>/^[a-zA-Z0-9\-*?#]+$/iu.test(r))),o=r=>/^[a-zA-Z0-9]-[a-zA-Z0-9]$/.test(r),i=n.reduce(((r,t)=>{if(o(t)){const r=t.split("-")[0],n=t.split("-")[1],o=y.indexOf(r),i=y.indexOf(n),a=Math.min(o,i),s=Math.max(o,i)+1;y.slice(a,s).forEach(e)}return o(t)||e(t),r}),r),a=Array.from(i).filter((r=>!!r));return a[Math.random()*a.length|0]||""}return r})).toLowerCase()].filter((r=>/^[a-zA-Z0-9\-*?#]+$/iu.test(r))).map((r=>r===f?y[Math.random()*d|0]:r)).join(""),!r.has(E))try{p=!1,g(E),l(new Set(r))}catch{throw new Error("[Options.listenHandler] is Call Error")}}if(p&&c){try{!0===a&&l(new Set(r))}catch{throw new Error("[Options.listenHandler] is Call Error")}throw new Error("[Uniquener.Cacher] is Range Error")}if(p&&!c){try{const r=s(e),n={errorExit:!0};return u=!0,t({...e,...r,...n})}catch{}try{!0===a&&!u&&l(new Set(r))}catch{throw new Error("[Options.listenHandler] is Call Error")}throw new Error(u?"[Uniquener.Cacher] is Range Error":"[Options.errorHandler] is Call Error")}return E};module.exports=t;
