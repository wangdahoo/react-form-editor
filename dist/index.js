import 'antd/es/layout/style/css';
import _Layout from 'antd/es/layout';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import 'antd/es/modal/style/css';
import _Modal from 'antd/es/modal';
import 'antd/es/button/style/css';
import _Button from 'antd/es/button';
import { observer } from 'mobx-react';
import 'antd/es/divider/style/css';
import _Divider from 'antd/es/divider';
import 'antd/es/empty/style/css';
import _Empty from 'antd/es/empty';
import 'antd/es/input-number/style/css';
import _InputNumber from 'antd/es/input-number';
import 'antd/es/checkbox/style/css';
import _Checkbox from 'antd/es/checkbox';
import 'antd/es/select/style/css';
import _Select from 'antd/es/select';
import 'antd/es/input/style/css';
import _Input from 'antd/es/input';
import 'antd/es/radio/style/css';
import _Radio from 'antd/es/radio';
import 'antd/es/message/style/css';
import _message from 'antd/es/message';
import { observable, computed } from 'mobx';
import { generate } from 'shortid';
import update from 'immutability-helper';
import classnames from 'classnames';
import 'antd/es/row/style/css';
import _Row from 'antd/es/row';
import 'antd/es/col/style/css';
import _Col from 'antd/es/col';
import 'antd/es/tabs/style/css';
import _Tabs from 'antd/es/tabs';
import 'antd/es/list/style/css';
import _List from 'antd/es/list';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".form-editor * {\n  box-sizing: border-box;\n}\n.form-editor-components > .ant-layout-sider-children {\n  padding: 0 16px;\n}\n.form-editor-components div.label {\n  font-size: 16px;\n  line-height: 44px;\n}\n.form-editor-components .ant-row {\n  margin-bottom: 10px;\n}\n.form-editor-components .ant-row .field {\n  box-sizing: border-box;\n  font-size: 12px;\n  line-height: 30px;\n  height: 30px;\n  width: 100%;\n  text-align: center;\n  border: 1px dashed rgba(0, 0, 0, 0);\n  background-color: #f4f6fc;\n}\n.form-editor-components .ant-row .field:hover {\n  border: 1px dashed #1890ff;\n  color: #1890ff;\n}\n.form-editor-content-main .form-editor-toolbar {\n  background: #fff;\n  height: 44px;\n  line-height: 44px;\n  border-bottom: 1px solid #eee;\n  padding: 0 16px;\n}\n.form-editor-content-main .form-editor-toolbar-content {\n  text-align: right;\n}\n.form-editor-content-main .form-editor-editarea {\n  padding: 10px 10px 0 10px;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form {\n  min-height: 100%;\n  border: 1px dashed #ddd;\n  background-color: #fff;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable {\n  position: relative;\n  display: flex;\n  padding: 16px;\n  margin: 4px;\n  border: 1px dashed #ddd;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable.field-editable-active {\n  border: 1px solid #1890ff;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable.label-standalone {\n  flex-direction: column;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable.label-standalone .field-editable-label {\n  flex: 1;\n  text-align: left;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable-label {\n  font-size: 14px;\n  line-height: 32px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable-label:after {\n  content: '：';\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable-content {\n  flex: 1;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable-content > .ant-checkbox-group {\n  line-height: 32px;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable .btn-delete {\n  position: absolute;\n  right: 4px;\n  bottom: 4px;\n  z-index: 2;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable.field-editable-layout {\n  display: block;\n  padding: 0;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable.field-editable-layout .ant-row > .ant-col {\n  padding: 10px;\n  border: 1px dashed #ddd;\n  min-height: 64px;\n  box-sizing: border-box;\n}\n.form-editor-content-main .form-editor-editarea > .editable-form .field-editable.field-editable-text {\n  display: block;\n}\n.form-editor-content-attrs .attrs {\n  padding: 0 16px;\n}\n.form-editor-content-attrs .attrs .attr-item {\n  margin-bottom: 16px;\n}\n.form-editor-content-attrs .attrs .attr-item .label {\n  font-size: 14px;\n  line-height: 21px;\n  height: 30px;\n}\n.form-editor-content-attrs .attrs .attr-item .label::after {\n  content: '：';\n}\n.form-editor-content-attrs .attrs .attr-item .input {\n  display: inline-block;\n  width: 100%;\n}\n.form-editor-content-attrs .attrs .attr-item .input .ant-radio-button-wrapper {\n  width: 80px;\n  padding: 0;\n}\n.form-editor-content-attrs .attrs .attr-item .input .ant-radio-button-wrapper > span:last-child {\n  display: inline-block;\n  width: 80px;\n  text-align: center;\n}\n.form-editor-content-attrs .attrs .attr-item-option {\n  display: flex;\n}\n.form-editor-content-attrs .attrs .attr-item-option .ant-input {\n  flex: 1;\n}\n.form-editor-content-attrs .attrs .attr-item-option .btn-delete-option {\n  margin-left: 10px;\n}\n.generated-form {\n  min-height: 100%;\n  background-color: #fff;\n}\n.generated-form .form-item {\n  display: flex;\n  margin: 0 0 5px 0;\n}\n.generated-form .form-item.label-standalone {\n  flex-direction: column;\n}\n.generated-form .form-item.label-standalone .form-item-label {\n  flex: 1;\n  text-align: left;\n}\n.generated-form .form-item-label {\n  font-size: 14px;\n  line-height: 32px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.generated-form .form-item-label:after {\n  content: '：';\n}\n.generated-form .form-item-content {\n  flex: 1;\n}\n.generated-form .form-item-content > .ant-checkbox-group {\n  line-height: 32px;\n}\n.generated-form .form-item.form-item-text {\n  display: block;\n}\n.generated-form .form-item .err-msg {\n  padding: 3px 0 0 1px;\n  height: 20px;\n  line-height: 14px;\n  color: #f5222d;\n}\n";
styleInject(css_248z);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

function _decorate(decorators, factory, superClass, mixins) {
  var api = _getDecoratorsApi();

  if (mixins) {
    for (var i = 0; i < mixins.length; i++) {
      api = mixins[i](api);
    }
  }

  var r = factory(function initialize(O) {
    api.initializeInstanceElements(O, decorated.elements);
  }, superClass);
  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
  api.initializeClassElements(r.F, decorated.elements);
  return api.runClassFinishers(r.F, decorated.finishers);
}

function _getDecoratorsApi() {
  _getDecoratorsApi = function () {
    return api;
  };

  var api = {
    elementsDefinitionOrder: [["method"], ["field"]],
    initializeInstanceElements: function (O, elements) {
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          if (element.kind === kind && element.placement === "own") {
            this.defineClassElement(O, element);
          }
        }, this);
      }, this);
    },
    initializeClassElements: function (F, elements) {
      var proto = F.prototype;
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          var placement = element.placement;

          if (element.kind === kind && (placement === "static" || placement === "prototype")) {
            var receiver = placement === "static" ? F : proto;
            this.defineClassElement(receiver, element);
          }
        }, this);
      }, this);
    },
    defineClassElement: function (receiver, element) {
      var descriptor = element.descriptor;

      if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
          enumerable: descriptor.enumerable,
          writable: descriptor.writable,
          configurable: descriptor.configurable,
          value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
      }

      Object.defineProperty(receiver, element.key, descriptor);
    },
    decorateClass: function (elements, decorators) {
      var newElements = [];
      var finishers = [];
      var placements = {
        static: [],
        prototype: [],
        own: []
      };
      elements.forEach(function (element) {
        this.addElementPlacement(element, placements);
      }, this);
      elements.forEach(function (element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = this.decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
      }, this);

      if (!decorators) {
        return {
          elements: newElements,
          finishers: finishers
        };
      }

      var result = this.decorateConstructor(newElements, decorators);
      finishers.push.apply(finishers, result.finishers);
      result.finishers = finishers;
      return result;
    },
    addElementPlacement: function (element, placements, silent) {
      var keys = placements[element.placement];

      if (!silent && keys.indexOf(element.key) !== -1) {
        throw new TypeError("Duplicated element (" + element.key + ")");
      }

      keys.push(element.key);
    },
    decorateElement: function (element, placements) {
      var extras = [];
      var finishers = [];

      for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = this.fromElementDescriptor(element);
        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        this.addElementPlacement(element, placements);

        if (elementFinisherExtras.finisher) {
          finishers.push(elementFinisherExtras.finisher);
        }

        var newExtras = elementFinisherExtras.extras;

        if (newExtras) {
          for (var j = 0; j < newExtras.length; j++) {
            this.addElementPlacement(newExtras[j], placements);
          }

          extras.push.apply(extras, newExtras);
        }
      }

      return {
        element: element,
        finishers: finishers,
        extras: extras
      };
    },
    decorateConstructor: function (elements, decorators) {
      var finishers = [];

      for (var i = decorators.length - 1; i >= 0; i--) {
        var obj = this.fromClassDescriptor(elements);
        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

        if (elementsAndFinisher.finisher !== undefined) {
          finishers.push(elementsAndFinisher.finisher);
        }

        if (elementsAndFinisher.elements !== undefined) {
          elements = elementsAndFinisher.elements;

          for (var j = 0; j < elements.length - 1; j++) {
            for (var k = j + 1; k < elements.length; k++) {
              if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                throw new TypeError("Duplicated element (" + elements[j].key + ")");
              }
            }
          }
        }
      }

      return {
        elements: elements,
        finishers: finishers
      };
    },
    fromElementDescriptor: function (element) {
      var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      if (element.kind === "field") obj.initializer = element.initializer;
      return obj;
    },
    toElementDescriptors: function (elementObjects) {
      if (elementObjects === undefined) return;
      return _toArray(elementObjects).map(function (elementObject) {
        var element = this.toElementDescriptor(elementObject);
        this.disallowProperty(elementObject, "finisher", "An element descriptor");
        this.disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
      }, this);
    },
    toElementDescriptor: function (elementObject) {
      var kind = String(elementObject.kind);

      if (kind !== "method" && kind !== "field") {
        throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
      }

      var key = _toPropertyKey(elementObject.key);

      var placement = String(elementObject.placement);

      if (placement !== "static" && placement !== "prototype" && placement !== "own") {
        throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
      }

      var descriptor = elementObject.descriptor;
      this.disallowProperty(elementObject, "elements", "An element descriptor");
      var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({}, descriptor)
      };

      if (kind !== "field") {
        this.disallowProperty(elementObject, "initializer", "A method descriptor");
      } else {
        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
      }

      return element;
    },
    toElementFinisherExtras: function (elementObject) {
      var element = this.toElementDescriptor(elementObject);

      var finisher = _optionalCallableProperty(elementObject, "finisher");

      var extras = this.toElementDescriptors(elementObject.extras);
      return {
        element: element,
        finisher: finisher,
        extras: extras
      };
    },
    fromClassDescriptor: function (elements) {
      var obj = {
        kind: "class",
        elements: elements.map(this.fromElementDescriptor, this)
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      return obj;
    },
    toClassDescriptor: function (obj) {
      var kind = String(obj.kind);

      if (kind !== "class") {
        throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
      }

      this.disallowProperty(obj, "key", "A class descriptor");
      this.disallowProperty(obj, "placement", "A class descriptor");
      this.disallowProperty(obj, "descriptor", "A class descriptor");
      this.disallowProperty(obj, "initializer", "A class descriptor");
      this.disallowProperty(obj, "extras", "A class descriptor");

      var finisher = _optionalCallableProperty(obj, "finisher");

      var elements = this.toElementDescriptors(obj.elements);
      return {
        elements: elements,
        finisher: finisher
      };
    },
    runClassFinishers: function (constructor, finishers) {
      for (var i = 0; i < finishers.length; i++) {
        var newConstructor = (0, finishers[i])(constructor);

        if (newConstructor !== undefined) {
          if (typeof newConstructor !== "function") {
            throw new TypeError("Finishers must return a constructor.");
          }

          constructor = newConstructor;
        }
      }

      return constructor;
    },
    disallowProperty: function (obj, name, objectType) {
      if (obj[name] !== undefined) {
        throw new TypeError(objectType + " can't have a ." + name + " property.");
      }
    }
  };
  return api;
}

function _createElementDescriptor(def) {
  var key = _toPropertyKey(def.key);

  var descriptor;

  if (def.kind === "method") {
    descriptor = {
      value: def.value,
      writable: true,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "get") {
    descriptor = {
      get: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "set") {
    descriptor = {
      set: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "field") {
    descriptor = {
      configurable: true,
      writable: true,
      enumerable: true
    };
  }

  var element = {
    kind: def.kind === "field" ? "field" : "method",
    key: key,
    placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
    descriptor: descriptor
  };
  if (def.decorators) element.decorators = def.decorators;
  if (def.kind === "field") element.initializer = def.value;
  return element;
}

function _coalesceGetterSetter(element, other) {
  if (element.descriptor.get !== undefined) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}

function _coalesceClassElements(elements) {
  var newElements = [];

  var isSameElement = function (other) {
    return other.kind === "method" && other.key === element.key && other.placement === element.placement;
  };

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var other;

    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
        }

        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
          }

          other.decorators = element.decorators;
        }

        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }

  return newElements;
}

function _hasDecorators(element) {
  return element.decorators && element.decorators.length;
}

function _isDataDescriptor(desc) {
  return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}

function _optionalCallableProperty(obj, name) {
  var value = obj[name];

  if (value !== undefined && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }

  return value;
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

var createFormItem = function createFormItem(itemType) {
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
        rows: [[{
          span: 12
        }, {
          span: 12
        }]]
      };

    case FormItemType.SELECT:
      return {
        id: id,
        itemType: itemType,
        labelText: '下拉选择框',
        options: [createOption('选项 1'), createOption('选项 2'), createOption('选项 3')],
        defaultValue: '选项 1'
      };

    case FormItemType.RADIO:
      return {
        id: id,
        itemType: itemType,
        labelText: '单选框',
        options: [createOption('选项 1'), createOption('选项 2')],
        buttonStyle: 'solid',
        defaultValue: '',
        required: true
      };

    case FormItemType.CHECKBOX:
      return {
        id: id,
        itemType: itemType,
        labelText: '多选框',
        options: [createOption('选项 1')],
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

var createOption = function createOption(value) {
  return {
    value: value,
    text: value
  };
};

var FormStore = _decorate(null, function (_initialize) {
  var FormStore = function FormStore() {// autorun(() => console.log('form items: ', this.formItems))

    _classCallCheck(this, FormStore);

    _initialize(this);
  };

  return {
    F: FormStore,
    d: [{
      kind: "field",
      decorators: [observable],
      key: "items",
      value: function value() {
        return [];
      }
    }, {
      kind: "field",
      decorators: [observable],
      key: "activeId",
      value: function value() {
        return '';
      }
    }, {
      kind: "method",
      key: "setItems",
      value: function setItems(items) {
        this.items = items;
        this.activeId = '';
      }
    }, {
      kind: "method",
      key: "getItems",
      value: function getItems() {
        return this.items.slice(0);
      }
    }, {
      kind: "method",
      key: "add",
      value: function add(itemType) {
        if (itemType === FormItemType.RESULT && this.items.filter(function (item) {
          return item.itemType === FormItemType.RESULT;
        }).length > 0) {
          _message.error('检验结果字段只能有一个');

          return;
        }

        var newItem = createFormItem(itemType);
        this.items.push(newItem);
      }
    }, {
      kind: "method",
      key: "delete",
      value: function _delete(id) {
        this.items = this.items.filter(function (item) {
          return item.id !== id;
        });
      }
    }, {
      kind: "method",
      key: "update",
      value: function update(newItem) {
        this.items = this.items.map(function (item) {
          return item.id === newItem.id ? newItem : item;
        });
      }
    }, {
      kind: "method",
      key: "activate",
      value: function activate(id) {
        if (this.items.filter(function (item) {
          return item.id === id;
        }).length > 0) {
          this.activeId = id;
        }
      }
    }, {
      kind: "method",
      key: "move",
      value: function move(dragIndex, hoverIndex) {
        var dragItem = this.items[dragIndex];
        this.items = update(this.items, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
        });
      }
    }, {
      kind: "method",
      key: "addOption",
      value: function addOption(id) {
        this.items = this.items.map(function (item) {
          if (item.id === id && [FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(item.itemType) > -1) {
            var value = "";
            item.options.push(createOption(value));
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "deleteOption",
      value: function deleteOption(id, optionIndex) {
        this.items = this.items.map(function (item) {
          if (item.id === id && [FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(item.itemType) > -1) {
            if (item.options.length > 1) {
              item.options.splice(optionIndex, 1); // 删除选项后，重新设置默认值

              if (FormItemType.SELECT === item.itemType) {
                item.defaultValue = item.options[0].value;
              }

              if (FormItemType.CHECKBOX === item.itemType) {
                item.defaultValue = [];
              }

              if (FormItemType.RADIO === item.itemType) {
                item.defaultValue = '';
              }
            } else {
              _message.error('选项不得少于 1 个');
            }
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "updateOption",
      value: function updateOption(id, optionIndex, value) {
        this.items = this.items.map(function (item) {
          if (item.id === id && [FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(item.itemType) > -1) {
            item.options.splice(optionIndex, 1, createOption(value));
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "setCheckboxDefaultOption",
      value: function setCheckboxDefaultOption(id, values) {
        this.items = this.items.map(function (item) {
          if (item.id === id && FormItemType.CHECKBOX === item.itemType) {
            item.defaultValue = values;
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "setRadioDefaultOption",
      value: function setRadioDefaultOption(id, value) {
        this.items = this.items.map(function (item) {
          if (item.id === id && FormItemType.RADIO === item.itemType) {
            item.defaultValue = value;
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "setSelectDefaultOption",
      value: function setSelectDefaultOption(id, value) {
        this.items = this.items.map(function (item) {
          if (item.id === id && FormItemType.SELECT === item.itemType) {
            item.defaultValue = value;
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "addCol",
      value: function addCol(id, rowIndex) {
        this.items = this.items.map(function (item) {
          if (item.id === id && FormItemType.LAYOUT === item.itemType) {
            item.rows[rowIndex].push({
              span: 12
            });
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "updateColSpan",
      value: function updateColSpan(id, rowIndex, colIndex, span) {
        this.items = this.items.map(function (item) {
          if (item.id === id && FormItemType.LAYOUT === item.itemType) {
            item.rows[rowIndex].splice(colIndex, 1, {
              span: span
            });
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "deleteCol",
      value: function deleteCol(id, rowIndex, colIndex) {
        this.items = this.items.map(function (item) {
          if (item.id === id && FormItemType.LAYOUT === item.itemType) {
            item.rows[rowIndex].splice(colIndex, 1);
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "updateTextItem",
      value: function updateTextItem(id, content, fontSize, lineHeight, textAlign) {
        this.items = this.items.map(function (item) {
          if (item.id === id && FormItemType.TEXT === item.itemType) {
            item.content = content;
            item.fontSize = fontSize;
            item.lineHeight = lineHeight;
            item.textAlign = textAlign;
          }

          return item;
        });
      }
    }, {
      kind: "method",
      key: "setRequired",
      value: function setRequired(id, required) {
        this.items = this.items.map(function (item) {
          if (item.id === id) {
            item.required = required;
          }

          return item;
        });
      }
    }, {
      kind: "get",
      key: "formItems",
      value: function formItems() {
        var _this = this;

        return this.items.map(function (item) {
          return _objectSpread2({}, item, {
            isActive: item.id === _this.activeId
          });
        });
      }
    }, {
      kind: "get",
      key: "activeItem",
      value: function activeItem() {
        return find(this.items, this.activeId);
      }
    }]
  };
});

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

var createFormValues = function createFormValues(items) {
  var values = items.reduce(function (values, item) {
    if ([FormItemType.INPUT, FormItemType.TEXTAREA, FormItemType.RADIO, FormItemType.CHECKBOX, FormItemType.SELECT].indexOf(item.itemType) > -1) {
      return _objectSpread2({}, values, _defineProperty({}, item.id, item.defaultValue));
    }

    return values;
  }, {});
  return {
    values: values,
    result: -1,
    comment: ''
  };
};

var shouldValidateRequired = function shouldValidateRequired(item) {
  return [FormItemType.INPUT, FormItemType.TEXTAREA, FormItemType.CHECKBOX, FormItemType.RADIO].indexOf(item.itemType) > -1;
};

function GeneratedForm(props) {
  var _props$form = props.form,
      items = _props$form.items,
      attrs = _props$form.attrs;
  var formWidth = attrs.formWidth,
      formWidthUnit = attrs.formWidthUnit,
      labelAlign = attrs.labelAlign,
      labelWidth = attrs.labelWidth;

  var _useState = useState(createFormValues(items)),
      _useState2 = _slicedToArray(_useState, 2),
      formValues = _useState2[0],
      setFormValues = _useState2[1];

  var _useState3 = useState({
    result: false,
    errors: {}
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      validationResult = _useState4[0],
      setValidationResult = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      validateCount = _useState6[0],
      setValidateCount = _useState6[1];

  function onSubmit() {
    console.log('form items =>', items);
    console.log('form values =>', formValues);
    var newValidationResult = validate(items, formValues);
    console.log(newValidationResult);

    if (newValidationResult.result) {
      if (props.onSubmit) props.onSubmit(formValues);
      setValidationResult({
        result: false,
        errors: {}
      });
      setFormValues(createFormValues(items));
    } else {
      setValidationResult(newValidationResult);
    }

    setValidateCount(validateCount + 1);
  }

  function validate(items, formValues) {
    var values = formValues.values;
    return items.reduce(function (_ref, item) {
      var result = _ref.result,
          errors = _ref.errors;

      // 校验必填项
      if (shouldValidateRequired(item) && item.required) {
        var _ref2 = item,
            _id = _ref2.id,
            labelText = _ref2.labelText;
        var value = values[_id];

        if ( // 空字符串
        typeof value === 'string' && value === '' || // 空数组
        Object.prototype.toString.call(value) === '[object Array]' && value.length === 0) {
          errors[_id] = "".concat(labelText, "\u4E3A\u5FC5\u586B\u9879");
          result = false;
        }
      } // 检验结果项为必填


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

  var renderFormItem = function renderFormItem(formItem) {
    var itemType = formItem.itemType;

    switch (itemType) {
      case FormItemType.RESULT:
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Radio.Group, {
          style: {
            height: 32,
            lineHeight: '32px',
            marginBottom: 16
          },
          value: formValues.result,
          onChange: function onChange(e) {
            return setFormValues(_objectSpread2({}, formValues, {
              result: e.target.value
            }));
          }
        }, /*#__PURE__*/React.createElement(_Radio, {
          value: 1
        }, "\u5408\u683C"), /*#__PURE__*/React.createElement(_Radio, {
          value: 0
        }, "\u4E0D\u5408\u683C"), /*#__PURE__*/React.createElement("span", {
          className: "err-msg"
        }, validateCount > 0 && formValues.result === -1 ? '检验结果为必填项' : '')), /*#__PURE__*/React.createElement(_Input.TextArea, {
          placeholder: "\u5907\u6CE8",
          value: formValues.comment,
          onChange: function onChange(e) {
            return setFormValues(_objectSpread2({}, formValues, {
              comment: e.target.value
            }));
          }
        }));

      case FormItemType.SELECT:
        var selectItem = formItem;
        return /*#__PURE__*/React.createElement(_Select, {
          value: formValues.values[selectItem.id],
          onChange: function onChange(value) {
            var values = formValues.values;
            setFormValues(_objectSpread2({}, formValues, {
              values: _objectSpread2({}, values, _defineProperty({}, selectItem.id, value))
            }));
          },
          style: {
            width: '100%'
          }
        }, selectItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(_Select.Option, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.CHECKBOX:
        var checkboxItem = formItem;
        return /*#__PURE__*/React.createElement(_Checkbox.Group, {
          value: formValues.values[checkboxItem.id],
          onChange: function onChange(value) {
            var values = formValues.values;
            setFormValues(_objectSpread2({}, formValues, {
              values: _objectSpread2({}, values, _defineProperty({}, checkboxItem.id, value))
            }));
          }
        }, checkboxItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(_Checkbox, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.RADIO:
        var radioItem = formItem;
        return /*#__PURE__*/React.createElement(_Radio.Group, {
          value: formValues.values[radioItem.id],
          onChange: function onChange(e) {
            var values = formValues.values;
            setFormValues(_objectSpread2({}, formValues, {
              values: _objectSpread2({}, values, _defineProperty({}, radioItem.id, e.target.value))
            }));
          },
          buttonStyle: radioItem.buttonStyle
        }, radioItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(_Radio.Button, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.TEXTAREA:
        var textareaItem = formItem;
        return /*#__PURE__*/React.createElement(_Input.TextArea, {
          value: formValues.values[textareaItem.id],
          onChange: function onChange(e) {
            var values = formValues.values;
            setFormValues(_objectSpread2({}, formValues, {
              values: _objectSpread2({}, values, _defineProperty({}, textareaItem.id, e.target.value))
            }));
          },
          placeholder: textareaItem.placeholder
        });

      case FormItemType.NUMBER:
        var numberItem = formItem;
        return /*#__PURE__*/React.createElement(_InputNumber, {
          style: {
            width: '100%'
          },
          value: formValues.values[numberItem.id],
          onChange: function onChange(value) {
            value = value || numberItem.min;
            var values = formValues.values;
            setFormValues(_objectSpread2({}, formValues, {
              values: _objectSpread2({}, values, _defineProperty({}, numberItem.id, value))
            }));
          },
          min: numberItem.min,
          max: numberItem.max,
          formatter: function formatter(value) {
            if (!value) return "".concat(numberItem.min, " ").concat(numberItem.unit);
            return "".concat(value, " ").concat(numberItem.unit);
          },
          parser: function parser(value) {
            if (!value) return Number(numberItem.min);
            return Number(value.replace(" ".concat(numberItem.unit), ''));
          }
        });

      default:
        var inputItem = formItem;
        return /*#__PURE__*/React.createElement(_Input, {
          value: formValues.values[inputItem.id],
          onChange: function onChange(e) {
            var values = formValues.values;
            setFormValues(_objectSpread2({}, formValues, {
              values: _objectSpread2({}, values, _defineProperty({}, inputItem.id, e.target.value))
            }));
          },
          placeholder: inputItem.placeholder
        });
    }
  };

  if (items.length === 0) return /*#__PURE__*/React.createElement(_Empty, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "generated-form",
    style: {
      width: "".concat(formWidth).concat(formWidthUnit)
    }
  }, items.map(function (item, index) {
    var itemType = item.itemType;

    if (itemType === FormItemType.TEXT) {
      var textItem = item;
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "form-item form-item-text",
        style: {
          fontSize: textItem.fontSize,
          lineHeight: "".concat(textItem.lineHeight, "px"),
          textAlign: textItem.textAlign
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-item-label"
      }, textItem.content));
    }

    if ([FormItemType.INPUT, FormItemType.NUMBER, FormItemType.TEXTAREA, FormItemType.RADIO, FormItemType.CHECKBOX, FormItemType.SELECT, FormItemType.RESULT].indexOf(itemType) > -1) {
      var errMsg = validationResult.errors[item.id];
      return /*#__PURE__*/React.createElement("div", {
        className: "form-item",
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: classnames('form-item-label', labelAlign === 'top' ? 'label-standalone' : ''),
        style: _objectSpread2({
          width: labelWidth
        }, labelAlign !== 'top' ? {
          textAlign: labelAlign
        } : {})
      }, item.labelText), /*#__PURE__*/React.createElement("div", {
        className: "form-item-content"
      }, renderFormItem(item), /*#__PURE__*/React.createElement("div", {
        className: "err-msg"
      }, errMsg)));
    }

    return null;
  }), /*#__PURE__*/React.createElement(_Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: labelWidth
    }
  }, /*#__PURE__*/React.createElement(_Button, {
    type: "primary",
    onClick: onSubmit,
    style: {
      width: 90,
      marginRight: 16
    }
  }, "\u63D0 \u4EA4"), /*#__PURE__*/React.createElement(_Button, {
    type: "default",
    onClick: function onClick() {
      return setFormValues(createFormValues(items));
    },
    style: {
      width: 90
    }
  }, "\u91CD \u7F6E")));
}

function Toolbar(props) {
  var form = props.form,
      formAttrs = props.formAttrs,
      onSave = props.onSave;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      modalVisible = _useState2[0],
      setModalVisible = _useState2[1];

  var getJson = function getJson() {
    return JSON.stringify({
      items: form.getItems(),
      attrs: formAttrs
    });
  };

  function onPreview() {
    setModalVisible(true);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "form-editor-toolbar-content"
  }, /*#__PURE__*/React.createElement(_Button, {
    type: "link",
    icon: "eye",
    onClick: onPreview
  }, "\u9884\u89C8"), /*#__PURE__*/React.createElement(_Button, {
    type: "link",
    icon: "save",
    onClick: function onClick() {
      return onSave(getJson());
    }
  }, "\u4FDD\u5B58"), /*#__PURE__*/React.createElement(_Modal, {
    title: "\u8868\u5355\u9884\u89C8",
    centered: true,
    visible: modalVisible,
    onCancel: function onCancel() {
      return setModalVisible(false);
    },
    footer: null,
    width: 800
  }, modalVisible ? /*#__PURE__*/React.createElement(GeneratedForm, {
    form: JSON.parse(getJson())
  }) : null));
}

var Toolbar$1 = observer(Toolbar);

var ItemTypes = {
  FIELD: 'field',
  EDITABLE_FIELD: 'eidtable_field',
  EDITABLE_FORM: 'editable_form'
};

function Field(props) {
  var name = props.name,
      text = props.text;

  var _useDrag = useDrag({
    item: {
      name: name,
      type: ItemTypes.FIELD
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    }
  }),
      _useDrag2 = _slicedToArray(_useDrag, 2),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1];

  return /*#__PURE__*/React.createElement("div", {
    ref: drag,
    className: "field",
    style: {
      opacity: isDragging ? 0.4 : 1
    }
  }, text);
}

var Field$1 = observer(Field);

var fields = {
  basic: [{
    name: 'input',
    text: '文本框'
  }, {
    name: 'number',
    text: '数字框'
  }, {
    name: 'textarea',
    text: '文本域'
  }, {
    name: 'radio',
    text: '单选框'
  }, {
    name: 'checkbox',
    text: '多选框'
  }, {
    name: 'select',
    text: '下拉选择框'
  }, {
    name: 'text',
    text: '文字'
  }],
  advanced: [// {
  //     name: 'layout',
  //     text: '布局'
  // },
  {
    name: 'result',
    text: '检验结果'
  }]
};

function FieldList() {
  var renderFields = function renderFields(label, fields) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, label), fields.map(function (_, i, fields) {
      if (i % 2 === 0) {
        var fieldsInRow = fields.slice(i, i + 2);
        return /*#__PURE__*/React.createElement(_Row, {
          gutter: 10,
          key: i
        }, fieldsInRow.map(function (field, j) {
          return /*#__PURE__*/React.createElement(_Col, {
            span: 12,
            key: "".concat(i, "-").concat(j)
          }, /*#__PURE__*/React.createElement(Field$1, {
            name: field.name,
            text: field.text
          }));
        }));
      }

      return null;
    }));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, renderFields('通用字段', fields.basic), renderFields('自定义字段', fields.advanced));
}

var FormAttrs = _decorate([observer], function (_initialize, _React$Component) {
  var FormAttrs = /*#__PURE__*/function (_React$Component2) {
    _inherits(FormAttrs, _React$Component2);

    var _super = _createSuper(FormAttrs);

    function FormAttrs() {
      var _this;

      _classCallCheck(this, FormAttrs);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initialize(_assertThisInitialized(_this));

      return _this;
    }

    return FormAttrs;
  }(_React$Component);

  return {
    F: FormAttrs,
    d: [{
      kind: "method",
      key: "render",
      value: function render() {
        var formAttrs = this.props.formAttrs;
        return /*#__PURE__*/React.createElement("div", {
          className: "attrs"
        }, /*#__PURE__*/React.createElement("div", {
          className: "attr-item"
        }, /*#__PURE__*/React.createElement("div", {
          className: "label"
        }, "\u8868\u5355\u5BBD\u5EA6"), /*#__PURE__*/React.createElement(_InputNumber, {
          className: "input",
          value: formAttrs.formWidth,
          min: 0,
          step: 1,
          onChange: function onChange(value) {
            if (value !== undefined) {
              formAttrs.formWidth = value;
            }
          }
        })), /*#__PURE__*/React.createElement("div", {
          className: "attr-item"
        }, /*#__PURE__*/React.createElement("div", {
          className: "label"
        }, "\u8868\u5355\u5BBD\u5EA6\u5355\u4F4D"), /*#__PURE__*/React.createElement(_Radio.Group, {
          className: "input",
          value: formAttrs.formWidthUnit,
          buttonStyle: "solid",
          onChange: function onChange(e) {
            formAttrs.formWidthUnit = e.target.value;
          }
        }, /*#__PURE__*/React.createElement(_Radio.Button, {
          value: "%"
        }, "\u767E\u5206\u6BD4 %"), /*#__PURE__*/React.createElement(_Radio.Button, {
          value: "px"
        }, "\u50CF\u7D20 px "))), /*#__PURE__*/React.createElement("div", {
          className: "attr-item"
        }, /*#__PURE__*/React.createElement("div", {
          className: "label"
        }, "\u6807\u7B7E\u5BBD\u5EA6"), /*#__PURE__*/React.createElement(_InputNumber, {
          className: "input",
          value: formAttrs.labelWidth,
          min: 0,
          step: 1,
          onChange: function onChange(value) {
            if (value !== undefined) {
              formAttrs.labelWidth = value;
            }
          }
        })), /*#__PURE__*/React.createElement("div", {
          className: "attr-item"
        }, /*#__PURE__*/React.createElement("div", {
          className: "label"
        }, "\u6807\u7B7E\u5BBD\u5EA6\u5355\u4F4D"), /*#__PURE__*/React.createElement(_Radio.Group, {
          className: "input",
          value: formAttrs.labelWidthUnit,
          buttonStyle: "solid",
          onChange: function onChange(e) {
            formAttrs.labelWidthUnit = e.target.value;
          }
        }, /*#__PURE__*/React.createElement(_Radio.Button, {
          value: "%"
        }, "\u767E\u5206\u6BD4 %"), /*#__PURE__*/React.createElement(_Radio.Button, {
          value: "px"
        }, "\u50CF\u7D20 px "))), /*#__PURE__*/React.createElement("div", {
          className: "attr-item"
        }, /*#__PURE__*/React.createElement("div", {
          className: "label"
        }, "\u6807\u7B7E\u5BF9\u9F50\u65B9\u5F0F"), /*#__PURE__*/React.createElement(_Radio.Group, {
          className: "input",
          value: formAttrs.labelAlign,
          buttonStyle: "solid",
          onChange: function onChange(e) {
            formAttrs.labelAlign = e.target.value;
          }
        }, /*#__PURE__*/React.createElement(_Radio.Button, {
          value: "left"
        }, "\u5DE6\u5BF9\u9F50"), /*#__PURE__*/React.createElement(_Radio.Button, {
          value: "right"
        }, "\u53F3\u5BF9\u9F50"), /*#__PURE__*/React.createElement(_Radio.Button, {
          value: "top"
        }, "\u9876\u90E8\u5BF9\u9F50"))));
      }
    }]
  };
}, React.Component);

var FormAttrsStore = _decorate(null, function (_initialize) {
  var FormAttrsStore = function FormAttrsStore() {
    _classCallCheck(this, FormAttrsStore);

    _initialize(this);
  };

  return {
    F: FormAttrsStore,
    d: [{
      kind: "field",
      decorators: [observable],
      key: "formWidth",
      value: function value() {
        return 100;
      }
    }, {
      kind: "field",
      decorators: [observable],
      key: "formWidthUnit",
      value: function value() {
        return '%';
      }
    }, {
      kind: "field",
      decorators: [observable],
      key: "labelAlign",
      value: function value() {
        return 'left';
      }
    }, {
      kind: "field",
      decorators: [observable],
      key: "labelWidth",
      value: function value() {
        return 100;
      }
    }, {
      kind: "field",
      decorators: [observable],
      key: "labelWidthUnit",
      value: function value() {
        return 'px';
      }
    }, {
      kind: "get",
      decorators: [computed],
      key: "formWidthString",
      value: function formWidthString() {
        return "".concat(this.formWidth).concat(this.formWidthUnit);
      }
    }, {
      kind: "get",
      decorators: [computed],
      key: "labelWidthString",
      value: function labelWidthString() {
        return "".concat(this.labelWidth).concat(this.labelWidthUnit);
      }
    }, {
      kind: "method",
      key: "reset",
      value: function reset(attrs) {
        this.formWidth = attrs.formWidth || 100;
        this.labelAlign = attrs.labelAlign || 'left';
        this.labelWidth = attrs.labelWidth || 100;
        this.labelWidthUnit = attrs.labelWidthUnit || 'px';
      }
    }]
  };
});
var formAttrsStore = new FormAttrsStore();

function FieldAttrs(props) {
  var form = props.form;
  var _ref = form.activeItem,
      id = _ref.id,
      itemType = _ref.itemType;
  var labelText = form.activeItem.labelText;

  function onChangeAttrs(newItem) {
    form.update(newItem);
  }

  var renderInputExtraAttrs = function renderInputExtraAttrs(item) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u8F93\u5165\u63D0\u793A"), /*#__PURE__*/React.createElement(_Input, {
      className: "input",
      value: item.placeholder,
      onChange: function onChange(e) {
        return onChangeAttrs(_objectSpread2({}, item, {
          placeholder: e.target.value
        }));
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u9ED8\u8BA4\u503C"), /*#__PURE__*/React.createElement(_Input, {
      className: "input",
      value: item.defaultValue,
      onChange: function onChange(e) {
        return onChangeAttrs(_objectSpread2({}, item, {
          defaultValue: e.target.value
        }));
      }
    })));
  };

  var renderNumberExtraAttrs = function renderNumberExtraAttrs(item) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u6700\u5C0F\u503C"), /*#__PURE__*/React.createElement(_InputNumber, {
      className: "input",
      value: item.min,
      onChange: function onChange(value) {
        return onChangeAttrs(_objectSpread2({}, item, {
          min: Number(value)
        }));
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u6700\u5927\u503C"), /*#__PURE__*/React.createElement(_InputNumber, {
      className: "input",
      value: item.max,
      onChange: function onChange(value) {
        return onChangeAttrs(_objectSpread2({}, item, {
          max: Number(value)
        }));
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u9ED8\u8BA4\u503C"), /*#__PURE__*/React.createElement(_InputNumber, {
      className: "input",
      value: item.defaultValue,
      min: item.min,
      max: item.max,
      onChange: function onChange(value) {
        return onChangeAttrs(_objectSpread2({}, item, {
          defaultValue: Number(value)
        }));
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u5355\u4F4D"), /*#__PURE__*/React.createElement(_Input, {
      className: "input",
      value: item.unit,
      onChange: function onChange(e) {
        return onChangeAttrs(_objectSpread2({}, item, {
          unit: e.target.value
        }));
      }
    })));
  };

  var renderItemOptions = function renderItemOptions(item) {
    var options = item.options;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u9009\u9879"), /*#__PURE__*/React.createElement(_List, {
      size: "small",
      itemLayout: "horizontal",
      dataSource: options,
      renderItem: function renderItem(option, optionIndex) {
        return /*#__PURE__*/React.createElement(_List.Item, {
          key: optionIndex
        }, /*#__PURE__*/React.createElement("div", {
          className: "attr-item-option"
        }, /*#__PURE__*/React.createElement(_Input, {
          value: option.value,
          onChange: function onChange(e) {
            form.updateOption(item.id, optionIndex, e.target.value);
          }
        }), /*#__PURE__*/React.createElement(_Button, {
          type: "danger",
          icon: "delete",
          className: "btn-delete-option",
          onClick: function onClick() {
            return form.deleteOption(item.id, optionIndex);
          }
        }, "\u5220\u9664")));
      }
    }), /*#__PURE__*/React.createElement(_Button, {
      type: "primary",
      onClick: function onClick() {
        return form.addOption(item.id);
      },
      icon: "plus"
    }, "\u6DFB\u52A0\u9009\u9879")));
  };

  var renderCheckboxExtraAttrs = function renderCheckboxExtraAttrs(item) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u9ED8\u8BA4\u503C"), /*#__PURE__*/React.createElement(_Select, {
      mode: "tags",
      value: item.defaultValue,
      style: {
        width: '100%'
      },
      onChange: function onChange(values) {
        return form.setCheckboxDefaultOption(item.id, values);
      }
    }, item.options.map(function (option, optionIndex) {
      return /*#__PURE__*/React.createElement(_Select.Option, {
        key: optionIndex,
        value: option.value
      }, option.value);
    }))));
  };

  var renderRadioExtraAttrs = function renderRadioExtraAttrs(item) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u9ED8\u8BA4\u503C"), /*#__PURE__*/React.createElement(_Select, {
      value: item.defaultValue,
      style: {
        width: '100%'
      },
      onChange: function onChange(value) {
        return form.setRadioDefaultOption(item.id, value);
      }
    }, item.options.map(function (option, optionIndex) {
      return /*#__PURE__*/React.createElement(_Select.Option, {
        key: optionIndex,
        value: option.value
      }, option.value);
    }))));
  };

  var renderSelectExtraAttrs = function renderSelectExtraAttrs(item) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u9ED8\u8BA4\u503C"), /*#__PURE__*/React.createElement(_Select, {
      value: item.defaultValue,
      style: {
        width: '100%'
      },
      onChange: function onChange(value) {
        return form.setSelectDefaultOption(item.id, value);
      }
    }, item.options.map(function (option, optionIndex) {
      return /*#__PURE__*/React.createElement(_Select.Option, {
        key: optionIndex,
        value: option.value
      }, option.value);
    }))));
  };

  var renderLayoutExtraAttrs = function renderLayoutExtraAttrs(item) {
    var rows = item.rows;
    return /*#__PURE__*/React.createElement(React.Fragment, null, rows.map(function (row, rowIndex) {
      return /*#__PURE__*/React.createElement("div", {
        className: "attr-item",
        key: rowIndex
      }, /*#__PURE__*/React.createElement("div", {
        className: "label"
      }, "\u5217\u5BBD"), /*#__PURE__*/React.createElement(_List, {
        size: "small",
        itemLayout: "horizontal",
        dataSource: row,
        renderItem: function renderItem(col, colIndex) {
          return /*#__PURE__*/React.createElement(_List.Item, {
            key: colIndex
          }, /*#__PURE__*/React.createElement("div", {
            className: "attr-item-option"
          }, /*#__PURE__*/React.createElement(_InputNumber, {
            className: "input",
            value: col.span,
            min: 1,
            max: 24,
            step: 1,
            onChange: function onChange(value) {
              form.updateColSpan(item.id, rowIndex, colIndex, Number(value));
            }
          }), /*#__PURE__*/React.createElement(_Button, {
            type: "danger",
            icon: "delete",
            className: "btn-delete-option",
            onClick: function onClick() {
              return form.deleteCol(item.id, rowIndex, colIndex);
            }
          }, "\u5220\u9664")));
        }
      }), /*#__PURE__*/React.createElement(_Button, {
        type: "primary",
        onClick: function onClick() {
          return form.addCol(item.id, rowIndex);
        },
        icon: "plus"
      }, "\u6DFB\u52A0\u5217"));
    }));
  };

  var renderTextExtraAttrs = function renderTextExtraAttrs(item) {
    var id = item.id,
        content = item.content,
        fontSize = item.fontSize,
        lineHeight = item.lineHeight,
        textAlign = item.textAlign;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u6587\u5B57\u5185\u5BB9"), /*#__PURE__*/React.createElement(_Input.TextArea, {
      value: content,
      onChange: function onChange(e) {
        return form.updateTextItem(id, e.target.value, fontSize, lineHeight, textAlign);
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u6587\u5B57\u5927\u5C0F"), /*#__PURE__*/React.createElement(_InputNumber, {
      className: "input",
      value: fontSize,
      min: 12,
      max: 100,
      step: 1,
      onChange: function onChange(newFontSize) {
        return form.updateTextItem(id, content, Number(newFontSize), lineHeight, textAlign);
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u6587\u5B57\u884C\u9AD8"), /*#__PURE__*/React.createElement(_InputNumber, {
      className: "input",
      value: lineHeight,
      min: 12,
      max: 100,
      step: 1,
      onChange: function onChange(newLineHeight) {
        return form.updateTextItem(id, content, fontSize, Number(newLineHeight), textAlign);
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u5BF9\u9F50\u65B9\u5F0F"), /*#__PURE__*/React.createElement(_Select, {
      style: {
        width: '100%'
      },
      value: textAlign,
      onChange: function onChange(newTextAlign) {
        return form.updateTextItem(id, content, fontSize, lineHeight, newTextAlign);
      }
    }, /*#__PURE__*/React.createElement(_Select.Option, {
      value: 'left'
    }, "\u5DE6\u5BF9\u9F50"), /*#__PURE__*/React.createElement(_Select.Option, {
      value: 'right'
    }, "\u53F3\u5BF9\u9F50"), /*#__PURE__*/React.createElement(_Select.Option, {
      value: 'center'
    }, "\u5C45\u4E2D"))));
  };

  var renderValidationAttrs = function renderValidationAttrs(item) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "attr-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, "\u662F\u5426\u5FC5\u586B"), /*#__PURE__*/React.createElement(_Radio.Group, {
      value: item.required,
      onChange: function onChange(e) {
        return form.setRequired(item.id, e.target.value);
      }
    }, /*#__PURE__*/React.createElement(_Radio, {
      value: true
    }, "\u5FC5\u586B"), /*#__PURE__*/React.createElement(_Radio, {
      value: false
    }, "\u9009\u586B"))));
  };

  var hasLabelText = [FormItemType.INPUT, FormItemType.NUMBER, FormItemType.TEXTAREA, FormItemType.CHECKBOX, FormItemType.RADIO, FormItemType.SELECT].indexOf(itemType) > -1;
  var hasValidationAttrs = [FormItemType.INPUT, FormItemType.TEXTAREA, FormItemType.CHECKBOX, FormItemType.RADIO].indexOf(itemType) > -1;
  return /*#__PURE__*/React.createElement("div", {
    className: "attrs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "attr-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "\u6807\u8BC6"), /*#__PURE__*/React.createElement(_Input, {
    className: "input",
    value: id,
    disabled: true
  })), hasLabelText ? /*#__PURE__*/React.createElement("div", {
    className: "attr-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "\u6807\u7B7E\u6587\u5B57"), /*#__PURE__*/React.createElement(_Input, {
    className: "input",
    value: labelText,
    onChange: function onChange(e) {
      return onChangeAttrs(_objectSpread2({}, form.activeItem, {}, labelText ? {} : {}));
    }
  })) : null, itemType === FormItemType.INPUT ? renderInputExtraAttrs(form.activeItem) : null, itemType === FormItemType.NUMBER ? renderNumberExtraAttrs(form.activeItem) : null, itemType === FormItemType.TEXTAREA ? renderInputExtraAttrs(form.activeItem) : null, itemType === FormItemType.CHECKBOX ? renderItemOptions(form.activeItem) : null, itemType === FormItemType.CHECKBOX ? renderCheckboxExtraAttrs(form.activeItem) : null, itemType === FormItemType.RADIO ? renderItemOptions(form.activeItem) : null, itemType === FormItemType.RADIO ? renderRadioExtraAttrs(form.activeItem) : null, itemType === FormItemType.SELECT ? renderItemOptions(form.activeItem) : null, itemType === FormItemType.SELECT ? renderSelectExtraAttrs(form.activeItem) : null, itemType === FormItemType.LAYOUT ? renderLayoutExtraAttrs(form.activeItem) : null, itemType === FormItemType.TEXT ? renderTextExtraAttrs(form.activeItem) : null, hasValidationAttrs ? renderValidationAttrs(form.activeItem) : null);
}

var FieldAttrs$1 = observer(FieldAttrs);

var TabPane = _Tabs.TabPane;

var AttrsPanel = /*#__PURE__*/function (_React$Component) {
  _inherits(AttrsPanel, _React$Component);

  var _super = _createSuper(AttrsPanel);

  function AttrsPanel() {
    var _this;

    _classCallCheck(this, AttrsPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onChangeTab", function (activeTab) {// console.log(activeTab)
    });

    return _this;
  }

  _createClass(AttrsPanel, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(_Tabs, {
        onChange: this.onChangeTab,
        animated: false
      }, /*#__PURE__*/React.createElement(TabPane, {
        tab: "\u5B57\u6BB5\u5C5E\u6027",
        key: "field-attrs"
      }, /*#__PURE__*/React.createElement(FieldAttrs$1, {
        form: formStore
      })), /*#__PURE__*/React.createElement(TabPane, {
        tab: "\u8868\u5355\u5C5E\u6027",
        key: "form-attrs"
      }, /*#__PURE__*/React.createElement(FormAttrs, {
        formAttrs: formAttrsStore
      })));
    }
  }]);

  return AttrsPanel;
}(React.Component);

function EditableField(props) {
  var formItem = props.formItem,
      formItemIndex = props.formItemIndex,
      moveFormItem = props.moveFormItem;
  var ref = useRef(null);

  var _useDrop = useDrop({
    accept: [ItemTypes.EDITABLE_FIELD],
    hover: function hover(item, monitor) {
      if (ref.current === null) {
        return;
      }

      var dragIndex = item.index;
      var hoverIndex = formItemIndex; // Don't replace items with themselves

      if (dragIndex === hoverIndex) {
        return;
      } // Determine rectangle on screen


      var hoverBoundingRect = ref.current.getBoundingClientRect(); // Get vertical middle

      var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Determine mouse position

      var clientOffset = monitor.getClientOffset();
      if (clientOffset === null) return; // Get pixels to the top

      var hoverClientY = clientOffset.y - hoverBoundingRect.top; // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      } // Dragging upwards


      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      } // Time to actually perform the action


      moveFormItem(dragIndex, hoverIndex) // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      ;
      item.index = hoverIndex;
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      drop = _useDrop2[1];

  var _useDrag = useDrag({
    item: {
      index: formItemIndex,
      type: ItemTypes.EDITABLE_FIELD
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    }
  }),
      _useDrag2 = _slicedToArray(_useDrag, 2),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1];

  drag(drop(ref));

  var renderFormItem = function renderFormItem(formItem) {
    var itemType = formItem.itemType;

    switch (itemType) {
      case FormItemType.RESULT:
        // const resultItem = formItem as (ResultItem & { isActive: boolean })
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Radio.Group, {
          value: "\u5408\u683C",
          style: {
            height: 32,
            lineHeight: '32px',
            marginBottom: 16
          }
        }, /*#__PURE__*/React.createElement(_Radio, {
          value: "\u5408\u683C"
        }, "\u5408\u683C"), /*#__PURE__*/React.createElement(_Radio, {
          value: "\u4E0D\u5408\u683C"
        }, "\u4E0D\u5408\u683C")), /*#__PURE__*/React.createElement(_Input.TextArea, {
          value: "",
          placeholder: "\u5907\u6CE8"
        }));

      case FormItemType.SELECT:
        var selectItem = formItem;
        return /*#__PURE__*/React.createElement(_Select, {
          value: selectItem.defaultValue,
          style: {
            width: '100%'
          }
        }, selectItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(_Select.Option, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.CHECKBOX:
        var checkboxItem = formItem;
        return /*#__PURE__*/React.createElement(_Checkbox.Group, {
          value: checkboxItem.defaultValue
        }, checkboxItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(_Checkbox, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.RADIO:
        var radioItem = formItem;
        return /*#__PURE__*/React.createElement(_Radio.Group, {
          value: radioItem.defaultValue,
          buttonStyle: radioItem.buttonStyle
        }, radioItem.options.map(function (option, optionIndex) {
          return /*#__PURE__*/React.createElement(_Radio.Button, {
            key: optionIndex,
            value: option.value
          }, option.text);
        }));

      case FormItemType.TEXTAREA:
        var textareaItem = formItem;
        return /*#__PURE__*/React.createElement(_Input.TextArea, {
          value: textareaItem.defaultValue,
          placeholder: textareaItem.placeholder
        });

      case FormItemType.NUMBER:
        var numberItem = formItem;
        return /*#__PURE__*/React.createElement(_InputNumber, {
          style: {
            width: '100%'
          },
          value: numberItem.defaultValue,
          formatter: function formatter(value) {
            if (!value) return "".concat(numberItem.min, " ").concat(numberItem.unit);
            return "".concat(value, " ").concat(numberItem.unit);
          },
          parser: function parser(value) {
            if (!value) return Number(numberItem.min);
            return Number(value.replace(" ".concat(numberItem.unit), ''));
          }
        });

      default:
        var inputItem = formItem;
        return /*#__PURE__*/React.createElement(_Input, {
          value: inputItem.defaultValue || '',
          placeholder: inputItem.placeholder
        });
    }
  };

  if (formItem.itemType === FormItemType.LAYOUT) {
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: classnames('field-editable field-editable-layout', formItem.isActive ? 'field-editable-active' : ''),
      style: {
        opacity: isDragging ? 0.4 : 1
      },
      onMouseDown: function onMouseDown() {
        return formStore.activate(formItem.id);
      }
    }, formItem.rows.map(function (row, rowIndex) {
      return /*#__PURE__*/React.createElement(_Row, {
        key: rowIndex,
        gutter: 5
      }, row.map(function (col, colIndex) {
        return /*#__PURE__*/React.createElement(_Col, {
          key: colIndex,
          span: col.span
        });
      }));
    }), /*#__PURE__*/React.createElement(_Button, {
      className: "btn-delete",
      type: "danger",
      size: "small",
      icon: "delete",
      onClick: function onClick() {
        return formStore["delete"](formItem.id);
      }
    }, "\u5220\u9664"));
  }

  if (formItem.itemType === FormItemType.TEXT) {
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: classnames('field-editable field-editable-text', formItem.isActive ? 'field-editable-active' : ''),
      style: {
        opacity: isDragging ? 0.4 : 1
      },
      onMouseDown: function onMouseDown() {
        return formStore.activate(formItem.id);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: formItem.fontSize,
        lineHeight: "".concat(formItem.lineHeight, "px"),
        textAlign: formItem.textAlign
      }
    }, formItem.content), /*#__PURE__*/React.createElement(_Button, {
      className: "btn-delete",
      type: "danger",
      size: "small",
      icon: "delete",
      onClick: function onClick() {
        return formStore["delete"](formItem.id);
      }
    }, "\u5220\u9664"));
  }

  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: classnames('field-editable', formAttrsStore.labelAlign === 'top' ? 'label-standalone' : '', formItem.isActive ? 'field-editable-active' : ''),
    style: {
      opacity: isDragging ? 0.4 : 1
    },
    onMouseDown: function onMouseDown() {
      return formStore.activate(formItem.id);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames('field-editable-label', formAttrsStore.labelAlign === 'top' ? 'field-standalone' : ''),
    style: _objectSpread2({
      width: formAttrsStore.labelWidth
    }, formAttrsStore.labelAlign !== 'top' ? {
      textAlign: formAttrsStore.labelAlign
    } : {})
  }, formItem.labelText), /*#__PURE__*/React.createElement("div", {
    className: "field-editable-content"
  }, renderFormItem(formItem)), /*#__PURE__*/React.createElement(_Button, {
    className: "btn-delete",
    type: "danger",
    size: "small",
    icon: "delete",
    onClick: function onClick() {
      return formStore["delete"](formItem.id);
    }
  }, "\u5220\u9664"));
}

var EditableField$1 = observer(EditableField);

function EditableForm(props) {
  var formAttrs = props.formAttrs,
      form = props.form;
  var moveFormItem = useCallback(function (dragIndex, hoverIndex) {
    return form.move(dragIndex, hoverIndex);
  }, [form.formItems]);

  var _useDrop = useDrop({
    accept: [ItemTypes.FIELD],
    drop: function drop(item, monitor) {
      if (item.type === ItemTypes.FIELD) {
        form.add(item.name);
      }
    },
    collect: function collect(monitor) {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      };
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      _useDrop2$ = _useDrop2[0],
      isOver = _useDrop2$.isOver,
      canDrop = _useDrop2$.canDrop,
      drop = _useDrop2[1];

  return /*#__PURE__*/React.createElement("div", {
    ref: drop,
    className: "editable-form",
    style: {
      width: formAttrs.formWidthString
    }
  }, form.formItems.map(function (formItem, index) {
    return /*#__PURE__*/React.createElement(EditableField$1, {
      key: formItem.id,
      formItem: formItem,
      formItemIndex: index,
      moveFormItem: moveFormItem
    });
  }));
}

var EditableForm$1 = observer(EditableForm);

// import 'mobx-react-lite/batchingForReactDom'

var Header = _Layout.Header,
    Content = _Layout.Content,
    Sider = _Layout.Sider;
function FormEditor(props) {
  var style = props.style,
      _props$defaultFormIte = props.defaultFormItems,
      defaultFormItems = _props$defaultFormIte === void 0 ? [] : _props$defaultFormIte,
      defaultFormAttrs = props.defaultFormAttrs,
      _props$onSave = props.onSave,
      onSave = _props$onSave === void 0 ? console.log : _props$onSave;
  useEffect(function () {
    formStore.setItems(defaultFormItems);

    if (defaultFormAttrs) {
      formAttrsStore.reset(defaultFormAttrs);
    }
  }, []);
  return /*#__PURE__*/React.createElement(DndProvider, {
    backend: Backend
  }, /*#__PURE__*/React.createElement(_Layout, {
    className: "form-editor",
    style: style
  }, /*#__PURE__*/React.createElement(Sider, {
    theme: "light",
    className: "form-editor-components"
  }, /*#__PURE__*/React.createElement(FieldList, null)), /*#__PURE__*/React.createElement(_Layout, {
    className: "form-editor-content"
  }, /*#__PURE__*/React.createElement(_Layout, {
    className: "form-editor-content-main"
  }, /*#__PURE__*/React.createElement(Header, {
    className: "form-editor-toolbar"
  }, /*#__PURE__*/React.createElement(Toolbar$1, {
    formAttrs: formAttrsStore,
    form: formStore,
    onSave: onSave
  })), /*#__PURE__*/React.createElement(Content, {
    className: "form-editor-editarea"
  }, /*#__PURE__*/React.createElement(EditableForm$1, {
    formAttrs: formAttrsStore,
    form: formStore
  }))), /*#__PURE__*/React.createElement(Sider, {
    theme: "light",
    width: 300,
    className: "form-editor-content-attrs"
  }, /*#__PURE__*/React.createElement(AttrsPanel, null)))));
}

export default FormEditor;
