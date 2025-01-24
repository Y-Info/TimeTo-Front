<template>
  <v-container>
    <h1> Page administration : Users</h1>
    <v-data-table
      :headers="headers"
      :items="users"
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
                New User
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
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.email" :rules="[v => !!v || 'Email is required']" label="Email" />
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.role"
                        :items="roles"
                        label="Role"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="editedItem.file"
                        show-size
                        counter
                        accept="image/*"
                        label="file"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field type="password" label="Password" />
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
      <template v-slot:item.avatar="{ item }">
        <v-img
          v-if="item.avatar !== 'test.png'"
          :src="item.avatar"
          contain
          class="img_preview"
          height="70px"
          width="70px"
        />
        <v-img
          v-else
          src="/test.png"
          contain
          class="img_preview"
          height="70px"
          width="70px"
        />
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
      :top="true"
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
export default {
  data: () => ({
    snackbar: false,
    snackbarColor: 'green',
    responses: {},
    title: 'Admin User',
    meta_desc: '',
    dialog: false,
    headers: [
      { text: 'avatar', value: 'avatar', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Role', value: 'role' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    roles: [
      'admin',
      'member',
      'approved'
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      avatar: '',
      password: '',
      file: undefined
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
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
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
      if (this.$store.state.authUser !== null) {
        this.$axios
          .get(process.env.ApiUrl + 'user', {
            headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
          })
          .then(response => (this.users = response.data))
      } else {
        this.$router.push('/login')
      }
    },

    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.users.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
      this.$axios
        .delete(process.env.ApiUrl + 'user/' + item._id, {
          headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
        })
        .then((res) => {
          this.users.splice(index, 1)
          this.toast(res, 'success')
        })
        .catch(e => this.toast(e, 'error'))
    },
    toast (res, type) {
      if (type === 'error') {
        this.snackbarColor = 'red'
        this.responses = res.response
      } else {
        this.snackbarColor = 'green'
        this.responses = res.data.message
      }
      this.snackbar = true
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
        if (this.editedItem.file !== undefined) {
          const editedItem = this.editedItem
          const formData = new FormData()
          const imageFile = this.editedItem.file
          formData.append('file', imageFile)
          formData.append('upload_preset', 'test_alban')
          this.$axios.post('https://api.cloudinary.com/v1_1/dpcoqmszu/image/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then((res) => {
              this.$axios.put(process.env.ApiUrl + 'user/' + editedItem._id, {
                name: editedItem.name,
                email: editedItem.email,
                password: editedItem.password,
                role: editedItem.role,
                avatar: res.data.url
              },
              {
                headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
              })
                .then((res) => {
                  this.toast(res, 'success')
                })
                .catch((e) => { this.toast(e, 'error') })
            })
            .catch((e) => { this.toast(e, 'error') })
        } else {
          this.$axios.put(process.env.ApiUrl + 'user/' + this.editedItem._id, {
            name: this.editedItem.name,
            email: this.editedItem.email,
            role: this.editedItem.role,
            password: this.editedItem.password
          },
          {
            headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
          })
            .then((res) => {
              Object.assign(this.users[this.editedIndex], this.editedItem)
              this.toast(res, 'success')
            })
            .catch((e) => { this.toast(e, 'error') })
        }
      } else if (this.editedItem.file !== undefined) {
        const editedItem = this.editedItem
        const formData = new FormData()
        const imageFile = this.editedItem.file
        formData.append('file', imageFile)
        formData.append('upload_preset', 'test_alban')
        this.$axios.post('https://api.cloudinary.com/v1_1/dpcoqmszu/image/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((res) => {
            this.$axios.post(process.env.ApiUrl + 'user/signup', {
              name: editedItem.name,
              email: editedItem.email,
              password: editedItem.password,
              role: editedItem.role,
              avatar: res.data.url
            },
            {
              headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
            })
              .then((response) => {
                this.toast(response, 'success')
                this.initialize()
              })
              .catch((e) => { this.toast(e, 'error') })
          })
          .catch((e) => { this.toast(e, 'error') })
      } else {
        this.$axios.post(process.env.ApiUrl + 'user/signup', {
          name: this.editedItem.name,
          email: this.editedItem.email,
          role: this.editedItem.role,
          password: this.editedItem.password
        },
        {
          headers: { Authorization: `Bearer ${this.$store.state.authUser.token}` }
        })
          .then((response) => {
            this.toast(response, 'success')
            this.initialize()
          })
          .catch((e) => { this.toast(e, 'error') })
      }
      this.close()
    }
  }
}
</script>
