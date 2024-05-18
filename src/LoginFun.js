
//import jwt from 'jsonwebtoken';

function generateAccessToken(payload) {
	return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 86400 }) // 86400
}



function authenticate(req, res, next) {
	// const authHeader = req.headers['authorization']
	// const token = authHeader && authHeader.split(' ')[1]
	const token = req.cookies.JWT

	if (token === null) return res.sendStatus(401)

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403)

		req.user = user
		next()
	})
}

const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: email,
        password: password
      });
      const { accessToken, refreshToken } = response.data;
      // Zapisz token dostępu w lokalnym stanie aplikacji lub w magazynie lokalnym, np. LocalStorage
      localStorage.setItem('accessToken', accessToken);
      // Zapisz token odświeżania w ciasteczku
      document.cookie = `refreshToken=${refreshToken}; Max-Age=${60 * 60 * 24}; HttpOnly`;// Ciasteczko ważne przez 24 godziny
      // Przekieruj użytkownika lub wykonaj inne działania, np. aktualizacja stanu aplikacji
    } catch (error) {
      setError('Nieprawidłowe dane logowania');
    }
  };

export {authenticate, generateAccessToken, handleLogin};