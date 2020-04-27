import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { message, Divider, Button, Input, InputNumber, Radio, Checkbox, Select, Modal, Row, Col, List, Tabs, Layout } from 'antd';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { generate } from 'shortid';
import update from 'immutability-helper';
import classnames from 'classnames';

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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var FormItemType;
(function (FormItemType) {
    FormItemType["TEXT"] = "text";
    FormItemType["INPUT"] = "input";
    FormItemType["NUMBER"] = "number";
    FormItemType["TEXTAREA"] = "textarea";
    FormItemType["CHECKBOX"] = "checkbox";
    FormItemType["RADIO"] = "radio";
    FormItemType["SELECT"] = "select";
    FormItemType["LAYOUT"] = "layout";
    FormItemType["RESULT"] = "result";
})(FormItemType || (FormItemType = {}));
var createFormItem = function (itemType) {
    var id = generate();
    switch (itemType) {
        case FormItemType.RESULT:
            return {
                id: id,
                itemType: itemType,
                labelText: '检验结果'
            };
        case FormItemType.TEXT:
            return {
                id: id,
                itemType: itemType,
                content: '文字内容',
                fontSize: 14,
                lineHeight: 21,
                textAlign: 'left'
            };
        case FormItemType.LAYOUT:
            return {
                id: id,
                itemType: itemType,
                rows: [
                    [
                        { span: 12 },
                        { span: 12 }
                    ]
                ]
            };
        case FormItemType.SELECT:
            return {
                id: id,
                itemType: itemType,
                labelText: '下拉选择框',
                options: [
                    createOption('选项 1'),
                    createOption('选项 2'),
                    createOption('选项 3')
                ],
                defaultValue: '选项 1'
            };
        case FormItemType.RADIO:
            return {
                id: id,
                itemType: itemType,
                labelText: '单选框',
                options: [
                    createOption('选项 1'),
                    createOption('选项 2')
                ],
                buttonStyle: 'solid',
                defaultValue: '',
                required: true
            };
        case FormItemType.CHECKBOX:
            return {
                id: id,
                itemType: itemType,
                labelText: '多选框',
                options: [
                    createOption('选项 1')
                ],
                defaultValue: [],
                required: true
            };
        case FormItemType.TEXTAREA:
            return {
                id: id,
                itemType: itemType,
                labelText: '文本域',
                placeholder: '文本域输入提示',
                defaultValue: '',
                required: true
            };
        case FormItemType.NUMBER:
            return {
                id: id,
                itemType: itemType,
                labelText: '数字框',
                defaultValue: 1,
                min: 1,
                max: 100,
                unit: ''
            };
        default:
            return {
                id: id,
                itemType: FormItemType.INPUT,
                labelText: '文本框',
                placeholder: '文本框输入提示',
                defaultValue: '',
                required: true
            };
    }
};
var createOption = function (value) { return ({
    value: value,
    text: value
}); };
var FormStore = /** @class */ (function () {
    function FormStore() {
        this.items = [];
        this.activeId = '';
        // autorun(() => console.log('form items: ', this.formItems))
    }
    FormStore.prototype.setItems = function (items) {
        this.items = items;
        this.activeId = '';
    };
    FormStore.prototype.getItems = function () {
        return this.items.slice(0);
    };
    FormStore.prototype.add = function (itemType) {
        if (itemType === FormItemType.RESULT && this.items.filter(function (item) { return item.itemType === FormItemType.RESULT; }).length > 0) {
            message.error('检验结果字段只能有一个');
            return;
        }
        var newItem = createFormItem(itemType);
        this.items.push(newItem);
    };
    FormStore.prototype.delete = function (id) {
        this.items = this.items.filter(function (item) { return item.id !== id; });
    };
    FormStore.prototype.update = function (newItem) {
        this.items = this.items.map(function (item) {
            return item.id === newItem.id
                ? newItem
                : item;
        });
    };
    FormStore.prototype.activate = function (id) {
        if (this.items.filter(function (item) { return item.id === id; }).length > 0) {
            this.activeId = id;
        }
    };
    FormStore.prototype.move = function (dragIndex, hoverIndex) {
        var dragItem = this.items[dragIndex];
        this.items = update(this.items, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragItem],
            ],
        });
    };
    FormStore.prototype.addOption = function (id) {
        this.items = this.items.map(function (item) {
            if (item.id === id && [FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(item.itemType) > -1) {
                var value = "";
                item.options.push(createOption(value));
            }
            return item;
        });
    };
    FormStore.prototype.deleteOption = function (id, optionIndex) {
        this.items = this.items.map(function (item) {
            if (item.id === id && [FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(item.itemType) > -1) {
                if (item.options.length > 1) {
                    item.options.splice(optionIndex, 1);
                    // 删除选项后，重新设置默认值
                    if (FormItemType.SELECT === item.itemType) {
                        item.defaultValue = item.options[0].value;
                    }
                    if (FormItemType.CHECKBOX === item.itemType) {
                        item.defaultValue = [];
                    }
                    if (FormItemType.RADIO === item.itemType) {
                        item.defaultValue = '';
                    }
                }
                else {
                    message.error('选项不得少于 1 个');
                }
            }
            return item;
        });
    };
    FormStore.prototype.updateOption = function (id, optionIndex, value) {
        this.items = this.items.map(function (item) {
            if (item.id === id && [FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(item.itemType) > -1) {
                item.options.splice(optionIndex, 1, createOption(value));
            }
            return item;
        });
    };
    FormStore.prototype.setCheckboxDefaultOption = function (id, values) {
        this.items = this.items.map(function (item) {
            if (item.id === id && FormItemType.CHECKBOX === item.itemType) {
                item.defaultValue = values;
            }
            return item;
        });
    };
    FormStore.prototype.setRadioDefaultOption = function (id, value) {
        this.items = this.items.map(function (item) {
            if (item.id === id && FormItemType.RADIO === item.itemType) {
                item.defaultValue = value;
            }
            return item;
        });
    };
    FormStore.prototype.setSelectDefaultOption = function (id, value) {
        this.items = this.items.map(function (item) {
            if (item.id === id && FormItemType.SELECT === item.itemType) {
                item.defaultValue = value;
            }
            return item;
        });
    };
    FormStore.prototype.addCol = function (id, rowIndex) {
        this.items = this.items.map(function (item) {
            if (item.id === id && FormItemType.LAYOUT === item.itemType) {
                item.rows[rowIndex].push({
                    span: 12
                });
            }
            return item;
        });
    };
    FormStore.prototype.updateColSpan = function (id, rowIndex, colIndex, span) {
        this.items = this.items.map(function (item) {
            if (item.id === id && FormItemType.LAYOUT === item.itemType) {
                item.rows[rowIndex].splice(colIndex, 1, { span: span });
            }
            return item;
        });
    };
    FormStore.prototype.deleteCol = function (id, rowIndex, colIndex) {
        this.items = this.items.map(function (item) {
            if (item.id === id && FormItemType.LAYOUT === item.itemType) {
                item.rows[rowIndex].splice(colIndex, 1);
            }
            return item;
        });
    };
    FormStore.prototype.updateTextItem = function (id, content, fontSize, lineHeight, textAlign) {
        this.items = this.items.map(function (item) {
            if (item.id === id && FormItemType.TEXT === item.itemType) {
                item.content = content;
                item.fontSize = fontSize;
                item.lineHeight = lineHeight;
                item.textAlign = textAlign;
            }
            return item;
        });
    };
    FormStore.prototype.setRequired = function (id, required) {
        this.items = this.items.map(function (item) {
            if (item.id === id) {
                item.required = required;
            }
            return item;
        });
    };
    Object.defineProperty(FormStore.prototype, "formItems", {
        get: function () {
            var _this = this;
            return this.items.map(function (item) { return (__assign(__assign({}, item), { isActive: item.id === _this.activeId })); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormStore.prototype, "activeItem", {
        get: function () {
            return find(this.items, this.activeId);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        observable
    ], FormStore.prototype, "items", void 0);
    __decorate([
        observable
    ], FormStore.prototype, "activeId", void 0);
    return FormStore;
}());
function find(items, id) {
    var result = null;
    for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        if (item.id === id) {
            result = item;
            break;
        }
    }
    return result || {};
}
var formStore = new FormStore();

var createFormValues = function (items) {
    var values = items.reduce(function (values, item) {
        var _a;
        if ([
            FormItemType.INPUT,
            FormItemType.TEXTAREA,
            FormItemType.RADIO,
            FormItemType.CHECKBOX,
            FormItemType.SELECT
        ].indexOf(item.itemType) > -1) {
            return __assign(__assign({}, values), (_a = {}, _a[item.id] = item.defaultValue, _a));
        }
        return values;
    }, {});
    return {
        values: values,
        result: -1,
        comment: ''
    };
};
var shouldValidateRequired = function (item) { return [
    FormItemType.INPUT,
    FormItemType.TEXTAREA,
    FormItemType.CHECKBOX,
    FormItemType.RADIO
].indexOf(item.itemType) > -1; };
function GeneratedForm(props) {
    var _a = props.form, items = _a.items, attrs = _a.attrs;
    var formWidth = attrs.formWidth, formWidthUnit = attrs.formWidthUnit, labelAlign = attrs.labelAlign, labelWidth = attrs.labelWidth;
    var _b = useState(createFormValues(items)), formValues = _b[0], setFormValues = _b[1];
    var _c = useState({ result: false, errors: {} }), validationResult = _c[0], setValidationResult = _c[1];
    var _d = useState(0), validateCount = _d[0], setValidateCount = _d[1];
    function onSubmit() {
        console.log('form items =>', items);
        console.log('form values =>', formValues);
        var newValidationResult = validate(items, formValues);
        console.log(newValidationResult);
        if (newValidationResult.result) {
            if (props.onSubmit)
                props.onSubmit(formValues);
            setValidationResult({ result: false, errors: {} });
            setFormValues(createFormValues(items));
        }
        else {
            setValidationResult(newValidationResult);
        }
        setValidateCount(validateCount + 1);
    }
    function validate(items, formValues) {
        var values = formValues.values;
        return items.reduce(function (_a, item) {
            var result = _a.result, errors = _a.errors;
            // 校验必填项
            if (shouldValidateRequired(item) && item.required) {
                var _b = item, id = _b.id, labelText = _b.labelText;
                var value = values[id];
                if (
                // 空字符串
                (typeof value === 'string' && value === '') ||
                    // 空数组
                    (Object.prototype.toString.call(value) === '[object Array]' && value.length === 0)) {
                    errors[id] = labelText + "\u4E3A\u5FC5\u586B\u9879";
                    result = false;
                }
            }
            // 检验结果项为必填
            if (item.itemType === FormItemType.RESULT && formValues.result === -1) ;
            return {
                result: result,
                errors: errors
            };
        }, {
            result: false,
            errors: {}
        });
    }
    var renderFormItem = function (formItem) {
        var itemType = formItem.itemType;
        switch (itemType) {
            case FormItemType.RESULT:
                return (React.createElement("div", null,
                    React.createElement(Radio.Group, { style: {
                            height: 32,
                            lineHeight: '32px',
                            marginBottom: 16
                        }, value: formValues.result, onChange: function (e) { return setFormValues(__assign(__assign({}, formValues), { result: e.target.value })); } },
                        React.createElement(Radio, { value: 1 }, "\u5408\u683C"),
                        React.createElement(Radio, { value: 0 }, "\u4E0D\u5408\u683C"),
                        React.createElement("span", { className: "err-msg" }, validateCount > 0 && formValues.result === -1 ? '检验结果为必填项' : '')),
                    React.createElement(Input.TextArea, { placeholder: "\u5907\u6CE8", value: formValues.comment, onChange: function (e) { return setFormValues(__assign(__assign({}, formValues), { comment: e.target.value })); } })));
            case FormItemType.SELECT:
                var selectItem_1 = formItem;
                return (React.createElement(Select, { value: formValues.values[selectItem_1.id], onChange: function (value) {
                        var _a;
                        var values = formValues.values;
                        setFormValues(__assign(__assign({}, formValues), { values: __assign(__assign({}, values), (_a = {}, _a[selectItem_1.id] = value, _a)) }));
                    }, style: { width: '100%' } }, selectItem_1.options.map(function (option, optionIndex) { return (React.createElement(Select.Option, { key: optionIndex, value: option.value }, option.text)); })));
            case FormItemType.CHECKBOX:
                var checkboxItem_1 = formItem;
                return (React.createElement(Checkbox.Group, { value: formValues.values[checkboxItem_1.id], onChange: function (value) {
                        var _a;
                        var values = formValues.values;
                        setFormValues(__assign(__assign({}, formValues), { values: __assign(__assign({}, values), (_a = {}, _a[checkboxItem_1.id] = value, _a)) }));
                    } }, checkboxItem_1.options.map(function (option, optionIndex) { return (React.createElement(Checkbox, { key: optionIndex, value: option.value }, option.text)); })));
            case FormItemType.RADIO:
                var radioItem_1 = formItem;
                return (React.createElement(Radio.Group, { value: formValues.values[radioItem_1.id], onChange: function (e) {
                        var _a;
                        var values = formValues.values;
                        setFormValues(__assign(__assign({}, formValues), { values: __assign(__assign({}, values), (_a = {}, _a[radioItem_1.id] = e.target.value, _a)) }));
                    }, buttonStyle: radioItem_1.buttonStyle }, radioItem_1.options.map(function (option, optionIndex) { return (React.createElement(Radio.Button, { key: optionIndex, value: option.value }, option.text)); })));
            case FormItemType.TEXTAREA:
                var textareaItem_1 = formItem;
                return (React.createElement(Input.TextArea, { value: formValues.values[textareaItem_1.id], onChange: function (e) {
                        var _a;
                        var values = formValues.values;
                        setFormValues(__assign(__assign({}, formValues), { values: __assign(__assign({}, values), (_a = {}, _a[textareaItem_1.id] = e.target.value, _a)) }));
                    }, placeholder: textareaItem_1.placeholder }));
            case FormItemType.NUMBER:
                var numberItem_1 = formItem;
                return (React.createElement(InputNumber, { style: { width: '100%' }, value: formValues.values[numberItem_1.id], onChange: function (value) {
                        var _a;
                        value = value || numberItem_1.min;
                        var values = formValues.values;
                        setFormValues(__assign(__assign({}, formValues), { values: __assign(__assign({}, values), (_a = {}, _a[numberItem_1.id] = value, _a)) }));
                    }, min: numberItem_1.min, max: numberItem_1.max, formatter: function (value) {
                        if (!value)
                            return numberItem_1.min + " " + numberItem_1.unit;
                        return value + " " + numberItem_1.unit;
                    }, parser: function (value) {
                        if (!value)
                            return Number(numberItem_1.min);
                        return Number(value.replace(" " + numberItem_1.unit, ''));
                    } }));
            default:
                var inputItem_1 = formItem;
                return (React.createElement(Input, { value: formValues.values[inputItem_1.id], onChange: function (e) {
                        var _a;
                        var values = formValues.values;
                        setFormValues(__assign(__assign({}, formValues), { values: __assign(__assign({}, values), (_a = {}, _a[inputItem_1.id] = e.target.value, _a)) }));
                    }, placeholder: inputItem_1.placeholder }));
        }
    };
    return (React.createElement("div", { className: "generated-form", style: {
            width: "" + formWidth + formWidthUnit
        } },
        items.map(function (item, index) {
            var itemType = item.itemType;
            if (itemType === FormItemType.TEXT) {
                var textItem = item;
                return (React.createElement("div", { key: index, className: "form-item form-item-text", style: {
                        fontSize: textItem.fontSize,
                        lineHeight: textItem.lineHeight + "px",
                        textAlign: textItem.textAlign
                    } },
                    React.createElement("div", { className: "form-item-label" }, textItem.content)));
            }
            if ([
                FormItemType.INPUT,
                FormItemType.NUMBER,
                FormItemType.TEXTAREA,
                FormItemType.RADIO,
                FormItemType.CHECKBOX,
                FormItemType.SELECT,
                FormItemType.RESULT
            ].indexOf(itemType) > -1) {
                var errMsg = validationResult.errors[item.id];
                return (React.createElement("div", { className: "form-item", key: index },
                    React.createElement("div", { className: classnames('form-item-label', labelAlign === 'top' ? 'label-standalone' : ''), style: __assign({ width: labelWidth }, (labelAlign !== 'top' ? {
                            textAlign: labelAlign
                        } : {})) }, item.labelText),
                    React.createElement("div", { className: 'form-item-content' },
                        renderFormItem(item),
                        React.createElement("div", { className: "err-msg" }, errMsg))));
            }
            return null;
        }),
        React.createElement(Divider, null),
        React.createElement("div", { style: { paddingLeft: labelWidth } },
            React.createElement(Button, { type: "primary", onClick: onSubmit, style: { width: 90, marginRight: 16 } }, "\u63D0 \u4EA4"),
            React.createElement(Button, { type: "default", onClick: function () { return setFormValues(createFormValues(items)); }, style: { width: 90 } }, "\u91CD \u7F6E"))));
}

function Toolbar(props) {
    var form = props.form, formAttrs = props.formAttrs, onSave = props.onSave;
    var _a = useState(false), modalVisible = _a[0], setModalVisible = _a[1];
    var getJson = function () { return JSON.stringify({
        items: form.getItems(),
        attrs: formAttrs
    }); };
    function onPreview() {
        setModalVisible(true);
    }
    return (React.createElement("div", { className: "form-editor-toolbar-content" },
        React.createElement(Button, { type: "link", icon: "eye", onClick: onPreview }, "\u9884\u89C8"),
        React.createElement(Button, { type: "link", icon: "save", onClick: function () { return onSave(getJson()); } }, "\u4FDD\u5B58"),
        React.createElement(Modal, { title: "\u8868\u5355\u9884\u89C8", centered: true, visible: modalVisible, onCancel: function () { return setModalVisible(false); }, footer: null, width: 800 }, modalVisible ? React.createElement(GeneratedForm, { form: JSON.parse(getJson()) }) : null)));
}
var Toolbar$1 = observer(Toolbar);

var ItemTypes = {
    FIELD: 'field',
    EDITABLE_FIELD: 'eidtable_field',
    EDITABLE_FORM: 'editable_form'
};

function Field(props) {
    var name = props.name, text = props.text;
    var _a = useDrag({
        item: { name: name, type: ItemTypes.FIELD },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging()
        }); }
    }), isDragging = _a[0].isDragging, drag = _a[1];
    return (React.createElement("div", { ref: drag, className: "field", style: {
            opacity: isDragging ? 0.4 : 1
        } }, text));
}
var Field$1 = observer(Field);

var fields = {
    basic: [
        {
            name: 'input',
            text: '文本框'
        },
        {
            name: 'number',
            text: '数字框'
        },
        {
            name: 'textarea',
            text: '文本域'
        },
        {
            name: 'radio',
            text: '单选框'
        },
        {
            name: 'checkbox',
            text: '多选框'
        },
        {
            name: 'select',
            text: '下拉选择框'
        },
        {
            name: 'text',
            text: '文字'
        }
    ],
    advanced: [
        // {
        //     name: 'layout',
        //     text: '布局'
        // },
        {
            name: 'result',
            text: '检验结果'
        }
    ]
};
function FieldList() {
    var renderFields = function (label, fields) { return (React.createElement("div", null,
        React.createElement("div", { className: "label" }, label),
        fields.map(function (_, i, fields) {
            if (i % 2 === 0) {
                var fieldsInRow = fields.slice(i, i + 2);
                return (React.createElement(Row, { gutter: 10, key: i }, fieldsInRow.map(function (field, j) { return React.createElement(Col, { span: 12, key: i + "-" + j },
                    React.createElement(Field$1, { name: field.name, text: field.text })); })));
            }
            return null;
        }))); };
    return (React.createElement(React.Fragment, null,
        renderFields('通用字段', fields.basic),
        renderFields('自定义字段', fields.advanced)));
}

var FormAttrs = /** @class */ (function (_super) {
    __extends(FormAttrs, _super);
    function FormAttrs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormAttrs.prototype.render = function () {
        var formAttrs = this.props.formAttrs;
        return (React.createElement("div", { className: "attrs" },
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u8868\u5355\u5BBD\u5EA6"),
                React.createElement(InputNumber, { className: "input", value: formAttrs.formWidth, min: 0, step: 1, onChange: function (value) {
                        if (value !== undefined) {
                            formAttrs.formWidth = value;
                        }
                    } })),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u8868\u5355\u5BBD\u5EA6\u5355\u4F4D"),
                React.createElement(Radio.Group, { className: "input", value: formAttrs.formWidthUnit, buttonStyle: "solid", onChange: function (e) {
                        formAttrs.formWidthUnit = e.target.value;
                    } },
                    React.createElement(Radio.Button, { value: "%" }, "\u767E\u5206\u6BD4 %"),
                    React.createElement(Radio.Button, { value: "px" }, "\u50CF\u7D20 px "))),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u6807\u7B7E\u5BBD\u5EA6"),
                React.createElement(InputNumber, { className: "input", value: formAttrs.labelWidth, min: 0, step: 1, onChange: function (value) {
                        if (value !== undefined) {
                            formAttrs.labelWidth = value;
                        }
                    } })),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u6807\u7B7E\u5BBD\u5EA6\u5355\u4F4D"),
                React.createElement(Radio.Group, { className: "input", value: formAttrs.labelWidthUnit, buttonStyle: "solid", onChange: function (e) {
                        formAttrs.labelWidthUnit = e.target.value;
                    } },
                    React.createElement(Radio.Button, { value: "%" }, "\u767E\u5206\u6BD4 %"),
                    React.createElement(Radio.Button, { value: "px" }, "\u50CF\u7D20 px "))),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u6807\u7B7E\u5BF9\u9F50\u65B9\u5F0F"),
                React.createElement(Radio.Group, { className: "input", value: formAttrs.labelAlign, buttonStyle: "solid", onChange: function (e) {
                        formAttrs.labelAlign = e.target.value;
                    } },
                    React.createElement(Radio.Button, { value: "left" }, "\u5DE6\u5BF9\u9F50"),
                    React.createElement(Radio.Button, { value: "right" }, "\u53F3\u5BF9\u9F50"),
                    React.createElement(Radio.Button, { value: "top" }, "\u9876\u90E8\u5BF9\u9F50")))));
    };
    FormAttrs = __decorate([
        observer
    ], FormAttrs);
    return FormAttrs;
}(React.Component));

var FormAttrsStore = /** @class */ (function () {
    function FormAttrsStore() {
        this.formWidth = 100;
        this.formWidthUnit = '%';
        this.labelAlign = 'left';
        this.labelWidth = 100;
        this.labelWidthUnit = 'px';
    }
    Object.defineProperty(FormAttrsStore.prototype, "formWidthString", {
        get: function () {
            return "" + this.formWidth + this.formWidthUnit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAttrsStore.prototype, "labelWidthString", {
        get: function () {
            return "" + this.labelWidth + this.labelWidthUnit;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        observable
    ], FormAttrsStore.prototype, "formWidth", void 0);
    __decorate([
        observable
    ], FormAttrsStore.prototype, "formWidthUnit", void 0);
    __decorate([
        observable
    ], FormAttrsStore.prototype, "labelAlign", void 0);
    __decorate([
        observable
    ], FormAttrsStore.prototype, "labelWidth", void 0);
    __decorate([
        observable
    ], FormAttrsStore.prototype, "labelWidthUnit", void 0);
    __decorate([
        computed
    ], FormAttrsStore.prototype, "formWidthString", null);
    __decorate([
        computed
    ], FormAttrsStore.prototype, "labelWidthString", null);
    return FormAttrsStore;
}());
var formAttrsStore = new FormAttrsStore();

function FieldAttrs(props) {
    var form = props.form;
    var _a = form.activeItem, id = _a.id, itemType = _a.itemType;
    var labelText = form.activeItem.labelText;
    function onChangeAttrs(newItem) {
        form.update(newItem);
    }
    var renderInputExtraAttrs = function (item) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u8F93\u5165\u63D0\u793A"),
                React.createElement(Input, { className: "input", value: item.placeholder, onChange: function (e) { return onChangeAttrs(__assign(__assign({}, item), { placeholder: e.target.value })); } })),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u9ED8\u8BA4\u503C"),
                React.createElement(Input, { className: "input", value: item.defaultValue, onChange: function (e) { return onChangeAttrs(__assign(__assign({}, item), { defaultValue: e.target.value })); } }))));
    };
    var renderNumberExtraAttrs = function (item) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u6700\u5C0F\u503C"),
                React.createElement(InputNumber, { className: "input", value: item.min, onChange: function (value) { return onChangeAttrs(__assign(__assign({}, item), { min: Number(value) })); } })),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u6700\u5927\u503C"),
                React.createElement(InputNumber, { className: "input", value: item.max, onChange: function (value) { return onChangeAttrs(__assign(__assign({}, item), { max: Number(value) })); } })),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u9ED8\u8BA4\u503C"),
                React.createElement(InputNumber, { className: "input", value: item.defaultValue, min: item.min, max: item.max, onChange: function (value) { return onChangeAttrs(__assign(__assign({}, item), { defaultValue: Number(value) })); } })),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u5355\u4F4D"),
                React.createElement(Input, { className: "input", value: item.unit, onChange: function (e) { return onChangeAttrs(__assign(__assign({}, item), { unit: e.target.value })); } }))));
    };
    var renderItemOptions = function (item) {
        var options = item.options;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u9009\u9879"),
                React.createElement(List, { size: "small", itemLayout: "horizontal", dataSource: options, renderItem: function (option, optionIndex) { return (React.createElement(List.Item, { key: optionIndex },
                        React.createElement("div", { className: "attr-item-option" },
                            React.createElement(Input, { value: option.value, onChange: function (e) {
                                    form.updateOption(item.id, optionIndex, e.target.value);
                                } }),
                            React.createElement(Button, { type: "danger", icon: "delete", className: "btn-delete-option", onClick: function () { return form.deleteOption(item.id, optionIndex); } }, "\u5220\u9664")))); } }),
                React.createElement(Button, { type: "primary", onClick: function () { return form.addOption(item.id); }, icon: "plus" }, "\u6DFB\u52A0\u9009\u9879"))));
    };
    var renderCheckboxExtraAttrs = function (item) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u9ED8\u8BA4\u503C"),
                React.createElement(Select, { mode: "tags", value: item.defaultValue, style: { width: '100%' }, onChange: function (values) { return form.setCheckboxDefaultOption(item.id, values); } }, item.options.map(function (option, optionIndex) { return React.createElement(Select.Option, { key: optionIndex, value: option.value }, option.value); })))));
    };
    var renderRadioExtraAttrs = function (item) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u9ED8\u8BA4\u503C"),
                React.createElement(Select, { value: item.defaultValue, style: { width: '100%' }, onChange: function (value) { return form.setRadioDefaultOption(item.id, value); } }, item.options.map(function (option, optionIndex) { return React.createElement(Select.Option, { key: optionIndex, value: option.value }, option.value); })))));
    };
    var renderSelectExtraAttrs = function (item) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u9ED8\u8BA4\u503C"),
                React.createElement(Select, { value: item.defaultValue, style: { width: '100%' }, onChange: function (value) { return form.setSelectDefaultOption(item.id, value); } }, item.options.map(function (option, optionIndex) { return React.createElement(Select.Option, { key: optionIndex, value: option.value }, option.value); })))));
    };
    var renderLayoutExtraAttrs = function (item) {
        var rows = item.rows;
        return (React.createElement(React.Fragment, null, rows.map(function (row, rowIndex) {
            return (React.createElement("div", { className: "attr-item", key: rowIndex },
                React.createElement("div", { className: "label" }, "\u5217\u5BBD"),
                React.createElement(List, { size: "small", itemLayout: "horizontal", dataSource: row, renderItem: function (col, colIndex) { return (React.createElement(List.Item, { key: colIndex },
                        React.createElement("div", { className: "attr-item-option" },
                            React.createElement(InputNumber, { className: "input", value: col.span, min: 1, max: 24, step: 1, onChange: function (value) {
                                    form.updateColSpan(item.id, rowIndex, colIndex, Number(value));
                                } }),
                            React.createElement(Button, { type: "danger", icon: "delete", className: "btn-delete-option", onClick: function () { return form.deleteCol(item.id, rowIndex, colIndex); } }, "\u5220\u9664")))); } }),
                React.createElement(Button, { type: "primary", onClick: function () { return form.addCol(item.id, rowIndex); }, icon: "plus" }, "\u6DFB\u52A0\u5217")));
        })));
    };
    var renderTextExtraAttrs = function (item) {
        var id = item.id, content = item.content, fontSize = item.fontSize, lineHeight = item.lineHeight, textAlign = item.textAlign;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u6587\u5B57\u5185\u5BB9"),
                React.createElement(Input.TextArea, { value: content, onChange: function (e) { return form.updateTextItem(id, e.target.value, fontSize, lineHeight, textAlign); } })),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u6587\u5B57\u5927\u5C0F"),
                React.createElement(InputNumber, { className: "input", value: fontSize, min: 12, max: 100, step: 1, onChange: function (newFontSize) { return form.updateTextItem(id, content, Number(newFontSize), lineHeight, textAlign); } })),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u6587\u5B57\u884C\u9AD8"),
                React.createElement(InputNumber, { className: "input", value: lineHeight, min: 12, max: 100, step: 1, onChange: function (newLineHeight) { return form.updateTextItem(id, content, fontSize, Number(newLineHeight), textAlign); } })),
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u5BF9\u9F50\u65B9\u5F0F"),
                React.createElement(Select, { style: { width: '100%' }, value: textAlign, onChange: function (newTextAlign) { return form.updateTextItem(id, content, fontSize, lineHeight, newTextAlign); } },
                    React.createElement(Select.Option, { value: 'left' }, "\u5DE6\u5BF9\u9F50"),
                    React.createElement(Select.Option, { value: 'right' }, "\u53F3\u5BF9\u9F50"),
                    React.createElement(Select.Option, { value: 'center' }, "\u5C45\u4E2D")))));
    };
    var renderValidationAttrs = function (item) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "attr-item" },
                React.createElement("div", { className: "label" }, "\u662F\u5426\u5FC5\u586B"),
                React.createElement(Radio.Group, { value: item.required, onChange: function (e) { return form.setRequired(item.id, e.target.value); } },
                    React.createElement(Radio, { value: true }, "\u5FC5\u586B"),
                    React.createElement(Radio, { value: false }, "\u9009\u586B")))));
    };
    var hasLabelText = [
        FormItemType.INPUT,
        FormItemType.NUMBER,
        FormItemType.TEXTAREA,
        FormItemType.CHECKBOX,
        FormItemType.RADIO,
        FormItemType.SELECT
    ].indexOf(itemType) > -1;
    var hasValidationAttrs = [
        FormItemType.INPUT,
        FormItemType.TEXTAREA,
        FormItemType.CHECKBOX,
        FormItemType.RADIO
    ].indexOf(itemType) > -1;
    return (React.createElement("div", { className: "attrs" },
        React.createElement("div", { className: "attr-item" },
            React.createElement("div", { className: "label" }, "\u6807\u8BC6"),
            React.createElement(Input, { className: "input", value: id, disabled: true })),
        hasLabelText ? (React.createElement("div", { className: "attr-item" },
            React.createElement("div", { className: "label" }, "\u6807\u7B7E\u6587\u5B57"),
            React.createElement(Input, { className: "input", value: labelText, onChange: function (e) { return onChangeAttrs(__assign(__assign({}, form.activeItem), (labelText ? {} : {}))); } }))) : null,
        itemType === FormItemType.INPUT ? renderInputExtraAttrs(form.activeItem) : null,
        itemType === FormItemType.NUMBER ? renderNumberExtraAttrs(form.activeItem) : null,
        itemType === FormItemType.TEXTAREA ? renderInputExtraAttrs(form.activeItem) : null,
        itemType === FormItemType.CHECKBOX ? renderItemOptions(form.activeItem) : null,
        itemType === FormItemType.CHECKBOX ? renderCheckboxExtraAttrs(form.activeItem) : null,
        itemType === FormItemType.RADIO ? renderItemOptions(form.activeItem) : null,
        itemType === FormItemType.RADIO ? renderRadioExtraAttrs(form.activeItem) : null,
        itemType === FormItemType.SELECT ? renderItemOptions(form.activeItem) : null,
        itemType === FormItemType.SELECT ? renderSelectExtraAttrs(form.activeItem) : null,
        itemType === FormItemType.LAYOUT ? renderLayoutExtraAttrs(form.activeItem) : null,
        itemType === FormItemType.TEXT ? renderTextExtraAttrs(form.activeItem) : null,
        hasValidationAttrs ? renderValidationAttrs(form.activeItem) : null));
}
var FieldAttrs$1 = observer(FieldAttrs);

var TabPane = Tabs.TabPane;
var AttrsPanel = /** @class */ (function (_super) {
    __extends(AttrsPanel, _super);
    function AttrsPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChangeTab = function (activeTab) {
            // console.log(activeTab)
        };
        return _this;
    }
    AttrsPanel.prototype.render = function () {
        return (React.createElement(Tabs, { onChange: this.onChangeTab, animated: false },
            React.createElement(TabPane, { tab: "\u5B57\u6BB5\u5C5E\u6027", key: "field-attrs" },
                React.createElement(FieldAttrs$1, { form: formStore })),
            React.createElement(TabPane, { tab: "\u8868\u5355\u5C5E\u6027", key: "form-attrs" },
                React.createElement(FormAttrs, { formAttrs: formAttrsStore }))));
    };
    return AttrsPanel;
}(React.Component));

function EditableField(props) {
    var formItem = props.formItem, formItemIndex = props.formItemIndex, moveFormItem = props.moveFormItem;
    var ref = useRef(null);
    var _a = useDrop({
        accept: [ItemTypes.EDITABLE_FIELD],
        hover: function (item, monitor) {
            if (ref.current === null) {
                return;
            }
            var dragIndex = item.index;
            var hoverIndex = formItemIndex;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            var hoverBoundingRect = ref.current.getBoundingClientRect();
            // Get vertical middle
            var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            var clientOffset = monitor.getClientOffset();
            if (clientOffset === null)
                return;
            // Get pixels to the top
            var hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveFormItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    }), drop = _a[1];
    var _b = useDrag({
        item: { index: formItemIndex, type: ItemTypes.EDITABLE_FIELD },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging()
        }); }
    }), isDragging = _b[0].isDragging, drag = _b[1];
    drag(drop(ref));
    var renderFormItem = function (formItem) {
        var itemType = formItem.itemType;
        switch (itemType) {
            case FormItemType.RESULT:
                // const resultItem = formItem as (ResultItem & { isActive: boolean })
                return (React.createElement("div", null,
                    React.createElement(Radio.Group, { value: "\u5408\u683C", style: {
                            height: 32,
                            lineHeight: '32px',
                            marginBottom: 16
                        } },
                        React.createElement(Radio, { value: "\u5408\u683C" }, "\u5408\u683C"),
                        React.createElement(Radio, { value: "\u4E0D\u5408\u683C" }, "\u4E0D\u5408\u683C")),
                    React.createElement(Input.TextArea, { value: "", placeholder: "\u5907\u6CE8" })));
            case FormItemType.SELECT:
                var selectItem = formItem;
                return (React.createElement(Select, { value: selectItem.defaultValue, style: { width: '100%' } }, selectItem.options.map(function (option, optionIndex) { return (React.createElement(Select.Option, { key: optionIndex, value: option.value }, option.text)); })));
            case FormItemType.CHECKBOX:
                var checkboxItem = formItem;
                return (React.createElement(Checkbox.Group, { value: checkboxItem.defaultValue }, checkboxItem.options.map(function (option, optionIndex) { return (React.createElement(Checkbox, { key: optionIndex, value: option.value }, option.text)); })));
            case FormItemType.RADIO:
                var radioItem = formItem;
                return (React.createElement(Radio.Group, { value: radioItem.defaultValue, buttonStyle: radioItem.buttonStyle }, radioItem.options.map(function (option, optionIndex) { return (React.createElement(Radio.Button, { key: optionIndex, value: option.value }, option.text)); })));
            case FormItemType.TEXTAREA:
                var textareaItem = formItem;
                return (React.createElement(Input.TextArea, { value: textareaItem.defaultValue, placeholder: textareaItem.placeholder }));
            case FormItemType.NUMBER:
                var numberItem_1 = formItem;
                return (React.createElement(InputNumber, { style: { width: '100%' }, value: numberItem_1.defaultValue, formatter: function (value) {
                        if (!value)
                            return numberItem_1.min + " " + numberItem_1.unit;
                        return value + " " + numberItem_1.unit;
                    }, parser: function (value) {
                        if (!value)
                            return Number(numberItem_1.min);
                        return Number(value.replace(" " + numberItem_1.unit, ''));
                    } }));
            default:
                var inputItem = formItem;
                return (React.createElement(Input, { value: inputItem.defaultValue || '', placeholder: inputItem.placeholder }));
        }
    };
    if (formItem.itemType === FormItemType.LAYOUT) {
        return (React.createElement("div", { ref: ref, className: classnames('field-editable field-editable-layout', formItem.isActive ? 'field-editable-active' : ''), style: {
                opacity: isDragging ? 0.4 : 1
            }, onMouseDown: function () { return formStore.activate(formItem.id); } },
            formItem.rows.map(function (row, rowIndex) { return (React.createElement(Row, { key: rowIndex, gutter: 5 }, row.map(function (col, colIndex) { return (React.createElement(Col, { key: colIndex, span: col.span })); }))); }),
            React.createElement(Button, { className: "btn-delete", type: "danger", size: "small", icon: "delete", onClick: function () { return formStore.delete(formItem.id); } }, "\u5220\u9664")));
    }
    if (formItem.itemType === FormItemType.TEXT) {
        return (React.createElement("div", { ref: ref, className: classnames('field-editable field-editable-text', formItem.isActive ? 'field-editable-active' : ''), style: {
                opacity: isDragging ? 0.4 : 1
            }, onMouseDown: function () { return formStore.activate(formItem.id); } },
            React.createElement("div", { style: {
                    fontSize: formItem.fontSize,
                    lineHeight: formItem.lineHeight + "px",
                    textAlign: formItem.textAlign
                } }, formItem.content),
            React.createElement(Button, { className: "btn-delete", type: "danger", size: "small", icon: "delete", onClick: function () { return formStore.delete(formItem.id); } }, "\u5220\u9664")));
    }
    return (React.createElement("div", { ref: ref, className: classnames('field-editable', formAttrsStore.labelAlign === 'top' ? 'label-standalone' : '', formItem.isActive ? 'field-editable-active' : ''), style: {
            opacity: isDragging ? 0.4 : 1
        }, onMouseDown: function () { return formStore.activate(formItem.id); } },
        React.createElement("div", { className: classnames('field-editable-label', formAttrsStore.labelAlign === 'top' ? 'field-standalone' : ''), style: __assign({ width: formAttrsStore.labelWidth }, (formAttrsStore.labelAlign !== 'top' ? {
                textAlign: formAttrsStore.labelAlign
            } : {})) }, formItem.labelText),
        React.createElement("div", { className: 'field-editable-content' }, renderFormItem(formItem)),
        React.createElement(Button, { className: "btn-delete", type: "danger", size: "small", icon: "delete", onClick: function () { return formStore.delete(formItem.id); } }, "\u5220\u9664")));
}
var EditableField$1 = observer(EditableField);

function EditableForm(props) {
    var formAttrs = props.formAttrs, form = props.form;
    var moveFormItem = useCallback(function (dragIndex, hoverIndex) { return form.move(dragIndex, hoverIndex); }, [form.formItems]);
    var _a = useDrop({
        accept: [
            ItemTypes.FIELD
        ],
        drop: function (item, monitor) {
            if (item.type === ItemTypes.FIELD) {
                form.add(item.name);
            }
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }); },
    }), _b = _a[0], isOver = _b.isOver, canDrop = _b.canDrop, drop = _a[1];
    return (React.createElement("div", { ref: drop, className: "editable-form", style: {
            width: formAttrs.formWidthString
        } }, form.formItems.map(function (formItem, index) { return (React.createElement(EditableField$1, { key: formItem.id, formItem: formItem, formItemIndex: index, moveFormItem: moveFormItem })); })));
}
var EditableForm$1 = observer(EditableForm);

// https://github.com/mobxjs/mobx-react-lite/#observer-batching
// import 'mobx-react-lite/batchingForReactDom'
var Header = Layout.Header, Content = Layout.Content, Sider = Layout.Sider;
function FormEditor(props) {
    var style = props.style, _a = props.defaultFormItems, defaultFormItems = _a === void 0 ? [] : _a, _b = props.onSave, onSave = _b === void 0 ? console.log : _b;
    useEffect(function () {
        formStore.setItems(defaultFormItems);
    }, []);
    return (React.createElement(DndProvider, { backend: Backend },
        React.createElement(Layout, { className: "form-editor", style: style },
            React.createElement(Sider, { theme: 'light', className: "form-editor-components" },
                React.createElement(FieldList, null)),
            React.createElement(Layout, { className: "form-editor-content" },
                React.createElement(Layout, { className: "form-editor-content-main" },
                    React.createElement(Header, { className: "form-editor-toolbar" },
                        React.createElement(Toolbar$1, { formAttrs: formAttrsStore, form: formStore, onSave: onSave })),
                    React.createElement(Content, { className: "form-editor-editarea" },
                        React.createElement(EditableForm$1, { formAttrs: formAttrsStore, form: formStore }))),
                React.createElement(Sider, { theme: 'light', width: 300, className: "form-editor-content-attrs" },
                    React.createElement(AttrsPanel, null))))));
}

export default FormEditor;
