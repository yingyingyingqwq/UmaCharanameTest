<template>
  <div class="app-layout">
    <main class="app-main">
      <div class="container">
        <slot />
      </div>
    </main>

    <footer class="app-footer">
      <div class="container">
        <div class="social-links">
          <button onclick="window.open('https://space.bilibili.com/302598998')" class="social-btn bilibili"
            title="Bilibili">
            <svg fill="currentColor" fill-rule="evenodd" height="1em" style="flex:none;line-height:1"
              viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
              <title>bilibili</title>
              <path clip-rule="evenodd"
                d="M4.977 3.561a1.31 1.31 0 111.818-1.884l2.828 2.728c.08.078.149.163.205.254h4.277a1.32 1.32 0 01.205-.254l2.828-2.728a1.31 1.31 0 011.818 1.884L17.82 4.66h.848A5.333 5.333 0 0124 9.992v7.34a5.333 5.333 0 01-5.333 5.334H5.333A5.333 5.333 0 010 17.333V9.992a5.333 5.333 0 015.333-5.333h.781L4.977 3.56zm.356 3.67a2.667 2.667 0 00-2.666 2.667v7.529a2.667 2.667 0 002.666 2.666h13.334a2.667 2.667 0 002.666-2.666v-7.53a2.667 2.667 0 00-2.666-2.666H5.333zm1.334 5.192a1.333 1.333 0 112.666 0v1.192a1.333 1.333 0 11-2.666 0v-1.192zM16 11.09c-.736 0-1.333.597-1.333 1.333v1.192a1.333 1.333 0 102.666 0v-1.192c0-.736-.597-1.333-1.333-1.333z">
              </path>
            </svg>
          </button>

          <button onclick="window.open('https://github.com/yingyingyingqwq/')" class="social-btn github" title="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                fill="currentColor" />
            </svg>
          </button>
        </div>
        <p class="credits">Made by yingyingyingqwq</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-main);
}

.app-header {
  background-color: var(--card-bg);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--primary-color);
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  user-select: none;
}

.logo:hover {
  transform: translateY(-1px);
}

.logo-icon {
  margin-right: 0.5rem;
  font-size: 1.6rem;
}

.nav-link {
  color: var(--text-sub);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.nav-link:hover {
  color: var(--primary-color);
  background-color: rgba(66, 185, 131, 0.1);
}

.app-main {
  flex: 1;
  padding: 2rem 0;
  animation: fadeIn 0.5s ease;
}

.app-footer {
  background-color: var(--card-bg);
  padding: .5rem 0;
  text-align: center;
  color: var(--text-sub);
  font-size: 0.9rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: .1rem auto;
  padding: 0 1.5rem;
}

.credits {
  margin-top: 0.2rem;
  font-size: 0.6rem;
  opacity: 0.5;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: .3rem;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  color: var(--text-sub);
  border: none;
  cursor: pointer;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  color: var(--primary-color);
  background: white;
}

.social-btn.bilibili:hover {
  color: #00A1D6;
}

.social-btn.github:hover {
  color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .app-main {
    padding: 1.5rem 0;
  }

  .logo-text {
    font-size: 1.2rem;
  }

  .logo-icon {
    font-size: 1.4rem;
  }
}
</style>