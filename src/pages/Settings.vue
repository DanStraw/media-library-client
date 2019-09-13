<template>
  <v-layout
    justify-center
    row
  >
    <v-flex
      md6
      xs12
    >
      <v-card>
        <v-card-title class="headline">Account Settings</v-card-title>
        <v-card-text>
          <div class="text-row py-5 password-edit">
            <span class="settings-left">Change Password</span>
            <v-btn
              @click="showPasswordForm = !showPasswordForm"
              class="settings-right secondary"
            >
              <span>Edit Password</span>
              <v-icon right>lock</v-icon>
            </v-btn>
            <v-form
              class="pt-3"
              v-if="showPasswordForm"
              v-on:submit.prevent="handlePasswordUpdate"
            >
              <v-text-field
                @blur="checkOldPassword"
                @keyup="checkOldPassword"
                label="Old Password"
                type="password"
                v-model="passwordForm.oldPassword"
              ></v-text-field>
              <div
                class="red--text caption error-msg"
                v-if="oldPasswordError"
              >{{ oldPasswordError }}</div>
              <v-text-field
                :rules="passwordRule"
                label="New Password"
                type="password"
                v-model="passwordForm.newPassword"
              ></v-text-field>
              <div class="red--text caption error-msg"></div>
              <v-text-field
                :rules="confirmPasswordRule"
                label="Confirm New Password"
                type="password"
                v-model="passwordForm.newPasswordConfirm"
              ></v-text-field>
              <v-btn
                :disabled="!passwordUpdateFormValid"
                type="submit"
              >Submit</v-btn>
            </v-form>
          </div>
          <div class="text-row py-5 color-edit">
            <span class="settings-left">Change Color</span>
            <v-btn
              @click="showColorForm = !showColorForm"
              class="settings-right secondary"
            >
              <span>Edit Color</span>
              <v-icon right>color_lens</v-icon>
            </v-btn>
            <v-form
              @submit.prevent="handleColorUpdate"
              class="pt-5"
              v-if="showColorForm"
            >
              <select
                :class="selectedColor"
                id="color-select"
                name="color-select"
                v-model="selectedColor"
              >
                <option
                  :class="color"
                  :key="color"
                  :selected="color === userColor"
                  :value="color"
                  v-for="color in colors"
                ></option>
              </select>
              <v-btn
                id="color-btn"
                type="submit"
              >Submit</v-btn>
            </v-form>
          </div>
          <div class="text-row py-5">
            <span class="settings-left">Delete Account</span>
            <v-btn
              @click="showDeleteForm = !showDeleteForm"
              class="settings-right secondary"
            >
              <span>Delete Account</span>
              <v-icon right>delete_forever</v-icon>
            </v-btn>
            <v-form
              class="pt-4"
              v-if="showDeleteForm"
              v-on:submit.prevent="handleUserDelete"
            >
              <v-text-field
                :rules="deleteFormRule"
                label="Enter Your Username to Delete"
                v-model="deleteForm.username"
              ></v-text-field>
              <v-btn
                :disabled="deleteForm.username != username"
                block
                class="error"
                type="submit"
              >Delete</v-btn>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  /* eslint-disable-next-line */
  data() {
    return {
      showPasswordForm: false,
      showColorForm: false,
      showDeleteForm: false,
      colors: ['success', 'primary', 'secondary', 'warning', 'error'],
      passwordRule: [
        v => {
          if (this.passwordForm.newPasswordConfirm.length > 0) {
            return v === this.passwordForm.newPasswordConfirm
              ? true
              : `'New Password' and 'Confirm New Password' do not match`
          }
          return true
        }
      ],
      confirmPasswordRule: [
        v =>
          v === this.passwordForm.newPassword
            ? true
            : 'Confirm Password Does Not Match'
      ],
      deleteFormRule: [
        v =>
          v === this.username ? true : 'Username Not a Match (Case Sensitive)'
      ]
    }
  },
  computed: {
    /* eslint-disable-next-line */
    passwordForm() {
      return this.$store.getters.passwordForm
    },
    /* eslint-disable-next-line */
    oldPasswordError() {
      return this.$store.getters.oldPasswordError
    },
    /* eslint-disable-next-line */
    passwordUpdateFormValid() {
      if (this.passwordForm.newPassword.length < 6) {
        return false
      } else if (
        this.passwordForm.newPassword !== this.passwordForm.newPasswordConfirm
      ) {
        return false
      } else if (this.oldPasswordError !== '') {
        return false
      } else {
        return true
      }
    },
    /* eslint-disable-next-line */
    deleteForm() {
      return this.$store.getters.deleteForm
    },
    /* eslint-disable-next-line */
    username() {
      return this.$store.getters.user.username
    },
    /* eslint-disable-next-line */
    userColor() {
      return this.$store.getters.userColor
    },
    selectedColor: {
      /* eslint-disable-next-line */
      get: function() {
        return this.$store.getters.selectedColor
      },
      /* eslint-disable-next-line */
      set: function(v) {
        this.$store.dispatch('setSelectedColor', v)
      }
    }
  },
  methods: {
    /* eslint-disable-next-line */
    checkOldPassword() {
      this.$store.dispatch('checkOldPassword')
    },
    /* eslint-disable-next-line */
    handlePasswordUpdate() {
      this.$store.dispatch('handlePasswordUpdate')
    },
    /* eslint-disable-next-line */
    handleColorUpdate() {
      this.$store.dispatch('updateColor', this.selectedColor)
    },
    /* eslint-disable-next-line */
    handleUserDelete() {
      this.$store.dispatch('handleUserDelete')
    }
  },
  /* eslint-disable-next-line */
  beforeCreate() {
    this.$store.dispatch('getUser', 'all')
  }
}
</script>

<style scoped>
.headline {
  justify-content: center;
  border-bottom: 1px black ridge;
  padding-left: 5px;
}
.text-row {
  width: 100%;
}
.settings-left {
  position: relative;
  left: 50px;
}
.settings-right {
  position: absolute;
  right: 50px;
  margin-top: -5px;
}
.password-edit,
.color-edit {
  border-bottom: 4px slategray ridge;
}
select {
  position: relative;
  width: 150px;
  align-self: center;
  border: 2px solid black !important;
  left: 50px;
}
#color-btn {
  position: relative;
  left: 50px;
}
.error-msg {
  position: relative;
  top: -12px;
}
</style>
