<?php
// Подключаем файл с конфигурацией
require 'setup.php';

// Создание подключения к базе данных
$conn = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

/*

Функция AddVisit - используется для добавления новых пользователей в таблицу
Функция getVisits - выводит данные из таблицы, используя while. Как вариант - можно было бы и через for i < 99999, однако это откровенный быдлокод.
Плюс, данные от 100.000 пользователя не прогружались бы на странице.

*/


function addVisit($conn, $userId) {
    // Тут проверяем заполненность полей. Если поля не заполнены - присваиваем дефолт
    $url = isset($_POST['url']) ? $_POST['url'] : '';
    $referrer = isset($_POST['referrer']) ? $_POST['referrer'] : '';
    $ip = $_SERVER['REMOTE_ADDR'];
    $user_agent = isset($_POST['user_agent']) ? $_POST['user_agent'] : '';
    $visit_duration = isset($_POST['visit_duration']) ? (int)$_POST['visit_duration'] : 0;
    $scroll_percentage = isset($_POST['scroll_percentage']) ? (float)$_POST['scroll_percentage'] : 0.0;
    $device = isset($_POST['device']) ? $_POST['device'] : '';
    $platform = isset($_POST['platform']) ? $_POST['platform'] : '';

    // Проверяем, есть ли уже запись с таким user_id
    $stmt = $conn->prepare("SELECT COUNT(*) FROM visits WHERE user_id = ?");
    $stmt->bind_param("s", $userId);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    if ($count == 0) {
        // Подготавливаем SQL запрос. Для чего? Это базовая защита от SQL-инъекции.
        $stmt = $conn->prepare("INSERT INTO visits (url, referrer, ip, user_agent, visit_duration, scroll_percentage, device, platform, user_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt) {
            // Присваиваем параметры к запросу, а затем - выполняем запрос к БД.
            $stmt->bind_param("ssssddsss", $url, $referrer, $ip, $user_agent, $visit_duration, $scroll_percentage, $device, $platform, $userId);
            $stmt->execute();
            $stmt->close();
            echo "Success";
        } else {
            echo "Error preparing statement: " . $conn->error;
        }
    } else {
        echo "User already tracked. No new data added.";
    }
}

function getVisits($conn) {
    $sql = "SELECT * FROM visits";
    $result = $conn->query($sql);

    $visits = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $visits[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($visits);
}

// Простой обработчик на условных конструкциях (простым языком - на if'ах и else'ах), используется в рамках вывода требуемых функций исходя из запроса (принимает только post(отправить данные) и get(получить данные))
// В случае, если на обработчик попадает любой другой запрос (Например put(обновление данных) или delete(удаление данных)) - просто высылаем в ответ 405
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = isset($_POST['user_id']) ? $_POST['user_id'] : '';
    addVisit($conn, $userId);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getVisits($conn);
} else {
    http_response_code(405);
}

$conn->close();
?>
