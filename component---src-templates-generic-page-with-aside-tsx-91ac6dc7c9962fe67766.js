(self.webpackChunkr_obin_ch=self.webpackChunkr_obin_ch||[]).push([[566],{3646:function(t,e,r){var n=r(7228);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.__esModule=!0,t.exports.default=t.exports},9100:function(t,e,r){var n=r(9489),o=r(7067);function i(e,r,u){return o()?(t.exports=i=Reflect.construct,t.exports.__esModule=!0,t.exports.default=t.exports):(t.exports=i=function(t,e,r){var o=[null];o.push.apply(o,e);var i=new(Function.bind.apply(t,o));return r&&n(i,r.prototype),i},t.exports.__esModule=!0,t.exports.default=t.exports),i.apply(null,arguments)}t.exports=i,t.exports.__esModule=!0,t.exports.default=t.exports},9713:function(t){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},t.exports.__esModule=!0,t.exports.default=t.exports},7067:function(t){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}},t.exports.__esModule=!0,t.exports.default=t.exports},6860:function(t){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},8206:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},319:function(t,e,r){var n=r(3646),o=r(6860),i=r(379),u=r(8206);t.exports=function(t){return n(t)||o(t)||i(t)||u()},t.exports.__esModule=!0,t.exports.default=t.exports},2102:function(t,e,r){var n=r(2632);t.exports={MDXRenderer:n}},2632:function(t,e,r){var n=r(9100),o=r(319),i=r(9713),u=r(7316),l=["scope","children"];function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){i(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c=r(7294),p=r(498).mdx,f=r(6948).useMDXScope;t.exports=function(t){var e=t.scope,r=t.children,i=u(t,l),s=f(e),d=c.useMemo((function(){if(!r)return null;var t=a({React:c,mdx:p},s),e=Object.keys(t),i=e.map((function(e){return t[e]}));return n(Function,["_fn"].concat(o(e),[""+r])).apply(void 0,[{}].concat(o(i)))}),[r,e]);return c.createElement(d,a({},i))}},5626:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return f}});var n=r(2102),o=r(1597),i=r(1243);function u(t){var e=t.items;return(0,i.tZ)("ul",null,e.map((function(t){return(0,i.tZ)("li",{key:t.url},(0,i.tZ)(o.Link,{to:t.url},t.title),t.items&&(0,i.tZ)(u,{items:t.items}))})))}function l(t){var e=t.displayRootItem,r=t.items;if(!r.items)return null;var n=r.items;return e||1!==n.length||void 0===n[0].items||(n=n[0].items),(0,i.tZ)("nav",null,(0,i.tZ)(u,{items:n}))}var s=r(8110),a=function(t){return(0,i.iv)("display:flex;flex-direction:row-reverse;@media (max-width: ",t.breakpoints.tiny,"){flex-direction:column;}article{width:100%;}aside{width:15rem;padding-top:3.2rem;@media (max-width: ",t.breakpoints.tiny,"){aside{}width:auto;padding-top:0;}nav{ul{margin:0;padding:0;list-style:none;}}}","","","")};function c(t){var e=t.children;return(0,i.tZ)(s.o,{css:a},e)}var p=r(3584);function f(t){var e,r,o,u,s=t.data;return(0,i.tZ)(p.H,{subtitle:null===(e=s.mdx)||void 0===e||null===(r=e.frontmatter)||void 0===r?void 0:r.title,contentWrapper:c},(0,i.tZ)("aside",null,(0,i.tZ)(l,{items:null===(o=s.mdx)||void 0===o?void 0:o.tableOfContents})),(0,i.tZ)("article",null,(0,i.tZ)(n.MDXRenderer,null,(null===(u=s.mdx)||void 0===u?void 0:u.body)||"")))}}}]);
//# sourceMappingURL=component---src-templates-generic-page-with-aside-tsx-91ac6dc7c9962fe67766.js.map