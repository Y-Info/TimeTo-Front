<template>
  <v-container>
    <h1> Page administration : Events</h1>
    <v-data-table
      :headers="headers"
      :items="events"
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
                New Event
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
                      <v-text-field v-model="editedItem.title" :rules="[v => !!v || 'Title is required']" label="Title" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.description" :rules="[v => !!v || 'Description is required']" label="Description" />
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.type"
                        :items="types"
                        label="Type"
                        required
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.category"
                        :items="categories"
                        :rules="[v => !!v || 'Category is required']"
                        item-value="name"
                        item-text="name"
                        label="Category"
                        required
                      />
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
    title: 'Admin Event',
    meta_desc: '',
    dialog: false,
    headers: [
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Type', value: 'type' },
      { text: 'Category', value: 'category' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    categories: [
      {
        name: 'test'
      }
    ],
    types: [
      'ouai ouai',
      'Official',
      'Item 3',
      'Item 4'
    ],
    events: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      description: '',
      type: '',
      category: ''
    },
    defaultItem: {
      title: '',
      description: 'je suis une description',
      type: 'officiel',
      category: 'jeux-video'
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
      return this.editedIndex === -1 ? 'New Event' : 'Edit Event'
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
        .get(process.env.ApiUrl + 'event')
        .then(res => (this.events = res.data))
      axios
        .get(process.env.ApiUrl + 'category')
        .then(res => (this.categories = res.data))
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
      this.editedIndex = this.events.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.events.indexOf(item)
      confirm('Are you sure you want to delete this item?') && axios
        .delete(process.env.ApiUrl + 'event/' + item._id, {
          headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
        })
        .then((res) => {
          this.events.splice(index, 1)
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
        axios.put(process.env.ApiUrl + 'event/' + this.editedItem._id, {
          title: this.editedItem.title,
          description: this.editedItem.description,
          type: this.editedItem.type,
          category: this.editedItem.category
        }, {
          headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
        })
          .then((res) => {
            Object.assign(this.events[this.editedIndex], this.editedItem)
            this.toast(res, 'success')
          })
          .catch(e => this.toast(e, 'error'))
      } else {
        axios.post(process.env.ApiUrl + 'event/', {
          title: this.editedItem.title,
          description: this.editedItem.description,
          type: this.editedItem.type,
          category: this.editedItem.category
        }, {
          headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
        })
          .then((res) => {
            this.toast(res, 'success')
            this.initialize()
          })
          .catch(e => this.toast(e, 'error'))
      }
      this.close()
    }
  }
}
</script>
