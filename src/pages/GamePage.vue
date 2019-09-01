<template>
  <div>
    <v-card
      class="pa-3"
      flat
      v-if="game"
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
          <div>{{ game.itemInfo.title }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Genres</div>
          <div
            :key="genre"
            v-for="genre in game.itemInfo.genres"
          >
            <span>{{ genre }}</span>
          </div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">System</div>
          <div>{{ game.format }}</div>
        </v-flex>

        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Release Date</div>
          <div>{{ game.itemInfo.release_date * 1000 | formatTime('MMM Do YYYY')}}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Available Systems</div>
          <div
            :key="system"
            v-for="system in game.itemInfo.platforms"
          >
            <span>{{ system }}</span>
          </div>
        </v-flex>

        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Last Played</div>
          <div>{{ game.updated_at | formatTime(`MMM Do 'YY`)}}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Times Played</div>
          <div>{{ game.playCount }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Summary</div>
          <div>{{ game.itemInfo.summary }}</div>
        </v-flex>

        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Franchise</div>
          <div>{{ game.itemInfo.franchise }}</div>
        </v-flex>

        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Rating</div>
          <div>{{ game.itemInfo.rating.toFixed(2) }}</div>
        </v-flex>

        <v-flex
          md8
          xs12
        >
          <div class="caption grey--text">Cover</div>
          <div>
            <img
              :src="`${game.itemInfo.image}`"
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
            to="/games/"
          >
            <v-icon>arrow_back</v-icon>Return to Games
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
  beforeCreate() {},
  /* eslint-disable-next-line */
  beforeMount() {
    this.$store.dispatch('getUser', 'games')
    this.$store.dispatch('setGameID', this.$route.params.gameID)
  },
  methods: {},
  computed: {
    /* eslint-disable-next-line */
    game() {
      return this.$store.getters.game
    }
  }
}
</script>
