import{b as e,a as r,F as l}from"./index-401e96bf.js";import{u as s}from"./useIsomorphicEffect-e0594a54.js";import{D as c}from"./Dialog-06daab1c.js";const v=()=>{const[d,n]=e.useState(!1),o=e.useCallback(()=>{window.isUpdateAvailable.then(a=>{n(a)})},[]);s(()=>(window.addEventListener("load",o),()=>{window.removeEventListener("load",o)}),[]);const i=e.useCallback(()=>{"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(a=>{a.update()})},[]),t=e.useCallback(()=>{console.info("handlePageViewChange",!document.hidden),document.hidden||i()},[i]);return s(()=>(window.addEventListener("visibilitychange",t),()=>{window.removeEventListener("visibilitychange",t)}),[]),r(l,{children:d&&r(c,{dialogText:"有新版本可用，是否更新？",onCancelClick:()=>n(!1),onConfirmClick:()=>{window.location.reload()}})})};export{v as default};
