!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("antd/es/layout"),require("react"),require("react-dnd"),require("react-dnd-html5-backend"),require("antd/es/modal"),require("antd/es/button"),require("mobx-react"),require("antd/es/divider"),require("antd/es/empty"),require("antd/es/input-number"),require("antd/es/checkbox"),require("antd/es/select"),require("antd/es/input"),require("antd/es/radio"),require("antd/es/message"),require("mobx"),require("shortid"),require("immutability-helper"),require("classnames"),require("antd/es/row"),require("antd/es/col"),require("antd/es/tabs"),require("antd/es/list")):"function"==typeof define&&define.amd?define(["exports","antd/es/layout","react","react-dnd","react-dnd-html5-backend","antd/es/modal","antd/es/button","mobx-react","antd/es/divider","antd/es/empty","antd/es/input-number","antd/es/checkbox","antd/es/select","antd/es/input","antd/es/radio","antd/es/message","mobx","shortid","immutability-helper","classnames","antd/es/row","antd/es/col","antd/es/tabs","antd/es/list"],t):t((e=e||self).ReactFormEditor={},e._Layout,e.React,e.ReactDnD,e.ReactDnDHTML5Backend,e._Modal,e._Button,e.mobxReact,e._Divider,e._Empty,e._InputNumber,e._Checkbox,e._Select,e._Input,e._Radio,e._message,e.mobx,e.shortid,e.update,e.classnames,e._Row,e._Col,e._Tabs,e._List)}(this,(function(e,t,n,a,r,l,i,u,o,c,s,m,d,f,p,v,E,b,h,y,g,O,T,N){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var C,x,A,w,I="default"in n?n.default:n;function k(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function S(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function R(e,t,n){return t&&S(e.prototype,t),n&&S(e,n),e}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){D(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function U(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}function W(e){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function B(e,t){return(B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function q(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function X(e){return function(){var t,n=W(e);if(L()){var a=W(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return q(this,t)}}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],a=!0,r=!1,l=void 0;try{for(var i,u=e[Symbol.iterator]();!(a=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(e){r=!0,l=e}finally{try{a||null==u.return||u.return()}finally{if(r)throw l}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return H(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function V(e,t,n,a){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(a):void 0})}function _(e,t,n,a,r){var l={};return Object.keys(a).forEach((function(e){l[e]=a[e]})),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=n.slice().reverse().reduce((function(n,a){return a(e,t,n)||n}),l),r&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(r):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(e,t,l),l=null),l}r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r,l=l&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l,i=i&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i,o=o&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o,c=c&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c,s=s&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s,m=m&&Object.prototype.hasOwnProperty.call(m,"default")?m.default:m,d=d&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d,f=f&&Object.prototype.hasOwnProperty.call(f,"default")?f.default:f,p=p&&Object.prototype.hasOwnProperty.call(p,"default")?p.default:p,v=v&&Object.prototype.hasOwnProperty.call(v,"default")?v.default:v,h=h&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h,y=y&&Object.prototype.hasOwnProperty.call(y,"default")?y.default:y,g=g&&Object.prototype.hasOwnProperty.call(g,"default")?g.default:g,O=O&&Object.prototype.hasOwnProperty.call(O,"default")?O.default:O,T=T&&Object.prototype.hasOwnProperty.call(T,"default")?T.default:T,N=N&&Object.prototype.hasOwnProperty.call(N,"default")?N.default:N,function(e){e.TEXT="text",e.INPUT="input",e.NUMBER="number",e.TEXTAREA="textarea",e.CHECKBOX="checkbox",e.RADIO="radio",e.SELECT="select",e.LAYOUT="layout",e.RESULT="result"}(w||(w={}));var F=function(e){return{value:e,text:e}};var K=new(x=_((C=function(){function e(){k(this,e),V(this,"items",x,this),V(this,"activeId",A,this)}return R(e,[{key:"setItems",value:function(e){this.items=e,this.activeId=""}},{key:"getItems",value:function(){return this.items.slice(0)}},{key:"add",value:function(e){if(e===w.RESULT&&this.items.filter((function(e){return e.itemType===w.RESULT})).length>0)v.error("检验结果字段只能有一个");else{var t=function(e){var t=b.generate();switch(e){case w.RESULT:return{id:t,itemType:e,labelText:"检验结果"};case w.TEXT:return{id:t,itemType:e,content:"文字内容",fontSize:14,lineHeight:21,textAlign:"left"};case w.LAYOUT:return{id:t,itemType:e,rows:[[{span:12},{span:12}]]};case w.SELECT:return{id:t,itemType:e,labelText:"下拉选择框",options:[F("选项 1"),F("选项 2"),F("选项 3")],defaultValue:"选项 1"};case w.RADIO:return{id:t,itemType:e,labelText:"单选框",options:[F("选项 1"),F("选项 2")],buttonStyle:"solid",defaultValue:"",required:!0};case w.CHECKBOX:return{id:t,itemType:e,labelText:"多选框",options:[F("选项 1")],defaultValue:[],required:!0};case w.TEXTAREA:return{id:t,itemType:e,labelText:"文本域",placeholder:"文本域输入提示",defaultValue:"",required:!0};case w.NUMBER:return{id:t,itemType:e,labelText:"数字框",defaultValue:1,min:1,max:100,unit:""};default:return{id:t,itemType:w.INPUT,labelText:"文本框",placeholder:"文本框输入提示",defaultValue:"",required:!0}}}(e);this.items.push(t)}}},{key:"delete",value:function(e){this.items=this.items.filter((function(t){return t.id!==e}))}},{key:"update",value:function(e){this.items=this.items.map((function(t){return t.id===e.id?e:t}))}},{key:"activate",value:function(e){this.items.filter((function(t){return t.id===e})).length>0&&(this.activeId=e)}},{key:"move",value:function(e,t){var n=this.items[e];this.items=h(this.items,{$splice:[[e,1],[t,0,n]]})}},{key:"addOption",value:function(e){this.items=this.items.map((function(t){if(t.id===e&&[w.CHECKBOX,w.RADIO,w.SELECT].indexOf(t.itemType)>-1){t.options.push(F(""))}return t}))}},{key:"deleteOption",value:function(e,t){this.items=this.items.map((function(n){return n.id===e&&[w.CHECKBOX,w.RADIO,w.SELECT].indexOf(n.itemType)>-1&&(n.options.length>1?(n.options.splice(t,1),w.SELECT===n.itemType&&(n.defaultValue=n.options[0].value),w.CHECKBOX===n.itemType&&(n.defaultValue=[]),w.RADIO===n.itemType&&(n.defaultValue="")):v.error("选项不得少于 1 个")),n}))}},{key:"updateOption",value:function(e,t,n){this.items=this.items.map((function(a){return a.id===e&&[w.CHECKBOX,w.RADIO,w.SELECT].indexOf(a.itemType)>-1&&a.options.splice(t,1,F(n)),a}))}},{key:"setCheckboxDefaultOption",value:function(e,t){this.items=this.items.map((function(n){return n.id===e&&w.CHECKBOX===n.itemType&&(n.defaultValue=t),n}))}},{key:"setRadioDefaultOption",value:function(e,t){this.items=this.items.map((function(n){return n.id===e&&w.RADIO===n.itemType&&(n.defaultValue=t),n}))}},{key:"setSelectDefaultOption",value:function(e,t){this.items=this.items.map((function(n){return n.id===e&&w.SELECT===n.itemType&&(n.defaultValue=t),n}))}},{key:"addCol",value:function(e,t){this.items=this.items.map((function(n){return n.id===e&&w.LAYOUT===n.itemType&&n.rows[t].push({span:12}),n}))}},{key:"updateColSpan",value:function(e,t,n,a){this.items=this.items.map((function(r){return r.id===e&&w.LAYOUT===r.itemType&&r.rows[t].splice(n,1,{span:a}),r}))}},{key:"deleteCol",value:function(e,t,n){this.items=this.items.map((function(a){return a.id===e&&w.LAYOUT===a.itemType&&a.rows[t].splice(n,1),a}))}},{key:"updateTextItem",value:function(e,t,n,a,r){this.items=this.items.map((function(l){return l.id===e&&w.TEXT===l.itemType&&(l.content=t,l.fontSize=n,l.lineHeight=a,l.textAlign=r),l}))}},{key:"setRequired",value:function(e,t){this.items=this.items.map((function(n){return n.id===e&&(n.required=t),n}))}},{key:"formItems",get:function(){var e=this;return this.items.map((function(t){return P({},t,{isActive:t.id===e.activeId})}))}},{key:"activeItem",get:function(){return function(e,t){for(var n=null,a=0,r=e.length;a<r;a++){var l=e[a];if(l.id===t){n=l;break}}return n||{}}(this.items,this.activeId)}}]),e}()).prototype,"items",[E.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),A=_(C.prototype,"activeId",[E.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),C),M=function(e){return{values:e.reduce((function(e,t){return[w.INPUT,w.TEXTAREA,w.RADIO,w.CHECKBOX,w.SELECT].indexOf(t.itemType)>-1?P({},e,D({},t.id,t.defaultValue)):e}),{}),result:-1,comment:""}};function G(e){var t=e.form,a=t.items,r=t.attrs,l=r.formWidth,u=r.formWidthUnit,v=r.labelAlign,E=r.labelWidth,b=r.labelWidthUnit,h=z(n.useState(M(a)),2),g=h[0],O=h[1],T=z(n.useState({result:!1,errors:{}}),2),N=T[0],C=T[1],x=z(n.useState(0),2),A=x[0],k=x[1];console.log(r);return 0===a.length?I.createElement(c,null):I.createElement("div",{className:"generated-form",style:{width:"".concat(l).concat(u)}},a.map((function(e,t){var n=e.itemType;if(n===w.TEXT){var a=e;return I.createElement("div",{key:t,className:"form-item form-item-text",style:{fontSize:a.fontSize,lineHeight:"".concat(a.lineHeight,"px"),textAlign:a.textAlign}},I.createElement("div",{className:"form-item-label"},a.content))}if([w.INPUT,w.NUMBER,w.TEXTAREA,w.RADIO,w.CHECKBOX,w.SELECT,w.RESULT].indexOf(n)>-1){var r=N.errors[e.id];return I.createElement("div",{className:y("form-item","top"===v?"label-standalone":""),key:t},I.createElement("div",{className:"form-item-label",style:P({width:"".concat(E).concat(b)},"top"!==v?{textAlign:v}:{})},e.labelText),I.createElement("div",{className:"form-item-content"},function(e){switch(e.itemType){case w.RESULT:return I.createElement("div",null,I.createElement(p.Group,{style:{height:32,lineHeight:"32px",marginBottom:16},value:g.result,onChange:function(e){return O(P({},g,{result:e.target.value}))}},I.createElement(p,{value:1},"合格"),I.createElement(p,{value:0},"不合格"),I.createElement("span",{className:"err-msg"},A>0&&-1===g.result?"检验结果为必填项":"")),I.createElement(f.TextArea,{placeholder:"备注",value:g.comment,onChange:function(e){return O(P({},g,{comment:e.target.value}))}}));case w.SELECT:var t=e;return I.createElement(d,{value:g.values[t.id],onChange:function(e){var n=g.values;O(P({},g,{values:P({},n,D({},t.id,e))}))},style:{width:"100%"}},t.options.map((function(e,t){return I.createElement(d.Option,{key:t,value:e.value},e.text)})));case w.CHECKBOX:var n=e;return I.createElement(m.Group,{value:g.values[n.id],onChange:function(e){var t=g.values;O(P({},g,{values:P({},t,D({},n.id,e))}))}},n.options.map((function(e,t){return I.createElement(m,{key:t,value:e.value},e.text)})));case w.RADIO:var a=e;return I.createElement(p.Group,{value:g.values[a.id],onChange:function(e){var t=g.values;O(P({},g,{values:P({},t,D({},a.id,e.target.value))}))},buttonStyle:a.buttonStyle},a.options.map((function(e,t){return I.createElement(p.Button,{key:t,value:e.value},e.text)})));case w.TEXTAREA:var r=e;return I.createElement(f.TextArea,{value:g.values[r.id],onChange:function(e){var t=g.values;O(P({},g,{values:P({},t,D({},r.id,e.target.value))}))},placeholder:r.placeholder});case w.NUMBER:var l=e;return I.createElement(s,{style:{width:"100%"},value:g.values[l.id],onChange:function(e){e=e||l.min;var t=g.values;O(P({},g,{values:P({},t,D({},l.id,e))}))},min:l.min,max:l.max,formatter:function(e){return e?"".concat(e," ").concat(l.unit):"".concat(l.min," ").concat(l.unit)},parser:function(e){return Number(e?e.replace(" ".concat(l.unit),""):l.min)}});default:var i=e;return I.createElement(f,{value:g.values[i.id],onChange:function(e){var t=g.values;O(P({},g,{values:P({},t,D({},i.id,e.target.value))}))},placeholder:i.placeholder})}}(e),I.createElement("div",{className:"err-msg"},r)))}return null})),I.createElement(o,null),I.createElement("div",{style:{paddingLeft:"top"!==v?E:0}},I.createElement(i,{type:"primary",onClick:function(){console.log("form items =>",a),console.log("form values =>",g);var t=function(e,t){var n=t.values;return e.reduce((function(e,a){var r=e.result,l=e.errors;if(function(e){return[w.INPUT,w.TEXTAREA,w.CHECKBOX,w.RADIO].indexOf(e.itemType)>-1}(a)&&a.required){var i=a,u=i.id,o=i.labelText,c=n[u];("string"==typeof c&&""===c||"[object Array]"===Object.prototype.toString.call(c)&&0===c.length)&&(l[u]="".concat(o,"为必填项"),r=!1)}return a.itemType===w.RESULT&&t.result,{result:r,errors:l}}),{result:!1,errors:{}})}(a,g);console.log(t),t.result?(e.onSubmit&&e.onSubmit(g),C({result:!1,errors:{}}),O(M(a))):C(t),k(A+1)},style:{width:90,marginRight:16}},"提 交"),I.createElement(i,{type:"default",onClick:function(){return O(M(a))},style:{width:90}},"重 置")))}var Y=u.observer((function(e){var t=e.form,a=e.formAttrs,r=e.onSave,u=z(n.useState(!1),2),o=u[0],c=u[1],s=function(){return JSON.stringify({items:t.getItems(),attrs:a})};return I.createElement("div",{className:"form-editor-toolbar-content"},I.createElement(i,{type:"link",icon:"eye",onClick:function(){c(!0)}},"预览"),I.createElement(i,{type:"link",icon:"save",onClick:function(){return r(s())}},"保存"),I.createElement(l,{title:"表单预览",centered:!0,visible:o,onCancel:function(){return c(!1)},footer:null,width:800},o?I.createElement(G,{form:JSON.parse(s())}):null))})),J="field",$="eidtable_field";var Q,Z=u.observer((function(e){var t=e.name,n=e.text,r=z(a.useDrag({item:{name:t,type:J},collect:function(e){return{isDragging:e.isDragging()}}}),2),l=r[0].isDragging,i=r[1];return I.createElement("div",{ref:i,className:"field",style:{opacity:l?.4:1}},n)})),ee=[{name:"input",text:"文本框"},{name:"number",text:"数字框"},{name:"textarea",text:"文本域"},{name:"radio",text:"单选框"},{name:"checkbox",text:"多选框"},{name:"select",text:"下拉选择框"},{name:"text",text:"文字"}],te=[{name:"result",text:"检验结果"}];function ne(){var e=function(e,t){return I.createElement("div",null,I.createElement("div",{className:"label"},e),t.map((function(e,t,n){if(t%2==0){var a=n.slice(t,t+2);return I.createElement(g,{gutter:10,key:t},a.map((function(e,n){return I.createElement(O,{span:12,key:"".concat(t,"-").concat(n)},I.createElement(Z,{name:e.name,text:e.text}))})))}return null})))};return I.createElement(I.Fragment,null,e("通用字段",ee),e("自定义字段",te))}var ae,re,le,ie,ue,oe,ce=u.observer(Q=function(e){U(n,e);var t=X(n);function n(){return k(this,n),t.apply(this,arguments)}return R(n,[{key:"render",value:function(){var e=this.props.formAttrs;return I.createElement("div",{className:"attrs"},I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"表单宽度"),I.createElement(s,{className:"input",value:e.formWidth,min:0,step:1,onChange:function(t){void 0!==t&&(e.formWidth=t)}})),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"表单宽度单位"),I.createElement(p.Group,{className:"input",value:e.formWidthUnit,buttonStyle:"solid",onChange:function(t){e.formWidthUnit=t.target.value}},I.createElement(p.Button,{value:"%"},"百分比 %"),I.createElement(p.Button,{value:"px"},"像素 px "))),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"标签宽度"),I.createElement(s,{className:"input",value:e.labelWidth,min:0,step:1,onChange:function(t){void 0!==t&&(e.labelWidth=t)}})),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"标签宽度单位"),I.createElement(p.Group,{className:"input",value:e.labelWidthUnit,buttonStyle:"solid",onChange:function(t){e.labelWidthUnit=t.target.value}},I.createElement(p.Button,{value:"%"},"百分比 %"),I.createElement(p.Button,{value:"px"},"像素 px "))),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"标签对齐方式"),I.createElement(p.Group,{className:"input",value:e.labelAlign,buttonStyle:"solid",onChange:function(t){e.labelAlign=t.target.value}},I.createElement(p.Button,{value:"left"},"左对齐"),I.createElement(p.Button,{value:"right"},"右对齐"),I.createElement(p.Button,{value:"top"},"顶部对齐"))))}}]),n}(I.Component))||Q,se=new(re=_((ae=function(){function e(){k(this,e),V(this,"formWidth",re,this),V(this,"formWidthUnit",le,this),V(this,"labelAlign",ie,this),V(this,"labelWidth",ue,this),V(this,"labelWidthUnit",oe,this)}return R(e,[{key:"reset",value:function(e){this.formWidth=e.formWidth||100,this.labelAlign=e.labelAlign||"left",this.labelWidth=e.labelWidth||100,this.labelWidthUnit=e.labelWidthUnit||"px"}},{key:"formWidthString",get:function(){return"".concat(this.formWidth).concat(this.formWidthUnit)}},{key:"labelWidthString",get:function(){return"".concat(this.labelWidth).concat(this.labelWidthUnit)}}]),e}()).prototype,"formWidth",[E.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 100}}),le=_(ae.prototype,"formWidthUnit",[E.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"%"}}),ie=_(ae.prototype,"labelAlign",[E.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"left"}}),ue=_(ae.prototype,"labelWidth",[E.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 100}}),oe=_(ae.prototype,"labelWidthUnit",[E.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"px"}}),_(ae.prototype,"formWidthString",[E.computed],Object.getOwnPropertyDescriptor(ae.prototype,"formWidthString"),ae.prototype),_(ae.prototype,"labelWidthString",[E.computed],Object.getOwnPropertyDescriptor(ae.prototype,"labelWidthString"),ae.prototype),ae);var me=u.observer((function(e){var t=e.form,n=t.activeItem,a=n.id,r=n.itemType,l=t.activeItem.labelText;function u(e){t.update(e)}var o,c=function(e){return I.createElement(I.Fragment,null,I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"输入提示"),I.createElement(f,{className:"input",value:e.placeholder,onChange:function(t){return u(P({},e,{placeholder:t.target.value}))}})),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"默认值"),I.createElement(f,{className:"input",value:e.defaultValue,onChange:function(t){return u(P({},e,{defaultValue:t.target.value}))}})))},m=function(e){var n=e.options;return I.createElement(I.Fragment,null,I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"选项"),I.createElement(N,{size:"small",itemLayout:"horizontal",dataSource:n,renderItem:function(n,a){return I.createElement(N.Item,{key:a},I.createElement("div",{className:"attr-item-option"},I.createElement(f,{value:n.value,onChange:function(n){t.updateOption(e.id,a,n.target.value)}}),I.createElement(i,{type:"danger",icon:"delete",className:"btn-delete-option",onClick:function(){return t.deleteOption(e.id,a)}},"删除")))}}),I.createElement(i,{type:"primary",onClick:function(){return t.addOption(e.id)},icon:"plus"},"添加选项")))},v=[w.INPUT,w.NUMBER,w.TEXTAREA,w.CHECKBOX,w.RADIO,w.SELECT].indexOf(r)>-1,E=[w.INPUT,w.TEXTAREA,w.CHECKBOX,w.RADIO].indexOf(r)>-1;return I.createElement("div",{className:"attrs"},I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"标识"),I.createElement(f,{className:"input",value:a,disabled:!0})),v?I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"标签文字"),I.createElement(f,{className:"input",value:l,onChange:function(e){return u(P({},t.activeItem,{},{labelText:e.target.value}))}})):null,r===w.INPUT?c(t.activeItem):null,r===w.NUMBER?(o=t.activeItem,I.createElement(I.Fragment,null,I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"最小值"),I.createElement(s,{className:"input",value:o.min,onChange:function(e){return u(P({},o,{min:Number(e)}))}})),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"最大值"),I.createElement(s,{className:"input",value:o.max,onChange:function(e){return u(P({},o,{max:Number(e)}))}})),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"默认值"),I.createElement(s,{className:"input",value:o.defaultValue,min:o.min,max:o.max,onChange:function(e){return u(P({},o,{defaultValue:Number(e)}))}})),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"单位"),I.createElement(f,{className:"input",value:o.unit,onChange:function(e){return u(P({},o,{unit:e.target.value}))}})))):null,r===w.TEXTAREA?c(t.activeItem):null,r===w.CHECKBOX?m(t.activeItem):null,r===w.CHECKBOX?function(e){return I.createElement(I.Fragment,null,I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"默认值"),I.createElement(d,{mode:"tags",value:e.defaultValue,style:{width:"100%"},onChange:function(n){return t.setCheckboxDefaultOption(e.id,n)}},e.options.map((function(e,t){return I.createElement(d.Option,{key:t,value:e.value},e.value)})))))}(t.activeItem):null,r===w.RADIO?m(t.activeItem):null,r===w.RADIO?function(e){return I.createElement(I.Fragment,null,I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"默认值"),I.createElement(d,{value:e.defaultValue,style:{width:"100%"},onChange:function(n){return t.setRadioDefaultOption(e.id,n)}},e.options.map((function(e,t){return I.createElement(d.Option,{key:t,value:e.value},e.value)})))))}(t.activeItem):null,r===w.SELECT?m(t.activeItem):null,r===w.SELECT?function(e){return I.createElement(I.Fragment,null,I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"默认值"),I.createElement(d,{value:e.defaultValue,style:{width:"100%"},onChange:function(n){return t.setSelectDefaultOption(e.id,n)}},e.options.map((function(e,t){return I.createElement(d.Option,{key:t,value:e.value},e.value)})))))}(t.activeItem):null,r===w.LAYOUT?function(e){var n=e.rows;return I.createElement(I.Fragment,null,n.map((function(n,a){return I.createElement("div",{className:"attr-item",key:a},I.createElement("div",{className:"label"},"列宽"),I.createElement(N,{size:"small",itemLayout:"horizontal",dataSource:n,renderItem:function(n,r){return I.createElement(N.Item,{key:r},I.createElement("div",{className:"attr-item-option"},I.createElement(s,{className:"input",value:n.span,min:1,max:24,step:1,onChange:function(n){t.updateColSpan(e.id,a,r,Number(n))}}),I.createElement(i,{type:"danger",icon:"delete",className:"btn-delete-option",onClick:function(){return t.deleteCol(e.id,a,r)}},"删除")))}}),I.createElement(i,{type:"primary",onClick:function(){return t.addCol(e.id,a)},icon:"plus"},"添加列"))})))}(t.activeItem):null,r===w.TEXT?function(e){var n=e.id,a=e.content,r=e.fontSize,l=e.lineHeight,i=e.textAlign;return I.createElement(I.Fragment,null,I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"文字内容"),I.createElement(f.TextArea,{value:a,onChange:function(e){return t.updateTextItem(n,e.target.value,r,l,i)}})),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"文字大小"),I.createElement(s,{className:"input",value:r,min:12,max:100,step:1,onChange:function(e){return t.updateTextItem(n,a,Number(e),l,i)}})),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"文字行高"),I.createElement(s,{className:"input",value:l,min:12,max:100,step:1,onChange:function(e){return t.updateTextItem(n,a,r,Number(e),i)}})),I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"对齐方式"),I.createElement(d,{style:{width:"100%"},value:i,onChange:function(e){return t.updateTextItem(n,a,r,l,e)}},I.createElement(d.Option,{value:"left"},"左对齐"),I.createElement(d.Option,{value:"right"},"右对齐"),I.createElement(d.Option,{value:"center"},"居中"))))}(t.activeItem):null,E?function(e){return I.createElement(I.Fragment,null,I.createElement("div",{className:"attr-item"},I.createElement("div",{className:"label"},"是否必填"),I.createElement(p.Group,{value:e.required,onChange:function(n){return t.setRequired(e.id,n.target.value)}},I.createElement(p,{value:!0},"必填"),I.createElement(p,{value:!1},"选填"))))}(t.activeItem):null)})),de=T.TabPane,fe=function(e){U(n,e);var t=X(n);function n(){var e;k(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).onChangeTab=function(e){},e}return R(n,[{key:"render",value:function(){return I.createElement(T,{onChange:this.onChangeTab,animated:!1},I.createElement(de,{tab:"字段属性",key:"field-attrs"},I.createElement(me,{form:K})),I.createElement(de,{tab:"表单属性",key:"form-attrs"},I.createElement(ce,{formAttrs:se})))}}]),n}(I.Component);var pe=u.observer((function(e){var t=e.formItem,r=e.formItemIndex,l=e.moveFormItem,u=n.useRef(null),o=z(a.useDrop({accept:[$],hover:function(e,t){if(null!==u.current){var n=e.index,a=r;if(n!==a){var i=u.current.getBoundingClientRect(),o=(i.bottom-i.top)/2,c=t.getClientOffset();if(null!==c){var s=c.y-i.top;n<a&&s<o||n>a&&s>o||(l(n,a),e.index=a)}}}}}),2)[1],c=z(a.useDrag({item:{index:r,type:$},collect:function(e){return{isDragging:e.isDragging()}}}),2),v=c[0].isDragging;return(0,c[1])(o(u)),t.itemType===w.LAYOUT?I.createElement("div",{ref:u,className:y("field-editable field-editable-layout",t.isActive?"field-editable-active":""),style:{opacity:v?.4:1},onMouseDown:function(){return K.activate(t.id)}},t.rows.map((function(e,t){return I.createElement(g,{key:t,gutter:5},e.map((function(e,t){return I.createElement(O,{key:t,span:e.span})})))})),I.createElement(i,{className:"btn-delete",type:"danger",size:"small",icon:"delete",onClick:function(){return K.delete(t.id)}},"删除")):t.itemType===w.TEXT?I.createElement("div",{ref:u,className:y("field-editable field-editable-text",t.isActive?"field-editable-active":""),style:{opacity:v?.4:1},onMouseDown:function(){return K.activate(t.id)}},I.createElement("div",{style:{fontSize:t.fontSize,lineHeight:"".concat(t.lineHeight,"px"),textAlign:t.textAlign}},t.content),I.createElement(i,{className:"btn-delete",type:"danger",size:"small",icon:"delete",onClick:function(){return K.delete(t.id)}},"删除")):I.createElement("div",{ref:u,className:y("field-editable","top"===se.labelAlign?"label-standalone":"",t.isActive?"field-editable-active":""),style:{opacity:v?.4:1},onMouseDown:function(){return K.activate(t.id)}},I.createElement("div",{className:y("field-editable-label","top"===se.labelAlign?"field-standalone":""),style:P({width:"".concat(se.labelWidth).concat(se.labelWidthUnit)},"top"!==se.labelAlign?{textAlign:se.labelAlign}:{})},t.labelText),I.createElement("div",{className:"field-editable-content"},function(e){switch(e.itemType){case w.RESULT:return I.createElement("div",null,I.createElement(p.Group,{value:"合格",style:{height:32,lineHeight:"32px",marginBottom:16}},I.createElement(p,{value:"合格"},"合格"),I.createElement(p,{value:"不合格"},"不合格")),I.createElement(f.TextArea,{value:"",placeholder:"备注"}));case w.SELECT:var t=e;return I.createElement(d,{value:t.defaultValue,style:{width:"100%"}},t.options.map((function(e,t){return I.createElement(d.Option,{key:t,value:e.value},e.text)})));case w.CHECKBOX:var n=e;return I.createElement(m.Group,{value:n.defaultValue},n.options.map((function(e,t){return I.createElement(m,{key:t,value:e.value},e.text)})));case w.RADIO:var a=e;return I.createElement(p.Group,{value:a.defaultValue,buttonStyle:a.buttonStyle},a.options.map((function(e,t){return I.createElement(p.Button,{key:t,value:e.value},e.text)})));case w.TEXTAREA:var r=e;return I.createElement(f.TextArea,{value:r.defaultValue,placeholder:r.placeholder});case w.NUMBER:var l=e;return I.createElement(s,{style:{width:"100%"},value:l.defaultValue,formatter:function(e){return e?"".concat(e," ").concat(l.unit):"".concat(l.min," ").concat(l.unit)},parser:function(e){return Number(e?e.replace(" ".concat(l.unit),""):l.min)}});default:var i=e;return I.createElement(f,{value:i.defaultValue||"",placeholder:i.placeholder})}}(t)),I.createElement(i,{className:"btn-delete",type:"danger",size:"small",icon:"delete",onClick:function(){return K.delete(t.id)}},"删除"))}));var ve=u.observer((function(e){var t=e.formAttrs,r=e.form,l=n.useCallback((function(e,t){return r.move(e,t)}),[r.formItems]),i=z(a.useDrop({accept:[J],drop:function(e,t){e.type===J&&r.add(e.name)},collect:function(e){return{isOver:e.isOver(),canDrop:e.canDrop()}}}),2),u=i[0],o=(u.isOver,u.canDrop,i[1]);return I.createElement("div",{ref:o,className:"editable-form",style:{width:t.formWidthString}},r.formItems.map((function(e,t){return I.createElement(pe,{key:e.id,formItem:e,formItemIndex:t,moveFormItem:l})})))})),Ee=t.Header,be=t.Content,he=t.Sider;e.GeneratedForm=G,e.default=function(e){var l=e.style,i=e.defaultFormItems,u=void 0===i?[]:i,o=e.defaultFormAttrs,c=e.onSave,s=void 0===c?console.log:c;return n.useEffect((function(){K.setItems(u),o&&se.reset(o)}),[]),I.createElement(a.DndProvider,{backend:r},I.createElement(t,{className:"form-editor",style:l},I.createElement(he,{theme:"light",className:"form-editor-components"},I.createElement(ne,null)),I.createElement(t,{className:"form-editor-content"},I.createElement(t,{className:"form-editor-content-main"},I.createElement(Ee,{className:"form-editor-toolbar"},I.createElement(Y,{formAttrs:se,form:K,onSave:s})),I.createElement(be,{className:"form-editor-editarea"},I.createElement(ve,{formAttrs:se,form:K}))),I.createElement(he,{theme:"light",width:300,className:"form-editor-content-attrs"},I.createElement(fe,null)))))},Object.defineProperty(e,"__esModule",{value:!0})}));
