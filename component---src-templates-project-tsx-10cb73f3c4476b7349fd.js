(self.webpackChunkr_obin_ch=self.webpackChunkr_obin_ch||[]).push([[142],{1520:function(t,e,r){"use strict";r.d(e,{O:function(){return o}});var n=r(1243);function o(t){var e=t.children;return(0,n.tZ)("h2",null,e)}},5282:function(t,e,r){"use strict";r.d(e,{o:function(){return c}});var n=r(1597),o=r(7294),i=r(7971),u=r(1520),l=r(1243);function s(t){var e=t.items;return(0,l.tZ)("ul",null,e.map((function(t){return(0,l.tZ)("li",{key:t.url},(0,l.tZ)(n.Link,{to:t.url},t.title),t.items&&(0,l.tZ)(s,{items:t.items}))})))}var a=(0,l.tZ)(u.O,null,(0,l.tZ)(i.Z,{id:"aside.tableOfContents"}));function c(t){var e=t.displayRootItem,r=void 0!==e&&e,n=t.heading,i=void 0===n?a:n,u=t.items;if(!u.items)return null;var c=u.items;return!r&&c.length<=1&&!Array.isArray(c[0].items)?null:(!r&&Array.isArray(c[0].items)&&(c=c[0].items),(0,l.tZ)(o.Fragment,null,i,(0,l.tZ)("nav",null,(0,l.tZ)(s,{items:c}))))}},6571:function(t,e,r){"use strict";r.d(e,{g:function(){return u}});var n=r(1243),o=r(3678),i=function(t){return(0,n.iv)("display:flex;flex-direction:row;@media (max-width: ",t.breakpoints.compact,"){flex-direction:column-reverse;}article{width:calc(100% - 15rem);@media (max-width: ",t.breakpoints.compact,"){article{}width:auto;}}aside{min-width:15rem;width:15rem;padding-top:3.4rem;padding-left:1rem;@media (max-width: ",t.breakpoints.compact,"){aside{}width:auto;padding-top:0;padding-left:0;margin-bottom:2rem;}nav{ul{margin:0;list-style:decimal-leading-zero;}}}","","","")};function u(t){var e=t.children;return(0,n.tZ)(o.o,{css:i},e)}},1952:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return s}});var n=r(2102),o=r(5282),i=r(6571),u=r(1229),l=r(1243);function s(t){var e,r,s,a,c,p,f,d=t.data;return(0,l.tZ)(u.H,{subtitle:null===(e=d.mdx)||void 0===e||null===(r=e.frontmatter)||void 0===r?void 0:r.title,contentWrapper:i.g},(0,l.tZ)("article",null,(0,l.tZ)("h1",null,null===(s=d.mdx)||void 0===s||null===(a=s.frontmatter)||void 0===a?void 0:a.title),(0,l.tZ)(n.MDXRenderer,null,(null===(c=d.mdx)||void 0===c?void 0:c.body)||"")),(0,l.tZ)("aside",null,(null===(p=d.mdx)||void 0===p?void 0:p.tableOfContents)&&d.mdx.tableOfContents.items&&(0,l.tZ)(o.o,{items:null===(f=d.mdx)||void 0===f?void 0:f.tableOfContents})))}},2102:function(t,e,r){var n=r(2632);t.exports={MDXRenderer:n}},2632:function(t,e,r){var n=r(3515),o=r(861),i=r(8416),u=r(7071),l=["scope","children"];function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){i(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c=r(7294),p=r(498).mdx,f=r(6948).useMDXScope;t.exports=function(t){var e=t.scope,r=t.children,i=u(t,l),s=f(e),d=c.useMemo((function(){if(!r)return null;var t=a({React:c,mdx:p},s),e=Object.keys(t),i=e.map((function(e){return t[e]}));return n(Function,["_fn"].concat(o(e),[""+r])).apply(void 0,[{}].concat(o(i)))}),[r,e]);return c.createElement(d,a({},i))}},3897:function(t){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.__esModule=!0,t.exports.default=t.exports},3405:function(t,e,r){var n=r(3897);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.__esModule=!0,t.exports.default=t.exports},3515:function(t,e,r){var n=r(6015),o=r(9617);function i(e,r,u){return o()?(t.exports=i=Reflect.construct.bind(),t.exports.__esModule=!0,t.exports.default=t.exports):(t.exports=i=function(t,e,r){var o=[null];o.push.apply(o,e);var i=new(Function.bind.apply(t,o));return r&&n(i,r.prototype),i},t.exports.__esModule=!0,t.exports.default=t.exports),i.apply(null,arguments)}t.exports=i,t.exports.__esModule=!0,t.exports.default=t.exports},8416:function(t){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},t.exports.__esModule=!0,t.exports.default=t.exports},9617:function(t){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}},t.exports.__esModule=!0,t.exports.default=t.exports},9498:function(t){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},2281:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},7071:function(t){t.exports=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o},t.exports.__esModule=!0,t.exports.default=t.exports},861:function(t,e,r){var n=r(3405),o=r(9498),i=r(6116),u=r(2281);t.exports=function(t){return n(t)||o(t)||i(t)||u()},t.exports.__esModule=!0,t.exports.default=t.exports},6116:function(t,e,r){var n=r(3897);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.__esModule=!0,t.exports.default=t.exports}}]);
//# sourceMappingURL=component---src-templates-project-tsx-10cb73f3c4476b7349fd.js.map