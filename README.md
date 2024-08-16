<h1 align="center">Система отслеживания пользователей </h1>
<h3 align="center">Самая базовая база, созданная по предложенному тех. заданию</h3>

<p align="center">Привет!<img src="https://github.com/blackcater/blackcater/raw/main/images/Hi.gif" height="32"/> 
Вы попали в проект, который позволяет отслеживать визиты пользователей на сайте. Сейчас я расскажу, что где лежит, и зачем это нужно.</p>

<h2>📁 Frontend</h2>
<p><strong>Что тут происходит?</strong></p>
<p>Frontend — это та часть, с которой взаимодействует пользователь. Мы используем Vue.js, чтобы создавать приятный интерфейс и удобно работать с данными.</p>

<h3>Структура файлов:</h3>
<ul>
    <li><strong>components/</strong>
        <ul>
            <li><code>TrackerPage.vue</code> — Этот компонент собирает информацию о визитах (URL, реферер и т.д.) и отправляет их на сервер. Основная логика отслеживания пользователя живет здесь.</li>
            <li><code>VisitPage.vue</code> — Компонент, который показывает нам данные о визитах. Если хотите увидеть, кто когда и откуда зашел — вам сюда.</li>
        </ul>
    </li>
    <li><strong>router/</strong>
        <ul>
            <li><code>index.js</code> — Здесь настроены маршруты нашего приложения. Это как GPS для Vue.js: он знает, какой компонент показать, когда вы переходите по определенному URL.</li>
        </ul>
    </li>
    <li><strong>assets/</strong>
        <ul>
            <li><code>style.css</code> — Тут лежат все стили, чтобы наш проект выглядел как конфетка.</li>
        </ul>
    </li>
    <li><code>App.vue</code> — Главный компонент, который связывает все другие компоненты вместе. Можно сказать, что это "корень" нашего Vue-приложения.</li>
    <li><code>main.js</code> — Входная точка нашего фронта. Здесь мы инициализируем Vue.js, подключаем роутер и рендерим <code>App.vue</code>.</li>
</ul>

<p>Во Vue.js я подключал два модуля:</p>
<ul>
    <li><code>axios</code> — для получения данных из БД.</li>
    <li><code>vue-router</code> — для перехода между страницами.</li>
</ul>

<h2>📁 Backend</h2>
<p><strong>Что тут происходит?</strong></p>
<p>Backend — это серверная часть, где обрабатываются и сохраняются все данные, которые прилетают с фронта. Написал его на PHP.</p>

<h3>Структура файлов:</h3>
<ul>
    <li><code>setup.php</code> — Здесь лежат настройки для подключения к базе данных. Настроили раз, и забыли.</li>
    <li><code>session.php</code> — Это мозг всей серверной части. Файл принимает данные от фронта и решает, что с ними делать: сохранять или отдавать их обратно.</li>
    <li><code>database.sql</code> — Скрипт для создания таблицы <code>visits</code>. Эта таблица хранит всю информацию о визитах: от URL до устройства пользователя.</li>
</ul>

<h3>Основные функции:</h3>
<ul>
    <li><code>addVisit</code> — Добавляет новый визит в базу данных. Если пользователь уже существует, новый визит не записываем — не нужно плодить дубли.</li>
    <li><code>getVisits</code> — Вытаскивает из базы все данные о визитах и отправляет их на фронт в формате JSON. Потом эти данные можно красиво показать на <code>VisitPage.vue</code>.</li>
</ul>
