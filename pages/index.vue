<template>
  <div class="home-page">
    <div class="content-wrapper">
      <div class="hero-section">
        <h1 class="title">马批浓度测试器</h1>
        <p class="subtitle">Umamusume Quiz</p>
      </div>
      <ModeSelect />
    </div>
  </div>
</template>

<script setup>
import ModeSelect from '@/components/ModeSelect.vue'
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  animation: fadeInDown 0.8s ease;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, var(--primary-color), #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-sub);
  letter-spacing: 2px;
  text-transform: uppercase;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .title {
    font-size: 2.5rem;
  }
}
</style>
