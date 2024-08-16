<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 20px;
        }
        h1, h2 {
            color: #2c3e50;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 5px 0;
        }
        code {
            background: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section h2 {
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 5px;
        }
    </style>
</head>
<body>

    <h1>Привет!</h1>
    <p>Вы попали в проект, который позволяет отслеживать визиты пользователей на сайте. Сейчас я расскажу, что где лежит, и зачем это нужно.</p>

    <div class="section">
        <h2>📁 Frontend</h2>
        <p><strong>Что тут происходит?</strong></p>
        <p>Frontend — это та часть, с которой взаимодействует пользователь. Мы используем Vue.js, чтобы создавать приятный интерфейс и удобно работать с данными.</p>

        <p><strong>Структура файлов:</strong></p>
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
    </div>

    <div class="section">
        <h2>📁 Backend</h2>
        <p><strong>Что тут происходит?</strong></p>
        <p>Backend — это серверная часть, где обрабатываются и сохраняются все данные, которые прилетают с фронта. Написал его на PHP.</p>

        <p><strong>Структура файлов:</strong></p>
        <ul>
            <li><code>setup.php</code> — Здесь лежат настройки для подключения к базе данных. Настроили раз, и забыли.</li>
            <li><code>session.php</code> — Это мозг всей серверной части. Файл принимает данные от фронта и решает, что с ними делать: сохранять или отдавать их обратно.</li>
            <li><code>database.sql</code> — Скрипт для создания таблицы <code>visits</code>. Эта таблица хранит всю информацию о визитах: от URL до устройства пользователя.</li>
        </ul>

        <p><strong>Основные функции:</strong></p>
        <ul>
            <li><code>addVisit</code> — Добавляет новый визит в базу данных. Если пользователь уже существует, новый визит не записываем — не нужно плодить дубли.</li>
            <li><code>getVisits</code> — Вытаскивает из базы все данные о визитах и отправляет их на фронт в формате JSON. Потом эти данные можно красиво показать на <code>VisitPage.vue</code>.</li>
        </ul>
    </div>

</body>
</html>
