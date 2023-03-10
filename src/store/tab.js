// import Cookie from "js-cookie";
// import Router from "vue-router"

export default {
    state: {
        isCollapse: false, // 控制菜单的展开还是收起
        tabList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'home/Home'
            }
        ],//面包屑的数据:点了哪个路由,首页是一定有的
        menu: []

    },
    mutations: {
        // 修改菜单展开还是收起
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑的数据
        selectMenu(state, item) {
            // 如果点击的不在面包屑数据中,则添加
            const index = state.tabList.findIndex(val => val.name === item.name)
            if (index === -1) {
                state.tabList.push(item)
            }
        },
        // 点击tag删除功能
        closeTag(state, item) {
            const index = state.tabList.findIndex(val=>val.name === item.name)
            state.tabList.splice(index, 1)
        },
        // 设置menu的数据
        setMenu(state, val) {
            this.menu = val
            // Cookie.set('menu', JSON.stringify(val))
            localStorage.setItem('menu', JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state, router) {
            // 判断缓存中是否有数据
            // if(!Cookie.get('menu')) return
            // const menu = JSON.parse(Cookie.get('menu'))
            if(!localStorage.getItem('menu')) return
            const menu = JSON.parse(localStorage.getItem('menu'))

            state.menu  = menu
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    // 有子路由
                    item.children = item.children.map(it=>{
                        // it.component =() => import(`../views/${it.url}`)
                        // return it


                        if (it.children) {
                            // 有三级路由
                            it.children = it.children.map(j=>{
                                j.component =() => import(`../views/${j.url}`)
                                return j
                            })
                            menuArray.push(...it.children)
                        } else {
                            it.component =() => import(`../views/${it.url}`)
                            menuArray.push(it)
                        }

                    })
                   // menuArray.push(...item.children)

                } else {
                    // 没有子
                    item.component =() => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });

            // console.log(JSON.stringify(menuArray), 'menuArray')
            // 路由动态添加
            // router.options.routes = menuArray
            // router.matcher = new Router().matcher //match
            // router.addRoutes(router.options.routes)

            menuArray.forEach(item=>{
                // if (!router.hasRoute(item.name)){
                //     router.addRoute('Main',item)
                // }
                // console.log("--------")
                // console.log(item)
                router.addRoute('Main',item)
            })
            // console.log(router, router.getRoutes())
          //  menuArray.push()
        },
        setUserInfo(state, val) {
            // console.log(val)
            // Cookie.set('user', val)
            localStorage.setItem('user', val)
        },
    }
}
