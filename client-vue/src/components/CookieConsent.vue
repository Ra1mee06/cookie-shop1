<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import InfoModal from './InfoModal.vue'

type CookieConsent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

const STORAGE_KEY = 'cookieConsent'

const isBannerVisible = ref(false)
const isSettingsOpen = ref(false)

const consent = ref<CookieConsent>({
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: new Date().toISOString()
})

const modalTitle = computed(() => 'Настройки cookie')
const modalContent = computed(() => {
  const aChecked = consent.value.analytics ? 'checked' : ''
  const mChecked = consent.value.marketing ? 'checked' : ''

  return `
    <p>Мы используем cookie, чтобы сайт работал корректно и был удобнее. Вы можете изменить настройки в любой момент.</p>
    <h3>Категории cookie</h3>
    <ul>
      <li><strong>Обязательные</strong> — нужны для работы сайта (авторизация, корзина). Всегда включены.</li>
      <li><strong>Аналитика</strong> — помогает улучшать сайт на основе статистики.</li>
      <li><strong>Маркетинг</strong> — помогает показывать релевантные предложения.</li>
    </ul>
    <div style="background:#faf7f2;border:1px solid #f0e3d3;padding:16px;border-radius:12px;margin-top:16px;">
      <label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <input type="checkbox" disabled checked />
        <span><strong>Обязательные</strong> (всегда включены)</span>
      </label>
      <label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <input id="cookie-analytics" type="checkbox" ${aChecked} />
        <span><strong>Аналитика</strong></span>
      </label>
      <label style="display:flex;align-items:center;gap:10px;">
        <input id="cookie-marketing" type="checkbox" ${mChecked} />
        <span><strong>Маркетинг</strong></span>
      </label>
      <p style="font-size:12px;color:#6b4f3a;margin-top:12px;">
        Изменения применятся после сохранения настроек.
      </p>
    </div>
  `
})

const loadConsent = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    isBannerVisible.value = true
    return
  }
  try {
    const parsed = JSON.parse(raw) as CookieConsent
    if (parsed && parsed.necessary === true) {
      consent.value = parsed
      isBannerVisible.value = false
    } else {
      isBannerVisible.value = true
    }
  } catch {
    isBannerVisible.value = true
  }
}

const saveConsent = (next: Omit<CookieConsent, 'updatedAt'>) => {
  const payload: CookieConsent = { ...next, updatedAt: new Date().toISOString() }
  consent.value = payload
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  isBannerVisible.value = false
}

const acceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true })
const rejectAll = () => saveConsent({ necessary: true, analytics: false, marketing: false })

const openSettings = () => {
  isSettingsOpen.value = true
  // small delay to ensure modal rendered, then wire up checkbox sync
  setTimeout(() => {
    const a = document.getElementById('cookie-analytics') as HTMLInputElement | null
    const m = document.getElementById('cookie-marketing') as HTMLInputElement | null
    if (a) a.checked = consent.value.analytics
    if (m) m.checked = consent.value.marketing
  }, 0)
}

const closeSettings = () => {
  isSettingsOpen.value = false
}

const saveFromModal = () => {
  const a = document.getElementById('cookie-analytics') as HTMLInputElement | null
  const m = document.getElementById('cookie-marketing') as HTMLInputElement | null
  saveConsent({
    necessary: true,
    analytics: Boolean(a?.checked),
    marketing: Boolean(m?.checked)
  })
  closeSettings()
}

onMounted(() => {
  loadConsent()
  window.addEventListener('cookie-settings-open', openSettings)
})
</script>

<template>
  <div>
    <transition name="modal-fade">
      <div
        v-if="isBannerVisible"
        class="fixed bottom-4 left-4 right-4 z-[9999] max-w-[900px] mx-auto bg-white border-2 border-beige-200 rounded-2xl shadow-2xl p-4 md:p-5"
      >
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <div class="flex-1">
            <p class="font-semibold text-brown-800">Мы используем cookie</p>
            <p class="text-sm text-brown-600 mt-1">
              Они нужны для работы сайта и улучшения сервиса. Вы можете настроить cookie в любой момент.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <button class="btn-secondary" @click="rejectAll">Только необходимые</button>
            <button class="btn-secondary" @click="openSettings">Настроить</button>
            <button class="btn-primary" @click="acceptAll">Принять все</button>
          </div>
        </div>
      </div>
    </transition>

    <InfoModal :isOpen="isSettingsOpen" :title="modalTitle" :content="modalContent" @close="closeSettings" />

    <transition name="modal-fade">
      <div
        v-if="isSettingsOpen"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10001] w-full max-w-3xl px-4"
      >
        <div class="flex justify-end">
          <button class="btn-primary" @click="saveFromModal">Сохранить настройки</button>
        </div>
      </div>
    </transition>
  </div>
</template>

