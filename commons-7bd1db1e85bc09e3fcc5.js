"use strict";(self.webpackChunkr_obin_ch=self.webpackChunkr_obin_ch||[]).push([[351],{862:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useI18nL10nContext=t.LocalizedLink=t.LanguageSwitcher=t.I18nHead=void 0;var o=r(n(2336));t.I18nHead=o.default;var a=r(n(5548));t.LanguageSwitcher=a.default;var i=r(n(7638));t.LocalizedLink=i.default;var l=n(9914);Object.defineProperty(t,"useI18nL10nContext",{enumerable:!0,get:function(){return l.useI18nL10nContext}})},5548:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(5893),o=n(1597),a=n(9914);t.default=function(e){var t,n=e.className,i=e.resolveLanguageName,l=(0,a.useI18nL10nContext)();return(0,r.jsx)("nav",Object.assign({className:n},{children:(0,r.jsx)("ul",{children:null===(t=l.translations)||void 0===t?void 0:t.map((function(e){return(0,r.jsx)("li",{children:(0,r.jsx)(o.Link,Object.assign({to:e.path},{children:i(e.locale)}))},e.locale)}))})}))}},7638:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(5893),a=n(1597),i=r(n(3652)),l=n(5479),u=n(9914),c=n(3857);t.default=function(e){var t,n=e.to,r=e.children,s=e.className,d=e.activeClassName,f=void 0===d?"active":d,p=e.activeStyle,v=void 0===p?{}:p,m=e.partiallyActive,h=void 0===m||m,g=null!==(t=(0,u.useI18nL10nContext)().prefix)&&void 0!==t?t:"",b=(0,l.useIntl)(),y="/"!==n?b.messages[n]?b.formatMessage({id:n}):n:"/",x=b.defaultLocale===b.locale?y:(0,c.trimRightSlash)(i.default.join("/",g,y));return(0,o.jsx)(a.Link,Object.assign({to:x,className:s,activeClassName:f,activeStyle:v,partiallyActive:h},{children:r}))}},3857:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.generatePageContext=t.parsePathPrefix=t.translatePagePaths=t.addLocalePrefix=t.trimSlashes=t.trimRightSlash=void 0;var r=n(3652);t.trimRightSlash=function(e){return"/"===e?e:e.replace(/\/$/,"")};t.trimSlashes=function(e){return"/"===e?e:e.replace(/^\/|\/$/g,"")};t.addLocalePrefix=function(e,n,o,a){return n!==a?(0,t.trimRightSlash)("/"+r.posix.join(o,e)):e};t.translatePagePaths=function(e,n){return n.locales.map((function(r){var o,a=(0,t.trimRightSlash)(e),i=null!==(o=r.slugs[a])&&void 0!==o?o:a;return{locale:r.locale,path:(0,t.addLocalePrefix)(i,r.locale,r.prefix,n.defaultLocale)}}))};t.parsePathPrefix=function(e,t){if("/"===e)return t;var n=e.match(/(?<=^\/)\w{2}(-\w{2})?(?=\/)/g);return n&&n[0]?n[0]:t};t.generatePageContext=function(e,n){var r,o=null===(r=n.locales.find((function(e){return e.locale===n.defaultLocale})))||void 0===r?void 0:r.prefix,a=(0,t.parsePathPrefix)(e,null!=o?o:""),i=n.locales.find((function(e){return e.prefix===a}));return{locale:null==i?void 0:i.locale,prefix:null==i?void 0:i.prefix}}},6786:function(e,t,n){n.d(t,{H:function(){return N}});var r=n(1243),o=n(9996),a=n(1597),i={primaryColor:"#FFFFFF",secondaryColor:"#EEEEEE",breakpoints:{tiny:"1280px",small:"1440px",medium:"1600px",big:"1920px",huge:"2560px"}},l=n(1232);function u(e){var t=e.title;return(0,r.tZ)(l.Helmet,null,(0,r.tZ)("title",null,t))}var c=function(e){return(0,r.iv)("display:flex;align-items:center;height:2rem;background-color:",e.secondaryColor,";","","","")};function s(e){var t=e.author,n=e.version;return(0,r.tZ)("footer",{css:c},t," ",n)}var d=n(862),f=(n(7294),n(4375),n(7154),n(3560),n(5838),n(5893));f.Fragment;function p(e,t,n){return o.h.call(t,"css")?(0,f.jsx)(o.E,(0,o.c)(e,t),n):(0,f.jsx)(e,t,n)}function v(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw a}}}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var h=Object.defineProperty,g=(Object.defineProperties,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols),b=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable,x=function(e,t,n){return t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n},j=function(e,t){for(var n in t||(t={}))b.call(t,n)&&x(e,n,t[n]);if(g){var r,o=v(g(t));try{for(o.s();!(r=o.n()).done;){n=r.value;y.call(t,n)&&x(e,n,t[n])}}catch(a){o.e(a)}finally{o.f()}}return e},L=function(e,t){var n={};for(var r in e)b.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&g){var o,a=v(g(e));try{for(a.s();!(o=a.n()).done;){r=o.value;t.indexOf(r)<0&&y.call(e,r)&&(n[r]=e[r])}}catch(i){a.e(i)}finally{a.f()}}return n};function P(e){var t=e,n=t.css,o=t.as,a=void 0===o?"section":o,i=t.rebound,l=t.bottomRebound,u=t.height,c=t.bottomHeight,s=t.primaryColor,d=t.position,f=void 0===d?"top":d,v=t.flip,m=void 0===v?"none":v,h=L(t,["css","as","rebound","bottomRebound","height","bottomHeight","primaryColor","position","flip"]),g=(0,r.iv)("background-color:",null!=s?s:"#000000",";",""),b=["top"===f||"none"!==m&&"bottom"!==m?"0 100%":"0 calc(100% - ".concat(null!=c?c:u,"px)"),"top"===f?"0 100%":"none"!==m&&"bottom"!==m?"".concat("".concat(null!=l?l:i,"%")," calc(100% - ",null!=c?c:u,"px)"):"".concat("".concat(null!=l?l:i,"%")," 100%"),"top"===f||"none"!==m&&"bottom"!==m?"100% 100%":"100% calc(100% - ".concat(null!=c?c:u,"px)"),"bottom"===f||"none"!==m&&"top"!==m?"100% 0":"100% ".concat(u,"px"),"bottom"===f?"100% 0":"none"!==m&&"top"!==m?"".concat(i,"% ").concat(u,"px"):"".concat(i,"% 0"),"bottom"===f||"none"!==m&&"top"!==m?"0 0":"0 ".concat(u,"px")],y=(0,r.iv)("top"!==f?"border-bottom: ".concat(null!=c?c:u,"px solid transparent;"):""," ","bottom"!==f?"border-top: ".concat(u,"px solid transparent;"):""," clip-path:polygon(",b.join(","),");","");return p(a,j({css:[g,y,n,"",""]},h))}var _=n(212);var S={name:"1vfzcts",styles:"font-size:1.4rem;ul{margin:0;padding:0;list-style:none;li{display:inline;margin-left:1rem;}}"};function w(){var e=(0,_.Z)();return(0,r.tZ)(d.LanguageSwitcher,{css:S,resolveLanguageName:function(t){return e.formatMessage({id:"languages."+t})}})}var O={name:"1r47ybd",styles:"ul{list-style:none;padding:0;margin:0;font-size:1.4rem;}"},Z=function(){return O};function C(){return(0,r.tZ)("nav",{css:Z},(0,r.tZ)("ul",null,(0,r.tZ)("li",null,(0,r.tZ)(d.LocalizedLink,{to:"/pages"},"Joho"))))}var k=function(e){return(0,r.iv)("display:flex;align-items:center;justify-content:space-between;height:6rem;font-size:2rem;font-weight:bold;background-color:",e.secondaryColor,";","","","")};function M(e){var t=e.title;return(0,r.tZ)(P,{as:"header",position:"bottom",rebound:25,height:20,css:k},(0,r.tZ)(d.LocalizedLink,{to:"/"},t),(0,r.tZ)(C,null),(0,r.tZ)(w,null))}var I={name:"x01ejq",styles:"padding-top:1rem;padding-bottom:1rem"},z=function(){return I};function E(e){var t=e.children;return(0,r.tZ)("main",{css:z},t)}var A=function(e){return(0,r.iv)("html{height:100%;}body,#___gatsby,#gatsby-focus-wrapper,main{margin:0;font-size:14px;display:flex;flex-direction:column;flex-grow:1;min-height:100%;font-family:'Lucida Sans','Lucida Sans Regular','Lucida Grande','Lucida Sans Unicode',Geneva,Verdana,sans-serif;}header,main,footer{padding:0 10%;@media (max-width: ",e.breakpoints.tiny,"){header,main,footer{}padding:0 1rem;}}","","","")};function N(e){var t,n,l,c,d,f,p,v,m=e.children,h=e.theme,g=(0,a.useStaticQuery)("953814312");return(0,r.tZ)(o.b,{theme:h||i},(0,r.tZ)(u,{title:(null===(t=g.site)||void 0===t||null===(n=t.siteMetadata)||void 0===n?void 0:n.title)||""}),(0,r.tZ)(r.xB,{styles:A}),(0,r.tZ)(M,{title:(null===(l=g.site)||void 0===l||null===(c=l.siteMetadata)||void 0===c?void 0:c.title)||""}),(0,r.tZ)(E,null,m),(0,r.tZ)(s,{author:(null===(d=g.site)||void 0===d||null===(f=d.siteMetadata)||void 0===f?void 0:f.project)||"",version:(null===(p=g.site)||void 0===p||null===(v=p.siteMetadata)||void 0===v?void 0:v.version)||""}))}}}]);
//# sourceMappingURL=commons-7bd1db1e85bc09e3fcc5.js.map