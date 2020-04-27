!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("react"),require("react-dnd"),require("react-dnd-html5-backend"),require("antd"),require("mobx-react"),require("mobx"),require("shortid"),require("immutability-helper"),require("classnames")):"function"==typeof define&&define.amd?define(["react","react-dnd","react-dnd-html5-backend","antd","mobx-react","mobx","shortid","immutability-helper","classnames"],t):(e=e||self).ReactFormEditor=t(e.React,e.ReactDnD,e.ReactDnDHTML5Backend,e.antd,e.mobxReact,e.mobx,e.shortid,e.update,e.classnames)}(this,(function(e,t,n,a,r,l,i,o,u){"use strict";var c="default"in e?e.default:e;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n,o=o&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o,u=u&&Object.prototype.hasOwnProperty.call(u,"default")?u.default:u;
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
var m=function(e,t){return(m=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function s(e,t){function n(){this.constructor=e}m(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var d,p=function(){return(p=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};function f(e,t,n,a){var r,l=arguments.length,i=l<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(i=(l<3?r(i):l>3?r(t,n,i):r(t,n))||i);return l>3&&i&&Object.defineProperty(t,n,i),i}!function(e){e.TEXT="text",e.INPUT="input",e.NUMBER="number",e.TEXTAREA="textarea",e.CHECKBOX="checkbox",e.RADIO="radio",e.SELECT="select",e.LAYOUT="layout",e.RESULT="result"}(d||(d={}));var v=function(e){return{value:e,text:e}};var E=new(function(){function e(){this.items=[],this.activeId=""}return e.prototype.setItems=function(e){this.items=e,this.activeId=""},e.prototype.getItems=function(){return this.items.slice(0)},e.prototype.add=function(e){if(e===d.RESULT&&this.items.filter((function(e){return e.itemType===d.RESULT})).length>0)a.message.error("检验结果字段只能有一个");else{var t=function(e){var t=i.generate();switch(e){case d.RESULT:return{id:t,itemType:e,labelText:"检验结果"};case d.TEXT:return{id:t,itemType:e,content:"文字内容",fontSize:14,lineHeight:21,textAlign:"left"};case d.LAYOUT:return{id:t,itemType:e,rows:[[{span:12},{span:12}]]};case d.SELECT:return{id:t,itemType:e,labelText:"下拉选择框",options:[v("选项 1"),v("选项 2"),v("选项 3")],defaultValue:"选项 1"};case d.RADIO:return{id:t,itemType:e,labelText:"单选框",options:[v("选项 1"),v("选项 2")],buttonStyle:"solid",defaultValue:"",required:!0};case d.CHECKBOX:return{id:t,itemType:e,labelText:"多选框",options:[v("选项 1")],defaultValue:[],required:!0};case d.TEXTAREA:return{id:t,itemType:e,labelText:"文本域",placeholder:"文本域输入提示",defaultValue:"",required:!0};case d.NUMBER:return{id:t,itemType:e,labelText:"数字框",defaultValue:1,min:1,max:100,unit:""};default:return{id:t,itemType:d.INPUT,labelText:"文本框",placeholder:"文本框输入提示",defaultValue:"",required:!0}}}(e);this.items.push(t)}},e.prototype.delete=function(e){this.items=this.items.filter((function(t){return t.id!==e}))},e.prototype.update=function(e){this.items=this.items.map((function(t){return t.id===e.id?e:t}))},e.prototype.activate=function(e){this.items.filter((function(t){return t.id===e})).length>0&&(this.activeId=e)},e.prototype.move=function(e,t){var n=this.items[e];this.items=o(this.items,{$splice:[[e,1],[t,0,n]]})},e.prototype.addOption=function(e){this.items=this.items.map((function(t){if(t.id===e&&[d.CHECKBOX,d.RADIO,d.SELECT].indexOf(t.itemType)>-1){t.options.push(v(""))}return t}))},e.prototype.deleteOption=function(e,t){this.items=this.items.map((function(n){return n.id===e&&[d.CHECKBOX,d.RADIO,d.SELECT].indexOf(n.itemType)>-1&&(n.options.length>1?(n.options.splice(t,1),d.SELECT===n.itemType&&(n.defaultValue=n.options[0].value),d.CHECKBOX===n.itemType&&(n.defaultValue=[]),d.RADIO===n.itemType&&(n.defaultValue="")):a.message.error("选项不得少于 1 个")),n}))},e.prototype.updateOption=function(e,t,n){this.items=this.items.map((function(a){return a.id===e&&[d.CHECKBOX,d.RADIO,d.SELECT].indexOf(a.itemType)>-1&&a.options.splice(t,1,v(n)),a}))},e.prototype.setCheckboxDefaultOption=function(e,t){this.items=this.items.map((function(n){return n.id===e&&d.CHECKBOX===n.itemType&&(n.defaultValue=t),n}))},e.prototype.setRadioDefaultOption=function(e,t){this.items=this.items.map((function(n){return n.id===e&&d.RADIO===n.itemType&&(n.defaultValue=t),n}))},e.prototype.setSelectDefaultOption=function(e,t){this.items=this.items.map((function(n){return n.id===e&&d.SELECT===n.itemType&&(n.defaultValue=t),n}))},e.prototype.addCol=function(e,t){this.items=this.items.map((function(n){return n.id===e&&d.LAYOUT===n.itemType&&n.rows[t].push({span:12}),n}))},e.prototype.updateColSpan=function(e,t,n,a){this.items=this.items.map((function(r){return r.id===e&&d.LAYOUT===r.itemType&&r.rows[t].splice(n,1,{span:a}),r}))},e.prototype.deleteCol=function(e,t,n){this.items=this.items.map((function(a){return a.id===e&&d.LAYOUT===a.itemType&&a.rows[t].splice(n,1),a}))},e.prototype.updateTextItem=function(e,t,n,a,r){this.items=this.items.map((function(l){return l.id===e&&d.TEXT===l.itemType&&(l.content=t,l.fontSize=n,l.lineHeight=a,l.textAlign=r),l}))},e.prototype.setRequired=function(e,t){this.items=this.items.map((function(n){return n.id===e&&(n.required=t),n}))},Object.defineProperty(e.prototype,"formItems",{get:function(){var e=this;return this.items.map((function(t){return p(p({},t),{isActive:t.id===e.activeId})}))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"activeItem",{get:function(){return function(e,t){for(var n=null,a=0,r=e.length;a<r;a++){var l=e[a];if(l.id===t){n=l;break}}return n||{}}(this.items,this.activeId)},enumerable:!0,configurable:!0}),f([l.observable],e.prototype,"items",void 0),f([l.observable],e.prototype,"activeId",void 0),e}()),h=function(e){return{values:e.reduce((function(e,t){var n;return[d.INPUT,d.TEXTAREA,d.RADIO,d.CHECKBOX,d.SELECT].indexOf(t.itemType)>-1?p(p({},e),((n={})[t.id]=t.defaultValue,n)):e}),{}),result:-1,comment:""}};function b(t){var n=t.form,r=n.items,l=n.attrs,i=l.formWidth,o=l.formWidthUnit,m=l.labelAlign,s=l.labelWidth,f=e.useState(h(r)),v=f[0],E=f[1],b=e.useState({result:!1,errors:{}}),y=b[0],g=b[1],N=e.useState(0),T=N[0],C=N[1];return c.createElement("div",{className:"generated-form",style:{width:""+i+o}},r.map((function(e,t){var n=e.itemType;if(n===d.TEXT){var r=e;return c.createElement("div",{key:t,className:"form-item form-item-text",style:{fontSize:r.fontSize,lineHeight:r.lineHeight+"px",textAlign:r.textAlign}},c.createElement("div",{className:"form-item-label"},r.content))}if([d.INPUT,d.NUMBER,d.TEXTAREA,d.RADIO,d.CHECKBOX,d.SELECT,d.RESULT].indexOf(n)>-1){var l=y.errors[e.id];return c.createElement("div",{className:"form-item",key:t},c.createElement("div",{className:u("form-item-label","top"===m?"label-standalone":""),style:p({width:s},"top"!==m?{textAlign:m}:{})},e.labelText),c.createElement("div",{className:"form-item-content"},function(e){switch(e.itemType){case d.RESULT:return c.createElement("div",null,c.createElement(a.Radio.Group,{style:{height:32,lineHeight:"32px",marginBottom:16},value:v.result,onChange:function(e){return E(p(p({},v),{result:e.target.value}))}},c.createElement(a.Radio,{value:1},"合格"),c.createElement(a.Radio,{value:0},"不合格"),c.createElement("span",{className:"err-msg"},T>0&&-1===v.result?"检验结果为必填项":"")),c.createElement(a.Input.TextArea,{placeholder:"备注",value:v.comment,onChange:function(e){return E(p(p({},v),{comment:e.target.value}))}}));case d.SELECT:var t=e;return c.createElement(a.Select,{value:v.values[t.id],onChange:function(e){var n,a=v.values;E(p(p({},v),{values:p(p({},a),(n={},n[t.id]=e,n))}))},style:{width:"100%"}},t.options.map((function(e,t){return c.createElement(a.Select.Option,{key:t,value:e.value},e.text)})));case d.CHECKBOX:var n=e;return c.createElement(a.Checkbox.Group,{value:v.values[n.id],onChange:function(e){var t,a=v.values;E(p(p({},v),{values:p(p({},a),(t={},t[n.id]=e,t))}))}},n.options.map((function(e,t){return c.createElement(a.Checkbox,{key:t,value:e.value},e.text)})));case d.RADIO:var r=e;return c.createElement(a.Radio.Group,{value:v.values[r.id],onChange:function(e){var t,n=v.values;E(p(p({},v),{values:p(p({},n),(t={},t[r.id]=e.target.value,t))}))},buttonStyle:r.buttonStyle},r.options.map((function(e,t){return c.createElement(a.Radio.Button,{key:t,value:e.value},e.text)})));case d.TEXTAREA:var l=e;return c.createElement(a.Input.TextArea,{value:v.values[l.id],onChange:function(e){var t,n=v.values;E(p(p({},v),{values:p(p({},n),(t={},t[l.id]=e.target.value,t))}))},placeholder:l.placeholder});case d.NUMBER:var i=e;return c.createElement(a.InputNumber,{style:{width:"100%"},value:v.values[i.id],onChange:function(e){var t;e=e||i.min;var n=v.values;E(p(p({},v),{values:p(p({},n),(t={},t[i.id]=e,t))}))},min:i.min,max:i.max,formatter:function(e){return e?e+" "+i.unit:i.min+" "+i.unit},parser:function(e){return Number(e?e.replace(" "+i.unit,""):i.min)}});default:var o=e;return c.createElement(a.Input,{value:v.values[o.id],onChange:function(e){var t,n=v.values;E(p(p({},v),{values:p(p({},n),(t={},t[o.id]=e.target.value,t))}))},placeholder:o.placeholder})}}(e),c.createElement("div",{className:"err-msg"},l)))}return null})),c.createElement(a.Divider,null),c.createElement("div",{style:{paddingLeft:s}},c.createElement(a.Button,{type:"primary",onClick:function(){console.log("form items =>",r),console.log("form values =>",v);var e=function(e,t){var n=t.values;return e.reduce((function(e,a){var r=e.result,l=e.errors;if(function(e){return[d.INPUT,d.TEXTAREA,d.CHECKBOX,d.RADIO].indexOf(e.itemType)>-1}(a)&&a.required){var i=a,o=i.id,u=i.labelText,c=n[o];("string"==typeof c&&""===c||"[object Array]"===Object.prototype.toString.call(c)&&0===c.length)&&(l[o]=u+"为必填项",r=!1)}return a.itemType===d.RESULT&&t.result,{result:r,errors:l}}),{result:!1,errors:{}})}(r,v);console.log(e),e.result?(t.onSubmit&&t.onSubmit(v),g({result:!1,errors:{}}),E(h(r))):g(e),C(T+1)},style:{width:90,marginRight:16}},"提 交"),c.createElement(a.Button,{type:"default",onClick:function(){return E(h(r))},style:{width:90}},"重 置")))}var y=r.observer((function(t){var n=t.form,r=t.formAttrs,l=t.onSave,i=e.useState(!1),o=i[0],u=i[1],m=function(){return JSON.stringify({items:n.getItems(),attrs:r})};return c.createElement("div",{className:"form-editor-toolbar-content"},c.createElement(a.Button,{type:"link",icon:"eye",onClick:function(){u(!0)}},"预览"),c.createElement(a.Button,{type:"link",icon:"save",onClick:function(){return l(m())}},"保存"),c.createElement(a.Modal,{title:"表单预览",centered:!0,visible:o,onCancel:function(){return u(!1)},footer:null,width:800},o?c.createElement(b,{form:JSON.parse(m())}):null))})),g="field",N="eidtable_field";var T=r.observer((function(e){var n=e.name,a=e.text,r=t.useDrag({item:{name:n,type:g},collect:function(e){return{isDragging:e.isDragging()}}}),l=r[0].isDragging,i=r[1];return c.createElement("div",{ref:i,className:"field",style:{opacity:l?.4:1}},a)})),C=[{name:"input",text:"文本框"},{name:"number",text:"数字框"},{name:"textarea",text:"文本域"},{name:"radio",text:"单选框"},{name:"checkbox",text:"多选框"},{name:"select",text:"下拉选择框"},{name:"text",text:"文字"}],x=[{name:"result",text:"检验结果"}];function I(){var e=function(e,t){return c.createElement("div",null,c.createElement("div",{className:"label"},e),t.map((function(e,t,n){if(t%2==0){var r=n.slice(t,t+2);return c.createElement(a.Row,{gutter:10,key:t},r.map((function(e,n){return c.createElement(a.Col,{span:12,key:t+"-"+n},c.createElement(T,{name:e.name,text:e.text}))})))}return null})))};return c.createElement(c.Fragment,null,e("通用字段",C),e("自定义字段",x))}var O=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s(t,e),t.prototype.render=function(){var e=this.props.formAttrs;return c.createElement("div",{className:"attrs"},c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"表单宽度"),c.createElement(a.InputNumber,{className:"input",value:e.formWidth,min:0,step:1,onChange:function(t){void 0!==t&&(e.formWidth=t)}})),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"表单宽度单位"),c.createElement(a.Radio.Group,{className:"input",value:e.formWidthUnit,buttonStyle:"solid",onChange:function(t){e.formWidthUnit=t.target.value}},c.createElement(a.Radio.Button,{value:"%"},"百分比 %"),c.createElement(a.Radio.Button,{value:"px"},"像素 px "))),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"标签宽度"),c.createElement(a.InputNumber,{className:"input",value:e.labelWidth,min:0,step:1,onChange:function(t){void 0!==t&&(e.labelWidth=t)}})),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"标签宽度单位"),c.createElement(a.Radio.Group,{className:"input",value:e.labelWidthUnit,buttonStyle:"solid",onChange:function(t){e.labelWidthUnit=t.target.value}},c.createElement(a.Radio.Button,{value:"%"},"百分比 %"),c.createElement(a.Radio.Button,{value:"px"},"像素 px "))),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"标签对齐方式"),c.createElement(a.Radio.Group,{className:"input",value:e.labelAlign,buttonStyle:"solid",onChange:function(t){e.labelAlign=t.target.value}},c.createElement(a.Radio.Button,{value:"left"},"左对齐"),c.createElement(a.Radio.Button,{value:"right"},"右对齐"),c.createElement(a.Radio.Button,{value:"top"},"顶部对齐"))))},t=f([r.observer],t)}(c.Component),R=new(function(){function e(){this.formWidth=100,this.formWidthUnit="%",this.labelAlign="left",this.labelWidth=100,this.labelWidthUnit="px"}return Object.defineProperty(e.prototype,"formWidthString",{get:function(){return""+this.formWidth+this.formWidthUnit},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"labelWidthString",{get:function(){return""+this.labelWidth+this.labelWidthUnit},enumerable:!0,configurable:!0}),f([l.observable],e.prototype,"formWidth",void 0),f([l.observable],e.prototype,"formWidthUnit",void 0),f([l.observable],e.prototype,"labelAlign",void 0),f([l.observable],e.prototype,"labelWidth",void 0),f([l.observable],e.prototype,"labelWidthUnit",void 0),f([l.computed],e.prototype,"formWidthString",null),f([l.computed],e.prototype,"labelWidthString",null),e}());var A=r.observer((function(e){var t=e.form,n=t.activeItem,r=n.id,l=n.itemType,i=t.activeItem.labelText;function o(e){t.update(e)}var u,m=function(e){return c.createElement(c.Fragment,null,c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"输入提示"),c.createElement(a.Input,{className:"input",value:e.placeholder,onChange:function(t){return o(p(p({},e),{placeholder:t.target.value}))}})),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"默认值"),c.createElement(a.Input,{className:"input",value:e.defaultValue,onChange:function(t){return o(p(p({},e),{defaultValue:t.target.value}))}})))},s=function(e){var n=e.options;return c.createElement(c.Fragment,null,c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"选项"),c.createElement(a.List,{size:"small",itemLayout:"horizontal",dataSource:n,renderItem:function(n,r){return c.createElement(a.List.Item,{key:r},c.createElement("div",{className:"attr-item-option"},c.createElement(a.Input,{value:n.value,onChange:function(n){t.updateOption(e.id,r,n.target.value)}}),c.createElement(a.Button,{type:"danger",icon:"delete",className:"btn-delete-option",onClick:function(){return t.deleteOption(e.id,r)}},"删除")))}}),c.createElement(a.Button,{type:"primary",onClick:function(){return t.addOption(e.id)},icon:"plus"},"添加选项")))},f=[d.INPUT,d.NUMBER,d.TEXTAREA,d.CHECKBOX,d.RADIO,d.SELECT].indexOf(l)>-1,v=[d.INPUT,d.TEXTAREA,d.CHECKBOX,d.RADIO].indexOf(l)>-1;return c.createElement("div",{className:"attrs"},c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"标识"),c.createElement(a.Input,{className:"input",value:r,disabled:!0})),f?c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"标签文字"),c.createElement(a.Input,{className:"input",value:i,onChange:function(e){return o(p(p({},t.activeItem),{}))}})):null,l===d.INPUT?m(t.activeItem):null,l===d.NUMBER?(u=t.activeItem,c.createElement(c.Fragment,null,c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"最小值"),c.createElement(a.InputNumber,{className:"input",value:u.min,onChange:function(e){return o(p(p({},u),{min:Number(e)}))}})),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"最大值"),c.createElement(a.InputNumber,{className:"input",value:u.max,onChange:function(e){return o(p(p({},u),{max:Number(e)}))}})),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"默认值"),c.createElement(a.InputNumber,{className:"input",value:u.defaultValue,min:u.min,max:u.max,onChange:function(e){return o(p(p({},u),{defaultValue:Number(e)}))}})),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"单位"),c.createElement(a.Input,{className:"input",value:u.unit,onChange:function(e){return o(p(p({},u),{unit:e.target.value}))}})))):null,l===d.TEXTAREA?m(t.activeItem):null,l===d.CHECKBOX?s(t.activeItem):null,l===d.CHECKBOX?function(e){return c.createElement(c.Fragment,null,c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"默认值"),c.createElement(a.Select,{mode:"tags",value:e.defaultValue,style:{width:"100%"},onChange:function(n){return t.setCheckboxDefaultOption(e.id,n)}},e.options.map((function(e,t){return c.createElement(a.Select.Option,{key:t,value:e.value},e.value)})))))}(t.activeItem):null,l===d.RADIO?s(t.activeItem):null,l===d.RADIO?function(e){return c.createElement(c.Fragment,null,c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"默认值"),c.createElement(a.Select,{value:e.defaultValue,style:{width:"100%"},onChange:function(n){return t.setRadioDefaultOption(e.id,n)}},e.options.map((function(e,t){return c.createElement(a.Select.Option,{key:t,value:e.value},e.value)})))))}(t.activeItem):null,l===d.SELECT?s(t.activeItem):null,l===d.SELECT?function(e){return c.createElement(c.Fragment,null,c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"默认值"),c.createElement(a.Select,{value:e.defaultValue,style:{width:"100%"},onChange:function(n){return t.setSelectDefaultOption(e.id,n)}},e.options.map((function(e,t){return c.createElement(a.Select.Option,{key:t,value:e.value},e.value)})))))}(t.activeItem):null,l===d.LAYOUT?function(e){var n=e.rows;return c.createElement(c.Fragment,null,n.map((function(n,r){return c.createElement("div",{className:"attr-item",key:r},c.createElement("div",{className:"label"},"列宽"),c.createElement(a.List,{size:"small",itemLayout:"horizontal",dataSource:n,renderItem:function(n,l){return c.createElement(a.List.Item,{key:l},c.createElement("div",{className:"attr-item-option"},c.createElement(a.InputNumber,{className:"input",value:n.span,min:1,max:24,step:1,onChange:function(n){t.updateColSpan(e.id,r,l,Number(n))}}),c.createElement(a.Button,{type:"danger",icon:"delete",className:"btn-delete-option",onClick:function(){return t.deleteCol(e.id,r,l)}},"删除")))}}),c.createElement(a.Button,{type:"primary",onClick:function(){return t.addCol(e.id,r)},icon:"plus"},"添加列"))})))}(t.activeItem):null,l===d.TEXT?function(e){var n=e.id,r=e.content,l=e.fontSize,i=e.lineHeight,o=e.textAlign;return c.createElement(c.Fragment,null,c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"文字内容"),c.createElement(a.Input.TextArea,{value:r,onChange:function(e){return t.updateTextItem(n,e.target.value,l,i,o)}})),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"文字大小"),c.createElement(a.InputNumber,{className:"input",value:l,min:12,max:100,step:1,onChange:function(e){return t.updateTextItem(n,r,Number(e),i,o)}})),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"文字行高"),c.createElement(a.InputNumber,{className:"input",value:i,min:12,max:100,step:1,onChange:function(e){return t.updateTextItem(n,r,l,Number(e),o)}})),c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"对齐方式"),c.createElement(a.Select,{style:{width:"100%"},value:o,onChange:function(e){return t.updateTextItem(n,r,l,i,e)}},c.createElement(a.Select.Option,{value:"left"},"左对齐"),c.createElement(a.Select.Option,{value:"right"},"右对齐"),c.createElement(a.Select.Option,{value:"center"},"居中"))))}(t.activeItem):null,v?function(e){return c.createElement(c.Fragment,null,c.createElement("div",{className:"attr-item"},c.createElement("div",{className:"label"},"是否必填"),c.createElement(a.Radio.Group,{value:e.required,onChange:function(n){return t.setRequired(e.id,n.target.value)}},c.createElement(a.Radio,{value:!0},"必填"),c.createElement(a.Radio,{value:!1},"选填"))))}(t.activeItem):null)})),S=a.Tabs.TabPane,k=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.onChangeTab=function(e){},t}return s(t,e),t.prototype.render=function(){return c.createElement(a.Tabs,{onChange:this.onChangeTab,animated:!1},c.createElement(S,{tab:"字段属性",key:"field-attrs"},c.createElement(A,{form:E})),c.createElement(S,{tab:"表单属性",key:"form-attrs"},c.createElement(O,{formAttrs:R})))},t}(c.Component);var B=r.observer((function(n){var r=n.formItem,l=n.formItemIndex,i=n.moveFormItem,o=e.useRef(null),m=t.useDrop({accept:[N],hover:function(e,t){if(null!==o.current){var n=e.index,a=l;if(n!==a){var r=o.current.getBoundingClientRect(),u=(r.bottom-r.top)/2,c=t.getClientOffset();if(null!==c){var m=c.y-r.top;n<a&&m<u||n>a&&m>u||(i(n,a),e.index=a)}}}}})[1],s=t.useDrag({item:{index:l,type:N},collect:function(e){return{isDragging:e.isDragging()}}}),f=s[0].isDragging;return(0,s[1])(m(o)),r.itemType===d.LAYOUT?c.createElement("div",{ref:o,className:u("field-editable field-editable-layout",r.isActive?"field-editable-active":""),style:{opacity:f?.4:1},onMouseDown:function(){return E.activate(r.id)}},r.rows.map((function(e,t){return c.createElement(a.Row,{key:t,gutter:5},e.map((function(e,t){return c.createElement(a.Col,{key:t,span:e.span})})))})),c.createElement(a.Button,{className:"btn-delete",type:"danger",size:"small",icon:"delete",onClick:function(){return E.delete(r.id)}},"删除")):r.itemType===d.TEXT?c.createElement("div",{ref:o,className:u("field-editable field-editable-text",r.isActive?"field-editable-active":""),style:{opacity:f?.4:1},onMouseDown:function(){return E.activate(r.id)}},c.createElement("div",{style:{fontSize:r.fontSize,lineHeight:r.lineHeight+"px",textAlign:r.textAlign}},r.content),c.createElement(a.Button,{className:"btn-delete",type:"danger",size:"small",icon:"delete",onClick:function(){return E.delete(r.id)}},"删除")):c.createElement("div",{ref:o,className:u("field-editable","top"===R.labelAlign?"label-standalone":"",r.isActive?"field-editable-active":""),style:{opacity:f?.4:1},onMouseDown:function(){return E.activate(r.id)}},c.createElement("div",{className:u("field-editable-label","top"===R.labelAlign?"field-standalone":""),style:p({width:R.labelWidth},"top"!==R.labelAlign?{textAlign:R.labelAlign}:{})},r.labelText),c.createElement("div",{className:"field-editable-content"},function(e){switch(e.itemType){case d.RESULT:return c.createElement("div",null,c.createElement(a.Radio.Group,{value:"合格",style:{height:32,lineHeight:"32px",marginBottom:16}},c.createElement(a.Radio,{value:"合格"},"合格"),c.createElement(a.Radio,{value:"不合格"},"不合格")),c.createElement(a.Input.TextArea,{value:"",placeholder:"备注"}));case d.SELECT:var t=e;return c.createElement(a.Select,{value:t.defaultValue,style:{width:"100%"}},t.options.map((function(e,t){return c.createElement(a.Select.Option,{key:t,value:e.value},e.text)})));case d.CHECKBOX:var n=e;return c.createElement(a.Checkbox.Group,{value:n.defaultValue},n.options.map((function(e,t){return c.createElement(a.Checkbox,{key:t,value:e.value},e.text)})));case d.RADIO:var r=e;return c.createElement(a.Radio.Group,{value:r.defaultValue,buttonStyle:r.buttonStyle},r.options.map((function(e,t){return c.createElement(a.Radio.Button,{key:t,value:e.value},e.text)})));case d.TEXTAREA:var l=e;return c.createElement(a.Input.TextArea,{value:l.defaultValue,placeholder:l.placeholder});case d.NUMBER:var i=e;return c.createElement(a.InputNumber,{style:{width:"100%"},value:i.defaultValue,formatter:function(e){return e?e+" "+i.unit:i.min+" "+i.unit},parser:function(e){return Number(e?e.replace(" "+i.unit,""):i.min)}});default:var o=e;return c.createElement(a.Input,{value:o.defaultValue||"",placeholder:o.placeholder})}}(r)),c.createElement(a.Button,{className:"btn-delete",type:"danger",size:"small",icon:"delete",onClick:function(){return E.delete(r.id)}},"删除"))}));var D=r.observer((function(n){var a=n.formAttrs,r=n.form,l=e.useCallback((function(e,t){return r.move(e,t)}),[r.formItems]),i=t.useDrop({accept:[g],drop:function(e,t){e.type===g&&r.add(e.name)},collect:function(e){return{isOver:e.isOver(),canDrop:e.canDrop()}}}),o=i[0],u=(o.isOver,o.canDrop,i[1]);return c.createElement("div",{ref:u,className:"editable-form",style:{width:a.formWidthString}},r.formItems.map((function(e,t){return c.createElement(B,{key:e.id,formItem:e,formItemIndex:t,moveFormItem:l})})))})),L=a.Layout.Header,U=a.Layout.Content,w=a.Layout.Sider;return function(r){var l=r.style,i=r.defaultFormItems,o=void 0===i?[]:i,u=r.onSave,m=void 0===u?console.log:u;return e.useEffect((function(){E.setItems(o)}),[]),c.createElement(t.DndProvider,{backend:n},c.createElement(a.Layout,{className:"form-editor",style:l},c.createElement(w,{theme:"light",className:"form-editor-components"},c.createElement(I,null)),c.createElement(a.Layout,{className:"form-editor-content"},c.createElement(a.Layout,{className:"form-editor-content-main"},c.createElement(L,{className:"form-editor-toolbar"},c.createElement(y,{formAttrs:R,form:E,onSave:m})),c.createElement(U,{className:"form-editor-editarea"},c.createElement(D,{formAttrs:R,form:E}))),c.createElement(w,{theme:"light",width:300,className:"form-editor-content-attrs"},c.createElement(k,null)))))}}));
