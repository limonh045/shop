<template>
  <div class="sidebar" :class="{ 'is-sidebar': sidebar }">
    <div v-for="(menu, i) in sidemenu" :key="i">
      <div v-if="menu.submenu">
        <router-link :to="'/' + menu.name.replace(/\s+/g, '-').toLowerCase()">
          <div class="menu" v-b-toggle:my-collapse @click="expans(i)">
            {{ menu.name }}
            <font-icon
              :class="{ rotate: i === activeItemIndex }"
              class="float-right "
              icon="chevron-right"
            />
          </div>
        </router-link>

        <div v-for="(sub, m) in menu.submenu" :key="m">
          <b-collapse id="my-collapse" v-if="i === activeItemIndex">
            <router-link
              :to="
                '/' +
                  menu.name.replace(/\s+/g, '-').toLowerCase() +
                  '/' +
                  sub.name.replace(/\s+/g, '-').toLowerCase()
              "
            >
              <div class="submenu">
                {{ sub.name }}
              </div>
            </router-link>
          </b-collapse>
        </div>
      </div>
      <router-link
        v-else
        :to="'/' + menu.name.replace(/\s+/g, '-').toLowerCase()"
      >
        <div class="menu">
          {{ menu.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    sidebar: {
      default: true,
    },
  },
  data: () => ({
    side: false,
    m: [],
    activeItemIndex: null,
  }),
  computed: {
    ...mapGetters(["sidemenu"]),
  },
  methods: {
    expans(i) {
      if (this.activeItemIndex == null) {
        this.activeItemIndex = i;
      } else {
        this.activeItemIndex = null;
      }
    },
  },
};
</script>
<style>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
.sidebar {
  transition: 300ms;
  margin-left: -20rem;
}
.menu {
  text-transform: capitalize;
  font-size: 20px;
  background: #ebebeb;
  padding: 7px 20px 10px;
  margin: 1px 0;
  cursor: pointer;
}
.submenu {
  text-transform: capitalize;
  font-size: 17px;
  background: #c3c3c3;
  padding: 7px 0 7px 50px;
  margin: 1px 0;
  cursor: pointer;
}
.is-sidebar {
  margin-left: 0rem;
}
</style>
