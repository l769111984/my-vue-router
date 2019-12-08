/* eslint-disable no-unused-expressions */
class HistoryRouter {
  constructor () {
    this.current = null
  }
}
class vueRouter {
  constructor (options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.history = new HistoryRouter()
    this.init()
    this.routersMap = this.createMap(this.routes)
  }
  init () {
    if (this.mode === 'hash') {
      // eslint-disable-next-line space-infix-ops
      location.hash ? '' : location.hash
      window.addEventListener('load', () => {
        console.log('load')
        this.history.current = location.hash.slice(1)
      })
      // 很奇怪这里事件监听就是不行 改为普通函数就可以触发
      // window.addEventListener('hashChange', () => {
      //   console.log(11)
      //   this.history.current = location.hash.slice(1)
      // }, false)
      window.onhashchange = () => {
        console.log('change')
        this.history.current = location.hash.slice(1)
      }
    }
  }
  createMap () {
    return this.routes.reduce((memo, current) => {
      memo[current.path] = current.component
      return memo
    }, {})
  }
}
vueRouter.install = function (Vue) {
  if (vueRouter.install.installed === true) return
  vueRouter.install.installed = true
  Vue.mixin({
    beforeCreate () {
      if (this.$options && this.$options.router) {
        this._root = this
        this._router = this.$options.router
        Vue.util.defineReactive(this, 'current', this._router.history)
      } else {
        this._root = this.$parent._root
      }
      // 这里如此是给this绑定$router变量 只能取值不可修改
      Object.defineProperty(this, '$router', {
        get () {
          return this._root._router
        }
      })
    }
  })
  Vue.component('router-view', {
    render (h) {
      let current = this._self._root._router.history.current
      let routerMap = this._self._root._router.routersMap
      return h(routerMap[current])
    }
  })
}
export default vueRouter
