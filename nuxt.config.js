export default {
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  plugins: ['~/plugins/dataloader.js'],
  compatibilityDate: '2025-01-28',
  nitro: {
    static: true
  },
  app: {
    head: {
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=G-F57HL0RLZB`,
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F57HL0RLZB');
          `,
          type: 'text/javascript'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      imageBaseUrl: process.env.NODE_ENV === 'production'
        ? 'https://img.admire.vegas/umaquiz/syoubufuku/'
        : '/assets/images/characters/syoubufuku/'
    }
  }
};