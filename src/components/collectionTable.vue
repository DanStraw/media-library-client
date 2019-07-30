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
              :to="`/movies/${props.item._id}`"
              color="green"
              flat
              router
            >{{ props.item.itemInfo.title }}</v-btn>
          </td>
          <td class="text-xs">{{ props.item.format }}</td>
          <td
            class="text-xs"
          >{{props.item.viewCount == 0 ? '-' : props.item.updated_at | formatTime }}</td>
          <td class="text-xs">{{ props.item.viewCount }}</td>
          <td class="text-xs-left px-0">
            <v-btn
              @click="incrementOne(props.item._id)"
              color="teal"
              flat
            >
              <v-icon>add</v-icon>
            </v-btn>
          </td>
          <td class="text-xs-left px-0">
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
  props: ['headerInfo', 'rowItems', 'countType'],
  methods: {
    /* eslint-disable-next-line */
    incrementOne(id) {
      this.$store.dispatch(`increment${this.countType}Count`, id)
    }
  }
}
</script>
