import{b as s,j as t,a as e}from"./index-12c2092c.js";const l="_play_icon_1o9dt_1",r={play_icon:l},i=s.memo(({songsCount:o,withoutBar:n,onPlayIconClick:a})=>{const c=s.useCallback(()=>{typeof a=="function"&&a()},[a]);return t("div",{className:" flex items-center",children:[!n&&e("div",{onClick:c,className:`bg-secondary w-[70px] h-8 rounded-[200px] play_icon ${r.play_icon}`}),e("span",{className:" text-dg text-base font-bold ml-4",children:o})]})});i.displayName="PlaySongsBar";export{i as P};