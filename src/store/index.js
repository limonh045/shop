import Vue from "vue";
import Vuex from "vuex";
import { db } from "../store/fireInit";

Vue.use(Vuex);

const state = {
  name: "limon",
  menu: [],
  submenu: [],
  items: [],
  cartItem: [],
  buyerdetails: [],
};
const mutations = {
  addmenu(state, payload) {
    state.menu = payload;
  },
  addsubmenu(state, payload) {
    state.submenu = payload;
  },
  additems(state, payload) {
    state.items = payload;
  },
  cartqyntityadded(state, payload) {
    var isCart = state.cartItem.find((e) => e.id == payload.id);
    if (isCart) {
      console.log("already add");
      return;
    }
    payload.qyn += 1;
    state.cartItem.push(payload);
  },
  cartqyntitycontrol(state, payload) {
    state.cartItem.find((e) => e.id === payload[0]).qyn += payload[1];
    var id = state.cartItem.findIndex((e) => e.id === payload[0]);
    if (state.cartItem[id].qyn === 0) {
      state.cartItem.splice(id, 1);
    }
  },
  removetocart(state, payload) {
    var removeCartId = state.cartItem.findIndex((e) => e.id == payload);
    state.cartItem[removeCartId].qyn = 0;
    state.cartItem.splice(removeCartId, 1);
  },
  buyer(state, payload) {
    state.buyerdetails = payload;
  },
  clearcart(state) {
    state.cartItem = [];
  },
};
const actions = {
  async getitem({ commit }) {
    await db
      .firestore()
      .collection("items")
      .onSnapshot((snap) => {
        var item = [];
        snap.forEach((doc) => {
          var itemdata = doc.data();
          itemdata.id = doc.id;
          itemdata.qyn = 0;
          item.push(itemdata);
        });
        commit("additems", item);
      });
  },
  async getmenu({ commit }) {
    var menu = [];
    var submenu = [];
    await db
      .firestore()
      .collection("menu")
      .onSnapshot((snap) => {
        menu = [];
        snap.forEach((doc) => {
          var menudata = doc.data();
          menudata.id = doc.id;
          menu.push(menudata);
        });
        commit("addmenu", menu);
      });
    await db
      .firestore()
      .collection("submenu")
      .onSnapshot((snap) => {
        submenu = [];
        snap.forEach((doc) => {
          var submenudata = doc.data();
          submenudata.id = doc.id;
          submenu.push(submenudata);
        });
        commit("addsubmenu", submenu);
      });
  },
  async buyerderails({ commit }) {
    await db
      .firestore()
      .collection("buy")
      .onSnapshot((snap) => {
        var item = [];
        snap.forEach((doc) => {
          var itemdata = doc.data();
          itemdata.id = doc.id;
          item.push(itemdata);
        });
        commit("buyer", item);
      });
  },
};
const getters = {
  menus: (state) => state.menu,
  submenus: (state) => state.submenu,
  items: (state) => state.items,
  cartitems: (state) => state.cartItem,
  buys: (state) => state.buyerdetails,
  sidemenu(state) {
    state.menu.forEach((menu) => {
      state.submenu.forEach((sub) => {
        if (sub.menuid === menu.id) {
          if (menu.submenu) {
            menu.submenu.push(sub);
          } else {
            menu.submenu = [];
            menu.submenu.push(sub);
          }
        }
      });
    });
    return state.menu;
  },
  gettotalprice(state) {
    var total = 0;
    state.cartItem.map((e) => {
      total = total + e.qyn * e.price;
    });
    return total;
  },
  getcartitem(state) {
    return state.items.filter((e) => e.qyn > 0);
  },
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
