import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ElMessageBox } from 'element-plus';

const routes: Array<RouteRecordRaw> = [
    {path: "/", redirect: "/home"},
    {path: "/home", name: "Home", component: () => import("@/views/Home/Home.vue")},
    {
        path: "/login", name: "Login", component: () => import("@/views/Login/Login.vue"),
        beforeEnter: (to, from, next) => {
            ElMessageBox.confirm(
                "请您仔细阅读协议，其中有对您权利义务的特别约定等重要条款，同意后方可使用本软件",
                { confirmButtonText: '确定',cancelButtonText: '取消',}
            ).then(() => {
                next()
            }).catch(()=>{})
        }
    },
    {path: '/order', name: "Order", component: () => import("@/views/Order/Order.vue")},
    {path: "/product", name: "Product", component: () => import("@/views/Product/Product.vue")},
    {path: "/category", name: "Category", component: () => import("@/views/Category/Category.vue")},
    {path: "/cart", name: "Cart", component: () => import("@/views/Cart/Cart.vue")},
    {path: "/profile", name: "Profile", component: () => import("@/views/Profile/Profile.vue")},
    {path: "/address", name: "Address", component: () => import("@/views/Address/Address.vue")},
    {path: "/productdetail", name: "ProductDetail", component: () => import("@/views/ProductDetail/ProductDetail.vue")},
    {path: "/notarize", name: "OrderNotarize", component: () => import("@/views/OrderNotarize/OrderNotarize.vue")}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
