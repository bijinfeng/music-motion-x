import{a as e,j as l}from"./index-03eb5bc5.js";import{I as c,M as i}from"./useIsomorphicEffect-6f95aa50.js";const d=({title:t,dialogText:a,onCancelClick:n,onConfirmClick:s})=>e(c,{isDynamic:!1,children:e(i,{children:l("div",{className:` mx-auto w-3/4 rounded-lg bg-mg pt-7 pr-4 pb-4 pl-4 max-w-xs mt-[30vh] 
         mb-0`,children:[t&&e("p",{className:"title leading-normal text-base mb-4 text-center text-fg",children:t}),a&&e("p",{className:"alert_text title leading-normal text-base mb-4 text-center text-fg",children:a}),l("div",{className:"btn_group flex mt-7 ",children:[e("span",{className:" text-sm text-center inline-block flex-1 text-fg",onClick:n,"data-testid":"cancel-dialog",children:"取消"}),e("span",{className:"confirm text-secondary text-sm text-center inline-block flex-1",onClick:s,"data-testid":"confirm-dialog",children:"确定"})]})]})})});export{d as D};