<template>
  <section>
    <CardAdminGraph />
    <CardAdminGraph />
    <CardAdminGraph />
    <CardAdminGraph />
  </section>
</template>
<script>
import CardAdminGraph from '~/components/CardAdminGraph'
export default {
  components: {
    CardAdminGraph
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      if (this.$store.state.authUser === null) {
        this.$router.push('admin/login')
      }
    }
  }
}
</script>
