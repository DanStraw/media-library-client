<template>
  <div>
    <v-data-table
      :headers="headerInfo"
      :items="rowItems"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <tr>
          <td class="text-xs">
            <v-btn
              :color="color"
              :to="`/${mediaType.toLowerCase()}/${props.item._id}`"
              flat
              router
            >{{ props.item.itemInfo.title }}</v-btn>
          </td>
          <td class="text-xs">{{ props.item.format }}</td>
          <td
            class="text-xs"
          >{{props.item[`${countType.toLowerCase()}Count`] == 0 ? '-' : props.item.updated_at | formatTime(`MMM Do 'YY, h:m a`) }}</td>
          <td class="text-xs">{{ props.item[`${countType.toLowerCase()}Count`] }}</td>
          <td class="text-xs-left px-0">
            <v-btn
              @click="incrementOne(props.item._id)"
              color="teal"
              flat
            >
              <v-icon>add</v-icon>
            </v-btn>
          </td>
          <td class="text-xs-left px-0 td-delete">
            <v-btn
              @click="handleDelete(props.item._id)"
              color="red darken-4"
              flat
            >
              <v-icon center>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['headerInfo', 'rowItems', 'countType', 'mediaType'],
  methods: {
    /* eslint-disable-next-line */
    incrementOne(id) {
      this.$store.dispatch(`increment${this.countType}Count`, id)
    },
    /* eslint-disable-next-line */
    handleDelete(id) {
      this.$store.dispatch(`delete${this.mediaType}`, id)
    }
  },
  computed: {
    /* eslint-disable-next-line */
    color() {
      return this.$store.getters.userColor || 'success'
    }
  }
}
</script>

<style scoped>
.td-delete {
  text-align: center;
}
</style>
