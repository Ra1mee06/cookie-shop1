<script setup lang="ts">
const updatedAt = '01.01.2025'
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-cookie-600 to-brown-700 bg-clip-text text-transparent">
      Политика конфиденциальности
    </h2>
    <p class="text-sm text-brown-500 mb-6">Дата обновления: {{ updatedAt }}</p>

    <div class="space-y-6 text-brown-700 leading-relaxed">
      <section>
        <h3 class="text-xl font-bold text-brown-800 mb-2">1. Общие положения</h3>
        <p>
          Настоящая Политика конфиденциальности описывает, какие персональные данные мы собираем, как используем и как
          защищаем их при использовании сайта RЯЛЬНА COOKIES.
        </p>
      </section>

      <section>
        <h3 class="text-xl font-bold text-brown-800 mb-2">2. Какие данные мы обрабатываем</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>данные аккаунта: логин, email, имя (ФИО);</li>
          <li>данные заказов: состав заказа, адрес доставки, способ оплаты, комментарии;</li>
          <li>технические данные: cookie, идентификаторы сессии, сведения об устройстве/браузере (в рамках cookie-настроек).</li>
        </ul>
      </section>

      <section>
        <h3 class="text-xl font-bold text-brown-800 mb-2">3. Цели обработки</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>регистрация и управление учетной записью;</li>
          <li>оформление и обработка заказов, обратная связь;</li>
          <li>улучшение качества сервиса и безопасности;</li>
          <li>аналитика и маркетинг — только при наличии согласия в настройках cookie.</li>
        </ul>
      </section>

      <section>
        <h3 class="text-xl font-bold text-brown-800 mb-2">4. Передача данных третьим лицам</h3>
        <p>
          Мы не продаём ваши данные. Передача возможна только в рамках исполнения заказа (например, службе доставки) или
          по требованию закона.
        </p>
      </section>

      <section>
        <h3 class="text-xl font-bold text-brown-800 mb-2">5. Сроки хранения</h3>
        <p>
          Данные хранятся столько, сколько необходимо для целей обработки, либо в сроки, предусмотренные законодательством.
        </p>
      </section>

      <section>
        <h3 class="text-xl font-bold text-brown-800 mb-2">6. Ваши права</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>запросить доступ/исправление/удаление данных;</li>
          <li>отозвать согласие на обработку (в части cookie — через настройки cookie);</li>
          <li>обратиться по вопросам конфиденциальности.</li>
        </ul>
      </section>

      <section>
        <h3 class="text-xl font-bold text-brown-800 mb-2">7. Контакты</h3>
        <p>
          По вопросам конфиденциальности: <a class="underline text-cookie-600" href="mailto:privacy@ryalna-cookies.com">privacy@ryalna-cookies.com</a>.
        </p>
      </section>
    </div>
  </div>
</template>

