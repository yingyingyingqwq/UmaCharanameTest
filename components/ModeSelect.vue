<template>
  <div class="mode-select">
    <div class="buttons">
      <nuxt-link to="/game?mode=normal" class="mode-card normal">
        <div class="icon">🐴</div>
        <div class="text">
          <h3>全马娘角色名</h3>
          <p class="description">根据给出的立绘，写下对应马娘的角色名吧！</p>
        </div>
      </nuxt-link>
      <nuxt-link to="/game?mode=seiyuu" class="mode-card seiyuu">
        <div class="icon">🎙️</div>
        <div class="text">
          <h3>全马娘声优名</h3>
          <p class="description">根据给出的立绘，写下对应马娘的声优名吧！</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModeSelect'
}
</script>

<style scoped>
.mode-select {
  width: 100%;
}

.description {
  font-size: 0.75rem !important;
  color: var(--text-sub) !important;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mode-card {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-decoration: none;
  color: var(--text-main);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.mode-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.mode-card .icon {
  font-size: 2.5rem;
  margin-right: 20px;
  background: #f0f2f5;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.mode-card:hover .icon {
  background: var(--primary-color);
  transform: scale(1.1) rotate(10deg);
}

.mode-card .text h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.mode-card .text p {
  font-size: 0.85rem;
  color: var(--text-sub);
}

.mode-card.seiyuu:hover {
  border-color: #8c83ff;
}

.mode-card.seiyuu:hover .icon {
  background: #8c83ff;
}

@media (min-width: 600px) {
  .buttons {
    flex-direction: row;
    justify-content: center;
  }
  
  .mode-card {
    flex: 1;
    min-width: 240px;
    flex-direction: column;
    text-align: center;
    padding: 40px 20px;
  }
  
  .mode-card .icon {
    margin-right: 0;
    margin-bottom: 20px;
    width: 80px;
    height: 80px;
    font-size: 3rem;
  }
}
</style>
