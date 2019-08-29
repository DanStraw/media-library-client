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
      >
        <v-flex
          md3
          xs12
        >
          <v-card>
            <v-card-title
              class="justify-center title"
              primary-title
            >
              <span class="card-title">Most Recently Viewed Movie</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
              <div v-if="recentMovie">
                <p>{{recentMovie.itemInfo.title}}</p>
                <p>Viewed: {{recentMovie.updated_at | formatTime(`Do MMM 'YY h:mm a`) }}</p>
              </div>
              <div v-else>
                No Movies Yet. Add Some
                <router-link to="/movies">Here</router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex
          md3
          xs12
        >
          <v-card>
            <v-card-title
              class="justify-center title"
              primary-title
            >
              <span class="card-title">Most Recently Read Book</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text class="text-center">
              <div v-if="recentBook">
                <p>{{ recentBook.itemInfo.title }}</p>
                <p>Read: {{recentBook.updated_at | formatTime(`Do MMM 'YY h:mm a`) }}</p>
              </div>
              <div v-else>
                No Books Yet. Add Some
                <router-link to="/books">Here</router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout
        justify-space-around
        pt-5
        row
      >
        <v-flex
          md3
          xs12
        >
          <v-card class="text-center">
            <v-card-title
              class="justify-center title"
              primary-title
            >
              <span class="card-title">Most Recent Album Listened To</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
              <div v-if="recentAlbum">
                <p>{{ recentAlbum.itemInfo.title }}</p>
                <p>Listened: {{recentAlbum.updated_at | formatTime(`Do MMM 'YY h:mm a`) }}</p>
              </div>
              <div v-else>
                No Albums Yet. Add Some
                <router-link to="/albums">Here</router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex
          md3
          xs12
        >
          <v-card>
            <v-card-title
              class="justify-center title"
              primary-title
            >
              <span class="card-title">Most Recently Played Game</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
              <div v-if="recentGame">
                <p>{{ recentGame.itemInfo.title }}</p>
                <p>Played: {{recentGame.updated_at | formatTime(`Do MMM 'YY h:mm a`) }}</p>
              </div>
              <div v-else>
                No Games Yet. Add Some
                <router-link to="/games">Here</router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="hidden-md-and-up">
      <v-carousel>
        <v-carousel-item
          :key="item.countText"
          v-for="item in recentItems"
        >
          <v-sheet
            color="primary"
            height="100%"
            tile
          >
            <v-card
              class="justify-center"
              color="secondary"
              height="100%"
            >
              <v-card-title class="justify-center display-1">{{ item.header }}</v-card-title>
              <v-spacer></v-spacer>
              <v-card-text class="justify-center headline">
                <div v-if="item.info">
                  <p>{{ item.info.itemInfo.title }}</p>
                  <p>{{ item.countText }}: {{ item.updated_at | formatTime(`Do MM 'YY hh:mm a`) }}</p>
                </div>
                <div v-else>
                  No {{ item.nullText }} Yet. Add Some
                  <router-link :to="item.link">Here</router-link>
                </div>
              </v-card-text>
            </v-card>
          </v-sheet>
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
