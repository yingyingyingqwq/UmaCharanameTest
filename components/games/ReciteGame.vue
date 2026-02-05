<template>
  <div class="game-container">
    <!-- Start Screen -->
    <transition name="fade" mode="out-in">
      <div v-if="!gameStarted" class="screen start-screen" key="start">
        <div class="card start-card">
          <h2 class="game-title">默写马娘名</h2>
          <p class="game-desc">凭记忆写出所有马娘的名字！</p>
          
          <button @click="startGame" class="btn-primary start-btn">开始挑战</button>
        </div>
      </div>

      <!-- Game Screen -->
      <div v-else-if="!isGameFinished" class="screen game-screen" key="game">
        <div class="game-header sticky-header">
          <div class="header-content">
            <div class="header-card info-card">
              <div class="progress-info">
                <span>进度: {{ guessedCount }}/{{ characters.length }}</span>
                <TimerDisplay :startTime="startTime" />
              </div>
              <div class="progress-track">
                <div class="progress-fill" :style="{
                  width: progressPercentage + '%',
                  backgroundColor: 'var(--primary-color)'
                }"></div>
              </div>
            </div>

            <div class="header-card input-card">
              <input 
                type="text" 
                class="game-input" 
                v-model="userInput" 
                @input="checkInput"
                placeholder="输入角色名 (中/日/英/别名)" 
                autofocus
                ref="answerInput"
              >
              <div class="input-border"></div>
            </div>
          </div>
        </div>

        <div class="grid-container">
          <div 
            v-for="char in characters" 
            :key="char.id" 
            class="char-block"
            :class="{ 'revealed': guessedIds.has(char.id) }"
            :style="guessedIds.has(char.id) ? { 
              '--theme-color': char.mainColor || '#42b983', 
              'borderColor': char.mainColor || '#ddd' 
            } : {}"
          >
            <div class="char-content" v-if="guessedIds.has(char.id)">
              <div class="char-name revealed-name">{{ char.names.zh }}</div>
            </div>
            <div class="char-placeholder" v-else>
              ?
            </div>
          </div>
        </div>
        
        <div class="give-up-section">
            <button @click="endGame" class="btn-secondary give-up-btn">结束挑战 / 查看结果</button>
        </div>
      </div>

      <!-- Result Screen -->
      <div v-else class="screen result-screen" key="result">
        <div class="card result-card">
          <h2 class="result-title">挑战结束！</h2>
          
          <div class="score-section">
            <div class="score-label">最终得分</div>
            <div class="score-value">{{ progressPercentage.toFixed(1) }}%</div>
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">用时</span>
              <span class="stat-value">{{ formattedTime }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">默写数量</span>
              <span class="stat-value">{{ guessedCount }}/{{ characters.length }}</span>
            </div>
          </div>

          <div class="result-actions">
            <button @click="restartGame" class="btn-primary">再来一次</button>
            <button @click="goHome" class="btn btn-secondary">返回首页</button>
          </div>
          
          <!-- Show all characters -->
          <div class="result-grid-section">
            <h3>挑战回顾</h3>
            <div class="grid-container">
               <div 
                v-for="char in characters" 
                :key="char.id" 
                class="char-block result-item"
                :class="{ 'missing': !guessedIds.has(char.id), 'guessed': guessedIds.has(char.id) }"
                :style="{ '--theme-color': char.mainColor || '#999' }"
              >
                <div class="char-content">
                  <div class="char-name revealed-name">{{ char.names.zh }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import TimerDisplay from '~/components/TimerDisplay.vue'
import { useGameStore } from '~/store/index.js'
import { formatTime } from '@/utils/helpers'
import { useHistoryStore } from '@/store/history.js'

export default {
  components: {
    TimerDisplay
  },
  setup() {
    const history = useHistoryStore()
    const router = useRouter()
    return { history, router }
  },
  data() {
    return {
      mode: 'recite',
      characters: [],
      guessedIds: new Set(),
      userInput: '',
      startTime: null,
      totalTime: null,
      gameStarted: false,
      isGameFinished: false,
      nameMap: new Map(), // name string -> char ID
    }
  },
  computed: {
    guessedCount() {
      return this.guessedIds.size
    },
    progressPercentage() {
      if (this.characters.length === 0) return 0
      return (this.guessedCount / this.characters.length) * 100
    },
    formattedTime() {
      return formatTime(this.totalTime)
    },
    missingCharacters() {
      return this.characters.filter(c => !this.guessedIds.has(c.id))
    }
  },
  methods: {
    async startGame() {
      const nuxtApp = useNuxtApp()
      const allCharacters = await nuxtApp.$dataLoader.loadCharacters()
      
      // Sort characters by ID to have a consistent order
      this.characters = allCharacters.sort((a, b) => a.id - b.id)
      
      this.buildNameMap()
      
      this.guessedIds = new Set()
      this.userInput = ''
      this.gameStarted = true
      this.isGameFinished = false
      this.startTime = Date.now()
      
      this.$nextTick(() => {
        if(this.$refs.answerInput) this.$refs.answerInput.focus()
      })
    },
    buildNameMap() {
      this.nameMap.clear()
      this.characters.forEach(char => {
        const names = [
          char.names.zh,
          char.names.jp,
          char.names.en,
          ...(char.names.aliases || [])
        ]
        
        names.forEach(name => {
          if (name) {
            this.nameMap.set(name.toLowerCase().trim(), char.id)
          }
        })
      })
    },
    checkInput() {
      const input = this.userInput.toLowerCase().trim()
      if (!input) return
      
      if (this.nameMap.has(input)) {
        const charId = this.nameMap.get(input)
        if (!this.guessedIds.has(charId)) {
          this.guessedIds.add(charId)
          this.userInput = '' // Clear input on success
          
          // Check win condition
          if (this.guessedIds.size === this.characters.length) {
            this.endGame()
          }
        } else {
            // Already guessed this one.
            // Maybe visual feedback?
            // For now, if exact match, clear input too? 
            // Better to keep it if user is typing a longer name that shares prefix? 
            // Actually if it's an exact match and already guessed, clearing it might be annoying if they meant another char.
            // But usually names are unique enough.
            // Let's clear it to be responsive.
             this.userInput = ''
        }
      }
    },
    endGame() {
      this.totalTime = Date.now() - this.startTime
      this.isGameFinished = true
      
      const gameStore = useGameStore()
      gameStore.addHistory({
        mode: this.mode,
        time: this.totalTime,
        date: new Date().toISOString(),
        score: this.guessedCount
      })
    },
    restartGame() {
      this.startGame()
    },
    goHome() {
      this.router.push('/')
    },
    getImageUrl(imageName) {
      return new URL(`/assets/images/characters/syoubufuku/${imageName}`, import.meta.url).href
    }
  }
}
</script>

<style scoped>
.game-container {
  width: 100%;
  max-width: 1000px; /* Wider for grid */
  margin: 0 auto;
}

.screen {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Start Screen */
.start-card {
  width: 100%;
  max-width: 400px;
  text-align: center;
  padding: 40px 30px;
}

.game-title {
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: var(--text-main);
}

.game-desc {
    margin-bottom: 30px;
    color: var(--text-sub);
}

.start-btn {
  width: 100%;
  font-size: 1.2rem;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
}

.sticky-header {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    padding: 15px 0;
    margin-bottom: 25px;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.header-card {
  background: white;
  border-radius: 20px;
  padding: 15px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.05);
}

.input-card {
  position: relative;
  transition: all 0.3s ease;
}

.input-card:focus-within {
  box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.15);
  border-color: var(--primary-color);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text-sub);
}

.progress-track {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.game-input {
  width: 100%;
  border: none;
  padding: 5px 0;
  font-size: 1.2rem;
  text-align: center;
  outline: none;
  background: transparent;
  color: var(--text-main);
  font-weight: bold;
}

.input-border {
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  height: 2px;
  background: #f0f0f0;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

/* Grid */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 12px;
    width: 100%;
    padding: 0 15px;
    margin-bottom: 40px;
}

.char-block {
    min-height: 50px;
    background: #f5f5f5;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    overflow: hidden;
    position: relative;
    padding: 5px;
}

.char-block.revealed {
    background: white;
    border-color: var(--theme-color);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.char-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
    padding: 0;
}

.char-name.revealed-name {
    font-size: 1rem;
    font-weight: bold;
    color: var(--theme-color);
    word-break: break-all;
    white-space: normal;
}

.char-img-wrapper {
    width: 100%;
    height: 80%;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 4px;
    position: relative;
}

.char-img-wrapper.grayscale {
    filter: grayscale(100%);
    opacity: 0.6;
}

.char-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    transform: scale(1.1);
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

.char-name {
    font-size: 0.85rem;
    font-weight: bold;
    text-align: center;
    line-height: 1.2;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-main);
}

.char-placeholder {
    font-size: 1.5rem;
    color: #e0e0e0;
    font-weight: 900;
}

.give-up-section {
    text-align: center;
    margin-bottom: 40px;
}

.give-up-btn {
    padding: 12px 30px;
    font-size: 1rem;
    letter-spacing: 1px;
}

/* Result */
.result-card {
  width: 100%;
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 24px;
  box-shadow: var(--shadow-md);
}

.result-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.score-value {
  font-size: 3rem;
  font-weight: 900;
  color: var(--primary-color);
}

.stats-grid {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 30px 0;
}

.stat-item {
    display: flex;
    flex-direction: column;
}

.result-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
}

.result-grid-section {
    text-align: left;
    margin-top: 30px;
}

.result-grid-section h3 {
    margin-bottom: 15px;
    text-align: center;
    color: var(--text-sub);
}

.char-block.missing {
    background: white;
    border-color: #eee;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.char-block.missing .char-name {
    color: #999;
}

.char-block.guessed {
    background: white;
    border-color: var(--theme-color);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.char-block.guessed .char-name {
    color: var(--theme-color);
}

@media (min-width: 600px) {
    .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 15px;
    }
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  min-width: 120px;
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary {
  background-color: #e4e7eb;
  color: var(--text-main);
  min-width: 100px;
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #d3d7dd;
}

@media (max-width: 600px) {
  .stats-grid {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .score-value {
    font-size: 3rem;
  }
  
  .result-card {
    padding: 20px;
  }
}
</style>
