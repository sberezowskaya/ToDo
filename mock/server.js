const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const authMiddleware = require('./middlewares/auth');

// Настройка CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Добавляем искусственную задержку сети (от 200 до 1000 мс)
server.use((req, res, next) => {
  const delay = Math.floor(Math.random() * 800) + 200;
  setTimeout(next, delay);
});

// Кастомный эндпоинт для логина
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: 'Введите логин и пароль' });
    return;
  }

  // Читаем пользователей из базы
  const users = router.db.get('users').value();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Генерируем mock JWT токен
    res.json({
      token: `mock-jwt-token-${Date.now()}`,
      user: { id: user.id, username: user.username, name: user.name }
    });
  } else {
    res.status(401).json({ error: 'Неверный логин или пароль' });
  }
});

// Применяем защиту для всех остальных маршрутов
server.use(authMiddleware);

// Кастомный эндпоинт для получения задач текущего пользователя
server.get('/my-todos', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  // В нашем mock токене мы просто зашиваем ID пользователя в конец (для простоты)
  // В реальном проекте тут была бы расшифровка JWT
  const todos = router.db.get('todos').value();
  // Возвращаем все задачи (для имитации)
  res.json(todos);
});

server.use(router);

// Запускаем сервер на порту 3000
server.listen(3000, () => {
  console.log('🚀 Mock-сервер запущен: http://localhost:3000');
  console.log('📝 Логин: /login');
  console.log('📋 API задач: /my-todos');
});
