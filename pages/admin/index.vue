<template>
  <v-row align="center">
    <v-row justify="space-around">
      <v-switch v-model="valid" class="ma-4" label="Valid" readonly />
      <v-switch v-model="lazy" class="ma-4" label="Lazy" />
    </v-row>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      />

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      />

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      />

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      />

      <v-btn
        :disabled="!valid"
        @click="validate"
        color="success"
        class="mr-4"
      >
        Validate
      </v-btn>

      <v-btn
        @click="reset"
        color="error"
        class="mr-4"
      >
        Reset Form
      </v-btn>

      <v-btn
        @click="resetValidation"
        color="warning"
      >
        Reset Validation
      </v-btn>
    </v-form>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      title: 'Admin Board',
      meta_desc: ''
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_desc }
      ]
    }
  }
}
</script>
