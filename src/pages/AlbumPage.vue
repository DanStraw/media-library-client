<template>
  <div>
    <v-card
      class="pa-3"
      flat
      v-if="album"
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Title</div>
          <div>{{ album.itemInfo.title }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Artists</div>
          <div
            :key="artist"
            v-for="artist in album.itemInfo.artists"
          >
            <span>{{ artist }}</span>
          </div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Format</div>
          <div>{{ album.format }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Last Listen</div>
          <div>{{ album.updated_at | formatTime(`MMM Do 'YY`)}}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Times Listened</div>
          <div>{{ album.listenCount }}</div>
        </v-flex>
        <v-flex
          md8
          xs12
        >
          <div class="caption grey--text">Cover</div>
          <div>
            <img
              :src="`${album.itemInfo.image}`"
              alt
            />
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card
      class="grey lighten-3"
      flat
    >
      <v-layout
        justify-center
        row
      >
        <v-flex
          md2
          xs12
        >
          <v-btn
            color="cyan darken-4"
            flat
            to="/albums/"
          >
            <v-icon>arrow_back</v-icon>Return to Albums
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
  /* eslint-disable-next-line */
  beforeCreate() {
    this.$store.dispatch('getUser', 'albums')
    this.$store.dispatch('setAlbumID', this.$route.params.albumID)
  },
  /* eslint-disable-next-line */
  mounted() {},
  methods: {},
  computed: {
    /* eslint-disable-next-line */
    album() {
      return this.$store.getters.album
    }
  }
}
</script>
