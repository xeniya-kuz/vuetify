<template>
  <div  class="contain_er">
    <v-data-table
      :headers="headers"
      :items="hard_list"
      :items-per-page="5"
      class="table">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Payments List</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
          <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                New cost
              </v-btn>
            </template>
            <!-- форма для добавления платежа -->
            <v-card>
              <v-card-title>
                <!-- заголовок -->
                <span>Добавление нового платежа</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- инпут для даты -->
                    <v-col
                    >
                      <v-text-field
                        v-model="editedItem.date"
                        label="date"
                        prepend-icon="mdi-calendar"
                      ></v-text-field>
                    </v-col>
                    <!-- инпут для категории -->
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.category"
                        label="category"
                      ></v-text-field>
                    </v-col>
                    <!-- инпут для стоимости -->
                    <v-col
                      cols="5"
                      sm="4"
                      md="3"
                    >
                    <v-text-field
                        v-model="editedItem.value"
                        label="value"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
          persistent
          v-model="dialogDelete"
          max-width="500px">
            <v-card>
              <v-card-title>Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeDelete">Cancel</v-btn>
                <v-btn @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PaymentList',
  components: {
  },
  data () {
    return {
      hard_list: [
        {
          id: 1,
          date: '28.03.2020',
          category: 'Food',
          value: 169
        },
        {
          id: 2,
          date: '24.03.2020',
          category: 'Transport',
          value: 360
        },
        {
          id: 3,
          date: '24.03.2020',
          category: 'Food',
          value: 532
        },
        {
          id: 4,
          date: '20.03.2020',
          category: 'Food',
          value: 169
        },
        {
          id: 5,
          date: '19.03.2020',
          category: 'Navigation',
          value: 50
        },
        {
          id: 6,
          date: '12.03.2020',
          category: 'Sport',
          value: 450
        },
        {
          id: 7,
          date: '10.12.2020',
          category: 'Entertainment',
          value: 5650
        },
        {
          id: 8,
          date: '04.01.2020',
          category: 'Food',
          value: 300
        },
        {
          id: 9,
          date: '24.09.2020',
          category: 'Sport',
          value: 700
        },
        {
          id: 10,
          date: '21.11.2020',
          category: 'Entertainment',
          value: 1250
        },
        {
          id: 11,
          date: '08.05.2020',
          category: 'Navigation',
          value: 200
        }
      ],
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Date', value: 'date' },
        { text: 'Category', value: 'category' },
        { text: 'Value', value: 'value' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedItem: {
      },
      editedIndex: -1,
      dialog: false,
      activeID: null,
      dialogDelete: false
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  mounted () {
    this.$modal.EventBus.$on('shown', this.onShown)
    this.$modal.EventBus.$on('hide', this.onHide)
  },
  methods:
  {
    onShown (params) {
      this.activeID = params.name.id
    },
    onHide () {
      this.activeID = null
    },
    editItem (item) {
      this.editedIndex = this.hard_list.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.hard_list.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    save () {
      this.editedItem.id = this.hard_list.length + 1
      if (this.editedIndex > -1) {
        Object.assign(this.hard_list[this.editedIndex], this.editedItem)
      } else {
        this.hard_list.push(this.editedItem)
        console.log(this.hard_list)
      }
      this.close()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteItemConfirm () {
      this.hard_list.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  },
  computed: {
    ...mapState(['list'])
  }
}
</script>

<style lang="scss">
.contain_er{
  width: 500px;
  margin: 0 auto;
}
.table{
  min-height: 300px;
  font-family: sans-serif;
  text-transform: capitalize;
  &__container{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
  &__row{
    padding: 15px 5px;
    display: flex;
    width: 100%;
  }
  &__col{
    position: relative;
    width: 25%;
    &_dark {
      font-weight: bold;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
