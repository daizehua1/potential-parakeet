(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['vuex-save'] = factory());
}(this, (function () { 'use strict';

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

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  // 本地存储默认名
  var SaveVuexStaticName = 'Save_Vuex_Static_Name'; // 默认存储方式

  var STATIC_MODE = 'localStorage';
  /**
   * @description 存储
   * @param {*} mode
   */

  var setStore = function setStore(state, mode) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : SaveVuexStaticName;
    window[mode].setItem(name, JSON.stringify(state));
  };
  /**
   * @description 获取
   * @param {String} mode
   */


  var getStore = function getStore(mode) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SaveVuexStaticName;
    var local = window[mode].getItem(name);
    return local ? JSON.parse(local) : {};
  };
  /**
   * @description 默认导出方法，暂时默认保存全部state
   * @param {Object} params
   */


  function index () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var mode = params.mode,
        name = params.name;
    var staticMode; // 判断存储模式

    if (mode && typeof mode === 'string') {
      if (mode !== 'localStorage' && mode !== 'sessionStorage') {
        staticMode = STATIC_MODE;
      } else {
        staticMode = mode;
      }
    } else {
      // console.log('怀疑是无效字符)
      staticMode = STATIC_MODE;
    } // 自定义name


    if (name && typeof name === 'string' && name.indexOf(' ') < 0) {
      SaveVuexStaticName = name;
    }

    return function (store) {
      // 初始化加载重置
      var localStore = getStore(staticMode, SaveVuexStaticName);
      localStore && store.replaceState(_objectSpread({}, store.state, localStore)); // 监听并实施存储到本地

      store.subscribe(function (mutation, state) {
        setStore(state, staticMode, SaveVuexStaticName);
      });
    };
  }

  return index;

})));
