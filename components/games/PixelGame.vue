<template>
  <div class="game-container">
    <!-- Start Screen -->
    <transition name="fade" mode="out-in">
      <div v-if="!gameStarted" class="screen start-screen" key="start">
        <div class="card start-card">
          <h2 class="game-title">像素猜马娘</h2>
          
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
              <span v-if="settings.allowContinueOnError" class="score-display">得分: {{ currentScore }}</span>
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
                  <canvas ref="pixelCanvas" width="8" height="8" class="pixel-canvas"></canvas>
                </div>
                
                <div class="card-info-box" :style="{ borderBottomColor: subColor || '#0056b3' }">
                  <div class="info-name-row">
                    <span class="info-name">? ? ?</span>
                  </div>
                  <div class="info-cv-row">
                    <span class="info-cv">CV: ? ? ?</span>
                  </div>
                </div>
              </div>

              <div class="visual-side-strip-container">
                <div class="visual-side-strip">
                  <div class="vertical-text" :style="{ color: mainColor }">
                    Umamusume
                  </div>
                </div>
                <div class="visual-accent-strip" :style="{ backgroundColor: subColor || '#0056b3' }"></div>
              </div>
            </div>

            <div class="card-content">
              <div class="input-section">
                <div class="input-group" :class="{ 'error': isError }">
                  
                  <div class="input-wrapper">
                    <input 
                      type="text" 
                      v-model="userInput" 
                      @input="onInput"
                      @focus="onInput"
                      @click="onInput"
                      @keydown.up.prevent="moveSelection(-1)"
                      @keydown.down.prevent="moveSelection(1)"
                      @keydown.enter.prevent="handleEnter"
                      @keydown.esc="closeDropdown"
                      @blur="closeDropdownDelayed"
                      class="game-input"
                      placeholder="输入角色名 (中/日/英)"
                      autofocus
                      ref="answerInput"
                    >
                    <div class="input-border" :style="{ backgroundColor: subColor || 'var(--primary-color)' }"></div>
                    
                    <ul v-if="showDropdown && filteredCandidates.length > 0" class="custom-dropdown">
                      <li 
                        v-for="(candidate, index) in filteredCandidates" 
                        :key="index"
                        :class="{ 'selected': index === selectedIndex }"
                        @click="selectCandidate(candidate)"
                        @mouseenter="selectedIndex = index"
                      >
                        {{ candidate }}
                      </li>
                    </ul>
                  </div>
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
              
              <transition name="pop-up">
                <div class="hint-section" v-if="!settings.allowContinueOnError && mistakeCount >= 2">
                   <button class="hint-btn" @click="showHint" :disabled="isHintDisabled" title="提示">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                   </button>
                   <transition name="text-reveal">
                     <div v-if="showingHint" class="hint-text">
                       {{ hintText }}
                     </div>
                   </transition>
                </div>
              </transition>
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
  data() {
    return {
      mode: 'pixel',
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
      imageCache: new Map(), // 用于存储预加载的图片对象
      mistakeCount: 0,
      currentScore: 0,
      totalMaxScore: 0,
      allCharacters: [],
      showDropdown: false,
      selectedIndex: -1,
      filteredCandidates: []
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
      if (this.totalMaxScore === 0) return 0
      return Math.round((this.currentScore / this.totalMaxScore) * 100)
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

      // Store all characters for the dropdown before any slicing
      this.allCharacters = [...this.characters]

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
      this.currentScore = 0
      this.totalMaxScore = this.characters.length * 3 // Max score per char is 3
      this.userInput = ''
      
      // 初始预加载
      this.preloadNextImage()
      
      this.mistakeCount = 0

      // Draw first pixelated image
      this.$nextTick(() => {
        this.drawPixelatedImage()
        if(this.$refs.answerInput) this.$refs.answerInput.focus()
      })
    },
    drawPixelatedImage() {
      const canvas = this.$refs.pixelCanvas
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      
      // Determine resolution based on mistakeCount
      // 0 mistakes -> 8x8
      // 1 mistake  -> 16x16
      // 2+ mistakes -> 32x32
      const resolutions = [8, 16, 32]
      const resolution = resolutions[Math.min(this.mistakeCount, 2)]

      // Set canvas size (this affects resolution, CSS handles display size)
      canvas.width = resolution
      canvas.height = resolution

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Ensure image rendering is pixelated (though CSS handles display, 
      // this ensures if we do any operations they are crisp)
      ctx.imageSmoothingEnabled = false
      
      const imgUrl = this.getImageUrl(this.currentCharacter.image)
      let img = this.imageCache.get(imgUrl)
      
      if (!img) {
          img = new Image()
          img.src = imgUrl
      }

      const draw = () => {
        // Draw the image directly into the canvas. 
        // The browser will handle the downsampling.
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }

      if (img.complete) {
        draw()
      } else {
        img.onload = draw
      }
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
      // In PixelGame, we always check against character names
      const target = this.currentCharacter.names

      const validAnswers = [
        target.jp,
        target.zh,
        target.en,
        ...(target.aliases || []),
      ].map(str => str ? str.toLowerCase().trim() : '')

      const userAnswer = this.userInput.trim()

      if (validAnswers.includes(userAnswer.toLowerCase())) {
        this.correctCount++
        // Calculate score based on mistakeCount
        // 0 mistakes (8x8) -> 3 points
        // 1 mistake (16x16) -> 2 points
        // 2 mistakes (32x32) -> 1 point
        const points = Math.max(1, 3 - this.mistakeCount)
        this.currentScore += points
        
        this.nextCharacter()
      } else {
        // Increment mistake count and redraw image if not max clarity yet
        if (this.mistakeCount < 2) {
          this.mistakeCount++
          this.$nextTick(() => {
             this.drawPixelatedImage()
          })
          
          // Clear input to encourage trying again
          this.userInput = ''
          
          // Flash input red briefly
          this.isError = true
          setTimeout(() => this.isError = false, 500)
          
          // If in challenge mode, we just consume one attempt.
          // The game only ends/skips if we run out of attempts (mistakeCount > 2 is handled next time or by explicit skip)
          return
        }

        // If we reached here, it means mistakeCount >= 2 (max clarity reached) and user answered wrong again.
        
        if (!this.settings.allowContinueOnError) {
           // Practice mode (allowContinueOnError = false): allow retry indefinitely
           this.isError = true
           setTimeout(() => this.isError = false, 500)
           return
        }
        
        // Challenge mode (allowContinueOnError = true): fail after 3rd attempt (which corresponds to mistakeCount=2)
        this.errorStore.addError({
          userAnswer,
          correctAnswer: `${this.currentCharacter.names.zh} (${this.currentCharacter.names.jp})`,
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
      this.mistakeCount = 0

      if (this.currentIndex < this.characters.length - 1) {
        this.currentIndex++
        this.userInput = ''
        this.preloadNextImage()
        this.$nextTick(() => {
           this.drawPixelatedImage()
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
      this.mistakeCount = 0
    },
    showHint() {
      // In practice mode, hint is only allowed at max clarity (mistakeCount >= 2)
      // Practice mode corresponds to !settings.allowContinueOnError
      if (this.settings.allowContinueOnError) return
      
      if (this.mistakeCount < 2) return
      
      if (this.isHintDisabled) return

      const targetName = this.currentCharacter.names

      const nameToUse = targetName.zh || targetName.jp

      if (!nameToUse) return
      
      let hintText = ''
      
      // Practice mode: Show only 1 character
      const chars = nameToUse.split('')
      const revealIndex = Math.floor(Math.random() * chars.length)
      
      for (let i = 0; i < chars.length; i++) {
        if (i === revealIndex) {
            hintText += chars[i]
        } else {
            hintText += ' _ '
        }
      }
      
      this.hintText = hintText
      this.showingHint = true
      this.isHintDisabled = true
      this.$nextTick(() => {
        if(this.$refs.answerInput) this.$refs.answerInput.focus()
      })
    },
    skipCharacter() {
      this.errorStore.addError({
        userAnswer: '',
        correctAnswer: `${this.currentCharacter.names.zh} (${this.currentCharacter.names.jp})`,
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
    },
    onInput() {
      if (!this.userInput) {
        this.showDropdown = false
        this.filteredCandidates = []
        return
      }

      const input = this.userInput.toLowerCase()
      // Filter characters whose names (zh) include the input
      const candidates = this.allCharacters
        .filter(char => char.names.zh && char.names.zh.toLowerCase().includes(input))
        .map(char => char.names.zh)
        // Deduplicate
        .filter((value, index, self) => self.indexOf(value) === index)
        // Limit to 5 suggestions
        .slice(0, 5)

      this.filteredCandidates = candidates
      this.showDropdown = candidates.length > 0
      this.selectedIndex = -1
    },
    moveSelection(direction) {
      if (!this.showDropdown || this.filteredCandidates.length === 0) return
      
      this.selectedIndex += direction
      
      // Wrap around
      if (this.selectedIndex < 0) {
        this.selectedIndex = this.filteredCandidates.length - 1
      } else if (this.selectedIndex >= this.filteredCandidates.length) {
        this.selectedIndex = 0
      }
    },
    handleEnter() {
      if (this.showDropdown && this.selectedIndex > -1) {
        this.selectCandidate(this.filteredCandidates[this.selectedIndex])
      } else {
        this.checkAnswer()
        this.closeDropdown()
      }
    },
    selectCandidate(candidate) {
      this.userInput = candidate
      this.closeDropdown()
      this.$nextTick(() => {
        if(this.$refs.answerInput) this.$refs.answerInput.focus()
        // Optionally submit immediately
        // this.checkAnswer() 
      })
    },
    closeDropdown() {
      this.showDropdown = false
      this.selectedIndex = -1
    },
    closeDropdownDelayed() {
      // Delay closing to allow click event to fire
      setTimeout(() => {
        this.closeDropdown()
      }, 200)
    }
  }
}
</script>

<style scoped>
/* Input Wrapper for positioning dropdown */
.input-wrapper {
  position: relative;
  width: 100%;
}

/* Custom Dropdown Styles */
.custom-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.custom-dropdown li {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
  font-size: 1.1rem;
  color: var(--text-main);
  border-bottom: 1px solid #f0f0f0;
}

.custom-dropdown li:last-child {
  border-bottom: none;
}

.custom-dropdown li:hover,
.custom-dropdown li.selected {
  background-color: #f5f7fa;
  color: var(--primary-color);
  font-weight: 600;
}

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
  /* overflow: hidden; Removed to allow dropdown overflow */
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
  max-height: 150px;
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
  border-radius: 20px 20px 0 0;
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

.pixel-canvas {
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  display: block;
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
    border-radius: 20px 0 0 20px;
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

.pop-up-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}

.pop-up-leave-active {
  transition: all 0.3s ease-in;
  overflow: hidden;
}

.pop-up-enter-from,
.pop-up-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(10px);
  max-height: 0;
  margin: 0;
  padding: 0;
}

.text-reveal-enter-active,
.text-reveal-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: 50px; /* Adjust based on expected text height */
}

.text-reveal-enter-from,
.text-reveal-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
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