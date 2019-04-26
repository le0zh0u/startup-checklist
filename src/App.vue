<template>
  <q-layout view="hHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="fas fa-bars"
        />

        <q-toolbar-title>
          Startup Check List
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-btn
          flat
          dense
          round
          @click="changeLocale"
          aria-label="Language"
          icon="fas fa-language"
          class="language"
        />
      </q-toolbar>
    </q-header>
  <!-- bordered -->
  <q-drawer
        v-model="leftDrawerOpen"    
        :breakpoint="500"
        show-if-above>
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item clickable tag="a" target="_blank" href="https://www.defmacro.org/2019/03/26/startup-checklist.html">
              <q-item-section avatar>
                <q-icon name="far fa-newspaper" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{$t('nav.reference')}}</q-item-label>
                <q-item-label caption>{{$t('thanks')}} Slava Akhmechet</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable tag="a" target="_blank" href="https://github.com/le0zh0u/startup-checklist">
              <q-item-section avatar>
                <q-icon name="fas fa-code" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{$t('nav.github')}}</q-item-label>
                <q-item-label caption>https://github.com/le0zh0u/startup-checklist</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable tag="a" target="_blank" href="http://www.leozhou.me/">
              <q-item-section avatar>
                <q-icon name="fas fa-blog" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{$t('nav.blog')}}</q-item-label>
                <q-item-label caption>http://www.leozhou.me/</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable tag="a" target="_blank" href="http://contentbox.leozhou.me/">
              <q-item-section avatar>
                <q-icon name="img:http://img.leozhou.me/picGo/icon-white.png" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{$t('nav.common-content-box')}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable tag="a" href="mailto:hi@leozhou.me">
              <q-item-section avatar>
                <q-icon name="far fa-envelope" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{$t('nav.email')}}</q-item-label>
                <q-item-label caption>hi#leozhou.me</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container>
      <HelloWorld class="bg-grey-2"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { switchLang }  from '@/i18n'

export default {
  name: 'LayoutDefault',

  components: {
    HelloWorld
  },

  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    changeLocale() {
      switchLang()
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-list .q-item
  border-radius 0 32px 32px 0

.language
  margin-right: 1rem
</style>
