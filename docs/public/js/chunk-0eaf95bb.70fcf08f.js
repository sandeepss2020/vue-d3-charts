(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0eaf95bb"],{"1dde":function(t,e,n){var a=n("d039"),r=n("b622"),o=n("60ae"),i=r("species");t.exports=function(t){return o>=51||!a((function(){var e=[],n=e.constructor={};return n[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"4de4":function(t,e,n){"use strict";var a=n("23e7"),r=n("b727").filter,o=n("1dde");a({target:"Array",proto:!0,forced:!o("filter")},{filter:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},"65f0":function(t,e,n){var a=n("861d"),r=n("e8b5"),o=n("b622"),i=o("species");t.exports=function(t,e){var n;return r(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!r(n.prototype)?a(n)&&(n=n[i],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},8418:function(t,e,n){"use strict";var a=n("c04e"),r=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var i=a(e);i in t?r.f(t,i,o(0,n)):t[i]=n}},"99af":function(t,e,n){"use strict";var a=n("23e7"),r=n("d039"),o=n("e8b5"),i=n("861d"),s=n("7b0b"),c=n("50c4"),l=n("8418"),u=n("65f0"),d=n("1dde"),f=n("b622"),m=n("60ae"),p=f("isConcatSpreadable"),h=9007199254740991,v="Maximum allowed index exceeded",_=m>=51||!r((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),g=d("concat"),b=function(t){if(!i(t))return!1;var e=t[p];return void 0!==e?!!e:o(t)},y=!_||!g;a({target:"Array",proto:!0,forced:y},{concat:function(t){var e,n,a,r,o,i=s(this),d=u(i,0),f=0;for(e=-1,a=arguments.length;e<a;e++)if(o=-1===e?i:arguments[e],b(o)){if(r=c(o.length),f+r>h)throw TypeError(v);for(n=0;n<r;n++,f++)n in o&&l(d,f,o[n])}else{if(f>=h)throw TypeError(v);l(d,f++,o)}return d.length=f,d}})},b0c0:function(t,e,n){var a=n("83ab"),r=n("9bf2").f,o=Function.prototype,i=o.toString,s=/^\s*function ([^ (]*)/,c="name";!a||c in o||r(o,c,{configurable:!0,get:function(){try{return i.call(this).match(s)[1]}catch(t){return""}}})},b727:function(t,e,n){var a=n("f8c2"),r=n("44ad"),o=n("7b0b"),i=n("50c4"),s=n("65f0"),c=[].push,l=function(t){var e=1==t,n=2==t,l=3==t,u=4==t,d=6==t,f=5==t||d;return function(m,p,h,v){for(var _,g,b=o(m),y=r(b),x=a(p,h,3),C=i(y.length),S=0,k=v||s,w=e?k(m,C):n?k(m,0):void 0;C>S;S++)if((f||S in y)&&(_=y[S],g=x(_,S,b),t))if(e)w[S]=g;else if(g)switch(t){case 3:return!0;case 5:return _;case 6:return S;case 2:c.call(w,_)}else if(u)return!1;return d?-1:l||u?u:w}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},c8e0:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[t._m(0),n("section",{staticClass:"chart"},[n("D3SlopeChart",{attrs:{config:t.chartconfig,datum:t.chartdata,title:"Lorem ipsum",source:"Dolor sit amet"}})],1),t._m(1),n("section",{staticClass:"code"},[n("h3",[t._v("Template")]),n("pre",[n("code",[t._v(t._s(t.chartcode))])])]),t._m(2),t._m(3),t._m(4),n("section",{staticClass:"chart code"},[n("h3",[t._v("Examples")]),n("h4",[t._v(t._s(t.example1.title))]),n("D3SlopeChart",{attrs:{config:t.example1.config,datum:t.example1.data}}),t._m(5),n("h4",[t._v(t._s(t.example2.title))]),n("D3SlopeChart",{attrs:{config:t.example2.config,datum:t.example2.data}}),t._m(6),n("h4",[t._v(t._s(t.example3.title))]),n("D3SlopeChart",{attrs:{config:t.example3.config,datum:t.example3.data}}),t._m(7)],1)])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"text"},[n("h2",{staticClass:"page__title"},[t._v("D3SlopeChart")]),n("p",{staticClass:"page__claim"},[t._v("A "),n("a",{attrs:{href:"https://datavizproject.com/data-type/slope-chart/",target:"_blank"}},[t._v("slope chart")]),t._v(" displays information as a series of lines between two points.")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"code"},[n("h3",[t._v("Import")]),n("pre",[n("code",[t._v("import {D3SlopeChart} from 'vue-d3-charts'")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"code"},[n("h3",[t._v("Data format")]),n("p",[t._v("An "),n("strong",[t._v("objects array")]),t._v(" is expected, with each object as a line. Fields can be changed in configuration. Example:")]),n("pre",[n("code",[t._v('chart_data = [{\n  pib: 5355,\n  bip: 5855,\n  name: "Lorem"\n},{\n  pib: 6160,\n  bip: 6510,\n  name: "Ipsum"\n},{\n  pib: 3029,\n  bip: 5138,\n  name: "Dolor"\n}]')])]),n("p",{staticClass:"note"},[t._v("To work with this data, configuration must be "),n("code",[t._v('key = "name"')]),t._v(" and "),n("code",[t._v('values = ["pib","bip"]')])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"code"},[n("h3",[t._v("Configuration")]),n("p",[t._v("Default options:")]),n("pre",[n("code",[t._v("chart_config = {\n  margin: {top: 10, right: 100, bottom: 20, left: 100},\n  key: '',\n  currentKey: '',\n  values: ['start', 'end'],\n  color: '#1f77b4',\n  defaultColor: '#AAA',\n  opacity: 0.5,\n  radius: 3,\n  axisLabels: false,\n  transition: {duration: 550}\n}")])]),n("ul",[n("li",[n("strong",[t._v("margin")]),t._v(": (object). Chart's margins based on "),n("a",{attrs:{href:"https://bl.ocks.org/mbostock/3019563"}},[t._v("d3 margins convention")]),t._v(".")]),n("li",[n("strong",[t._v("key")]),t._v(": (string). Field to name.")]),n("li",[n("strong",[t._v("currentKey")]),t._v(": (string). Key field value to highlight.")]),n("li",[n("strong",[t._v("values")]),t._v(": (string). Fields to compute each axis value.")]),n("li",[n("strong",[t._v("color")]),t._v(": (string). Color to use on highlighted line.")]),n("li",[n("strong",[t._v("defaultColor")]),t._v(": (string). Color to use on no highlighted lines.")]),n("li",[n("strong",[t._v("opacity")]),t._v(": (number). Default no highlighted lines opacity.")]),n("li",[n("strong",[t._v("radius")]),t._v(": (number). Visible points radius.")]),n("li",[n("strong",[t._v("axisLabels")]),t._v(": (strings array). Each axis label text.")]),n("li",[n("strong",[t._v("transition")]),t._v(": (object). Transition options.")])]),n("p",{staticClass:"note"},[t._v("Chart's width is automatically calculed based on component's available space.")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"code"},[n("h3",[t._v("Styles")]),n("p",[t._v("Default styles can be easily overrided with BEM modifiers notation:")]),n("pre",[n("code",[t._v(".chart{\n  &--slopechart {\n    font-size: 10px;\n    .chart__line {\n      stroke-width: 4px;\n    }\n  }\n  &__point--slopechart {\n    stroke: #000;\n    stroke-width: 1px;\n  }\n}")])]),n("p",{staticClass:"note"},[t._v("Note that SVG elements use some special properties in CSS. "),n("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_and_CSS"}},[t._v("More info")]),t._v(".")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",[t._v("config = {\n  key: 'name',\n  defaultColor: '#41B882'\n}")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",[t._v("config = {\n  key: 'name',\n  currentKey: 'Lorem'\n  color: '#41B882'\n}")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",[t._v("config = {\n  key: 'name',\n  axisLabels: ['Start', 'End']\n}")])])}],o=(n("99af"),n("4de4"),n("b0c0"),n("2dd5"),{name:"SlopeChart",data:function(){return{chartcode:'<D3SlopeChart :config="chart_config" :datum="chart_data"></D3SlopeChart>',chartconfig:{key:"name",currentKey:"Lorem",color:["#41B882"],axisLabels:["2000","2015"],transition:{ease:"easeBounceOut",duration:1e3}},chartdata:[{start:5355,end:5855,name:"Lorem"},{start:6160,end:6510,name:"Ipsum"},{start:3029,end:5138,name:"Dolor"},{start:2116,end:2904,name:"Sit"},{start:3503,end:4408,name:"Amet"}],example1:{title:"Basic chart",config:{key:"name",defaultColor:"#41B882"},data:[{start:2355,end:5855,name:"Lorem"},{start:4260,end:6510,name:"Ipsum"},{start:5029,end:5138,name:"Dolor"}]},example2:{title:"Highlighted value",config:{key:"name",color:"#41B882",currentKey:"Lorem"},data:[{start:2355,end:5855,name:"Lorem"},{start:4260,end:6510,name:"Ipsum"},{start:5029,end:5138,name:"Dolor"}]},example3:{title:"Axis labels",config:{key:"name",axisLabels:["Start","End"]},data:[{start:2355,end:5855,name:"Lorem"},{start:4260,end:6510,name:"Ipsum"},{start:5029,end:5138,name:"Dolor"}]}}},mounted:function(){var t=this;setTimeout((function(){t.chartdata=t.chartdata.filter((function(t){return"Lorem"!=t.name})),t.chartdata.push({start:5085,end:9321,name:"Lorem"})}),2e3),setTimeout((function(){t.chartdata=t.chartdata.filter((function(t){return"Sit"!=t.name}))}),4e3),setTimeout((function(){t.chartdata=t.chartdata.concat([{start:7500,end:9960,name:"Aperiam"}])}),6e3)}}),i=o,s=n("2877"),c=Object(s["a"])(i,a,r,!1,null,null,null);e["default"]=c.exports},e8b5:function(t,e,n){var a=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==a(t)}}}]);
//# sourceMappingURL=chunk-0eaf95bb.70fcf08f.js.map