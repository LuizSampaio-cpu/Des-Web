import express from 'express'
import {engine} from 'express-handlebars'
import expressSession from 'express-session'
import basicRoutes from './routes/basic.js'
import loginRoutes from './routes/login.js'

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(expressSession, {
    resave: false,
    saveUnitialized: false,
    secret: "Batatinha123"
})


app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use("/login", loginRoutes)

app.use("/", basicRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`\n\nListen on port ${port}.`)
})