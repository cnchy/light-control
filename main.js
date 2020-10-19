import Vue from 'vue'
import App from './App'


import lightList from './pages/lightList/lightList.vue'
Vue.component('lightList',lightList)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import setting from './pages/setting/setting.vue'
Vue.component('setting',setting)

import preset from './pages/preset/preset.vue'
Vue.component('preset',preset)

import music from './music/music.vue'
Vue.component('music',music)


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
