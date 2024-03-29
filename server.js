const express=require('express')
const exphbs=require('express-handlebars')
const routersHome=require("./routers/home.r")


const app=express()
const port=3000

app.engine('hbs',exphbs.engine({
    extname:'hbs',
    defaultLayout:'container.hbs',
    layoutsDir:'views/_layouts',
    partialsDir:'views/_partials',
}));
app.set('view engine','hbs')
app.use(express.static(__dirname+'/db/pid'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('./config/passport.js')(app)

app.use('/',routersHome)

app.use((err,req,res,next)=>{
    const status=err.status | 500
    res.status(status).send(err.message)
})

app.listen(port,()=>console.log(`Running app in port ${port}`))
