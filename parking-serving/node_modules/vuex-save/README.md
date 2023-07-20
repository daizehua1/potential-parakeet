## [vuex-save](https://github.com/BiYuqi/vuex-save)

> 自动存储vuex数据到本地，解决刷新页面vuex数据丢失的问题 => (Automatically store vuex data to the local, solve the problem of refreshing vuex data in the page)

## 安装 (Installation)
```js
npm install vuex-save -S
```
## 使用 (Usage)
```js
import vuexSave from 'vuex-save'

// store.js
const store = new Vuex.Store({
  state,
  mutations,
  plugins: [vuexSave({
    // set save name and mode
    name: 'loadingmore_save_vuex',
    mode: 'localStorage'
  })]
  // or
  // plugins: [vuexSave({
  //  name: 'loadingmore_save_vuex',
  //  mode: 'sessionStorage'
  // })]
  // or default
  // plugins: [vuexSave()]
})
```

## API

```js
/**
 * @param {Object}
 * @param {name} String
 * @param {mode} String localStorage or sessionStorage
 */
{
  name: 'your local data name', // Default name ==> Save_Vuex_Static_Name
  mode: 'set the local data mode that you need' // Default mode ==> localStorage
}
```

## TODO

```js
// support save store single module
```
