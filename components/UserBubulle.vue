<template>
  <nuxt-link to="/user" class="buble">
    <p v-if="$store.state.authUser != null" class="user_info_buble">
      {{ $store.state.authUser.token }}
    </p>
    <img
      src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
      class="img_buble"
    >
  </nuxt-link>
</template>
