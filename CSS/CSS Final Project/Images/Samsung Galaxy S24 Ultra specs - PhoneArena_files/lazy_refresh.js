(()=>{"use strict";const e={root:null,rootMargin:"100% 0px 100% 0px",threshold:0};let t={adServerRequestSent:!1,aps:!1,prebid:!1};class o{constructor(e){this.id=Date.now(),this.node=e,this.meta={click:0,hover:0},this.registerListeners()}registerListeners(){this.node&&(this.node.addEventListener("mouseover",this.countHover.bind(this)),this.node.addEventListener("click",this.countClick.bind(this)))}countHover(){this.meta.hover++}countClick(){this.meta.click++}removeListeners(){this.node&&(this.node.removeEventListener("mouseover",this.countHover),this.node.removeEventListener("click",this.countClick))}}class n{constructor(e,t){let o=e;e=o.id;const n=o.reload;o=o.options,this.id=e,this.node=document.getElementById(e),this.reload=n,this.setOptions(o,t),this.viewableSeconds=this.visibleSeconds=0,this.ads=[],this.addAd(this.node)}addAd(e){e=new o(e),this.ads=[e]}reloadAd(){this.ads[this.ads.length-1].removeListeners(),this.viewableSeconds=this.visibleSeconds=0,this.reload(),this.addAd(this.node)}setOptions(e,t){this.options=Object.assign({},{minVisibility:.5,minVisibleSeconds:1,reloadSeconds:t},e),this.options.minVisibility*=this.node&&this.node.clientHeight?this.node.clientHeight:0}handleReloading(){this.isVisible()?this.visibleSeconds++:this.visibleSeconds=0,this.isViewable()&&(this.viewableSeconds++,this.shouldReload()&&this.reloadAd())}isVisible(){const e=this.node?this.node.getBoundingClientRect():{top:0,bottom:window.innerHeight};return i(e,{top:0,bottom:window.innerHeight},this.options.minVisibility)}isViewable(){return this.visibleSeconds>=this.options.minVisibleSeconds}shouldReload(){return this.viewableSeconds>=this.options.reloadSeconds}}const i=function(e,t,o){return e.top>=t.top&&e.bottom<=t.bottom||e.top<t.top&&e.bottom>=o||e.bottom>t.bottom&&t.bottom-e.top>=o},s=new class{constructor(){this.slots=[],this.addedSlots=[]}addSlot(e,t){return-1===this.addedSlots.indexOf(e.id)&&e&&(e=new n(e,t),this.slots.push(e)),this.addedSlots.push(e.id),e}removeSlot(e){this.addedSlots=this.addedSlots.filter((t=>t!==e.id)),this.slots=this.slots.filter((t=>t!==e.id))}setSlotRefreshTime(e,t){e&&t&&this.slots&&this.slots.filter((o=>{o.id===e&&(o.options.reloadSeconds=t)}))}enableService(){this.timer=setInterval((()=>!!this.isTabActive()&&void this.slots.forEach((e=>{e.handleReloading()}))),1e3)}isTabActive(){return"visible"===document.visibilityState}};let d;window.googletag=window.googletag||{cmd:[]};const l="font-size: 14px; font-weight: bold; color: #9d0214";function a(e,t){const o=document.getElementById("adOverlay"),n=o?o.querySelector(`#${e}`):null;s.removeSlot({id:e}),o&&!window.adhesiveRemoved[e]&&n&&(window.googletag.destroySlots([t]),o.remove(),window.lazyScriptDebug&&console.log("%c!!!ADHESIVE "+e+" Removed!!! Size is: null",l),window.refreshSlots=window.refreshSlots.filter((t=>t.id!==e)),S(),window.adhesiveRemoved[e]=!0)}function r(e,t){e.forEach((function(e){if(e.isIntersecting){window.lazyScriptDebug&&console.log(`%cSlot entering viewport: ${e.target.id}`,l),window.lazyLoadBuffer.push(window.adUnitMap[e.target.id]),document.dispatchEvent(new CustomEvent("LazyLoadIntersection"));const o=document.getElementById(e.target.getAttribute("id"));o&&t.unobserve(o)}}))}function c(e,t,o){if(t&&o){try{if("function"==typeof window.pbjs.getUserIds&&"object"==typeof window.pbjs.getUserIds()){const e=window.pbjs.getUserIds(),t=Object.keys(e);for(let o=0,n=t.length;o<n;o++)window.googletag.pubads().setTargeting(t[o],e[t[o]])}}catch(e){console.error(e)}window.googletag.pubads().isInitialLoadDisabled()&&(window.googletag.pubads().refresh(e),b())}}function w(e){t.aps&&t.prebid&&u(e)}function u(e){!0!==t.adServerRequestSent&&(t.adServerRequestSent=!0,window.googletag.cmd.push((function(){window.googletag.pubads().refresh([e])})))}function g(e,t,o){let n=!1,i=!1;if(0===t.length?n=!0:window.apstag.fetchBids({slots:t,timeout:window.PREBID_TIMEOUT},(function(t){window.apstag.setDisplayBids(),n=!0,c(e,n,i)})),0===o.length)i=!0;else{const t={adUnits:o,bidsBackHandler:function(t){window.pbjs.setTargetingForGPTAsync(),i=!0,c(e,n,i),window.pbjs.addAdUnits(o)},timeout:window.PREBID_TIMEOUT};window.googletag.cmd.push((function(){window.pbjs.requestBids(t)}))}i&&n&&c(e,n,i)}function f(e){var t;const o=null!==(t=e.isBackfill)&&void 0!==t&&t,n=e.companyIds;return o&&!n}function h(e){var t;const o=null!==(t=e.lineItemId)&&void 0!==t&&t,n=window.backfillRefreshIds;return n&&-1!==n.indexOf(o.toString())}function p(e,t,o){const n=e.slot.getResponseInformation(),i=o&&!0===o.stopRefresh;if(n&&i){const e=f(n),o=function(e){var t;const o=null!==(t=e.lineItemId)&&void 0!==t&&t,n=window.excludeLineItemIds;return n&&-1!==n.indexOf(o.toString())}(n);return!(!e&&!o||(window.refreshSlots=window.refreshSlots.filter((e=>e.id!==t)),s.removeSlot({id:t}),S(),0))}return!1}function m(e){const o=e.slot,n=o.getSlotElementId(),i=window.refreshSlots.map((e=>e.id)),r=window.refreshSlots[i.indexOf(n)];let c;if(r&&n===r.id){null!==e.size?function(){!function(){if(!document.getElementById("adhesiveStyle")){const e=document.createElement("style");e.setAttribute("type","text/css"),e.setAttribute("id","adhesiveStyle"),isMobileDevice?e.innerText="#adOverlay{position:fixed;width:320px;left:0;right:0;margin-right:auto;margin-left:auto;text-align:center;min-height:50px;bottom:0;z-index:1000}#closeButton{position:absolute;top:0;right:0;left:0;cursor:pointer;font-family:Arial,sans-serif;font-size:14px;z-index:1001}#closeButtonAsset{z-index:1001;position:absolute;width:27px;height:27px;top:-13px;right:-13px;max-width:none}@media screen and (max-width:340px){#adOverlay{display:none}}":e.innerText="#adOverlay{position:fixed;width:720px;left:0;right:0;margin-right:auto;margin-left:auto;text-align:center;height:90px;bottom:0;z-index:1000}#closeButton{position:absolute;bottom:92px;right:0;left:725px;cursor:pointer;font-family:Arial,sans-serif;font-size:14px;z-index:1001}#closeButtonAsset{z-index:1002;position:absolute;width:27px;height:27px;left:-5px;top:-20px;max-width:none}@media screen and (max-width:340px){#adOverlay{display:none}}",document.head.append(e)}}();const e=document.getElementById("adOverlay");if(e&&!document.getElementById("closeButton")){const t=document.createElement("div");t.id="closeButton",e.append(t),setTimeout((function(){const e=document.createElement("img");e.id="closeButtonAsset",e.addEventListener("click",(()=>{!function(){const e=document.getElementById("adOverlay").querySelector('[id*="div-gpt-ad"]');if(e){const t=e.getAttribute("id"),o=Array.from(window.googletag.pubads().getSlots()||[]).filter((e=>{if(e.getSlotElementId()===t)return e}));o.length>0&&(d=o.pop(),d&&a(t,d))}}()})),e.setAttribute("src","https://ced-ns.sascdn.com/diff/templates/images/close_54x54.png"),document.getElementById("closeButton")&&document.getElementById("closeButton").append(e)}),100)}}():a(n,o);let i=!0;const g=p(e,n,r);o.getResponseInformation()&&f(o.getResponseInformation())&&window.dataLayer.push({event:"IsAdX"}),h(o.getResponseInformation())?(c=window.backfillRefreshTime,s.setSlotRefreshTime(n,c)):(c=window.refreshSlotsTime,s.setSlotRefreshTime(n,c)),g||s.addSlot({id:n,reload:function(){const s=p(e,n,r);if(o.getResponseInformation()&&f(o.getResponseInformation())&&i&&window.dataLayer.push({event:"IsAdX"}),!s){const s=h(o.getResponseInformation());s&&i||s&&!i?window.googletag.pubads().setTargeting("backfillRefresh",["true"]):(!s&&i||!s&&!i)&&window.googletag.pubads().clearTargeting("backfillRefresh"),null===e.size||window.adhesiveRemoved[n]?a(n,o):(function(e,o){t.adServerRequestSent=!1,t.aps=!1,t.prebid=!1,e&&(function(e,o){if(e){const n=[],i=[],s=[];(window.adUnits||[]).find((function(t){t.code===e&&n.push(t)})),(window.apstagSlots||[]).find((function(t){t.slotID===e&&i.push(t)})),window.googletag.pubads().getSlots().find((function(t){t.getSlotElementId()===e&&s.push(t)})),window.apstag.fetchBids({slots:i,timeout:window.PREBID_TIMEOUT},(function(n){window.googletag.cmd.push((function(){window.apstag.setDisplayBids(),t.aps=!0,w(o),window.lazyScriptDebug&&console.log("%cRefreshBids.bidsBackHandler "+e,l)}))})),window.pbjs.que.push((function(){window.pbjs.requestBids({adUnits:n,timeout:window.PREBID_TIMEOUT,bidsBackHandler:function(){window.googletag.cmd.push((function(){window.pbjs.setTargetingForGPTAsync(n),t.prebid=!0,w(o),window.lazyScriptDebug&&console.log("%cRefreshBids.bidsBackHandler "+e,l)}))}})}))}}(e,o),window.setTimeout((function(){u(o)}),window.PREBID_TIMEOUT))}(n,o),i=!1)}}},c),void 0!==r.dfpInfo&&!0===r.dfpInfo&&window.lazyScriptDebug&&(console.group("Slot",n,"finished rendering."),console.info("Advertiser ID:",e.advertiserId),console.info("Campaign ID: ",e.campaignId),console.info("Creative ID: ",e.creativeId),console.info("Is empty?:",e.isEmpty),console.info("Line Item ID:",e.lineItemId),console.info("Size:",e.size),console.info("Source Agnostic Creative ID:",e.sourceAgnosticCreativeId),console.info("Source Agnostic Line Item ID:",e.sourceAgnosticLineItemId),console.groupEnd())}}function S(){window.refreshSlots=window.refreshSlots||[],clearInterval(s.timer),s.enableService(),window.googletag.pubads().removeEventListener("slotRenderEnded",(e=>{m(e)})),window.googletag.pubads().addEventListener("slotRenderEnded",(e=>{m(e)}))}window.googletag.cmd.push((function(){window.refreshSlots.forEach((e=>{window.googletag.defineSlot(e.path,e.size,e.id).addService(window.googletag.pubads())}))}));const b=()=>{window.aax.cmd.push((function(){window.aax.getAbpStatus()&&(window.googletag=window.googletag||{},window.googletag.cmd=window.googletag.cmd||[],window.googletag.cmd.push((function(){window.googletag.pubads().refresh()})))}))},I=function(){document.removeEventListener("DOMContentLoaded",I),window.adhesiveRemoved=window.adhesiveRemoved||[],window.PREBID_TIMEOUT=window.PREBID_TIMEOUT||2e3,window.adUnitMap=window.adUnitMap||[],window.lazyLoadBuffer=window.lazyLoadBuffer||[],window.lazyIncludedIds=window.lazyIncludedIds||[],window.refreshSlots=window.refreshSlots||[],window.refreshSlotsTime=window.refreshSlotsTime||30,window.backfillRefreshTime=window.backfillRefreshTime||15,window.nonLazySlots=window.nonLazySlots||[],window.otherLazySlots=window.otherLazySlots||[],window.lazyScriptDebug=window.lazyScriptDebug||!1,window.lazyLoadConfig=Object.assign(e,window.lazyLoadConfig),window.aax=window.aax||{},window.aax.cmd=window.aax.cmd||[],window.excludeLineItemIds=window.excludeLineItemIds||[],window.googletag.cmd.push((function(){S();let e=window.googletag.pubads().getSlots().map((function(e){return e.getSlotElementId()}));e=e.filter((function(t,o){return e.indexOf(t)===o}));const t=window.lazyIncludedIds.filter((t=>!e.includes(t)));e.forEach((e=>{if((window.lazyIncludedIds||[]).find((t=>t===e))){const t=(window.adUnits||[]).find((t=>t.code===e)),o=(window.apstagSlots||[]).find((t=>t.slotID===e)),n=window.googletag.pubads().getSlots().find((t=>{const o=t.getSlotElementId();return o===e&&-1===window.lazyIncludedIds.indexOf(o)}));return window.adUnitMap[e]={gptSlot:n,pbjsSlot:t,apstagSlot:o},void function(e,t,o){const n={root:null,rootMargin:window.lazyLoadConfig.rootMargin,threshold:window.lazyLoadConfig.threshold||0},i=window.googletag.pubads().getSlots().find((function(t){return t.getSlotElementId()===e}));if(!i)return;window.apstagSlots=window.apstagSlots||[],window.adUnits=window.adUnits||[];const s=new IntersectionObserver(r,n),d=i,l=window.adUnits.find((function(e){return e.code===d.getSlotElementId()})),a=window.apstagSlots.find((function(e){return e.slotName===d.getAdUnitPath()})),c=d.getSlotElementId(),w=document.getElementById(c),u=function(e){0===e.getBoundingClientRect().width&&(e.style.minWidth="260px"),0===e.getBoundingClientRect().height&&(e.style.minHeight="50px"),window.adUnitMap[c]={gptSlot:i,pbjsSlot:l,apstagSlot:a},s.observe(document.getElementById(c))};if(w)u(w);else{const e=function(o,n){for(let i=0;i<o.length;i++){const s=o[i];if(s.nodeType!==document.documentElement.ELEMENT_NODE)return!1;if(s.id===n)return u(s),t.disconnect(),!0;if(s.hasChildNodes()&&e(s.children,n))return!0}},t=new MutationObserver((function(t){for(let o=0;o<t.length;o++)e(t[o].addedNodes,c)}));t.observe(document,{attributes:!1,childList:!0,characterData:!0,subtree:!0})}}(e)}window.nonLazySlots.push(e)})),((e,t,o)=>{const n=["div"],i=new IntersectionObserver(((e,t)=>{e.forEach((e=>{e.intersectionRatio>0&&(window.otherLazySlots.forEach((t=>{t.id===e.target.id&&t.callback&&"function"==typeof t.callback&&t.callback(e.target)})),t.unobserve(e.target))}))}),{rootMargin:t||window.lazyLoadConfig.rootMargin,threshold:o||window.lazyLoadConfig.threshold});e.forEach((e=>{if("object"==typeof e&&e.elementId){const t=document.getElementById(e.elementId);e.callback&&t&&n.indexOf(t.nodeName.toLowerCase())>-1&&(window.otherLazySlots.push({id:e.elementId,callback:e.callback}),i.observe(t))}}))})(t,window.lazyLoadConfig.rootMargin,window.lazyLoadConfig.threshold),window.pbjs.que.push((function(){const e=[],t=[],o=[];window.nonLazySlots.forEach((n=>{(window.adUnits||[]).find((function(t){t.code===n&&e.push(t)})),(window.apstagSlots||[]).find((function(e){e.slotID===n&&t.push(e)})),window.googletag.pubads().getSlots().find((function(e){e.getSlotElementId()===n&&o.push(e)}))})),g(o,t,e)})),b(),window.lazyScriptDebug&&(console.group("%c----===== LAZY PREBID SCRIPT DEBUG =====----",l),console.info("%cPREBID_TIMEOUT: ",l,window.PREBID_TIMEOUT),console.info("%cadUnitMap: ",l,window.adUnitMap),console.info("%clazyLoadBuffer: ",l,window.lazyLoadBuffer),console.info("%clazyIncludedIds: ",l,window.lazyIncludedIds),console.info("%crefreshSlots: ",l,window.refreshSlots),console.info("%crefreshSlotsTime: ",l,window.refreshSlotsTime),console.info("%cnonLazySlots: ",l,window.nonLazySlots),console.info("%clazyLoadConfig: ",l,window.lazyLoadConfig),console.groupEnd())}))};"complete"===document.readyState||"interactive"===document.readyState?I():document.addEventListener("DOMContentLoaded",I),document.addEventListener("LazyLoadIntersection",(function(){window.pbjs.que.push((function(){if(0===window.lazyLoadBuffer.length)return;let e=[],t=[],o=[];for(;window.lazyLoadBuffer.length>0;){const n=window.lazyLoadBuffer.pop();void 0!==n.apstagSlot&&o.push(n.apstagSlot),void 0!==n.pbjsSlot&&t.push(n.pbjsSlot),e.push(n.gptSlot)}g(e,o,t)}))})),window.dispatchEvent(new CustomEvent("lazyRefreshStarted"))})();