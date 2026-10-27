module.exports = (req, res, next) => {
  // Пропускаем логин без проверки токена
  if (req.path === '/login' && req.method === 'POST') {
    return next();
  }

  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Нет токена авторизации' });
    return;
  }

  // Имитация проверки JWT токена (в реальности тут была бы проверка подписи)
  const token = authHeader.split(' ')[1];
  if (token.startsWith('mock-jwt-token')) {
    next(); // Токен валиден
  } else {
    res.status(403).json({ error: 'Неверный или просроченный токен' });
  }
};
