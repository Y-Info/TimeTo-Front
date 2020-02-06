<template>
  <v-container>
    <h1> Page administration : Categories</h1>
    <v-data-table
      :headers="headers"
      :items="categories"
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
                New Category
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
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    title: 'Admin Category',
    meta_desc: '',
    dialog: false,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    categories: [],
    editedIndex: -1,
    editedItem: {
      name: ''
    },
    defaultItem: {
      name: 'titre'
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
      return this.editedIndex === -1 ? 'New Category' : 'Edit Category'
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
        .get(process.env.ApiUrl + 'category')
        .then(response => (this.categories = response.data))
    },

    editItem (item) {
      this.editedIndex = this.categories.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.categories.indexOf(item)
      confirm('Are you sure you want to delete this item?') && axios
        .delete(process.env.ApiUrl + 'category/' + item._id)
        .then(this.categories.splice(index, 1))
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
        axios.put(process.env.ApiUrl + 'category/' + this.editedItem._id, {
          name: this.editedItem.name
        })
          .then(Object.assign(this.categories[this.editedIndex], this.editedItem))
          .catch((e) => { this.errors.push(e) })
      } else {
        this.categories.push(this.editedItem)
        axios.post(process.env.ApiUrl + 'category/', {
          name: this.editedItem.name
        })
          .then(this.close())
          .catch((e) => { this.errors.push(e) })
      }
      this.close()
    }
  }
}
</script>
