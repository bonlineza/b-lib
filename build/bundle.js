(function (React, PropTypes) {
  'use strict';

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

}(React, PropTypes));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9Bc2lkZVNsaWRlL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvRHJvcE9wdGlvbnMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9PdmVybGF5L2luZGV4LmpzIiwiLi4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9zY3NzL1N0eWxlcy5zY3NzJztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGlzT3BlbjogYm9vbGVhbixcbiAgY2hpbGRyZW46IGFueSxcbiAgdGl0bGU6IHN0cmluZyxcbiAgdG9nZ2xlOiBGdW5jdGlvbixcbiAgYmdjQWx0PzogYm9vbGVhbixcbiAgdG9nZ2xlQnV0dG9uPzogT2JqZWN0LFxuICBhY3Rpb25Db21wb25lbnQ/OiBPYmplY3QsXG4gIHJlbmRlckVtcHR5PzogYm9vbGVhbixcbiAgc2xpZGVCYXI/OiBGdW5jdGlvbiB8IG51bGwsXG4gIGlubmVySWQ/OiBzdHJpbmcsXG4gIHFlSWQ/OiBzdHJpbmcsXG59O1xuXG5jbGFzcyBBc2lkZVNsaWRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzVHlwZT4ge1xuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKHByb3BzLCBzdGF0ZSkge1xuICAgIC8vIHdlIGFyZW4ndCBpbiBhIHRyYW5zaXRpb24gYnV0IGFuIG9wZW4gc2xpZGUgd2FudHMgdG8gc2hvdyBjb250ZW50XG4gICAgaWYgKCFzdGF0ZS5pblRyYW5zaXQgJiYgIXByb3BzLnJlbmRlckVtcHR5ICYmIHN0YXRlLmlzT3Blbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyRW1wdHk6IHByb3BzLnJlbmRlckVtcHR5LFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBiZ2NBbHQ6IGZhbHNlLFxuICAgIHRvZ2dsZUJ1dHRvbjogbnVsbCxcbiAgICBhY3Rpb25Db21wb25lbnQ6IG51bGwsXG4gICAgcmVuZGVyRW1wdHk6IG51bGwsXG4gICAgc2xpZGVCYXI6IG51bGwsXG4gICAgaW5uZXJJZDogJycsXG4gICAgcWVJZDogJycsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNob3dDb250ZW50OiBwcm9wcy5pc09wZW4sXG4gICAgICBzaG93RW1wdHk6IGZhbHNlLFxuICAgICAgaW5UcmFuc2l0OiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmIChwcmV2UHJvcHMucmVuZGVyRW1wdHkgPT09IGZhbHNlICYmIHRoaXMucHJvcHMucmVuZGVyRW1wdHkpIHtcbiAgICAgIC8vIGRlbGF5ZWQgZm9yIGFuaW1hdGlvblxuICAgICAgdGhpcy5kZWxheUVtcHR5VG9nZ2xlKCk7XG4gICAgfSBlbHNlIGlmIChwcmV2UHJvcHMucmVuZGVyRW1wdHkgIT09IHRoaXMucHJvcHMucmVuZGVyRW1wdHkpIHtcbiAgICAgIC8vIGltbWVkaWF0ZVxuICAgICAgdGhpcy50b2dnbGVWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5yZW5kZXJFbXB0eSA9PT0gbnVsbCAmJlxuICAgICAgdGhpcy5wcm9wcy5pc09wZW4gPT09IHRydWUgJiZcbiAgICAgIHByZXZQcm9wcy5pc09wZW4gIT09IHRydWVcbiAgICApIHtcbiAgICAgIHRoaXMudG9nZ2xlVmlzaWJpbGl0eShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QXNpZGVCYXNlQ2xhc3NNb2RpZmllciA9ICgpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5pc09wZW4gJiYgIXRoaXMuc3RhdGUuaW5UcmFuc2l0OiAvLyBvcGVuXG4gICAgICBjYXNlICF0aGlzLnByb3BzLmlzT3BlbiAmJiB0aGlzLnN0YXRlLmluVHJhbnNpdDogLy8gb3Blbm5pbmdcbiAgICAgICAgcmV0dXJuICdpcy1vcGVuJztcbiAgICAgIGNhc2UgdGhpcy5wcm9wcy5pc09wZW4gJiYgdGhpcy5zdGF0ZS5pblRyYW5zaXQ6IC8vIGNsb3NpbmdcbiAgICAgIGNhc2UgIXRoaXMucHJvcHMuaXNPcGVuICYmICF0aGlzLnN0YXRlLmluVHJhbnNpdDogLy8gY2xvc2VkXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9O1xuXG4gIHRvZ2dsZVZpc2liaWxpdHkgPSAoc2V0VHJhbnNpdCA9IHRydWUpID0+IHtcbiAgICBpZiAoc2V0VHJhbnNpdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGluVHJhbnNpdDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICBpblRyYW5zaXQ6IGZhbHNlLFxuICAgICAgICAgIHNob3dFbXB0eTogdGhpcy5wcm9wcy5yZW5kZXJFbXB0eSxcbiAgICAgICAgICBzaG93Q29udGVudDogdGhpcy5wcm9wcy5yZW5kZXJFbXB0eSxcbiAgICAgICAgfSkpO1xuICAgICAgfSwgNTUwKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgc2hvd0VtcHR5OiB0aGlzLnByb3BzLnJlbmRlckVtcHR5LFxuICAgICAgc2hvd0NvbnRlbnQ6IHRoaXMucHJvcHMuaXNPcGVuLFxuICAgIH0pKTtcbiAgfTtcblxuICBkZWxheUVtcHR5VG9nZ2xlID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICBzaG93RW1wdHk6IHRoaXMucHJvcHMucmVuZGVyRW1wdHksXG4gICAgICB9KSk7XG4gICAgfSwgNTUwKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgYXNpZGUtc2xpZGUgJHt0aGlzLmdldEFzaWRlQmFzZUNsYXNzTW9kaWZpZXIoKX0gJHtcbiAgICAgICAgICB0aGlzLnByb3BzLmJnY0FsdCA/ICdhc2lkZS1zbGlkZS0tYmdjLWFsdCcgOiAnJ1xuICAgICAgICB9ICR7dGhpcy5wcm9wcy5yZW5kZXJFbXB0eSA/ICcnIDogJyd9YH1cbiAgICAgICAgZGF0YS1xZS1pZD17XG4gICAgICAgICAgdGhpcy5wcm9wcy5xZUlkID8gYGNvbXBvbmVudC1hc2lkZV9zbGlkZS0ke3RoaXMucHJvcHMucWVJZH1gIDogJydcbiAgICAgICAgfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhc2lkZS1zbGlkZV9fY2xpY2thYmxlLWFyZWFcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhc2lkZS1zbGlkZV9fY2xpY2thYmxlLWFyZWFfX2J1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLnRvZ2dsZX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgZGF0YS1xZS1pZD1cImNvbXBvbmVudF9hY3Rpb24tYXNpZGVfc2xpZGUtY2xvc2VcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaW5uZXJJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e2Bhc2lkZS1zbGlkZV9faW5uZXIke1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zbGlkZUJhciAhPT0gbnVsbCA/ICctLXBhZGRlZCcgOiAnJ1xuICAgICAgICAgIH1gfT5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RW1wdHkgfHwgIXRoaXMuc3RhdGUuc2hvd0NvbnRlbnQgPyBudWxsIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhc2lkZS1zbGlkZV9faW5uZXJfX2hlYWRlclwiPlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2dnbGVCdXR0b24gPyAoXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXNpZGUtc2xpZGVfX2lubmVyX19oZWFkZXJfX2l0ZW0tLWx0XCI+XG4gICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2dnbGVCdXR0b259XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXNpZGUtc2xpZGVfX2lubmVyX19oZWFkZXJfX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hY3Rpb25Db21wb25lbnQgJiYgKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFzaWRlLXNsaWRlX19pbm5lcl9faGVhZGVyX19pdGVtLS1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYWN0aW9uQ29tcG9uZW50fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhc2lkZS1zbGlkZV9faW5uZXJfX2JvZHlcIj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3dFbXB0eSB8fCAhdGhpcy5zdGF0ZS5zaG93Q29udGVudFxuICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RoaXMuc3RhdGUuc2hvd0NvbnRlbnQgJiYgdGhpcy5wcm9wcy5zbGlkZUJhciAhPT0gbnVsbCA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFzaWRlLXNsaWRlX19iYXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXNpZGUtc2xpZGVfX2Jhcl9faW5uZXJcIj5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2xpZGVCYXIoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXNpZGVTbGlkZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vc2Nzcy9TdHlsZXMuc2Nzcyc7XG4vKlxuICogOjpFeHBlY3RlZCBDaGlsZHJlbiBFbGVtZW50czo6XG4gKiBidXR0b24gfCBhbmNob3IgfCBzcGFuXG4gKi9cblxudHlwZSBQcm9wc1NoYXBlID0ge1xuICBiYXNlRWxlbWVudDogRnVuY3Rpb24sIC8vIEpTWCBtdXN0IHJldHVybiBhIHNwYW5cbiAgY2hpbGRyZW4/OiBhbnksIC8vIHVzZWQgdG8gZ2VuZXJhdGUgb3B0aW9uc1xuICB3cmFwcGVyQ2xhc3M/OiBzdHJpbmcsXG59O1xuXG50eXBlIFN0YXRlU2hhcGUgPSB7XG4gIGlzT3BlbjogYm9vbGVhbixcbn07XG5cbmNsYXNzIERyb3BPcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzU2hhcGU+IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogW10sXG4gICAgd3JhcHBlckNsYXNzOiAnJyxcbiAgICBiYXNlRWxlbWVudDogKCkgPT4gJ0Jhc2UgRWxlbWVudCcsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzU2hhcGUpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRlOiBTdGF0ZVNoYXBlO1xuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMua2lsbExpc3RlbmVyKCk7XG4gIH1cblxuICBnZXRDaGlsZHJlbiA9ICgpID0+XG4gICAgUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZDogYW55KSA9PiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Atb3B0aW9uc19fb3B0aW9uc19faXRlbVwiPntjaGlsZH08L2Rpdj5cbiAgICApKTtcblxuICBraWxsTGlzdGVuZXIgPSAoKTogYW55ID0+XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmxpc3RlbmVyQWN0aW9uKTtcblxuICBzdGFydExpc3RlbmVyID0gKCk6IGFueSA9PlxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5saXN0ZW5lckFjdGlvbik7XG5cbiAgbGlzdGVuZXJBY3Rpb24gPSAoKSA9PiB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMua2lsbExpc3RlbmVyKCk7XG4gIH07XG5cbiAgY2xvc2UgPSAoKTogYW55ID0+XG4gICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlOiBTdGF0ZVNoYXBlKTogU3RhdGVTaGFwZSA9PiAoe1xuICAgICAgLi4ucHJldlN0YXRlLFxuICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICB9KSk7XG5cbiAgdG9nZ2xlT3BlblN0YXRlID0gKCk6IGFueSA9PlxuICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZTogU3RhdGVTaGFwZSk6IFN0YXRlU2hhcGUgPT4ge1xuICAgICAgaWYgKHByZXZTdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgLy8gbmV4dCBzdGF0ZSBpcyBmYWxzZVxuICAgICAgICB0aGlzLmtpbGxMaXN0ZW5lcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbmV4dCBzdGF0ZSBpcyB0cnVlXG4gICAgICAgIHRoaXMuc3RhcnRMaXN0ZW5lcigpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5wcmV2U3RhdGUsXG4gICAgICAgIGlzT3BlbjogIXByZXZTdGF0ZS5pc09wZW4sXG4gICAgICB9O1xuICAgIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3RoaXMucHJvcHMud3JhcHBlckNsYXNzfSBkcm9wLW9wdGlvbnMtY29udGFpbmVyYH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcC1vcHRpb25zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wLW9wdGlvbnNfX2Jhc2VcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJvcC1vcHRpb25zX19iYXNlX19idG5cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnRvZ2dsZU9wZW5TdGF0ZX0+XG4gICAgICAgICAgICAgIHt0aGlzLnByb3BzLmJhc2VFbGVtZW50KCl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bkcm9wLW9wdGlvbnNfX29wdGlvbnMgJHtcbiAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5pc09wZW4gPyAnZHJvcC1vcHRpb25zX19vcHRpb25zLS1pcy1vcGVuJyA6ICcnXG4gICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5pc09wZW4gJiYgdGhpcy5nZXRDaGlsZHJlbigpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJvcE9wdGlvbnM7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vc2Nzcy9TdHlsZXMuc2Nzcyc7XG5cbi8vIHNlZSAkd3JhcC13aWR0aHMgaW4gX3dyYXBzLmNzcyBmb3Igc2l6ZXNcblxudHlwZSBPdmVybGF5UHJvcHMgPSB7XG4gIGJhc2VDbGFzczogc3RyaW5nLFxuICBjaGlsZHJlbjogW10gfCBPYmplY3QsXG4gIGlzT3BlbjogYm9vbGVhbixcbiAgc2l6ZTogc3RyaW5nLFxufTtcblxuY29uc3QgT3ZlcmxheSA9ICh7IGJhc2VDbGFzcywgY2hpbGRyZW4sIGlzT3Blbiwgc2l6ZSB9OiBPdmVybGF5UHJvcHMpID0+IHtcbiAgY29uc3QgW2FjdGl2ZUNoaWxkLCBzZXRBY3RpdmVDaGlsZF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgbWF4Q2hpbGRDb3VudCA9IFJlYWN0LkNoaWxkcmVuLmNvdW50KGNoaWxkcmVuKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YCR7YmFzZUNsYXNzfSAke2lzT3BlbiA/ICdpcy1vcGVuJyA6ICdpcy1jbG9zZWQnfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake2Jhc2VDbGFzc31fX2lubmVyICR7c2l6ZSA/IGB3cmFwJHtzaXplfWAgOiAnJ31gfT5cbiAgICAgICAge1JlYWN0LkNoaWxkcmVuLm1hcChcbiAgICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgICAoY2hpbGQsIGluZGV4KSA9PlxuICAgICAgICAgICAgaW5kZXggPT09IGFjdGl2ZUNoaWxkICYmXG4gICAgICAgICAgICBSZWFjdC5jbG9uZUVsZW1lbnQoXG4gICAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICAgICBjaGlsZC50eXBlICE9PSAnZGl2J1xuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG1heENoaWxkQ291bnQgLSAxID4gYWN0aXZlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZUNoaWxkKGFjdGl2ZUNoaWxkICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwcmV2OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUNoaWxkID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlQ2hpbGQoYWN0aXZlQ2hpbGQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiB7fSxcbiAgICAgICAgICAgICksXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbk92ZXJsYXkuZGVmYXVsdFByb3BzID0ge1xuICBjaGlsZHJlbjogW10sXG4gIHNpemU6ICcnLFxuICBiYXNlQ2xhc3M6ICdtb2RhbCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBPdmVybGF5O1xuIiwiaW1wb3J0IEFzaWRlU2xpZGUgZnJvbSAnLi9zcmMvY29tcG9uZW50cy9Bc2lkZVNsaWRlL2luZGV4LmpzJztcbmltcG9ydCBEcm9wT3B0aW9ucyBmcm9tICcuL3NyYy9jb21wb25lbnRzL0Ryb3BPcHRpb25zL2luZGV4LmpzJztcbmltcG9ydCBPdmVybGF5IGZyb20gJy4vc3JjL2NvbXBvbmVudHMvT3ZlcmxheS9pbmRleC5qcyc7XG5cbmV4cG9ydHMuQXNpZGVTbGlkZSA9IEFzaWRlU2xpZGU7XG5leHBvcnRzLkRyb3BPcHRpb25zID0gRHJvcE9wdGlvbnM7XG5leHBvcnRzLk92ZXJsYXkgPSBPdmVybGF5O1xuIl0sIm5hbWVzIjpbIkFzaWRlU2xpZGUiLCJwcm9wcyIsInN0YXRlIiwiaW5UcmFuc2l0IiwicmVuZGVyRW1wdHkiLCJpc09wZW4iLCJzZXRUcmFuc2l0Iiwic2V0U3RhdGUiLCJzZXRUaW1lb3V0Iiwic2hvd0VtcHR5Iiwic2hvd0NvbnRlbnQiLCJwcmV2UHJvcHMiLCJkZWxheUVtcHR5VG9nZ2xlIiwidG9nZ2xlVmlzaWJpbGl0eSIsIlJlYWN0IiwiZ2V0QXNpZGVCYXNlQ2xhc3NNb2RpZmllciIsImJnY0FsdCIsInFlSWQiLCJ0b2dnbGUiLCJpbm5lcklkIiwic2xpZGVCYXIiLCJ0b2dnbGVCdXR0b24iLCJ0aXRsZSIsImFjdGlvbkNvbXBvbmVudCIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiRHJvcE9wdGlvbnMiLCJDaGlsZHJlbiIsIm1hcCIsImNoaWxkIiwiZG9jdW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibGlzdGVuZXJBY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2UiLCJraWxsTGlzdGVuZXIiLCJwcmV2U3RhdGUiLCJzdGFydExpc3RlbmVyIiwid3JhcHBlckNsYXNzIiwidG9nZ2xlT3BlblN0YXRlIiwiYmFzZUVsZW1lbnQiLCJnZXRDaGlsZHJlbiIsIk92ZXJsYXkiLCJiYXNlQ2xhc3MiLCJzaXplIiwidXNlU3RhdGUiLCJhY3RpdmVDaGlsZCIsInNldEFjdGl2ZUNoaWxkIiwibWF4Q2hpbGRDb3VudCIsImNvdW50IiwiaW5kZXgiLCJjbG9uZUVsZW1lbnQiLCJ0eXBlIiwibmV4dCIsInByZXYiLCJkZWZhdWx0UHJvcHMiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQWlCTUE7Ozs7Ozs7K0NBQzRCQyxPQUFPQyxPQUFPO0VBQzVDO0VBQ0EsVUFBSSxDQUFDQSxLQUFLLENBQUNDLFNBQVAsSUFBb0IsQ0FBQ0YsS0FBSyxDQUFDRyxXQUEzQixJQUEwQ0YsS0FBSyxDQUFDRyxN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
