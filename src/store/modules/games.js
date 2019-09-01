import gameService from '../../services/game.service'
import userService from '../../services/user.service'
import { store } from '../store'

const state = {
  newGame: {
    title: '',
    format: ''
  },
  gameTableHeaders: [
    { text: 'Game Title', value: 'title' },
    { text: 'Format', value: 'format' },
    { text: 'Last Play', value: 'date_updated' },
    { text: 'Total Plays', value: 'plays' },
    { text: 'Add to Play Count', value: 'play' },
    { text: 'Delete', value: 'delete' }
  ],
  gameDialog: false,
  gameFormDetails: {
    header: 'Game',
    inputs: [
      {
        label: 'Game Title',
        type: 'input',
        value: 'title'
      },
      {
        label: 'Format',
        options: ['PS4', 'PS3', 'XBOX', 'Wii', 'PS2', 'XBOX One', 'N64'],
        type: 'select',
        value: 'format'
      }
    ],
    submitAction: 'handleGameSubmit',
    datalistAction: 'handleGameDatalist',
    datalistItems: [],
    showDatalist: false,
    gameID: null
  },
  snackbar: {
    show: false,
    itemTitle: null,
    timeout: 2000,
    errorMessage: '',
    color: 'success'
  },
  formLoading: false
}

const mutations = {
  /* eslint-disable-next-line */
  'ADD_TO_GAME_LIBRARY'(state) {
    const newGame = {
      game: state.newGame.title,
      format: state.newGame.format,
      token: localStorage.getItem('mml_jwt')
    }
    state.formLoading = true
    gameService.addGame(newGame).then(res => {
      if (res.status !== 201) {
        switch (res.status) {
          case 409:
          case 411:
            throw Error(res.data)
          default:
            throw Error('Item Could Not Be Added')
        }
      }
      state.snackbar.itemTitle = res.data
      state.newGame.title = ''
      state.newGame.format = ''
      state.dialog = false
      state.snackbar.show = true
      state.formLoading = false
      state.snackbar.errorMessage = ''
      state.snackbar.color = 'success'
      state.gameFormDetails.datalistItems = []
    })
      .then(res => {
        this.dispatch('getUser', 'games')
      }).catch(e => {
        state.formLoading = false
        state.newGame.title = ''
        state.newGame.format = ''
        state.snackbar.errorMessage = e.message
        state.snackbar.show = true
        state.snackbar.itemTitle = ''
        state.dialog = false
        state.snackbar.color = 'error'
        state.gameFormDetails.datalistItems = []
      })
  },
  /* eslint-disable-next-line */
  'INCREMENT_PLAY_COUNT'(state, gameId) {
    const user = JSON.parse(localStorage.getItem('mml_user'))
    const mediaType = 'games'
    const mediaAction = 'play'
    userService.updateCount(user, gameId, mediaType, mediaAction).then(res => {
      this.dispatch('getUser', 'games')
    })
  },
  /* eslint-disable-next-line */
  'GAME_DATALIST'(state) {
    if (state.newGame.title.length < 3) {
      return false
    }
    gameService.generateDatalist(state.newGame.title).then(res => {
      state.gameFormDetails.showDatalist = false
      state.gameFormDetails.datalistItems = []
      let items = []
      res.forEach(resItem => {
        items.push({ title: resItem })
      })
      state.gameFormDetails.showDatalist = true
      state.gameFormDetails.datalistItems = items
    })
  },
  /* eslint-disable-next-line */
  'DELETE_GAME'(state, gameId) {
    const user = this.state.users.user
    const mediaType = 'games'
    userService.deleteItem(user, gameId, mediaType).then(res => {
      this.dispatch('getUser', 'games')
    })
  },
  /* eslint-disable-next-line */
  'SET_GAME_ID'(state, gameID) {
    state.gameID = gameID
  }
}

const actions = {
  handleGameSubmit: ({ commit }) => {
    commit('ADD_TO_GAME_LIBRARY')
  },
  handleGameDatalist: ({ commit }) => {
    commit('GAME_DATALIST')
  },
  incrementPlayCount: ({ commit }, gameId) => {
    commit('INCREMENT_PLAY_COUNT', gameId)
  },
  deleteGame: ({ commit }, gameId) => {
    commit('DELETE_GAME', gameId)
  },
  setGameID: ({ commit }, gameID) => {
    commit('SET_GAME_ID', gameID)
  }
}

const getters = {
  gameFormDetails: state => state.gameFormDetails,
  newGame: state => state.newGame,
  gameDialog: state => state.gameDialog,
  game: (state) => {
    let games = store.state.users.user.games
    if (games) {
      games = games.filter(game => {
        return game._id === state.gameID
      })
      return games[0]
    }
  },
  gameSnackbar: state => state.snackbar,
  handleGameLoading: state => state.formLoading
}

export const games = {
  state,
  mutations,
  actions,
  getters
}
