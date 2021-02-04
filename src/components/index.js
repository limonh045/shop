import MySidebar from './MySidebar';
import MyNavbar from './MyNavbar'
import MyCart from './MyCart'
import Atext from './atext'
import DashNavbar from './dashboard/DashNavbar'

export default{
    install(Vue){
        Vue.component('my-sidebar',MySidebar);
        Vue.component('my-navbar',MyNavbar);
        Vue.component('my-cart',MyCart);
        Vue.component('atext',Atext);
        Vue.component('dash-navbar',DashNavbar)
    },
}