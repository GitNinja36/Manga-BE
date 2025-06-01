const dotenv = require('dotenv');
dotenv.config()

require('./db'); 
const app = require('./middlewares/middleware.js');

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))