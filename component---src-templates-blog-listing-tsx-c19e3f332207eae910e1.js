"use strict";(self.webpackChunkr_obin_ch=self.webpackChunkr_obin_ch||[]).push([[31],{5670:function(t,e,n){n.d(e,{l:function(){return c}});var i=n(1597),a=n(7059),r=n(5479),o=n(1243);var l={name:"1yp7290",styles:"margin-bottom:2rem"},s={name:"tp2ot6",styles:"display:inline-block;position:relative;margin:0 -0.5rem;margin-bottom:0.5rem;.gatsby-image-wrapper{user-select:none;}"},u={name:"raszh6",styles:"position:absolute;bottom:0;left:0;right:0;background-color:rgba(255, 255, 255, 0.8);margin-bottom:0;padding:0.5rem"},p={name:"1lf4fhi",styles:"display:flex;margin-bottom:0.5rem"};function c(t){var e=t.excerpt,n=t.path,c=t.title,g=t.publishedAt,d=t.featured,m=t.tagList,f=t.titleAs,Z=void 0===f?"h2":f;return(0,o.tZ)("div",{css:l},(0,o.tZ)(i.Link,{to:n,css:d&&s},d&&(0,o.tZ)(a.G,{image:d,alt:c}),(0,o.tZ)(Z,{css:d&&u},c)),(0,o.tZ)("div",{css:p},(0,o.tZ)(r.FormattedDate,{value:g})," ",(0,o.tZ)(r.FormattedTime,{value:g}),m),e)}},6941:function(t,e,n){n.d(e,{r:function(){return i}});var i={PATHS:{BLOG:"/blog",MEDIAS:"/medias",PROJECTS:"/projects",TAG:"/tag"},PAGINATION:{ITEMS_PER_PAGE:10},REMOTE_PATHS:{VCS:"https://github.com/openscript/r.obin.ch",EDIT_IN_VCS:"https://github.com/openscript/r.obin.ch/edit/master/"},SOURCES:{LOCAL_DATA:"content/data"}}},9541:function(t,e,n){n.r(e),n.d(e,{default:function(){return m}});var i=n(7971),a=n(5670),r=n(1597),o=n(7294),l=n(1243);function s(t){var e=t.currentPage,n=t.pageCount;if(n<=1)return null;var a="",s="",u="",p="";return 1!==e&&(a=".."),2===e?s="../":e>1&&(s="../"+(e-2)),1===e?u="./"+e:e!==n&&(u="../"+e),1===e?p="./"+(n-1):e!==n&&(p="../"+(n-1)),(0,l.tZ)(o.Fragment,null,a&&(0,l.tZ)(r.Link,{to:".."},(0,l.tZ)(i.Z,{id:"navigation.pagination.newest"})),s&&(0,l.tZ)(r.Link,{to:s},(0,l.tZ)(i.Z,{id:"navigation.pagination.newer"})),u&&(0,l.tZ)(r.Link,{to:u},(0,l.tZ)(i.Z,{id:"navigation.pagination.older"})),p&&(0,l.tZ)(r.Link,{to:p},(0,l.tZ)(i.Z,{id:"navigation.pagination.oldest"})))}var u=n(862),p=n(6941);var c={name:"bhil8a",styles:"display:flex;list-style:none;padding:0;li{margin-left:1rem;white-space:nowrap;}"};function g(t){var e=t.locale,n=t.tags;return e?(0,l.tZ)("ul",{css:c},null==n?void 0:n.map((function(t){return(0,l.tZ)("li",null,(0,l.tZ)(u.LocalizedLink,{to:p.r.PATHS.TAG+"/"+t.slug},t.title))}))):null}var d=n(1229);function m(t){var e=t.data,n=t.pageContext;return(0,l.tZ)(d.H,null,(0,l.tZ)("h1",null,(0,l.tZ)(i.Z,{id:"page.blog.title"})),e.posts.nodes.map((function(t){var e,n;if(null===(e=t.fields)||void 0===e||!e.path||null===(n=t.frontmatter)||void 0===n||!n.title||"string"!=typeof t.frontmatter.publishedAt)return null;var i=(0,l.tZ)(g,{locale:t.fields.locale,tags:t.fields.tags});return(0,l.tZ)(a.l,{excerpt:t.excerpt,path:t.fields.path,title:t.frontmatter.title,publishedAt:t.frontmatter.publishedAt,tagList:i})})),(0,l.tZ)(s,{currentPage:n.currentPage,pageCount:n.pageCount}))}}}]);
//# sourceMappingURL=component---src-templates-blog-listing-tsx-c19e3f332207eae910e1.js.map