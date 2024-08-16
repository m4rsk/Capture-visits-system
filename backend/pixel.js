(function (d, w) {
    var startTime = new Date().getTime(); // Запоминаем время начала визита, чтобы потом измерить его продолжительность
    var userId = getCookie('user_id'); // Получаем куки

    // Простая функция для отправки данных на сервер.
    // Выбрал старый добрый XMLHttpRequest для совместимости и потому что с ним проще работать в данном контексте ТЗ.
    function sendData(data) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://188.225.24.191/session.php", true); // Отправляем данные на сервер
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок, чтобы сервер понял формат данных
        xhr.send(data); // Отправляем сами данные
    }

    // Функция для вычисления процента прокрутки страницы.
    // Берем текущую позицию прокрутки и делим на высоту документа минус высоту окна. Результат умножаем на 100, чтобы получить процент.
    function getScrollPercentage() {
        var doc = d.documentElement;
        return (w.pageYOffset || doc.scrollTop) / (doc.scrollHeight - doc.clientHeight) * 100;
    }

    // Вычисляем продолжительность визита в секундах.
    // Могли бы возвращать миллисекунды, но кто их любит считать? Поэтому делим на 1000 и округляем до целых секунд.
    function getVisitDuration() {
        return Math.round((new Date().getTime() - startTime) / 1000); // в секундах
    }

    // Извлекаем информацию о браузере пользователя.
    // Вариант использования этого значения - чтобы порадоваться разнообразию user-agent'ов на рынке.
    function getBrowserInfo() {
        return navigator.userAgent;
    }

    // Определяем тип устройства по простому регулярному выражению.
    // Мог бы использовать библиотеку вроде "MobileDetect.js", но решил обойтись малой кровью.
    function getDeviceInfo() {
        return /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    }

    // Получаем платформу (операционную систему) пользователя.
    // Полезно для аналитики, хотя браузеры могут слегка скрывать детали.
    function getPlatform() {
        return navigator.platform;
    }

    // Устанавливаем куки.
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            // Устанавливаем дату истечения куки. Да, могли бы хранить куки навсегда, но это было бы не очень красиво.
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        d.cookie = name + "=" + (value || "") + expires + "; path=/"; // Устанавливаем куки на корневую директорию
    }

    // Извлекаем значение куки по имени. Ничего сложного, просто пробегаемся по строкам и ищем нужную.
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = d.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length); // Убираем пробелы в начале, чтобы куки нормально читались
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length); // Возвращаем значение куки, если нашли нужную
        }
        return null; // Если не нашли, возвращаем null
    }

    // Если пользователь новый (нет куки), создаем уникальный идентификатор, записываем его в куки и начинаем отслеживать визит.
    if (!userId) {
        userId = Math.random().toString(36).substring(2); // Генерируем случайный ID пользователя. Могли бы использовать UUID, но решили, что Math.random() достаточно.
        setCookie('user_id', userId, 365); // Сохраняем куки на год. Вдруг пользователь захочет вернуться через 11 месяцев?

        // Отправляем данные на сервер при закрытии или обновлении страницы. Тут все понятно: нужно захватить всю инфу до того, как пользователь выйдет.
        w.addEventListener('beforeunload', function() {
            var data = "url=" + encodeURIComponent(w.location.href) + // Текущий URL
                       "&referrer=" + encodeURIComponent(d.referrer) + // Откуда пришел пользователь
                       "&user_agent=" + encodeURIComponent(getBrowserInfo()) + // Информация о браузере
                       "&visit_duration=" + getVisitDuration() + // Длительность визита
                       "&scroll_percentage=" + getScrollPercentage() + // Процент прокрутки страницы
                       "&device=" + encodeURIComponent(getDeviceInfo()) + // Тип устройства
                       "&platform=" + encodeURIComponent(getPlatform()) + // Платформа (ОС)
                       "&user_id=" + encodeURIComponent(userId); // ID пользователя

            sendData(data); // Отправляем собранные данные на сервер
        });
    } else {
        console.log("User already tracked. Skipping data send."); // Если куки уже есть, ничего не делаем
    }

})(document, window);
