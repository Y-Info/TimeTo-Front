<template>
  <section>
    <nuxt-link v-if="$store.state.authUser != null" to="/admin" class="bubble">
      <p class="user_info_bubble">
        {{ $store.state.authUser.name }}
      </p>
      <img
        :src="$store.state.authUser.avatar"
        class="img_bubble"
      >
    </nuxt-link>
    <nuxt-link v-else to="/login" class="bubble">
      <p class="user_info_bubble">
        Connexion
      </p>
      <img
        src="/test.png"
        class="img_bubble"
      >
    </nuxt-link>
  </section>
</template>
