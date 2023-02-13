import{n as k,r as g,e as h,u as w,a as i,j as t,M as I,l as S,o as P,I as M,c as $,g as j,i as y}from"./index-db6e8751.js";import{P as R}from"./AppBack-ecf3a4ca.js";import{P as z}from"./PlaySongsBar-f262d836.js";import{u as B}from"./useScrollTop-f1d24d8b.js";import{u as U,c as D}from"./clamp-9656cb9b.js";const E=({name:c,description:n,subscribedCount:e,playCount:o,tags:m})=>{const{isShowModal:p,isShowContent:r,onModalOpen:u,onModalClose:l}=P();return i("div",{children:[p&&t(M,{isDynamic:!1,children:i("div",{className:$(" fixed left-0 top-0 p-9 text-base bg-mg text-fg pb-16 transition-opacity duration-300 z-[10000] w-full h-full",{" opacity-100":r," opacity-0":!r}),children:[i("div",{className:" inline-block w-1/2 text-fg",children:[t("div",{className:"count text-center text-2xl font-bold",children:o}),t("div",{className:"text-center text-sm mt-2",children:"播放"})]}),i("div",{className:" inline-block w-1/2 text-fg",children:[t("div",{className:"count text-center text-2xl font-bold",children:e}),t("div",{className:"text-center text-sm mt-2",children:"订阅"})]}),t("div",{className:" min-h-[20px] max-h-[80%] overflow-y-auto mt-4 text-base leading-normal text-dg ",children:n}),t("div",{onClick:l,"data-close":"true",className:" absolute bottom-10 text-fg text-center text-4xl w-full left-0",children:"×"})]})}),t("div",{className:" leading-snug font-bold text-fg text-xl two_lines",children:c}),t("div",{className:" single_line text-sm leading-snug text-dg mt-5",onClick:u,children:n}),t("div",{className:" mt-5 flex flex-wrap",children:m.map(s=>t(j,{text:s,style:{position:"relative",top:"initial",bottom:"initial",left:"initial",right:"initial",marginTop:10,marginRight:8}},s))})]})},_=()=>{const{playlistid:c}=k(),n=g.useRef(null),{data:e}=h(`/api/playlist/detail?id=${c}`,()=>y.get(`/api/playlist/detail?id=${c}`).then(l=>{const{playlist:s}=l.data,{coverImgUrl:a,tags:d,subscribedCount:x,playCount:f,name:b,description:v,trackIds:N}=s;return{coverImgUrl:a,tags:d,subscribedCount:x,playCount:f,name:b,description:v??"",trackIds:N.map(C=>C.id)}})),{data:o}=h(e?.trackIds?`/api/song/detail?ids=${e.trackIds.slice(0,100).join()}`:"",()=>e?y.get(`/api/song/detail?ids=${e.trackIds.slice(0,100).join()}`).then(l=>{const{songs:s}=l.data;return s.map(a=>{const d=a.ar.length?[...a.ar].reverse().reduce((x,f)=>`${f.name} ${x}`,""):"";return{imgUrl:a.al.picUrl?a.al.picUrl.replace(/https?/,"https"):"",title:`${a.name}`,desc:d,artistId:a.ar[0].id,albumId:a.al.id,artistName:d,albumName:a.al.name,type:"song",id:a.id}})}):null),m=g.useCallback(l=>{const s=D(l,0,1);return s===0?2:Number(s.toFixed(2))},[]),p=g.useCallback(()=>n.current,[]),r=U(p,m),u=w(l=>l.playSongs);return B(),i("div",{className:" pt-8 px-4 pb-10",children:[t("div",{className:" fixed pt-6 px-4 pb-4 top-0 left-0 w-full z-[501] bg-mg",style:{opacity:r},children:t(R,{isBlack:!1,title:e?.name??"",style:{padding:0}})}),t("div",{className:" mt-12 sticky z-0 top-4 flex justify-center",children:t(I,{url:e?.coverImgUrl||"",className:" w-[180px] h-[180px] rounded"})}),i("div",{className:" sticky py-8 bg-mg z-[5] overflow-hidden",ref:n,children:[t(E,{name:e?.name??"",description:e?.description??"",subscribedCount:e?.subscribedCount??"",playCount:e?.playCount??0,tags:e?.tags??[]}),i("div",{className:" mt-8",children:[t(z,{songsCount:o?.length??0,withoutBar:!1,onPlayIconClick:()=>{u(o??[])}}),t("div",{className:" mt-6 pl-1",children:t(S,{list:o??void 0,placeHolderCount:8})})]})]})]})};export{_ as default};
