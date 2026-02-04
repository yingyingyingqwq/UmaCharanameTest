<template>
  <div class="game-board-wrapper">
    <component :is="activeGameComponent" />
  </div>
</template>

<script>
import { computed } from 'vue'
import NormalGame from './games/NormalGame.vue'
import SeiyuuGame from './games/SeiyuuGame.vue'
import PixelGame from './games/PixelGame.vue'
import ReciteGame from './games/ReciteGame.vue'

export default {
  components: {
    NormalGame,
    SeiyuuGame,
    PixelGame,
    ReciteGame
  },
  props: {
    mode: {
      type: String,
      default: 'normal'
    }
  },
  setup(props) {
    const activeGameComponent = computed(() => {
      switch (props.mode) {
        case 'seiyuu':
          return SeiyuuGame
        case 'pixel':
          return PixelGame
        case 'recite':
          return ReciteGame
        case 'normal':
        default:
          return NormalGame
      }
    })

    return {
      activeGameComponent
    }
  }
}
</script>

<style scoped>
.game-board-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
