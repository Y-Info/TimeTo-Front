<template>
  <v-navigation-drawer
    app
    fill-height
    floating
  >
    <Logo />
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.text"
        link
      >
        <v-list-item-action>
          <v-icon v-if="item.current !== true" dense small color="grey">
            fas {{ item.icon }}
          </v-icon>
          <v-icon v-else dense small class="text-shadow-ico">
            fas {{ item.icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content dense small>
          <v-list-item-title v-if="item.current !== true" class="grey--text">
            {{ item.text }}
          </v-list-item-title>
          <v-list-item-title v-else>
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
      { icon: 'fa-home', text: 'Home', current: true },
      { icon: 'fa-fire', text: 'Trending', current: false },
      { icon: 'fa-heart', text: 'Like', current: false }
    ]
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
