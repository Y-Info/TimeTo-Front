<template>
  <v-container>
    <h1> Page administration : Roles</h1>
    <v-data-table
      :headers="headers"
      :items="roles"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="primary" dark class="mb-2">
                New Role
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.name" :rules="[v => !!v || 'Name is required']" label="Name" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn @click="close" color="blue darken-1" text>
                  Cancel
                </v-btn>
                <v-btn @click="save" color="blue darken-1" text>
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          @click="editItem(item)"
          small
          class="mr-2"
        >
          fas fa-pen
        </v-icon>
        <v-icon
          @click="deleteItem(item)"
          small
        >
          fas fa-trash
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn @click="initialize" color="primary">
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      top="true"
    >
      {{ responses }}
      <v-btn
        @click="snackbar = false"
        color="white"
        text
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    snackbar: false,
    snackbarColor: 'green',
    responses: {},
    title: 'Admin Role',
    meta_desc: '',
    dialog: false,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    categories: [
      'Jeux-Video',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    types: [
      'ouai ouai',
      'Official',
      'Item 3',
      'Item 4'
    ],
    roles: [],
    editedIndex: -1,
    editedItem: {
      name: ''
    },
    defaultItem: {
      name: ''
    }
  }),

  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_desc }
      ]
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {

    initialize () {
      axios
        .get(process.env.ApiUrl + 'role')
        .then(response => (this.roles = response.data))
    },
    toast (res, type) {
      if (type === 'error') {
        this.snackbarColor = 'red'
      } else {
        this.snackbarColor = 'green'
      }
      if (type === 'error') {
        this.responses = res.response
      } else {
        this.responses = res.data
      }
      this.snackbar = true
    },
    editItem (item) {
      this.editedIndex = this.roles.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.roles.indexOf(item)
      confirm('Are you sure you want to delete this item?') && axios
        .delete(process.env.ApiUrl + 'role/' + item._id, {
          headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
        })
        .then((res) => {
          this.roles.splice(index, 1)
          this.toast(res, 'success')
        })
        .catch(e => this.toast(e, 'error'))
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        axios.put(process.env.ApiUrl + 'role/' + this.editedItem._id, {
          name: this.editedItem.name
        }, {
          headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
        })
          .then((res) => {
            Object.assign(this.roles[this.editedIndex], this.editedItem)
            this.toast(res, 'success')
          })
          .catch((e) => { this.toast(e, 'error') })
      } else {
        axios.post(process.env.ApiUrl + 'role/', {
          name: this.editedItem.name
        }, {
          headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
        })
          .then((res) => {
            this.toast(res, 'success')
            this.initialize()
          })
          .catch((e) => { this.toast(e, 'error') })
      }
      this.close()
    }
  }
}
</script>
