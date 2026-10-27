import { defineConfig } from '#q-app/wrappers'

export default defineConfig((/* ctx */) => {
  return {
    publicPath: '/ToDo/', 
    
    boot: [],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons'],
    build: {
      target: { browser: ['es2022', 'firefox115', 'chrome115', 'safari14'] },
      typescript: { strict: true, vueShim: true },
      vueRouterMode: 'hash', // Для GitHub Pages
      minify: true, 
      sourcemap: false, 
    },
    devServer: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
    framework: { config: {}, plugins: [] },
    animations: [],
    ssr: { pwa: false, prodPort: 3000, middlewares: [] },
    pwa: { workboxMode: 'generateSW', injectPwaMetaTags: true, swFilename: 'sw.js', manifestFilename: 'manifest.json' },
    cordova: {},
    capacitor: { hideSplashscreen: true },
    electron: { inspectPort: 5858, bundler: 'packager' },
  }
})
