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
              :to="`/${mediaType.toLowerCase()}/${props.item._id}`"
              color="green"
              flat
              router
            >{{ props.item.itemInfo.title }}</v-btn>
          </td>
          <td class="text-xs">{{ props.item.format }}</td>
          <td
            class="text-xs"
          >{{props.item.viewCount == 0 || props.item.readCount == 0 || props.item.listenCount == 0 || props.item.playCount == 0 ? '-' : props.item.updated_at | formatTime(`MMM Do 'YY, h:m a`) }}</td>
          <td
            class="text-xs"
          >{{ props.item.viewCount || props.item.readCount || props.item.listenCount || props.item.playCount }}</td>
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
  }
}
</script>

<style scoped>
.td-delete {
  text-align: center;
}
</style>
