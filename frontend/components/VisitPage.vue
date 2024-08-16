<template>
  <div>
    <h1>Данные отслеживания визитов</h1>

    <!-- Если у нас что-то пошло не так, сообщаем об этом пользователю в форме -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- Если есть хоть один визит, показываем их в таблице -->
    <table v-if="visits.length > 0">
      <thead>
        <tr>
          <th>URL</th>
          <th>Referrer</th>
          <th>IP</th>
          <th>User Agent</th>
        </tr>
      </thead>
      <tbody>
        <!-- Проходимся по каждому визиту и создаем строку таблицы. Кликнув на строку, можно увидеть подробности -->
        <tr v-for="visit in visits" :key="visit.id" @click="selectVisit(visit)">
          <td>{{ visit.url }}</td>
          <td>{{ visit.referrer }}</td>
          <td>{{ visit.ip }}</td>
          <td>{{ visit.user_agent }}</td>
        </tr>
      </tbody>
    </table>
    <!-- Если визитов нет, сообщаем об этом. -->
    <p v-if="visits.length === 0">Визиты не найдены.</p>

    <!-- Отображаем подробную информацию о выбранном визите, если его выбрали -->
    <div v-if="selectedVisit" class="details">
      <h2>Подробности визита</h2>
      <p><strong>URL:</strong> {{ selectedVisit.url }}</p>
      <p><strong>Referrer:</strong> {{ selectedVisit.referrer }}</p>
      <p><strong>IP:</strong> {{ selectedVisit.ip }}</p>
      <p><strong>User Agent:</strong> {{ selectedVisit.user_agent }}</p>
      <p><strong>Продолжительность визита:</strong> {{ selectedVisit.visit_duration }} секунд</p>
      <p><strong>Процент скролла:</strong> {{ selectedVisit.scroll_percentage }}%</p>
      <p><strong>Устройство:</strong> {{ selectedVisit.device }}</p>
      <p><strong>Платформа:</strong> {{ selectedVisit.platform }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Импортируем axios для работы с HTTP-запросами

export default {
  name: 'VisitPage', // Название компонента. В принципе, никто не запрещает назвать его как-то иначе, но это явно сбило бы с толку :)
  data() {
    return {
      visits: [],         // Здесь мы будем хранить список всех визитов
      selectedVisit: null, // А сюда будем устанавливать визит, который выбрал пользователь для просмотра подробностей
      errorMessage: ''    // Это сообщение покажем, если что-то пойдет не так
    };
  },
  created() {
    this.fetchVisits(); // Когда компонент создается, сразу пытаемся загрузить данные о визитах.
  },
  methods: {
    async fetchVisits() {
      try {
        // Делаем запрос на сервер, чтобы получить данные о визитах
        const response = await axios.get('http://188.225.24.191/session.php');
        this.visits = response.data; // Если все ок, сохраняем полученные данные
      } catch (error) {
        // А если что-то пошло не так (милорд, сервер пал), выводим ошибку.
        this.errorMessage = "Ошибка при загрузке данных о визитах. Попробуйте позже.";
        console.error("Ошибка при загрузке визитов:", error); // Записываем ошибку в консоль для отладки
      }
    },
    selectVisit(visit) {
      // Пользователь кликнул на визит в таблице, сохраняем его в selectedVisit для отображения подробностей
      this.selectedVisit = visit;
    }
  }
};
</script>

<style src="../assets/style.css"></style> <!-- Инвайтим в верстку дизайн а.к.а Артемий Лебедев дизайнит Вконтакте -->
