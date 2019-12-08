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
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashChange', () => {
        console.log(11)
        this.history.current = location.hash.slice(1)
      })
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
      Object.defineProperty(this, '$router', {
        get () {
          return this._root._router
        }
      })
      console.log(this.$router)
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
