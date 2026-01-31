<template>
  <div class="game-page">
    <div class="actions-bar">
      <nuxt-link to="/" class="back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>返回首页</span>
      </nuxt-link>
    </div>
    <div class="game-content">
      <GameBoard :mode="mode" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    mode() {
      return this.$route.query.mode || 'normal'
    }
  },
  head() {
    return {
      title: this.mode === 'normal' ? '角色模式 - 马批浓度测试' : '声优模式 - 马批浓度测试'
    }
  }
}
</script>

<style scoped>
.game-page {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.actions-bar {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
  color: var(--text-main);
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  border: 1px solid rgba(0,0,0,0.05);
}

.back-btn svg {
  margin-right: 6px;
  width: 18px;
  height: 18px;
}

.back-btn:hover {
  transform: translateX(-3px);
  box-shadow: var(--shadow-md);
  color: var(--primary-color);
}

.game-content {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
