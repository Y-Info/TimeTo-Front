<template>
  <v-navigation-drawer
    app
    fill-height
    floating
  >
    <Logo />
    <v-list dense>
      <p class="menuSep">
        Menu
      </p>
      <v-list-item
        v-for="item in items"
        :key="item.text"
        :to="item.url"
        link
      >
        <v-list-item-action>
          <v-icon dense small color="grey">
            {{ item.icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content dense small>
          <v-list-item-title class="grey--text">
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <p class="menuSep">
        Admin
      </p>
      <v-list-item
        v-for="item in itemsAdmin"
        :key="item.text"
        :to="item.url"
        link
      >
        <v-list-item-action>
          <v-icon dense small color="grey">
            {{ item.icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content dense small>
          <v-list-item-title class="grey--text">
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class=" pa-2 d-flex justify-center">
        <v-btn color="error" dark large align-center class="">
          Create my event
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import Logo from '../components/Logo'
export default {
  components: {
    Logo
  },
  data: () => ({
    items: [
      { icon: 'fas fa-home', text: 'Home', url: '/' },
      { icon: 'fas fa-fire', text: 'Trending' },
      { icon: 'fas fa-heart', text: 'Like' }
    ],
    itemsAdmin: [
      { icon: 'fab fa-keycdn', text: 'Admin', url: '/admin' },
      { icon: 'fas fa-calendar', text: 'Event', url: '/admin/event' },
      { icon: 'fas fa-tags', text: 'Category', url: '/admin/category' },
      { icon: 'fas fa-user-tag', text: 'Role', url: '/admin/role' },
      { icon: 'fas fa-user', text: 'User', url: '/admin/user' }
    ]
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
