<template>
  <div class="home">
    <v-container class="hidden-sm-and-down">
      <v-layout
        justify-center
        pb-5
        row
      >
        <v-flex md7>
          <v-card
            :class="color"
            class="lighten-3"
            elevation="6"
          >
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
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 16 : 6"
              :to="item.info ? `${item.link}/${item.info._id}` : '/'"
              class="grey lighten-4"
              height="180"
              router
            >
              <v-card-title
                :class="color"
                class="justify-center title card-title pa-4 lighten-4"
                primary-title
                v-if="item"
              >{{ item.header }}</v-card-title>
              <v-spacer></v-spacer>
              <v-card-text tag="button">
                <div
                  class="subtitle-1"
                  v-if="item.info"
                >
                  <span class="item-info">
                    <p>{{ item.info.itemInfo.title }}</p>
                    <p>{{ item.countText }}: {{ item.info.updated_at | formatTime(`Do MM 'YY hh:mm a`) }}</p>
                  </span>
                  <span class="image">
                    <v-img
                      :src="item.info.itemInfo.image"
                      height="50"
                      v-if="item.countText !== 'Viewed'"
                      width="50"
                    ></v-img>
                    <v-img
                      :src="`https://image.tmdb.org/t/p/w185${item.info.itemInfo.image}`"
                      height="70"
                      v-else
                      width="50"
                    ></v-img>
                  </span>
                </div>
                <div
                  class="headline"
                  v-else
                >
                  No {{ item.nullText }} Yet. Add Some
                  <router-link :to="item.libLink">Here</router-link>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="hidden-md-and-up">
      <v-carousel height="450">
        <v-carousel-item
          :class="color"
          :key="item.countText"
          class="lighten-4"
          v-for="item in recentItems"
        >
          <v-layout
            justify-center
            pt-4
            row
            wrap
          >
            <v-flex
              class="headline"
              sm7
              xs10
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
              sm4
              v-if="item.info"
              xs19
            >
              <p>{{ item.info.itemInfo.title }}</p>
              <p>{{ item.countText }}: {{ item.info.updated_at | formatTime(`Do MM 'YY hh:mm a`) }}</p>
            </v-flex>
            <v-flex
              sm4
              v-if="item.info"
              xs19
            >
              <v-img
                :src="item.info.itemInfo.image"
                height="200"
                v-if="item.countText !== 'Viewed'"
                width="200"
              ></v-img>
              <v-img
                :src="`https://image.tmdb.org/t/p/w185${item.info.itemInfo.image}`"
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
          libLink: '/movies',
          link: '/movie'
        },
        {
          info: this.$store.getters.recentBook,
          header: 'Most Recently Read Book',
          countText: 'Read',
          nullText: 'Books Read',
          libLink: '/books',
          link: '/book'
        },
        {
          info: this.$store.getters.recentAlbum,
          header: 'Most Recently Listened Album',
          countText: 'Listened',
          nullText: 'Albums Listed To',
          libLink: '/albums',
          link: '/album'
        },
        {
          info: this.$store.getters.recentGame,
          header: 'Most Recently Played Game',
          countText: 'Played',
          nullText: 'Games Played',
          libLink: '/games',
          link: '/game'
        }
      ]
    },
    /* eslint-disable-next-line */
    color() {
      return this.$store.getters.userColor || 'success'
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
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
  border-bottom: 3px grey ridge;
}
.item-info {
  width: 70%;
  float: left;
}
.image {
  width: 30%;
}
</style>
