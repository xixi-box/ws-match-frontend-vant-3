import {createApp} from 'vue'

// 1. 引入你需要的组件
import * as VueRouter from "vue-router"
import routes from "./config/route.ts"
import Vant from 'vant';
import 'vant/lib/index.css'
import App from "./App.vue";

const app = createApp(App)
app.use(Vant)
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router)
app.mount('#app')



