// 本地存储默认名
let SaveVuexStaticName = 'Save_Vuex_Static_Name'
// 默认存储方式
let STATIC_MODE = 'localStorage'

/**
 * @description 存储
 * @param {*} mode
 */
const setStore = (state, mode, name = SaveVuexStaticName) => {
  window[mode].setItem(name, JSON.stringify(state))
}

/**
 * @description 获取
 * @param {String} mode
 */
const getStore = (mode, name = SaveVuexStaticName) => {
  const local = window[mode].getItem(name)
  return local ? JSON.parse(local) : {}
}

/**
 * @description 默认导出方法，暂时默认保存全部state
 * @param {Object} params
 */
export default function (params = {}) {
  let { mode, name } = params
  let staticMode
  // 判断存储模式
  if (mode && typeof mode === 'string') {
    if (mode !== 'localStorage' && mode !== 'sessionStorage') {
      staticMode = STATIC_MODE
    } else {
      staticMode = mode
    }
  } else {
    // console.log('怀疑是无效字符)
    staticMode = STATIC_MODE
  }
  // 自定义name
  if (name && typeof name === 'string' && name.indexOf(' ') < 0) {
    SaveVuexStaticName = name
  }
  return store => {
    // 初始化加载重置
    const localStore = getStore(staticMode, SaveVuexStaticName)
    localStore && store.replaceState({...store.state, ...localStore})

    // 监听并实施存储到本地
    store.subscribe((mutation, state) => {
      setStore(state, staticMode, SaveVuexStaticName)
    })
  }
}
