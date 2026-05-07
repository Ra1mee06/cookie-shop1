<template>
  <footer class="bg-gradient-to-br from-brown-800 to-brown-900 text-white mt-16">
    <div class="max-w-[95%] xl:max-w-[1600px] mx-auto px-6 md:px-12 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-lg font-bold mb-4 text-cookie-300">Компания</h3>
          <ul class="space-y-2 text-sm">
            <li><button @click="goHome" class="hover:text-cookie-300 transition-colors">Главная</button></li>
            <li><a href="#products-section" @click.prevent="goToMenu" class="hover:text-cookie-300 transition-colors">Меню</a></li>
            <li><a href="mailto:info@ryalna-cookies.com" class="hover:text-cookie-300 transition-colors">info@ryalna-cookies.com</a></li>
            <li><a href="tel:+78005553535" class="hover:text-cookie-300 transition-colors">8-800-555-35-35</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4 text-cookie-300">Заказ</h3>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/profile" class="hover:text-cookie-300 transition-colors">Мой профиль</router-link></li>
            <li><router-link to="/favorites" class="hover:text-cookie-300 transition-colors">Избранное</router-link></li>
            <li><button @click="openCart" class="hover:text-cookie-300 transition-colors">Оформить заказ</button></li>
            <li><span class="text-brown-300">Доставка: 9:00 - 21:00</span></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4 text-cookie-300">Покупателям</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="mailto:support@ryalna-cookies.com" class="hover:text-cookie-300 transition-colors">Поддержка</a></li>
            <li><a href="mailto:partnership@ryalna-cookies.com" class="hover:text-cookie-300 transition-colors">Сотрудничество</a></li>
            <li><button @click="openInfo('career')" class="hover:text-cookie-300 transition-colors">Карьера</button></li>
            <li><button @click="openInfo('press')" class="hover:text-cookie-300 transition-colors">Пресса</button></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4 text-cookie-300">Документы</h3>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/terms" class="hover:text-cookie-300 transition-colors">Условия использования</router-link></li>
            <li><router-link to="/privacy" class="hover:text-cookie-300 transition-colors">Политика конфиденциальности</router-link></li>
            <li><button @click="openCookieSettings" class="hover:text-cookie-300 transition-colors">Настройки cookie</button></li>
            <li><span class="text-brown-300">Минск, Беларусь</span></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-brown-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-brown-300">
        <p>© {{ currentYear }} RЯЛЬНА COOKIES. Все права защищены.</p>
        <p>Сделано с любовью 🍪</p>
      </div>
    </div>

    <InfoModal :isOpen="isModalOpen" :title="modalTitle" :content="modalContent" @close="closeModal" />
  </footer>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import InfoModal from './InfoModal.vue'

const router = useRouter()
const route = useRoute()
const currentYear = computed(() => new Date().getFullYear())

const cartState = inject('cart') as { openDrawer?: () => void } | undefined

const isModalOpen = ref(false)
const modalTitle = ref('')
const modalContent = ref('')

const infoContent: Record<string, { title: string; content: string }> = {
  press: {
    title: 'Пресса',
    content: `
      <h3>Новости и события RЯЛЬНА COOKIES</h3>
      <ul>
        <li><strong>Май 2026:</strong> Запуск сезонной линейки “Клубничная феерия” и “Фисташковый бриллиант”.</li>
        <li><strong>Апрель 2026:</strong> Коллаборация с локальной кофейней — набор “Кофе + Cookies” по специальной цене.</li>
        <li><strong>Март 2026:</strong> Благотворительная акция “Сладость с пользой”: часть выручки — в фонд помощи детям.</li>
        <li><strong>Февраль 2026:</strong> Открыли пункт самовывоза в центре Минска.</li>
      </ul>
      <p>Для СМИ: <a href="mailto:press@ryalna-cookies.com">press@ryalna-cookies.com</a></p>
    `
  },
  career: {
    title: 'Карьера',
    content: `
      <h3>Работа в RЯЛЬНА COOKIES</h3>
      <p>Мы растём и периодически открываем новые вакансии. Даже если сейчас нет подходящей — присылайте резюме!</p>
      <h3>Открытые позиции</h3>
      <ul>
        <li><strong>Оператор поддержки:</strong> ответы клиентам, помощь с заказами.</li>
        <li><strong>Курьер:</strong> доставка заказов по Минску.</li>
        <li><strong>Контент-менеджер:</strong> новости/карточки товаров/акции.</li>
      </ul>
      <h3>События команды</h3>
      <ul>
        <li><strong>Ежемесячные дегустации:</strong> выбираем новый вкус вместе.</li>
        <li><strong>Дни обучения:</strong> внутренние воркшопы по сервису и качеству.</li>
        <li><strong>Сезонные активности:</strong> “Зимний cookies-day”, “Весенняя ярмарка”.</li>
      </ul>
      <p>Резюме: <a href="mailto:career@ryalna-cookies.com">career@ryalna-cookies.com</a></p>
    `
  }
}

const goHome = async () => {
  if (route.path !== '/') {
    await router.push('/')
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goToMenu = async () => {
  if (route.path !== '/') {
    await router.push('/')
  }
  setTimeout(() => {
    const productsSection = document.getElementById('products-section')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 80)
}

const openCart = () => {
  cartState?.openDrawer?.()
}

const openCookieSettings = () => {
  window.dispatchEvent(new Event('cookie-settings-open'))
}

const openInfo = (key: 'career' | 'press') => {
  const payload = infoContent[key]
  modalTitle.value = payload.title
  modalContent.value = payload.content
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

