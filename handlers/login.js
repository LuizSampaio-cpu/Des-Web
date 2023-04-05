const handlers = {}

handlers.login = (req, res) => {
    const {email, senha} = req.body     
    const success = email == "asd" && senha == "123"
    if(success){
        //req.session.username = "logado"
        res.locals.username = "logado"
        res.redirect("/")
    }
    else {
        res.render("loginfail")
    }
}

handlers.logout = (req, res) => {res.send("logout")}

export default handlers