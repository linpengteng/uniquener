const r=new Set([""]),e=(t={})=>{const n=t.onlyUpdate,a=t.usedUniques,i=!1!==t.reduplicateExit,o=t.throwErrorHandler||(r=>{}),l=t.reduplicateHandler||(r=>r),s=t.listenCacherHandler||(r=>{}),c=!0===i||"function"!=typeof t.reduplicateHandler;let d=t.radix||16,f=t.random||"?",u=t.format||null,h="number"==typeof t.tryCount?t.tryCount:10;if(!0===n)try{return a instanceof Array&&a.forEach((e=>"string"==typeof e&&r.add(e.trim()))),a instanceof Set&&a.forEach((e=>"string"==typeof e&&r.add(e.trim()))),s(new Set(r)),""}catch{throw o(new Set(r)),new Error("[Options.listenCacherHandler] is Call Error")}if([10,16,26,36].includes(d)||(d=16),["?","*","#"].includes(f)||(f="?"),String(u)!==u&&(u="????????-????-[1-5]???-[8-b]???-????????????",u=u.replace(/\?/g,f)),a instanceof Array)try{a.forEach((e=>"string"==typeof e&&r.add(e.trim()))),s(new Set(r))}catch{throw o(new Set(r)),new Error("[Options.listenCacherHandler] is Call Error")}if(a instanceof Set)try{a.forEach((e=>"string"==typeof e&&r.add(e.trim()))),s(new Set(r))}catch{throw o(new Set(r)),new Error("[Options.listenCacherHandler] is Call Error")}let p="",w=!0,y=!1;const E=Array.from({length:36},((r,e)=>e.toString(36))),S=r.add.bind(r);for(;w&&h-- >0;){if(p=[...u.replace(/\[([^\]]+?)\]/g,((r,e)=>{if("string"==typeof e){const r=new Set,t=r.add.bind(r),n=e.toLowerCase().split(/\s*,\s*|\s+/g).filter((r=>/^[a-zA-Z0-9\-*?#]+$/iu.test(r))),a=r=>/^[a-zA-Z0-9]-[a-zA-Z0-9]$/.test(r),i=n.reduce(((r,e)=>{if(a(e)){const r=e.split("-")[0],n=e.split("-")[1],a=E.indexOf(r),i=E.indexOf(n),o=Math.min(a,i),l=Math.max(a,i)+1;E.slice(o,l).forEach(t)}return a(e)||t(e),r}),r),o=Array.from(i).filter((r=>!!r));return o[Math.random()*o.length|0]||""}return r})).toLowerCase()].filter((r=>/^[a-zA-Z0-9\-*?#]+$/iu.test(r))).map((r=>r===f?E[Math.random()*d|0+(26===d?10:0)]:r)).join("").trim(),!r.has(p))try{w=!1,S(p),s(new Set(r))}catch{throw o(new Set(r)),new Error("[Options.listenCacherHandler] is Call Error")}}if(w&&c)throw o(new Set(r)),new Error("[Uniquener generate unique] is Reduplicated");if(w&&!c)try{const r=l(t),n={reduplicateExit:!0};return y=!0,e({...t,...r,...n})}catch{throw!y&&o(new Set(r)),new Error(y?"[Uniquener generate unique] is Reduplicated":"[Options.reduplicateHandler] is Call Error")}return p};export{e as default};
