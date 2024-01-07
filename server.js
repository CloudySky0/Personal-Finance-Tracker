const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/connectDb')
const { createProxyMiddleware } = require('http-proxy-middleware');


//config dot env file
dotenv.config();

//call db
connectDb()

//rest object
const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
/*app.use(
  createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
  }),
);*/

//app.use('/api/v1/users', require('./routes/userRoute'));
//user routes
const userRouter = require('./routes/userRoute')
app.use(userRouter);

//transaction routes
const transactionRouter = require('./routes/transactionRoutes')
app.use(transactionRouter)

//port
const PORT = 8080 || process.env.PORT

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})