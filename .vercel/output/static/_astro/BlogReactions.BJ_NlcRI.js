import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.WFquGv8Z.js";const R=[{emoji:"👍",label:"Like"},{emoji:"❤️",label:"Love"},{emoji:"🔥",label:"Fire"},{emoji:"🎉",label:"Celebrate"},{emoji:"🤔",label:"Thinking"},{emoji:"💡",label:"Insightful"}];function j({postId:l}){const[x,d]=i.useState({}),[f,m]=i.useState(!0),[p,u]=i.useState([]);i.useEffect(()=>{h()},[l]);const y=(e,s)=>{const t=s.currentTarget.getBoundingClientRect(),a=(t.left+t.width/2)/window.innerWidth*100,n=(t.top+t.height/2)/window.innerHeight*100,c={id:Date.now(),emoji:e,x:a,y:n};u(o=>[...o,c]),setTimeout(()=>{u(o=>o.filter(g=>g.id!==c.id))},3e3)},h=async()=>{try{const s=await(await fetch(`/api/reactions?postId=${l}`)).json();d(s.reactions||{})}catch(e){console.error("Failed to fetch reactions:",e)}finally{m(!1)}},b=async(e,s)=>{const a=x[e]?.hasReacted;a||y(e,s),d(n=>({...n,[e]:{emoji:e,count:a?Math.max(0,(n[e]?.count||0)-1):(n[e]?.count||0)+1,hasReacted:!a}}));try{const n=await fetch("/api/reactions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({postId:l,emoji:e,remove:a})}),c=await n.json();n.ok||(console.error("Reaction API error:",c),d(o=>({...o,[e]:{emoji:e,count:a?(o[e]?.count||0)+1:Math.max(0,(o[e]?.count||0)-1),hasReacted:a}})))}catch(n){console.error("Failed to update reaction:",n),h()}};return f?r.jsx("div",{className:"flex gap-2 items-center justify-center py-4",children:r.jsx("div",{className:"text-sm text-gray-400",children:"Loading reactions..."})}):r.jsxs("div",{className:"border-t border-b border-gray-700 py-6 my-8 reactions-container relative overflow-visible",children:[p.map(e=>Array.from({length:25}).map((s,t)=>{const a=t/25*360+e.id%100*.3,n=80+t*7%120,c=t*.01,o=.6+t*.02%.4,g=t*30-360,v=.8+t*.025%.6;return r.jsx("span",{className:"fixed text-2xl pointer-events-none",style:{left:`${e.x}%`,top:`${e.y}%`,zIndex:9999,animation:`emoji-boom ${o}s ease-out ${c}s forwards`,"--angle":`${a}deg`,"--distance":`${n}px`,"--rotation":`${g}deg`,"--scale":v,"--gravity":`${50+t*2}px`},children:e.emoji},`${e.id}-${t}`)})),r.jsx("style",{children:`
        @keyframes emoji-boom {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: translate(
              calc(-50% + calc(cos(var(--angle)) * var(--distance) * 0.6)),
              calc(-50% + calc(sin(var(--angle)) * var(--distance) * 0.6))
            ) scale(var(--scale)) rotate(calc(var(--rotation) * 0.3));
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(-50% + calc(cos(var(--angle)) * var(--distance))),
              calc(-50% + calc(sin(var(--angle)) * var(--distance)) + var(--gravity))
            ) scale(calc(var(--scale) * 0.5)) rotate(var(--rotation));
          }
        }
      `}),r.jsx("h3",{className:"text-lg font-semibold mb-4 text-gray-100",children:"Reactions"}),r.jsx("div",{className:"flex flex-wrap gap-3",children:R.map(({emoji:e,label:s})=>{const t=x[e],a=t?.count||0,n=t?.hasReacted||!1;return r.jsxs("button",{onClick:c=>b(e,c),className:`
                flex items-center gap-2 px-4 py-2 rounded-full 
                border transition-all duration-200
                ${n?"border-blue-500 bg-blue-500/10 text-blue-400":"border-gray-600 hover:border-gray-500 text-gray-300 hover:text-gray-200"}
                hover:scale-105 active:scale-95
              `,title:s,"aria-label":`${s} reaction${a>0?`, ${a} reactions`:""}`,children:[r.jsx("span",{className:"text-xl bg-transparent",children:e}),a>0&&r.jsx("span",{className:`text-sm font-medium bg-transparent ${n?"text-blue-400":"text-gray-400"}`,children:a})]},e)})})]})}export{j as default};
