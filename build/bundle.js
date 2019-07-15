(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
  (global = global || self, factory(global.React, global.PropTypes));
}(this, function (React, PropTypes) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

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
      keys.push.apply(keys, Object.getOwnPropertySymbols(object));
    }

    if (enumerableOnly) keys = keys.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var AsideSlide =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(AsideSlide, _React$Component);

    _createClass(AsideSlide, null, [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        // we aren't in a transition but an open slide wants to show content
        if (!state.inTransit && !props.renderEmpty && state.isOpen) {
          return {
            renderEmpty: props.renderEmpty
          };
        }

        return null;
      }
    }]);

    function AsideSlide(props) {
      var _this;

      _classCallCheck(this, AsideSlide);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AsideSlide).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "getAsideBaseClassModifier", function () {
        switch (true) {
          case _this.props.isOpen && !_this.state.inTransit: // open

          case !_this.props.isOpen && _this.state.inTransit:
            // openning
            return 'is-open';

          case _this.props.isOpen && _this.state.inTransit: // closing

          case !_this.props.isOpen && !_this.state.inTransit: // closed

          default:
            return '';
        }
      });

      _defineProperty(_assertThisInitialized(_this), "toggleVisibility", function () {
        var setTransit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (setTransit) {
          _this.setState({
            inTransit: true
          });

          setTimeout(function () {
            _this.setState(function () {
              return {
                inTransit: false,
                showEmpty: _this.props.renderEmpty,
                showContent: _this.props.renderEmpty
              };
            });
          }, 550);
        }

        _this.setState(function () {
          return {
            showEmpty: _this.props.renderEmpty,
            showContent: _this.props.isOpen
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "delayEmptyToggle", function () {
        setTimeout(function () {
          _this.setState(function () {
            return {
              showEmpty: _this.props.renderEmpty
            };
          });
        }, 550);
      });

      _this.state = {
        showContent: props.isOpen,
        showEmpty: false,
        inTransit: false
      };
      return _this;
    }

    _createClass(AsideSlide, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.renderEmpty === false && this.props.renderEmpty) {
          // delayed for animation
          this.delayEmptyToggle();
        } else if (prevProps.renderEmpty !== this.props.renderEmpty) {
          // immediate
          this.toggleVisibility(false);
        } else if (this.props.renderEmpty === null && this.props.isOpen === true && prevProps.isOpen !== true) {
          this.toggleVisibility(false);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement("div", {
          className: "aside-slide ".concat(this.getAsideBaseClassModifier(), " ").concat(this.props.bgcAlt ? 'aside-slide--bgc-alt' : '', " ").concat(this.props.renderEmpty ? '' : ''),
          "data-qe-id": this.props.qeId ? "component-aside_slide-".concat(this.props.qeId) : ''
        }, React__default.createElement("div", {
          className: "aside-slide__clickable-area"
        }, React__default.createElement("button", {
          className: "aside-slide__clickable-area__button",
          onClick: this.props.toggle,
          type: "button",
          "data-qe-id": "component_action-aside_slide-close"
        })), React__default.createElement("div", {
          id: this.props.innerId,
          className: "aside-slide__inner".concat(this.props.slideBar !== null ? '--padded' : '')
        }, this.state.showEmpty || !this.state.showContent ? null : React__default.createElement("div", {
          className: "aside-slide__inner__header"
        }, this.props.toggleButton ? React__default.createElement("span", {
          className: "aside-slide__inner__header__item--lt"
        }, this.props.toggleButton) : null, React__default.createElement("span", {
          className: "aside-slide__inner__header__item"
        }, this.props.title), this.props.actionComponent && React__default.createElement("span", {
          className: "aside-slide__inner__header__item--right"
        }, this.props.actionComponent)), React__default.createElement("div", {
          className: "aside-slide__inner__body"
        }, this.state.showEmpty || !this.state.showContent ? null : this.props.children)), this.state.showContent && this.props.slideBar !== null ? React__default.createElement("div", {
          className: "aside-slide__bar"
        }, React__default.createElement("div", {
          className: "aside-slide__bar__inner"
        }, this.props.slideBar())) : null);
      }
    }]);

    return AsideSlide;
  }(React__default.Component);

  _defineProperty(AsideSlide, "defaultProps", {
    bgcAlt: false,
    toggleButton: null,
    actionComponent: null,
    renderEmpty: null,
    slideBar: null,
    innerId: '',
    qeId: ''
  });

  _defineProperty(AsideSlide, "propTypes", {
    isOpen: PropTypes.bool.isRequired,
    children: function children(props, propName, componentName) {
      if (!Object.prototype.hasOwnProperty.call(props, propName)) {
        throw new Error("Prop `".concat(propName, "` has type 'any' or 'mixed', but was not provided to `").concat(componentName, "`. Pass undefined or any other value."));
      }
    },
    title: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    bgcAlt: PropTypes.bool,
    toggleButton: PropTypes.object,
    actionComponent: PropTypes.object,
    renderEmpty: PropTypes.bool,
    slideBar: PropTypes.func,
    innerId: PropTypes.string,
    qeId: PropTypes.string
  });

  /*
   * ::Expected Children Elements::
   * button | anchor | span
   */

  var DropOptions =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DropOptions, _React$Component);

    function DropOptions(props) {
      var _this;

      _classCallCheck(this, DropOptions);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(DropOptions).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "getChildren", function () {
        return React__default.Children.map(_this.props.children, function (child) {
          return React__default.createElement("div", {
            className: "drop-options__options__item"
          }, child);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "killListener", function () {
        return document.removeEventListener('click', _this.listenerAction);
      });

      _defineProperty(_assertThisInitialized(_this), "startListener", function () {
        return document.addEventListener('click', _this.listenerAction);
      });

      _defineProperty(_assertThisInitialized(_this), "listenerAction", function () {
        _this.close();

        _this.killListener();
      });

      _defineProperty(_assertThisInitialized(_this), "close", function () {
        return _this.setState(function (prevState) {
          return _objectSpread2({}, prevState, {
            isOpen: false
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "toggleOpenState", function () {
        return _this.setState(function (prevState) {
          if (prevState.isOpen) {
            // next state is false
            _this.killListener();
          } else {
            // next state is true
            _this.startListener();
          }

          return _objectSpread2({}, prevState, {
            isOpen: !prevState.isOpen
          });
        });
      });

      _this.state = {
        isOpen: false
      };
      return _this;
    }

    DropOptions.propTypes = {
      baseElement: PropTypes.func,
      // JSX must return a span
      children: PropTypes.any,
      // used to generate options
      wrapperClass: PropTypes.string
    };

    _createClass(DropOptions, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.killListener();
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement("div", {
          className: "".concat(this.props.wrapperClass, " drop-options-container")
        }, React__default.createElement("div", {
          className: "drop-options"
        }, React__default.createElement("div", {
          className: "drop-options__base"
        }, React__default.createElement("button", {
          className: "drop-options__base__btn",
          onClick: this.toggleOpenState
        }, this.props.baseElement())), React__default.createElement("div", {
          className: "drop-options__options ".concat(this.state.isOpen ? 'drop-options__options--is-open' : '')
        }, this.state.isOpen && this.getChildren())));
      }
    }]);

    return DropOptions;
  }(React__default.Component);

  _defineProperty(DropOptions, "defaultProps", {
    children: [],
    wrapperClass: '',
    baseElement: function baseElement() {
      return 'Base Element';
    }
  });

  _defineProperty(DropOptions, "propTypes", {
    baseElement: PropTypes.func,
    children: PropTypes.any,
    wrapperClass: PropTypes.string
  });

  var Overlay = function Overlay(_ref) {
    var baseClass = _ref.baseClass,
        children = _ref.children,
        isOpen = _ref.isOpen,
        size = _ref.size;

    var _useState = React.useState(0),
        _useState2 = _slicedToArray(_useState, 2),
        activeChild = _useState2[0],
        setActiveChild = _useState2[1];

    var maxChildCount = React__default.Children.count(children);
    return React__default.createElement("div", {
      className: "".concat(baseClass, " ").concat(isOpen ? 'is-open' : 'is-closed')
    }, React__default.createElement("div", {
      className: "".concat(baseClass, "__inner ").concat(size ? "wrap".concat(size) : '')
    }, React__default.Children.map(children, function (child, index) {
      return index === activeChild && React__default.cloneElement(child, child.type !== 'div' ? {
        next: function next() {
          if (maxChildCount - 1 > activeChild) {
            setActiveChild(activeChild + 1);
          }
        },
        prev: function prev() {
          if (activeChild > 0) {
            setActiveChild(activeChild - 1);
          }
        }
      } : {});
    })));
  };

  Overlay.propTypes = {
    baseClass: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.object]),
    isOpen: PropTypes.bool.isRequired,
    size: PropTypes.string
  };
  Overlay.defaultProps = {
    children: [],
    size: '',
    baseClass: 'modal'
  };

  exports.AsideSlide = AsideSlide;
  exports.DropOptions = DropOptions;
  exports.Overlay = Overlay;

}));
