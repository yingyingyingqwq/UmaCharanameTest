import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    hardMode: false,
    random30: false,
    allowContinueOnError: false,
  }),
  persist: true,
  actions: {
    setHardMode(value) {
      this.hardMode = value
      if (value) {
        this.allowContinueOnError = true
      }
    },
  }
})