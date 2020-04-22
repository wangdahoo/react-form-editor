parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"r2ni":[function(require,module,exports) {

},{}],"qvYA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e={FIELD:"field",EDITABLE_FIELD:"eidtable_field",EDITABLE_FORM:"editable_form"};exports.default=e;
},{}],"ufEK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("react")),r=require("react-dnd"),t=i(require("../ItemTypes")),a=require("mobx-react");function i(e){return e&&e.__esModule?e:{default:e}}function u(a){var i=a.name,u=a.text,n=(0,r.useDrag)({item:{name:i,type:t.default.FIELD},collect:function(e){return{isDragging:e.isDragging()}}}),s=n[0].isDragging,l=n[1];return e.default.createElement("div",{ref:l,className:"field",style:{opacity:s?.4:1}},u)}var n=(0,a.observer)(u);exports.default=n;
},{"../ItemTypes":"qvYA"}],"ScnN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("react")),t=require("antd"),a=n(require("./Field"));function n(e){return e&&e.__esModule?e:{default:e}}var r={basic:[{name:"input",text:"文本框"},{name:"textarea",text:"文本域"},{name:"checkbox",text:"多选框"},{name:"radio",text:"单选框"},{name:"select",text:"下拉选择框"},{name:"text",text:"文字"}],advanced:[{name:"layout",text:"布局"}]};function l(){return e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"label"},"基础字段"),r.basic.map(function(n,r,l){if(r%2==0){var u=l.slice(r,r+2);return e.default.createElement(t.Row,{gutter:10,key:r},u.map(function(n,l){return e.default.createElement(t.Col,{span:12,key:r+"-"+l},e.default.createElement(a.default,{name:n.name,text:n.text}))}))}return null}),e.default.createElement("div",{className:"label"},"高级字段"),r.advanced.map(function(n,r,l){if(r%2==0){var u=l.slice(r,r+2);return e.default.createElement(t.Row,{gutter:10,key:r},u.map(function(n,l){return e.default.createElement(t.Col,{span:12,key:r+"-"+l},e.default.createElement(a.default,{name:n.name,text:n.text}))}))}return null}))}var u=l;exports.default=u;
},{"./Field":"ufEK"}],"uMg5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=l(require("react")),t=require("antd"),a=require("mobx-react");function l(e){return e&&e.__esModule?e:{default:e}}var n=function(){var e=function(t,a){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])})(t,a)};return function(t,a){function l(){this.constructor=t}e(t,a),t.prototype=null===a?Object.create(a):(l.prototype=a.prototype,new l)}}(),r=function(e,t,a,l){var n,r=arguments.length,u=r<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,a):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(e,t,a,l);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(u=(r<3?n(u):r>3?n(t,a,u):n(t,a))||u);return r>3&&u&&Object.defineProperty(t,a,u),u},u=function(l){function u(){return null!==l&&l.apply(this,arguments)||this}return n(u,l),u.prototype.render=function(){var a=this.props.formAttrs;return e.default.createElement("div",{className:"attrs"},e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"表单宽度"),e.default.createElement(t.InputNumber,{className:"input",value:a.formWidth,min:0,step:1,onChange:function(e){void 0!==e&&(a.formWidth=e)}})),e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"表单宽度单位"),e.default.createElement(t.Radio.Group,{className:"input",value:a.formWidthUnit,buttonStyle:"solid",onChange:function(e){a.formWidthUnit=e.target.value}},e.default.createElement(t.Radio.Button,{value:"%"},"百分比 %"),e.default.createElement(t.Radio.Button,{value:"px"},"像素 px "))),e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"标签宽度"),e.default.createElement(t.InputNumber,{className:"input",value:a.labelWidth,min:0,step:1,onChange:function(e){void 0!==e&&(a.labelWidth=e)}})),e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"标签宽度单位"),e.default.createElement(t.Radio.Group,{className:"input",value:a.labelWidthUnit,buttonStyle:"solid",onChange:function(e){a.labelWidthUnit=e.target.value}},e.default.createElement(t.Radio.Button,{value:"%"},"百分比 %"),e.default.createElement(t.Radio.Button,{value:"px"},"像素 px "))),e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"标签对齐方式"),e.default.createElement(t.Radio.Group,{className:"input",value:a.labelAlign,buttonStyle:"solid",onChange:function(e){a.labelAlign=e.target.value}},e.default.createElement(t.Radio.Button,{value:"left"},"左对齐"),e.default.createElement(t.Radio.Button,{value:"right"},"右对齐"),e.default.createElement(t.Radio.Button,{value:"top"},"顶部对齐"))))},u=r([a.observer],u)}(e.default.Component),o=u;exports.default=o;
},{}],"gGDR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.FormAttrsStore=void 0;var t=require("mobx"),e=function(t,e,r,o){var i,l=arguments.length,n=l<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,r,o);else for(var p=t.length-1;p>=0;p--)(i=t[p])&&(n=(l<3?i(n):l>3?i(e,r,n):i(e,r))||n);return l>3&&n&&Object.defineProperty(e,r,n),n},r=function(){function r(){this.formWidth=100,this.formWidthUnit="%",this.labelAlign="right",this.labelWidth=100,this.labelWidthUnit="px"}return Object.defineProperty(r.prototype,"formWidthString",{get:function(){return""+this.formWidth+this.formWidthUnit},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"labelWidthString",{get:function(){return""+this.labelWidth+this.labelWidthUnit},enumerable:!0,configurable:!0}),e([t.observable],r.prototype,"formWidth",void 0),e([t.observable],r.prototype,"formWidthUnit",void 0),e([t.observable],r.prototype,"labelAlign",void 0),e([t.observable],r.prototype,"labelWidth",void 0),e([t.observable],r.prototype,"labelWidthUnit",void 0),e([t.computed],r.prototype,"formWidthString",null),e([t.computed],r.prototype,"labelWidthString",null),r}();exports.FormAttrsStore=r;var o=new r;exports.default=o;
},{}],"Sx9k":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.FormStore=exports.FormItemType=void 0;var t=require("mobx"),e=require("shortid"),i=n(require("immutability-helper"));function n(t){return t&&t.__esModule?t:{default:t}}var o,r=function(){return(r=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},s=function(t,e,i,n){var o,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,n);else for(var p=t.length-1;p>=0;p--)(o=t[p])&&(s=(r<3?o(s):r>3?o(e,i,s):o(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};exports.FormItemType=o,function(t){t.TEXT="text",t.INPUT="input",t.TEXTAREA="textarea",t.CHECKBOX="checkbox",t.RADIO="radio",t.SELECT="select",t.LAYOUT="layout"}(o||(exports.FormItemType=o={}));var p=function(t){var i=(0,e.generate)();switch(t){case o.TEXT:return{id:i,itemType:t,content:"文字内容",fontSize:14,lineHeight:21,textAlign:"left"};case o.LAYOUT:return{id:i,itemType:t,rows:[[{span:12},{span:12}]]};case o.SELECT:return{id:i,itemType:t,labelText:"下拉选择框",options:[u("选项 1"),u("选项 2"),u("选项 3")],defaultValue:"选项 1"};case o.RADIO:return{id:i,itemType:t,labelText:"单选框",options:[u("选项 1"),u("选项 2")],buttonStyle:"solid",defaultValue:""};case o.CHECKBOX:return{id:i,itemType:t,labelText:"多选框",options:[u("选项 1")],defaultValue:[]};case o.TEXTAREA:return{id:i,itemType:t,labelText:"文本域",placeholder:"文本域输入提示",defaultValue:""};default:return{id:i,itemType:o.INPUT,labelText:"文本框",placeholder:"文本框输入提示",defaultValue:""}}},u=function(t){return{value:t,text:t}},a=function(){function e(){this.items=[p(o.INPUT),p(o.TEXTAREA),p(o.CHECKBOX),p(o.RADIO),p(o.SELECT),p(o.LAYOUT),p(o.TEXT)],this.activeId=""}return e.prototype.add=function(t){var e=p(t);this.items.push(e)},e.prototype.delete=function(t){this.items=this.items.filter(function(e){return e.id!==t})},e.prototype.update=function(t){this.items=this.items.map(function(e){return e.id===t.id?t:e})},e.prototype.activate=function(t){this.items.filter(function(e){return e.id===t}).length>0&&(this.activeId=t)},e.prototype.move=function(t,e){var n=this.items[t];this.items=(0,i.default)(this.items,{$splice:[[t,1],[e,0,n]]})},e.prototype.addOption=function(t){this.items=this.items.map(function(e){if(e.id===t&&[o.CHECKBOX,o.RADIO,o.SELECT].indexOf(e.itemType)>-1){e.options.push(u(""))}return e})},e.prototype.deleteOption=function(t,e){this.items=this.items.map(function(i){return i.id===t&&[o.CHECKBOX,o.RADIO,o.SELECT].indexOf(i.itemType)>-1&&i.options.splice(e,1),i})},e.prototype.updateOption=function(t,e,i){this.items=this.items.map(function(n){return n.id===t&&[o.CHECKBOX,o.RADIO,o.SELECT].indexOf(n.itemType)>-1&&n.options.splice(e,1,u(i)),n})},e.prototype.setCheckboxDefaultOption=function(t,e){this.items=this.items.map(function(i){return i.id===t&&o.CHECKBOX===i.itemType&&(i.defaultValue=e),i})},e.prototype.setRadioDefaultOption=function(t,e){this.items=this.items.map(function(i){return i.id===t&&o.RADIO===i.itemType&&(i.defaultValue=e),i})},e.prototype.setSelectDefaultOption=function(t,e){this.items=this.items.map(function(i){return i.id===t&&o.SELECT===i.itemType&&(i.defaultValue=e),i})},e.prototype.addCol=function(t,e){this.items=this.items.map(function(i){return i.id===t&&o.LAYOUT===i.itemType&&i.rows[e].push({span:12}),i})},e.prototype.updateColSpan=function(t,e,i,n){this.items=this.items.map(function(r){return r.id===t&&o.LAYOUT===r.itemType&&r.rows[e].splice(i,1,{span:n}),r})},e.prototype.deleteCol=function(t,e,i){this.items=this.items.map(function(n){return n.id===t&&o.LAYOUT===n.itemType&&n.rows[e].splice(i,1),n})},e.prototype.updateTextItem=function(t,e,i,n,r){this.items=this.items.map(function(s){return s.id===t&&o.TEXT===s.itemType&&(s.content=e,s.fontSize=i,s.lineHeight=n,s.textAlign=r),s})},Object.defineProperty(e.prototype,"formItems",{get:function(){var t=this;return this.items.map(function(e){return r(r({},e),{isActive:e.id===t.activeId})})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"activeItem",{get:function(){return c(this.items,this.activeId)},enumerable:!0,configurable:!0}),s([t.observable],e.prototype,"items",void 0),s([t.observable],e.prototype,"activeId",void 0),e}();function c(t,e){for(var i=null,n=0,o=t.length;n<o;n++){var r=t[n];if(r.id===e){i=r;break}}return i||{}}exports.FormStore=a;var l=new a;exports.default=l;
},{}],"pJHI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("react")),t=require("antd"),a=require("mobx-react"),l=require("../stores/FormStore");function n(e){return e&&e.__esModule?e:{default:e}}var u=function(){return(u=Object.assign||function(e){for(var t,a=1,l=arguments.length;a<l;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};function r(a){var n=a.form,r=n.activeItem,m=r.id,c=r.itemType,i=n.activeItem.labelText;function d(e){n.update(e)}var o,f=function(a){return e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"输入提示"),e.default.createElement(t.Input,{className:"input",value:a.placeholder,onChange:function(e){return d(u(u({},a),{placeholder:e.target.value}))}})),e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"默认值"),e.default.createElement(t.Input,{className:"input",value:a.defaultValue,onChange:function(e){return d(u(u({},a),{defaultValue:e.target.value}))}})))},s=function(a){var l=a.options;return e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"选项"),e.default.createElement(t.List,{size:"small",itemLayout:"horizontal",dataSource:l,renderItem:function(l,u){return e.default.createElement(t.List.Item,{key:u},e.default.createElement("div",{className:"attr-item-option"},e.default.createElement(t.Input,{value:l.value,onChange:function(e){n.updateOption(a.id,u,e.target.value)}}),e.default.createElement(t.Button,{type:"danger",icon:"delete",className:"btn-delete-option",onClick:function(){return n.deleteOption(a.id,u)}},"删除")))}}),e.default.createElement(t.Button,{type:"primary",onClick:function(){return n.addOption(a.id)},icon:"plus"},"添加选项")))},p=[l.FormItemType.INPUT,l.FormItemType.TEXTAREA,l.FormItemType.CHECKBOX,l.FormItemType.RADIO,l.FormItemType.SELECT].indexOf(c)>-1;return e.default.createElement("div",{className:"attrs"},e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"标识"),e.default.createElement(t.Input,{className:"input",value:m,disabled:!0})),p?e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"标签文字"),e.default.createElement(t.Input,{className:"input",value:i,onChange:function(e){return d(u(u({},n.activeItem),{}))}})):null,c===l.FormItemType.INPUT?f(n.activeItem):null,c===l.FormItemType.TEXTAREA?f(n.activeItem):null,c===l.FormItemType.CHECKBOX?s(n.activeItem):null,c===l.FormItemType.CHECKBOX?(o=n.activeItem,e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"默认值"),e.default.createElement(t.Select,{mode:"tags",value:o.defaultValue,style:{width:"100%"},onChange:function(e){return n.setCheckboxDefaultOption(o.id,e)}},o.options.map(function(a,l){return e.default.createElement(t.Select.Option,{key:l,value:a.value},a.value)}))))):null,c===l.FormItemType.RADIO?s(n.activeItem):null,c===l.FormItemType.RADIO?function(a){return e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"默认值"),e.default.createElement(t.Select,{value:a.defaultValue,style:{width:"100%"},onChange:function(e){return n.setRadioDefaultOption(a.id,e)}},a.options.map(function(a,l){return e.default.createElement(t.Select.Option,{key:l,value:a.value},a.value)}))))}(n.activeItem):null,c===l.FormItemType.SELECT?s(n.activeItem):null,c===l.FormItemType.SELECT?function(a){return e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"默认值"),e.default.createElement(t.Select,{value:a.defaultValue,style:{width:"100%"},onChange:function(e){return n.setSelectDefaultOption(a.id,e)}},a.options.map(function(a,l){return e.default.createElement(t.Select.Option,{key:l,value:a.value},a.value)}))))}(n.activeItem):null,c===l.FormItemType.LAYOUT?function(a){var l=a.rows;return e.default.createElement(e.default.Fragment,null,l.map(function(l,u){return e.default.createElement("div",{className:"attr-item",key:u},e.default.createElement("div",{className:"label"},"列宽"),e.default.createElement(t.List,{size:"small",itemLayout:"horizontal",dataSource:l,renderItem:function(l,r){return e.default.createElement(t.List.Item,{key:r},e.default.createElement("div",{className:"attr-item-option"},e.default.createElement(t.InputNumber,{className:"input",value:l.span,min:1,max:24,step:1,onChange:function(e){n.updateColSpan(a.id,u,r,Number(e))}}),e.default.createElement(t.Button,{type:"danger",icon:"delete",className:"btn-delete-option",onClick:function(){return n.deleteCol(a.id,u,r)}},"删除")))}}),e.default.createElement(t.Button,{type:"primary",onClick:function(){return n.addCol(a.id,u)},icon:"plus"},"添加列"))}))}(n.activeItem):null,c===l.FormItemType.TEXT?function(a){var l=a.id,u=a.content,r=a.fontSize,m=a.lineHeight,c=a.textAlign;return e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"文字内容"),e.default.createElement(t.Input.TextArea,{value:u,onChange:function(e){return n.updateTextItem(l,e.target.value,r,m,c)}})),e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"文字大小"),e.default.createElement(t.InputNumber,{className:"input",value:r,min:12,max:100,step:1,onChange:function(e){return n.updateTextItem(l,u,Number(e),m,c)}})),e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"文字行高"),e.default.createElement(t.InputNumber,{className:"input",value:m,min:12,max:100,step:1,onChange:function(e){return n.updateTextItem(l,u,r,Number(e),c)}})),e.default.createElement("div",{className:"attr-item"},e.default.createElement("div",{className:"label"},"对齐方式"),e.default.createElement(t.Select,{style:{width:"100%"},value:c,onChange:function(e){return n.updateTextItem(l,u,r,m,e)}},e.default.createElement(t.Select.Option,{value:"left"},"左对齐"),e.default.createElement(t.Select.Option,{value:"right"},"右对齐"),e.default.createElement(t.Select.Option,{value:"center"},"居中"))))}(n.activeItem):null)}var m=(0,a.observer)(r);exports.default=m;
},{"../stores/FormStore":"Sx9k"}],"WuM7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=u(require("react")),t=require("antd"),r=u(require("./FormAttrs")),n=u(require("../stores/FormAttrsStore")),o=u(require("./FieldAttrs")),a=u(require("../stores/FormStore"));function u(e){return e&&e.__esModule?e:{default:e}}var f=function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),i=t.Tabs.TabPane,l=function(u){function l(){var e=null!==u&&u.apply(this,arguments)||this;return e.onChangeTab=function(e){},e}return f(l,u),l.prototype.render=function(){return e.default.createElement(t.Tabs,{onChange:this.onChangeTab,animated:!1},e.default.createElement(i,{tab:"字段属性",key:"field-attrs"},e.default.createElement(o.default,{form:a.default})),e.default.createElement(i,{tab:"表单属性",key:"form-attrs"},e.default.createElement(r.default,{formAttrs:n.default})))},l}(e.default.Component),s=l;exports.default=s;
},{"./FormAttrs":"uMg5","../stores/FormAttrsStore":"gGDR","./FieldAttrs":"pJHI","../stores/FormStore":"Sx9k"}],"mVW4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=c(require("react")),t=require("react-dnd"),l=o(require("../ItemTypes")),a=require("antd"),r=o(require("../stores/FormAttrsStore")),n=c(require("../stores/FormStore")),u=require("mobx-react"),i=o(require("classnames"));function o(e){return e&&e.__esModule?e:{default:e}}function d(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return d=function(){return e},e}function c(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=d();if(t&&t.has(e))return t.get(e);var l={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=a?Object.getOwnPropertyDescriptor(e,r):null;n&&(n.get||n.set)?Object.defineProperty(l,r,n):l[r]=e[r]}return l.default=e,t&&t.set(e,l),l}var f=function(){return(f=Object.assign||function(e){for(var t,l=1,a=arguments.length;l<a;l++)for(var r in t=arguments[l])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};function s(u){var o=u.formItem,d=u.formItemIndex,c=u.moveFormItem,s=(0,e.useRef)(null),p=(0,t.useDrop)({accept:[l.default.EDITABLE_FIELD],hover:function(e,t){if(null!==s.current){var l=e.index,a=d;if(l!==a){var r=s.current.getBoundingClientRect(),n=(r.bottom-r.top)/2,u=t.getClientOffset();if(null!==u){var i=u.y-r.top;l<a&&i<n||l>a&&i>n||(c(l,a),e.index=a)}}}}})[1],m=(0,t.useDrag)({item:{index:d,type:l.default.EDITABLE_FIELD},collect:function(e){return{isDragging:e.isDragging()}}}),v=m[0].isDragging;(0,m[1])(p(s));return o.itemType===n.FormItemType.LAYOUT?e.default.createElement("div",{ref:s,className:(0,i.default)("field-editable field-editable-layout",o.isActive?"field-editable-active":""),style:{opacity:v?.4:1},onMouseDown:function(){return n.default.activate(o.id)}},o.rows.map(function(t,l){return e.default.createElement(a.Row,{key:l,gutter:5},t.map(function(t,l){return e.default.createElement(a.Col,{key:l,span:t.span})}))}),e.default.createElement(a.Button,{className:"btn-delete",type:"danger",size:"small",icon:"delete",onClick:function(){return n.default.delete(o.id)}},"删除")):o.itemType===n.FormItemType.TEXT?e.default.createElement("div",{ref:s,className:(0,i.default)("field-editable field-editable-text",o.isActive?"field-editable-active":""),style:{opacity:v?.4:1},onMouseDown:function(){return n.default.activate(o.id)}},e.default.createElement("div",{style:{fontSize:o.fontSize,lineHeight:o.lineHeight+"px",textAlign:o.textAlign}},o.content),e.default.createElement(a.Button,{className:"btn-delete",type:"danger",size:"small",icon:"delete",onClick:function(){return n.default.delete(o.id)}},"删除")):e.default.createElement("div",{ref:s,className:(0,i.default)("field-editable","top"===r.default.labelAlign?"label-standalone":"",o.isActive?"field-editable-active":""),style:{opacity:v?.4:1},onMouseDown:function(){return n.default.activate(o.id)}},e.default.createElement("div",{className:(0,i.default)("field-editable-label","top"===r.default.labelAlign?"field-editable-label-top":""),style:f({width:r.default.labelWidth},"top"!==r.default.labelAlign?{textAlign:r.default.labelAlign}:{})},o.labelText),e.default.createElement("div",{className:"field-editable-content"},function(t){switch(t.itemType){case n.FormItemType.SELECT:var l=t;return e.default.createElement(a.Select,{value:l.defaultValue,style:{width:"100%"}},l.options.map(function(t,l){return e.default.createElement(a.Select.Option,{key:l,value:t.value},t.text)}));case n.FormItemType.CHECKBOX:var r=t;return e.default.createElement(a.Checkbox.Group,{value:r.defaultValue},r.options.map(function(t,l){return e.default.createElement(a.Checkbox,{key:l,value:t.value},t.text)}));case n.FormItemType.RADIO:var u=t;return e.default.createElement(a.Radio.Group,{value:u.defaultValue,buttonStyle:u.buttonStyle},u.options.map(function(t,l){return e.default.createElement(a.Radio.Button,{key:l,value:t.value},t.text)}));case n.FormItemType.TEXTAREA:var i=t;return e.default.createElement(a.Input.TextArea,{value:i.defaultValue,placeholder:i.placeholder});default:var o=t;return e.default.createElement(a.Input,{value:o.defaultValue||"",placeholder:o.placeholder})}}(o)),e.default.createElement(a.Button,{className:"btn-delete",type:"danger",size:"small",icon:"delete",onClick:function(){return n.default.delete(o.id)}},"删除"))}var p=(0,u.observer)(s);exports.default=p;
},{"../ItemTypes":"qvYA","../stores/FormAttrsStore":"gGDR","../stores/FormStore":"Sx9k"}],"A6Xa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=f(require("react")),r=require("mobx-react"),t=require("react-dnd"),n=u(require("../ItemTypes")),o=u(require("./EditableField"));function u(e){return e&&e.__esModule?e:{default:e}}function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function f(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=a();if(r&&r.has(e))return r.get(e);var t={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var u=n?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(t,o,u):t[o]=e[o]}return t.default=e,r&&r.set(e,t),t}function i(r){var u=r.formAttrs,a=r.form,f=(0,e.useCallback)(function(e,r){return a.move(e,r)},[a.formItems]),i=(0,t.useDrop)({accept:[n.default.FIELD],drop:function(e,r){e.type===n.default.FIELD&&a.add(e.name)},collect:function(e){return{isOver:e.isOver(),canDrop:e.canDrop()}}}),c=i[0],l=(c.isOver,c.canDrop,i[1]);return e.default.createElement("div",{ref:l,className:"editable-form",style:{width:u.formWidthString}},a.formItems.map(function(r,t){return e.default.createElement(o.default,{key:r.id,formItem:r,formItemIndex:t,moveFormItem:f})}))}var c=(0,r.observer)(i);exports.default=c;
},{"../ItemTypes":"qvYA","./EditableField":"mVW4"}],"zo2T":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=f,require("./index.less");var e=m(require("react")),t=require("react-dnd"),r=m(require("react-dnd-html5-backend")),a=require("antd"),l=m(require("./components/FieldList")),o=m(require("./components/AttrsPanel")),n=m(require("./components/EditableForm")),u=m(require("./stores/FormAttrsStore")),d=m(require("./stores/FormStore"));function m(e){return e&&e.__esModule?e:{default:e}}require("mobx-react-lite/batchingForReactDom");var c=a.Layout.Header,s=a.Layout.Content,i=a.Layout.Sider;function f(m){var f=m.style;return e.default.createElement(t.DndProvider,{backend:r.default},e.default.createElement(a.Layout,{className:"form-editor",style:f},e.default.createElement(i,{theme:"light",className:"form-editor-components"},e.default.createElement(l.default,null)),e.default.createElement(a.Layout,{className:"form-editor-content"},e.default.createElement(a.Layout,{className:"form-editor-content-main"},e.default.createElement(c,{className:"form-editor-toolbar"},"顶部 toolbar"),e.default.createElement(s,{className:"form-editor-editarea"},e.default.createElement(n.default,{formAttrs:u.default,form:d.default}))),e.default.createElement(i,{theme:"light",width:300,className:"form-editor-content-attrs"},e.default.createElement(o.default,null)))))}
},{"./index.less":"r2ni","./components/FieldList":"ScnN","./components/AttrsPanel":"WuM7","./components/EditableForm":"A6Xa","./stores/FormAttrsStore":"gGDR","./stores/FormStore":"Sx9k"}]},{},["zo2T"], null)
//# sourceMappingURL=index.js.map