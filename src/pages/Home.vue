<template>
  <div class="home">
    <v-container class="hidden-sm-and-down">
      <v-layout
        justify-center
        pb-5
        row
      >
        <v-flex md7>
          <v-card>
            <v-card-title class="display-1 justify-center">{{ user.username }}&#39;s Media Summary</v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout
        justify-space-around
        row
        wrap
      >
        <v-flex
          :key="item.countText"
          md5
          py-2
          v-for="item in recentItems"
        >
          <v-card height="180">
            <v-card-title
              class="justify-center title card-title"
              primary-title
              v-if="item"
            >{{ item.header }}</v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
              <div
                class="subtitle-1"
                v-if="item.info"
              >
                <p>{{ item.info.itemInfo.title }}</p>
                <p>{{ item.countText }}: {{ item.updated_at | formatTime(`Do MM 'YY hh:mm a`) }}</p>
              </div>
              <div
                class="headline"
                v-else
              >
                No {{ item.nullText }} Yet. Add Some
                <router-link :to="item.link">Here</router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="hidden-md-and-up">
      <v-carousel height="450">
        <v-carousel-item
          :key="item.countText"
          class="grey lighten-3"
          v-for="item in recentItems"
        >
          <v-layout
            justify-center
            pt-4
            row
            wrap
          >
            <v-flex
              class="display-1"
              sm7
              xs12
            >{{ item.header }}</v-flex>
          </v-layout>
          <v-layout
            justify-space-around
            pt-3
            row
            v-if="item.info"
            wrap
          >
            <v-flex
              class="title"
              sm5
              v-if="item.info"
              xs12
            >
              <p>{{ item.info.itemInfo.title }}</p>
              <p>{{ item.countText }}: {{ item.updated_at | formatTime(`Do MM 'YY hh:mm a`) }}</p>
            </v-flex>
            <v-flex
              sm5
              v-if="item.info"
              xs12
            >
              <v-img
                :src="item.info.itemInfo.image"
                height="200"
                v-if="item.countText !== 'Viewed'"
                width="200"
              ></v-img>
              <v-img
                :src="`http://image.tmdb.org/t/p/w185${item.info.itemInfo.image}`"
                height="270"
                v-else
                width="200"
              ></v-img>
            </v-flex>
          </v-layout>
          <v-layout
            justify-space-around
            mt-5
            pt-5
            row
            v-else
            wrap
          >
            <v-flex
              class="headline"
              sm8
              xs12
            >
              No {{ item.nullText }} Yet. Add Some
              <router-link :to="item.link">Here</router-link>
            </v-flex>
          </v-layout>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
export default {
  /* eslint-disable-next-line */
  data() {
    return {
      movies: [],
      mostRecentMovie: {}
    }
  },
  methods: {},
  computed: {
    /* eslint-disable-next-line */
    user() {
      return this.$store.getters.user
    },
    /* eslint-disable-next-line */
    recentMovie() {
      return this.$store.getters.recentMovie
    },
    /* eslint-disable-next-line */
    recentBook() {
      return this.$store.getters.recentBook
    },
    /* eslint-disable-next-line */
    recentAlbum() {
      return this.$store.getters.recentAlbum
    },
    /* eslint-disable-next-line */
    recentGame() {
      return this.$store.getters.recentGame
    },
    /* eslint-disable-next-line */
    recentItems() {
      return [
        {
          info: this.$store.getters.recentMovie,
          header: 'Most Recently Viewed Movie',
          countText: 'Viewed',
          nullText: 'Movies Viewed',
          link: '/movies'
        },
        {
          info: this.$store.getters.recentBook,
          header: 'Most Recently Read Book',
          countText: 'Read',
          nullText: 'Books Read',
          link: '/books'
        },
        {
          info: this.$store.getters.recentAlbum,
          header: 'Most Recently Listened Album',
          countText: 'Listened',
          nullText: 'Albums Listed To',
          link: '/albums'
        },
        {
          info: this.$store.getters.recentGame,
          header: 'Most Recently Played Game',
          countText: 'Played',
          nullText: 'Games Played',
          link: '/games'
        }
      ]
    }
  },
  /* eslint-disable-next-line */
  mounted() {
    this.$store.dispatch('getUser', 'all')
  }
}
</script>

<style slot-scoped>
ul {
  list-style: none;
}
.home {
  padding-top: 50px;
}
.card-title {
  border-bottom: 1px black solid;
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
}
</style>
