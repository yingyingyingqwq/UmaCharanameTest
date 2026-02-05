<template>
  <div class="mode-select">
    <div class="buttons">
      <nuxt-link to="/game?mode=normal" class="mode-card normal">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 112" fill="currentColor" width="36" height="36"><path d="M100.7 94.6c-2.4-2.1-7-3.9-4.4-7.8 18.8-27.1 10.9-70.4-22.4-81.6C67.5 2.9 60.7 1.8 54 1.8S40.4 3 34.1 5.2C.7 16.5-7.1 59.8 11.7 86.8c2.6 3.8-2 5.7-4.4 7.8-1.6 1.3-1.8 3.5-.5 5 2.8 3.2 5.7 6.4 8.6 9.5 1.4 1.7 3.6 1.2 5.1 0 7.1-4.7 14.1-9.4 21.2-14.1.8-.5 1.3-1.2 1.5-2.1.3-1.3 0-2.4-1.1-3.3-3.1-2.9-5.5-6.2-7.3-10.1-3.9-8.8-5-20.5-2-29.7 3.1-9.9 11.8-15.3 21.2-15.3s18.1 5.4 21.2 15.3c2.9 9.2 1.9 20.9-2 29.7-1.8 3.8-4.2 7.2-7.3 10.1-1 .9-1.4 2-1.1 3.3.2.9.7 1.6 1.5 2.1 7.1 4.7 14.1 9.4 21.2 14.1 1.5 1.2 3.7 1.6 5.1 0 2.9-3.2 5.7-6.3 8.6-9.5 1.4-1.5 1.1-3.7-.5-5"></path></svg>
        </div>
        <div class="text">
          <h3>全马娘角色名</h3>
          <p class="description">根据给出的立绘，写下对应马娘的角色名吧！</p>
        </div>
      </nuxt-link>
      <nuxt-link to="/game?mode=seiyuu" class="mode-card seiyuu">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 112" fill="currentColor" width="36" height="36"><path d="M100.7 94.6c-2.4-2.1-7-3.9-4.4-7.8 18.8-27.1 10.9-70.4-22.4-81.6C67.5 2.9 60.7 1.8 54 1.8S40.4 3 34.1 5.2C.7 16.5-7.1 59.8 11.7 86.8c2.6 3.8-2 5.7-4.4 7.8-1.6 1.3-1.8 3.5-.5 5 2.8 3.2 5.7 6.4 8.6 9.5 1.4 1.7 3.6 1.2 5.1 0 7.1-4.7 14.1-9.4 21.2-14.1.8-.5 1.3-1.2 1.5-2.1.3-1.3 0-2.4-1.1-3.3-3.1-2.9-5.5-6.2-7.3-10.1-3.9-8.8-5-20.5-2-29.7 3.1-9.9 11.8-15.3 21.2-15.3s18.1 5.4 21.2 15.3c2.9 9.2 1.9 20.9-2 29.7-1.8 3.8-4.2 7.2-7.3 10.1-1 .9-1.4 2-1.1 3.3.2.9.7 1.6 1.5 2.1 7.1 4.7 14.1 9.4 21.2 14.1 1.5 1.2 3.7 1.6 5.1 0 2.9-3.2 5.7-6.3 8.6-9.5 1.4-1.5 1.1-3.7-.5-5"></path></svg>
        </div>
        <div class="text">
          <h3>全马娘声优名</h3>
          <p class="description">根据给出的立绘，写下对应马娘的声优名吧！</p>
        </div>
      </nuxt-link>
      <nuxt-link to="/game?mode=pixel" class="mode-card pixel">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 112" fill="currentColor" width="36" height="36"><path d="M100.7 94.6c-2.4-2.1-7-3.9-4.4-7.8 18.8-27.1 10.9-70.4-22.4-81.6C67.5 2.9 60.7 1.8 54 1.8S40.4 3 34.1 5.2C.7 16.5-7.1 59.8 11.7 86.8c2.6 3.8-2 5.7-4.4 7.8-1.6 1.3-1.8 3.5-.5 5 2.8 3.2 5.7 6.4 8.6 9.5 1.4 1.7 3.6 1.2 5.1 0 7.1-4.7 14.1-9.4 21.2-14.1.8-.5 1.3-1.2 1.5-2.1.3-1.3 0-2.4-1.1-3.3-3.1-2.9-5.5-6.2-7.3-10.1-3.9-8.8-5-20.5-2-29.7 3.1-9.9 11.8-15.3 21.2-15.3s18.1 5.4 21.2 15.3c2.9 9.2 1.9 20.9-2 29.7-1.8 3.8-4.2 7.2-7.3 10.1-1 .9-1.4 2-1.1 3.3.2.9.7 1.6 1.5 2.1 7.1 4.7 14.1 9.4 21.2 14.1 1.5 1.2 3.7 1.6 5.1 0 2.9-3.2 5.7-6.3 8.6-9.5 1.4-1.5 1.1-3.7-.5-5"></path></svg>
        </div>
        <div class="text">
          <h3>像素猜马娘</h3>
          <p class="description">根据立绘生成的像素色块，猜出是哪位马娘！</p>
        </div>
      </nuxt-link>
      <nuxt-link to="/game?mode=recite" class="mode-card recite">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 112" fill="currentColor" width="36" height="36"><path d="M100.7 94.6c-2.4-2.1-7-3.9-4.4-7.8 18.8-27.1 10.9-70.4-22.4-81.6C67.5 2.9 60.7 1.8 54 1.8S40.4 3 34.1 5.2C.7 16.5-7.1 59.8 11.7 86.8c2.6 3.8-2 5.7-4.4 7.8-1.6 1.3-1.8 3.5-.5 5 2.8 3.2 5.7 6.4 8.6 9.5 1.4 1.7 3.6 1.2 5.1 0 7.1-4.7 14.1-9.4 21.2-14.1.8-.5 1.3-1.2 1.5-2.1.3-1.3 0-2.4-1.1-3.3-3.1-2.9-5.5-6.2-7.3-10.1-3.9-8.8-5-20.5-2-29.7 3.1-9.9 11.8-15.3 21.2-15.3s18.1 5.4 21.2 15.3c2.9 9.2 1.9 20.9-2 29.7-1.8 3.8-4.2 7.2-7.3 10.1-1 .9-1.4 2-1.1 3.3.2.9.7 1.6 1.5 2.1 7.1 4.7 14.1 9.4 21.2 14.1 1.5 1.2 3.7 1.6 5.1 0 2.9-3.2 5.7-6.3 8.6-9.5 1.4-1.5 1.1-3.7-.5-5"></path></svg>
        </div>
        <div class="text">
          <h3>默写马娘名</h3>
          <p class="description">凭记忆默写出所有马娘的名字！</p>
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
  flex-shrink: 0;
}

.mode-card:hover .icon {
  background: var(--primary-color);
  transform: scale(0.8);
  color: white;
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

.mode-card.pixel:hover {
  border-color: #ff9f43;
}

.mode-card.pixel:hover .icon {
  background: #ff9f43;
}

.mode-card.recite:hover {
  border-color: #2e86de;
}

.mode-card.recite:hover .icon {
  background: #2e86de;
}

@media (min-width: 600px) {
  .buttons {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .mode-card {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
    min-width: 200px;
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }
  
  .mode-card .icon {
    margin-right: 0;
    margin-bottom: 20px;
    width: 80px;
    height: 80px;
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
    .mode-card {
        flex: 1;
        max-width: none;
    }
}
</style>
