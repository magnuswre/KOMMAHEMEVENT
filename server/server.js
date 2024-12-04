const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const SECRET_KEY = 'your_secret_key'; // Change this to a strong secret key

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h', // Token expiration time
    });
};

// Custom login route
server.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = router.db.get('users').find({ email, password }).value();

    if (user) {
        // User found, generate token
        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token, user });
    } else {
        // Unauthorized
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Middleware to protect routes
server.use((req, res, next) => {
    // Allow public routes (like /login)
    if (req.path === '/login') {
        next();
        return;
    }

    // Get token from headers
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Token is valid, proceed with request
        req.userId = decoded.id; // Save user ID in request for further use
        next();
    });
});

// Protect routes as needed
server.use(router);

server.listen(3005, () => {
    console.log('JSON Server is running with JWT authentication');
});
