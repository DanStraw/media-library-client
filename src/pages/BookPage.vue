<template>
  <div>
    <v-card
      class="pa-3"
      flat
      v-if="book"
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
          <div>{{ book.itemInfo.title }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Authors</div>
          <div
            :key="author"
            v-for="author in book.itemInfo.authors"
          >
            <span>{{ author }}</span>
          </div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Format</div>
          <div>{{ book.format }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Last Read</div>
          <div>{{ book.updated_at | formatTime(`MMM Do 'YY`)}}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Times Read</div>
          <div>{{ book.readCount }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Summary</div>
          <div>{{ book.itemInfo.summary }}</div>
        </v-flex>
        <v-flex
          md8
          xs12
        >
          <div class="caption grey--text">Cover</div>
          <div>
            <img
              :src="`${book.itemInfo.image}`"
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
            to="/books/"
          >
            <v-icon>arrow_back</v-icon>Return to Books
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
    this.$store.dispatch('getUser', 'books')
    this.$store.dispatch('setBookID', this.$route.params.bookID)
  },
  methods: {},
  computed: {
    /* eslint-disable-next-line */
    book() {
      return this.$store.getters.book
    }
  }
}
</script>
