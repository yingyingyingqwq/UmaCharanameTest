<template>
  <div class="timer-wrapper">
    <div class="timer-pill">
      <div class="timer-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      </div>
      <div class="timer-value">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startTime: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      elapsedTime: 0,
      timerInterval: null
    }
  },
  computed: {
    formattedTime() {
      const totalSeconds = Math.floor(this.elapsedTime / 1000)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },
  mounted() {
    this.timerInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime
    }, 1000)
  },
  beforeDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
  }
}
</script>

<style scoped>
.timer-wrapper {
  display: inline-flex;
}

.timer-pill {
  display: flex;
  align-items: center;
  background: white;
  color: var(--text-main);
  padding: 6px 14px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-variant-numeric: tabular-nums;
  border: 1px solid rgba(0,0,0,0.1);
}

.timer-icon {
  display: flex;
  align-items: center;
  margin-right: 8px;
  opacity: 0.6;
}

.timer-value {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>