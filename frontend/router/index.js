import { createRouter, createWebHistory } from 'vue-router'; // Импортируем необходимые инструменты из Vue Router
import TrackerPage from '../components/TrackerPage.vue'; // Подключаем наш компонент для главной страницы
import VisitPage from '../components/VisitPage.vue'; // Подключаем компонент для страницы с визитами

// Определяем маршруты для нашего приложения
const routes = [
  { path: '/', component: TrackerPage }, // Если пользователь заходит на корневой путь ('/'), показываем TrackerPage
  { path: '/visitspage', component: VisitPage }, // Если пользователь заходит на '/visitspage', показываем VisitPage
];

// Создаем экземпляр роутера (router)
const router = createRouter({
  history: createWebHistory(), // Используем режим истории браузера для управления путями (без хешей в URL)
  routes // Передаем наши маршруты в роутер
});

export default router; // Экспортируем роутер, чтобы можно было использовать его в нашем приложении
