import{o as x,u as p,t as f,g as l,n as g,c as u,a as i,F as y,j as s,L as I,M as N,e as w,s as $,k as d}from"./index-f9106632.js";const M=({url:a,cover:n})=>{const c=p(),e=o=>{c(u.actions.setShowPlayBar(o))};return s("video",{allowFullScreen:!0,style:{width:"100%"},onPlay:()=>{e(!1)},onEnded:()=>{e(!0)},onPause:()=>{e(!0)},className:" sticky top-0 z-[501]",src:a??"",controls:!0,poster:n,"x5-video-player-type":"h5","x5-video-orientation":"landscape|portrait",playsInline:!0,"webkit-playsinline":"true"})},b=()=>{const{mvid:a}=x(),n=p(),c=f(),{data:e}=l(`/api/mv/detail?mvid=${a}`,()=>d.get(`/api/mv/detail?mvid=${a}`).then(t=>t.data.data).then(t=>({artistName:t.artistName,artistId:t.artistId,desc:t.desc,title:t.name,publicTime:t.publishTime,cover:t.cover}))),{data:o}=l(a?`/api/mv/url?id=${a}`:"",()=>a?d.get(`/api/mv/url?id=${a}`).then(t=>t.data.data.url.replace(/https?/,"https")):null),{data:h}=l(e?.artistId?[`/api/artists?id=${e?.artistId}`,e?.artistId]:"",()=>e?.artistId?d.get(`/api/artists?id=${e.artistId}`).then(t=>t.data).then(t=>{const{artist:m}=t;return m.picUrl}):null,{suspense:!1}),{data:v}=l(`/api/simi/mv?mvid=${a}`,()=>d.get(`/api/simi/mv?mvid=${a}`).then(t=>t.data).then(t=>{const{mvs:m}=t;return m.map(r=>({desc:"",imgUrl:r.cover?r.cover.replace(/https?/,"https"):"",title:r.name,id:r.id}))}));return g(()=>()=>{n(u.actions.setShowPlayBar(!0))},[c.pathname]),i(y,{children:[s(M,{url:o??void 0,cover:e?.cover}),i("div",{className:"px-4 mt-6",children:[s("div",{className:" text-fg text-xl font-bold leading-snug",children:e?.title}),s(I,{to:`/artist/${e?.artistId}`,children:i("div",{className:" flex items-center mt-4",children:[s(N,{url:h||"",className:" w-10 h-10 rounded-[50%]"}),s("p",{className:" text-fg text-sm ml-2",children:e?.artistName})]})}),i("div",{className:" flex flex-col mt-4",children:[i("p",{className:" text-dg text-sm",children:["发布时间：",e?.publicTime]}),s("p",{className:" text-dg text-sm mt-3",children:e?.desc})]}),s(w,{title:"相似MV",showMore:!1}),s("div",{className:"flex flex-wrap  justify-between",children:s($,{list:v??void 0,placeHolderCount:4})})]})]})};export{b as default};
