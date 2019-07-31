<template>
  <v-layout row>
    <v-flex
      md2
      mt1
      offset-xs6
      xs6
    >
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            class="white--text"
            color="teal lighten-2"
            flat
            v-on="on"
          >Add a {{ formDetails.header }}</v-btn>
        </template>

        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >Add a {{ formDetails.header }}</v-card-title>

          <v-card-text>
            <v-form v-on:submit.prevent="handleSubmit(formDetails.submitAction)">
              <div
                :key="input.value"
                v-for="(input) in formDetails.inputs"
              >
                <div v-if="input.type === 'input'">
                  <v-text-field
                    :label="input.label"
                    :name="input.value"
                    @keyup="handleDatalist(formDetails.datalistAction)"
                    list="datalistItems"
                    required
                    v-model="newMedia.title"
                  ></v-text-field>
                  <datalist
                    id="datalistItems"
                    v-if="formDetails.datalistItems.length != 0"
                  >
                    <option
                      v-bind:key="suggestion.id"
                      v-for="suggestion in formDetails.datalistItems"
                    >{{ suggestion.title }}</option>
                  </datalist>
                </div>
                <v-select
                  :label="input.label"
                  :name="input.value"
                  v-bind:items="input.options"
                  v-if="input.type == 'select'"
                  v-model="newMedia.format"
                ></v-select>
              </div>

              <v-btn type="submit">Submit</v-btn>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="dialog = false"
              color="primary"
              flat
            >Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    formDetails: Object,
    toggle: Boolean,
    newMedia: Object
  },
  /* eslint-disable-next-line */
  data() {
    return {
      dialog: this.toggle,
      model: null,
      showDatalist: false
    }
  },
  methods: {
    /* eslint-disable-next-line */
    handleSubmit(submitAction) {
      this.$store.dispatch(submitAction).then(res => {
        this.dialog = false
      })
    },
    /* eslint-disable-next-line */
    handleDatalist(datalistAction) {
      this.$store.dispatch(datalistAction)
    },
    /* eslint-disable-next-line */
    toggleForm() {
      return (this.toggle = !this.toggle)
    }
  },
  computed: {},
  /* eslint-disable-next-line */
  created() {}
}
</script>
