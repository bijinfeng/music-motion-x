import{r as a,j as o,F as v,_ as h,a as l,W as w,d as b,L as p,e as m,S as k}from"./index-f9106632.js";let g=0;function y(r,e){const t=XMLHttpRequest.prototype.send,i=g++;XMLHttpRequest.prototype.send=function(...n){return r(i),this.addEventListener("readystatechange",()=>{this.readyState===4&&e(i)}),t.apply(this,n)}}function S(r,e){const t=fetch;fetch=(...i)=>new Promise((n,c)=>{const d=g++;r(d),t(...i).then(u=>{e(d),n(u)},u=>{e(u),c(u)})})}const f=["img","script","iframe","link","audio","video","source"];function T(r,e){for(const t of r)if(e.includes(t.nodeName.toLowerCase())||T(t.children,e))return!0;return!1}function I(r){const e=new MutationObserver(t=>{t=t;for(const i of t)(i.type=="childList"&&T(i.addedNodes,f)||i.type=="attributes"&&f.includes(i.target.tagName.toLowerCase()))&&r(i)});return e.observe(document,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["href","src"]}),e}const s=(...r)=>{console.log(...r)},C=(r,e,t,i,n)=>{if(i-t<5e3)return null;const c=n.length===0?r:n[n.length-1].end;return i-c<5e3?null:Math.max(c,e)},_=(r,e)=>{if(r.length>2)return performance.now();const t=[];for(const n of e)t.push({timestamp:n.start,type:"requestStart"}),t.push({timestamp:n.end,type:"requestEnd"});for(const n of r)t.push({timestamp:n,type:"requestStart"});t.sort((n,c)=>n.timestamp-c.timestamp);let i=r.length;for(let n=t.length-1;n>=0;n--){const c=t[n];switch(c.type){case"requestStart":i--;break;case"requestEnd":if(i++,i>2)return c.timestamp;break;default:throw Error("Internal Error: This should never happen")}}return 0};class R{constructor(e={}){this._useMutationObserver=!!e.useMutationObserver,this._minValue=e.minValue||null;const t=window.__tti&&window.__tti.e,i=window.__tti&&window.__tti.o;t?(s("Consuming the long task entries already recorded."),this._longTasks=t.map(n=>({start:n.startTime,end:n.startTime+n.duration}))):this._longTasks=[],i&&i.disconnect(),this._networkRequests=[],this._incompleteJSInitiatedRequestStartTimes=new Map,this._timerId=null,this._timerActivationTime=-1/0,this._scheduleTimerTasks=!1,this._firstConsistentlyInteractiveResolver=null,this._performanceObserver=null,this._mutationObserver=null,this._registerListeners()}getFirstConsistentlyInteractive(){return new Promise((e,t)=>{this._firstConsistentlyInteractiveResolver=e,document.readyState=="complete"?this.startSchedulingTimerTasks():window.addEventListener("load",()=>{this.startSchedulingTimerTasks()})})}startSchedulingTimerTasks(){s("Enabling FirstConsistentlyInteractiveDetector"),this._scheduleTimerTasks=!0;const e=this._longTasks.length>0?this._longTasks[this._longTasks.length-1].end:0,t=_(this._incompleteRequestStarts,this._networkRequests);this.rescheduleTimer(Math.max(t+5e3,e))}setMinValue(e){this._minValue=e}rescheduleTimer(e){if(!this._scheduleTimerTasks){s("startSchedulingTimerTasks must be called before calling rescheduleTimer");return}if(s(`Attempting to reschedule FirstConsistentlyInteractive check to ${e}`),s(`Previous timer activation time: ${this._timerActivationTime}`),this._timerActivationTime>e){s("Current activation time is greater than attempted reschedule time. No need to postpone.");return}clearTimeout(this._timerId),this._timerId=setTimeout(()=>{this._checkTTI()},e-performance.now()),this._timerActivationTime=e,s(`Rescheduled firstConsistentlyInteractive check at ${e}`)}disable(){s("Disabling FirstConsistentlyInteractiveDetector"),clearTimeout(this._timerId),this._scheduleTimerTasks=!1,this._unregisterListeners()}_registerPerformanceObserver(){this._performanceObserver=new PerformanceObserver(e=>{const t=e.getEntries();for(const i of t)i.entryType==="resource"&&this._networkRequestFinishedCallback(i),i.entryType==="longtask"&&this._longTaskFinishedCallback(i)}),this._performanceObserver.observe({entryTypes:["longtask","resource"]})}_registerListeners(){y(this._beforeJSInitiatedRequestCallback.bind(this),this._afterJSInitiatedRequestCallback.bind(this)),S(this._beforeJSInitiatedRequestCallback.bind(this),this._afterJSInitiatedRequestCallback.bind(this)),this._registerPerformanceObserver(),this._useMutationObserver&&(this._mutationObserver=I(this._mutationObserverCallback.bind(this)))}_unregisterListeners(){this._performanceObserver&&this._performanceObserver.disconnect(),this._mutationObserver&&this._mutationObserver.disconnect()}_beforeJSInitiatedRequestCallback(e){s(`Starting JS initiated request. Request ID: ${e}`),this._incompleteJSInitiatedRequestStartTimes.set(e,performance.now()),s(`Active XHRs: ${this._incompleteJSInitiatedRequestStartTimes.size}`)}_afterJSInitiatedRequestCallback(e){s(`Completed JS initiated request with request ID: ${e}`),this._incompleteJSInitiatedRequestStartTimes.delete(e),s(`Active XHRs: ${this._incompleteJSInitiatedRequestStartTimes.size}`)}_networkRequestFinishedCallback(e){s("Network request finished",e),this._networkRequests.push({start:e.fetchStart,end:e.responseEnd}),this.rescheduleTimer(_(this._incompleteRequestStarts,this._networkRequests)+5e3)}_longTaskFinishedCallback(e){s("Long task finished",e);const t=e.startTime+e.duration;this._longTasks.push({start:e.startTime,end:t}),this.rescheduleTimer(t+5e3)}_mutationObserverCallback(e){s("Potentially network resource fetching mutation detected",e),s("Pushing back FirstConsistentlyInteractive check by 5 seconds."),this.rescheduleTimer(performance.now()+5e3)}_getMinValue(){if(this._minValue)return this._minValue;if(performance.timing.domContentLoadedEventEnd){const{domContentLoadedEventEnd:e,navigationStart:t}=performance.timing;return e-t}return null}get _incompleteRequestStarts(){return[...this._incompleteJSInitiatedRequestStartTimes.values()]}_checkTTI(){s("Checking if First Consistently Interactive was reached...");const e=performance.timing.navigationStart,t=_(this._incompleteRequestStarts,this._networkRequests),n=(window.chrome&&window.chrome.loadTimes?window.chrome.loadTimes().firstPaintTime*1e3-e:0)||performance.timing.domContentLoadedEventEnd-e,c=this._getMinValue(),d=performance.now();c===null&&(s("No usable minimum value yet. Postponing check."),this.rescheduleTimer(Math.max(t+5e3,d+1e3))),s("Parameter values:"),s("NavigationStart",e),s("lastKnownNetwork2Busy",t),s("Search Start",n),s("Min Value",c),s("Last busy",t),s("Current time",d),s("Long tasks",this._longTasks),s("Incomplete JS Request Start Times",this._incompleteRequestStarts),s("Network requests",this._networkRequests);const u=C(n,c,t,d,this._longTasks);u&&(this._firstConsistentlyInteractiveResolver(u),this.disable()),s("Could not detect First Consistently Interactive. Retrying in 1 second."),this.rescheduleTimer(performance.now()+1e3)}}const q=(r={})=>"PerformanceLongTaskTiming"in window?new R(r).getFirstConsistentlyInteractive():Promise.resolve(null);class L extends a.PureComponent{state={show:!1};showComp=()=>{this.setState({show:!0})};componentDidMount(){this.props.mode==="tti"?q().then(this.showComp):(typeof this.props.root=="function"?this.props.root():window).addEventListener("scroll",this.showComp)}componentWillUnmount(){this.props.mode==="scroll"&&(typeof this.props.root=="function"?this.props.root():window).removeEventListener("scroll",this.showComp)}render(){const{show:e}=this.state;return o(v,{children:e?this.props.children:null})}}const E=a.lazy(()=>h(()=>import("./InputSearch-448ddfd0.js"),["assets/InputSearch-448ddfd0.js","assets/index-f9106632.js","assets/index-51077bd6.css"])),P=a.lazy(()=>h(()=>import("./Banners-eba3c745.js"),["assets/Banners-eba3c745.js","assets/index-f9106632.js","assets/index-51077bd6.css"])),O=a.lazy(()=>h(()=>import("./PersonalizedSongs-9d044cde.js"),["assets/PersonalizedSongs-9d044cde.js","assets/index-f9106632.js","assets/index-51077bd6.css","assets/PersonalizedSongs-a1319f84.css"])),F=a.lazy(()=>h(()=>import("./NewSongs-19f95f5e.js"),["assets/NewSongs-19f95f5e.js","assets/index-f9106632.js","assets/index-51077bd6.css"])),M=a.lazy(()=>h(()=>import("./BigAlbums-f5c03254.js"),["assets/BigAlbums-f5c03254.js","assets/index-f9106632.js","assets/index-51077bd6.css","assets/dayjs.min-62ef9dcb.js"])),V=a.lazy(()=>h(()=>import("./PrivateMVs-5070561a.js"),["assets/PrivateMVs-5070561a.js","assets/index-f9106632.js","assets/index-51077bd6.css"])),A=a.lazy(()=>h(()=>import("./PlayList-8a32bb37.js"),["assets/PlayList-8a32bb37.js","assets/index-f9106632.js","assets/index-51077bd6.css"])),D=()=>{const[r,e]=a.useState(!1);return l(v,{children:[o(w,{children:o("title",{children:"Music-Motion | Discover"})}),l("main",{className:" p-4 relative overflow-hidden bg-mg",children:[o(a.Suspense,{children:o(E,{isFocus:r,setIsFocus:e})}),l("div",{className:b({hidden:r,block:!r}),children:[o(a.Suspense,{children:o(P,{})}),o(a.Suspense,{children:o(O,{})}),l(a.Suspense,{children:[o(p,{to:"/discover/playlist",children:o(m,{title:"Playlist_歌单",showMore:!0})}),o(A,{})]}),l(a.Suspense,{children:[o(p,{to:"/discover/songs",children:o(m,{title:"Track_新歌",showMore:!0,style:{marginTop:48}})}),o(F,{})]}),l(L,{mode:"scroll",root:()=>document.getElementById("root"),children:[l(a.Suspense,{fallback:o(k,{style:{marginTop:48}}),children:[o(m,{title:"Album_专辑",style:{marginTop:48,marginBottom:8}}),o(M,{})]}),l(a.Suspense,{children:[o(m,{title:"MV_独家放送",style:{marginTop:16}}),o(V,{})]})]})]})]})]})};export{D as default};
