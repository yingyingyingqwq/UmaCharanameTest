<template>
  <div class="game-container">
    <!-- Start Screen -->
    <transition name="fade" mode="out-in">
      <div v-if="!gameStarted" class="screen start-screen" key="start">
        <div class="card start-card">
          <h2 class="game-title">全马娘声优名挑战</h2>
          
          <div class="settings">
            <div class="setting-group">
              <div class="setting-title">题目数量</div>
              <div class="segmented-control">
                <input type="radio" id="count-all" :value="false" v-model="settings.random30">
                <input type="radio" id="count-30" :value="true" v-model="settings.random30">
                
                <label for="count-all" class="segment-label">全部角色</label>
                <label for="count-30" class="segment-label">随机15个</label>
                
                <div class="segment-indicator"></div>
              </div>
            </div>

            <div class="setting-group">
              <div class="setting-title">模式选择</div>
              <div class="segmented-control">
                <input type="radio" id="mode-challenge" :value="true" v-model="settings.allowContinueOnError">
                <input type="radio" id="mode-practice" :value="false" v-model="settings.allowContinueOnError">
                
                <label for="mode-challenge" class="segment-label">挑战模式</label>
                <label for="mode-practice" class="segment-label">练习模式</label>
                
                <div class="segment-indicator"></div>
              </div>
            </div>
          </div>

          <button @click="startGame" class="btn-primary start-btn">开始挑战</button>
        </div>
      </div>

      <!-- Game Screen -->
      <div v-else-if="currentIndex < characters.length" class="screen game-screen" key="game">
        <div class="game-header">
          <div class="progress-wrapper">
            <div class="progress-info">
              <span>进度: {{ progressText }}</span>
              <TimerDisplay v-if="displayTime" :startTime="startTime" />
            </div>
            <div class="progress-track">
              <div class="progress-fill" :style="{
                width: progressPercentage + '%',
                backgroundColor: subColor || 'var(--primary-color)'
              }"></div>
            </div>
          </div>
        </div>

        <div class="character-card-wrapper">
          <div class="character-card" :style="{ '--theme-color': mainColor || '#42b983', '--sub-theme-color': subColor || '#42b983' }">
            
            <!-- New Character Display Card -->
            <div class="character-display-card">
              <div class="card-content-wrapper">
                <div class="card-main-visual" :style="{ backgroundColor: mainColor }">
                  <img :src="getImageUrl(currentCharacter.image)" :alt="currentCharacter.names.en" class="character-img-display">
                </div>
                
                <div class="card-info-box" :style="{ borderBottomColor: subColor || '#0056b3' }">
                  <div class="info-name-row">
                    <span class="info-name">{{ currentCharacter.names.zh }}</span>
                  </div>
                  <div class="info-cv-row">
                    <span class="info-cv">CV: ? ? ?</span>
                  </div>
                </div>
              </div>

              <div class="visual-side-strip-container">
                <div class="visual-side-strip">
                  <div class="vertical-text" :style="{ color: mainColor }">
                    {{ currentCharacter.names.en }}
                  </div>
                </div>
                <div class="visual-accent-strip" :style="{ backgroundColor: subColor || '#0056b3' }"></div>
              </div>
            </div>

            <div class="card-content">
              <div class="input-section">
                <div class="input-group" :class="{ 'error': isError }">
                  <label class="seiyuu-label">
                    {{ currentCharacter.names.zh }} <span class="cv-tag">CV</span>
                  </label>
                  
                  <input 
                    type="text" 
                    v-model="userInput" 
                    @keyup.enter="checkAnswer"
                    class="game-input"
                    placeholder="输入声优名"
                    autofocus
                    ref="answerInput"
                  >
                  <div class="input-border" :style="{ backgroundColor: subColor || 'var(--primary-color)' }"></div>
                </div>
              </div>

              <div class="actions">
                <button v-if="!settings.allowContinueOnError" @click="skipCharacter" class="btn-secondary skip-btn">
                  跳过
                </button>
                <button @click="checkAnswer" class="btn-primary submit-btn" :style="{ backgroundColor: subColor || 'var(--primary-color)' }">
                  提交
                </button>
              </div>
              
              <div class="hint-section" v-if="!settings.allowContinueOnError">
                 <button class="hint-btn" @click="showHint" :disabled="isHintDisabled" title="提示">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                 </button>
                 <div v-if="showingHint" class="hint-text">
                   {{ hintText }}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Result Screen -->
      <div v-else class="screen result-screen" key="result">
        <div class="card result-card">
          <h2 class="result-title">挑战结束！</h2>
          
          <div class="score-section">
            <div class="score-label">最终得分</div>
            <div class="score-value">{{ accuracy }}</div>
            <div class="score-rank">{{ getRank }}</div>
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">用时</span>
              <span class="stat-value">{{ formattedTime }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">正确率</span>
              <span class="stat-value">{{ accuracy }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">正确数</span>
              <span class="stat-value">{{ correctCount }}/{{ characters.length }}</span>
            </div>
          </div>

          <div class="result-actions">
            <button @click="restartGame" class="btn-primary">再来一次</button>
            <button @click="goHome" class="btn btn-secondary">返回首页</button>
          </div>

          <div class="error-list" v-if="errorStore.errorCount > 0">
            <h4>错误回顾</h4>
            <div class="error-grid">
              <div v-for="(error, index) in errorStore.errors" :key="index" class="error-card-item">
                <div class="error-img-wrapper">
                   <img :src="getImageUrl(error.image)" class="error-img">
                </div>
                <div class="error-details">
                  <p class="error-name">{{ error.characterName }}</p>
                  <p class="error-answer wrong">你的答案: {{ error.skipped ? '（已跳过）' : (error.userAnswer || "（未填写）") }}</p>
                  <p class="error-answer correct">正确答案: {{ error.correctAnswer }}</p>
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
import { useGameStore, useErrorStore } from '~/store/index.js'
import { formatTime, formatDate } from '@/utils/helpers'
import { useHistoryStore } from '@/store/history.js'
import { useSettingsStore } from '@/store/setting.js'

export default {
  setup() {
    const history = useHistoryStore()
    const settings = useSettingsStore()
    const errorStore = useErrorStore()
    const router = useRouter()
    return { history, settings, errorStore, router }
  },
  beforeUnmount() {
    if (this.imageCache) {
      this.imageCache.clear()
    }
  },
  components: {
    TimerDisplay
  },
  props: {
    mode: {
      type: String,
      default: 'seiyuu'
    },
  },
  data() {
    return {
      characters: [],
      currentIndex: 0,
      userInput: '',
      startTime: null,
      totalTime: null,
      stopTime: null,
      gameStarted: false,
      displayTime: true,
      correctCount: 0,
      isError: false,
      showingHint: false,
      hintText: '',
      isHintDisabled: false,
      imageCache: new Map() // 用于存储预加载的图片对象
    }
  },
  computed: {
    currentCharacter() {
      return this.characters[this.currentIndex]
    },
    formattedTime() {
      return formatTime(this.totalTime)
    },
    accuracy() {
      if (this.characters.length === 0) return 0
      return Math.round((this.correctCount / this.characters.length) * 100)
    },
    mainColor() {
      return this.currentCharacter ? this.currentCharacter.mainColor : '#42b983'
    },
    subColor() {
      return this.currentCharacter ? this.currentCharacter.subColor : '#42b983'
    },
    progressPercentage() {
      if (this.characters.length === 0) return 0
      return ((this.currentIndex + 1) / this.characters.length) * 100
    },
    progressText() {
      return `${this.currentIndex + 1}/${this.characters.length}`
    },
    getRank() {
      const percentage = this.accuracy
      if (percentage === 100) return 'S+'
      if (percentage >= 95) return 'S'
      if (percentage >= 90) return 'A'
      if (percentage >= 80) return 'B'
      if (percentage >= 60) return 'C'
      return 'D'
    }
  },
  methods: {
    async startGame() {
      const nuxtApp = useNuxtApp()
      this.characters = await nuxtApp.$dataLoader.loadCharacters()
      if (this.characters.length === 0) return

      this.shuffleCharacters()

      if (this.settings.random30) {
        this.characters = this.characters.slice(0, 15)
      }

      this.gameStarted = true
      this.displayTime = true
      this.errorStore.clearErrors()
      this.startTime = Date.now()
      this.currentIndex = 0
      this.correctCount = 0
      this.userInput = ''
      
      // 初始预加载
      this.preloadNextImage()
      
      // Focus input on next tick
      this.$nextTick(() => {
        if(this.$refs.answerInput) this.$refs.answerInput.focus()
      })
    },
    getImageUrl(imageName) {
      const config = useRuntimeConfig()
      if (config.public.imageBaseUrl.startsWith('http')) {
        return `${config.public.imageBaseUrl}${imageName}`
      }
      return new URL(`/assets/images/characters/syoubufuku/${imageName}`, import.meta.url).href
    },
    shuffleCharacters() {
      for (let i = this.characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
          ;[this.characters[i], this.characters[j]] =
            [this.characters[j], this.characters[i]]
      }
    },
    checkAnswer() {
      const target = this.mode === 'normal'
        ? this.currentCharacter.names
        : this.currentCharacter.seiyuu

      const validAnswers = [
        target.jp,
        target.zh,
        target.en,
        ...(target.aliases || []),
      ].map(str => str ? str.toLowerCase().trim() : '').filter(Boolean)

      const userAnswer = this.userInput.trim()

      if (validAnswers.includes(userAnswer.toLowerCase())) {
        this.correctCount++
        this.nextCharacter()
      } else {
        this.errorStore.addError({
          userAnswer,
          correctAnswer: `${this.currentCharacter.seiyuu.zh} (${this.currentCharacter.seiyuu.jp})`,
          image: this.currentCharacter.image,
          characterName: this.currentCharacter.names.zh,
          mode: this.mode,
          skipped: false
        })
        this.handleError()
      }
    },
    handleError() {
      if (this.settings.allowContinueOnError) {
        this.nextCharacter()
      } else {
        this.isError = true
        setTimeout(() => this.isError = false, 500)
      }
    },
    nextCharacter() {
      this.showingHint = false
      this.isHintDisabled = false
      this.hintText = ''

      if (this.currentIndex < this.characters.length - 1) {
        this.currentIndex++
        this.userInput = ''
        this.preloadNextImage()
        this.$nextTick(() => {
           if(this.$refs.answerInput) this.$refs.answerInput.focus()
        })
      } else {
        this.endGame()
      }
    },
    endGame() {
      this.displayTime = false
      this.totalTime = Date.now() - this.startTime

      this.currentIndex = this.characters.length

      const gameStore = useGameStore()
      gameStore.addHistory({
        mode: this.mode,
        time: this.totalTime,
        date: new Date().toISOString(),
      })

      this.history.addRecord({
        mode: this.mode,
        time: this.totalTime,
        accuracy: this.accuracy,
        correctCount: this.correctCount,
        charaTotal: this.characters.length
      })
    },
    restartGame() {
      this.gameStarted = false
      this.displayTime = true
      this.currentIndex = 0
      this.userInput = ''
      this.correctCount = 0
      this.isHintDisabled = false
      this.showingHint = false
    },
    showHint() {
      if (this.isHintDisabled) return

      const targetName = this.currentCharacter.seiyuu

      const nameToUse = targetName.zh || targetName.jp

      if (!nameToUse) return

      // Logic: reveal 50% of characters or at least 1
      const chars = nameToUse.split('')
      const revealCount = Math.max(1, Math.floor(chars.length / 2))
      const indicesToReveal = new Set()
      
      while(indicesToReveal.size < revealCount) {
        indicesToReveal.add(Math.floor(Math.random() * chars.length))
      }

      let hintText = ''
      for (let i = 0; i < chars.length; i++) {
        if (indicesToReveal.has(i)) {
          hintText += chars[i]
        } else {
          hintText += ' _ '
        }
      }

      this.hintText = hintText
      this.showingHint = true
      this.isHintDisabled = true
      // Focus back to input
      this.$nextTick(() => {
        if(this.$refs.answerInput) this.$refs.answerInput.focus()
      })
    },
    skipCharacter() {
      this.errorStore.addError({
        userAnswer: '',
        correctAnswer: `${this.currentCharacter.seiyuu.zh} (${this.currentCharacter.seiyuu.jp})`,
        image: this.currentCharacter.image,
        characterName: this.currentCharacter.names.zh,
        mode: this.mode,
        skipped: true
      })

      this.nextCharacter()
    },
    preloadNextImage() {
      const startIndex = this.currentIndex
      // 预加载接下来10张图片，避免频繁加载
      const endIndex = Math.min(startIndex + 10, this.characters.length)

      for (let i = startIndex; i < endIndex; i++) {
        const character = this.characters[i];
        if (!character) continue
        
        const url = this.getImageUrl(character.image)
        
        // 使用缓存池防止重复加载和对象被回收
        if (!this.imageCache.has(url)) {
          const img = new Image();
          img.src = url;
          this.imageCache.set(url, img);
        }
      }
    },
    goHome() {
      this.router.push('/')
    }
  }
}
</script>

<style scoped>
.game-container {
  width: 100%;
  max-width: 800px;
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
  margin-bottom: 30px;
  font-size: 1.8rem;
  color: var(--text-main);
}

.settings {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
}

.setting-group {
  text-align: left;
  padding: 0 10px;
}

.setting-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--text-main);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.setting-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background: var(--primary-color);
  margin-right: 8px;
  border-radius: 2px;
}

.segmented-control {
  position: relative;
  display: flex;
  background: #f0f2f5;
  border-radius: 12px;
  padding: 4px;
  user-select: none;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

.segmented-control input[type="radio"] {
  display: none;
}

.segment-label {
  flex: 1;
  text-align: center;
  padding: 10px 12px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-sub);
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.segment-indicator {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  z-index: 1;
}

.segmented-control input:nth-of-type(1):checked ~ .segment-indicator {
  transform: translateX(0);
}

.segmented-control input:nth-of-type(2):checked ~ .segment-indicator {
  transform: translateX(100%);
}

.segmented-control input:nth-of-type(1):checked ~ .segment-label:nth-of-type(1),
.segmented-control input:nth-of-type(2):checked ~ .segment-label:nth-of-type(2) {
  color: var(--primary-color);
  font-weight: 600;
}

.start-btn {
  width: 100%;
  font-size: 1.2rem;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
}

/* Game Screen */
.game-header {
  width: 100%;
  margin-bottom: 20px;
}

.progress-wrapper {
  background: white;
  padding: 15px 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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
  transition: width 0.3s ease, background-color 0.3s ease;
}

.character-card-wrapper {
  width: 100%;
  perspective: 1000px;
}

.character-card {
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.card-image-container {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.image-wrapper {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid white;
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 1;
}

.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.character-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--theme-color);
  box-shadow: var(--shadow-sm);
}

.card-content {
  padding: 30px 20px;
  text-align: center;
}

.input-section {
  margin-bottom: 30px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.seiyuu-label {
  display: block;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: bold;
}

.cv-tag {
  background: #333;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 5px;
}

.input-group {
  position: relative;
}

.game-input {
  width: 100%;
  border: none;
  border-bottom: 2px solid #ddd;
  padding: 10px 0;
  font-size: 1.5rem;
  text-align: center;
  outline: none;
  background: transparent;
  transition: all 0.3s ease;
  font-family: inherit;
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.game-input:focus ~ .input-border {
  width: 100%;
}

.game-input:focus {
  border-bottom-color: transparent;
}

.input-group.error .game-input {
  color: var(--accent-color);
  border-bottom-color: var(--accent-color);
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  min-width: 120px;
}

.btn-secondary {
  background-color: #e4e7eb;
  color: var(--text-main);
  min-width: 100px;
}

.btn-secondary:hover {
  background-color: #d3d7dd;
}

.hint-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.hint-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
  padding: 5px;
}

.hint-btn:hover:not(:disabled) {
  color: var(--primary-color);
}

.hint-text {
  font-size: 1.2rem;
  letter-spacing: 5px;
  color: var(--text-sub);
  font-weight: bold;
  animation: fadeIn 0.5s;
}

/* Result Screen */
.result-card {
  width: 100%;
  text-align: center;
  padding: 40px;
}

.result-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.score-section {
  background: white;
  color: var(--text-main);
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid #eee;
}

.score-label {
  font-size: 1rem;
  color: var(--text-sub);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.score-value {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.2;
  color: var(--primary-color);
}

.score-rank {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%) rotate(-10deg);
  font-size: 6rem;
  font-weight: 900;
  color: rgba(0,0,0,0.05);
  pointer-events: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 12px;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-sub);
  text-transform: uppercase;
  font-weight: 600;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-main);
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.error-list {
  text-align: left;
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 30px;
}

.error-list h4 {
  margin-bottom: 20px;
  text-align: center;
  color: var(--text-sub);
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.error-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.error-card-item {
  display: flex;
  gap: 15px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s;
}

.error-card-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.error-img-wrapper {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--primary-color);
}

.error-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.error-details {
  flex: 1;
  min-width: 0;
}

.error-name {
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--text-main);
}

.error-answer {
  font-size: 0.9rem;
  margin-bottom: 2px;
  white-space: normal;
  word-wrap: break-word;
}

.error-answer.wrong {
  color: #e74c3c;
}

.error-answer.correct {
  color: #27ae60;
  font-weight: 500;
}

.error-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.error-details p {
  font-size: 0.9rem;
  margin-bottom: 3px;
}

.error-name {
  font-weight: bold;
}

.error-answer.wrong {
  color: var(--accent-color);
}

.error-answer.correct {
  color: var(--primary-color);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* New Character Display Card Styles */
.character-display-card {
  width: 100%;
  display: flex;
  flex-direction: row; /* Changed to row for side-by-side layout */
  background: white;
  border-bottom: 1px solid #eee;
  position: relative;
}

.card-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Prevent flex item from overflowing */
}

.card-main-visual {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-height: 400px;
  display: flex;
  overflow: hidden;
  flex: 1; /* Allow it to grow */
}

.character-img-display {
  flex: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center 20%;
  transform: scale(1.1);
  transform-origin: center 30%;
}

.visual-side-strip-container {
  display: flex;
  height: auto; /* Full height */
  flex-shrink: 0;
}

.visual-side-strip {
  width: 45px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align to top */
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  padding-top: 20px; /* Add padding for visual breathing room */
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  white-space: nowrap;
  font-family: 'Arial Black', sans-serif;
  /* color set inline */
  padding: -5px 0;
}

.visual-accent-strip {
  width: 12px;
  /* background-color set inline */
  flex-shrink: 0;
  height: 100%;
}

.card-info-box {
  background: white;
  padding: 12px 20px;
  border-bottom-width: 6px;
  border-bottom-style: solid;
  /* border-color set inline */
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-name-row {
  display: flex;
  align-items: center;
}

.info-name {
  font-size: 1.4rem;
  font-weight: 900;
  color: #333;
}

.info-cv-row {
  display: flex;
  align-items: center;
}

.info-cv {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

/* Adjust existing styles */
.character-card {
  /* Ensure column layout */
  display: flex;
  flex-direction: column;
}

.card-content {
  padding: 20px; /* Reduce padding as info is now above */
}

/* Responsive adjustments */
@media (min-width: 600px) {
  .card-main-visual {
    height: 350px;
  }
}

@media (min-width: 768px) {
  .character-card {
    flex-direction: row;
    align-items: stretch;
  }

  .character-display-card {
    width: 50%;
    border-bottom: none;
    border-right: 1px solid #eee;
  }
  
  .card-main-visual {
    flex: 1;
    height: auto;
    min-height: 0;
    max-height: none;
  }

  .card-content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .score-value {
    font-size: 3rem;
  }
  
  .result-card {
    padding: 20px;
  }
}
</style>