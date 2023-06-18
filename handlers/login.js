const handlers = {}

handlers.login = (req, res) => {
    const {email, senha} = req.body     
    const success = email == "asd" && senha == "123"
    if(success){
        req.session.username = email
        
        res.redirect("/")
    }
    else {
        res.render("loginfail")
    }
}

handlers.logout = (req, res) => {
    if(req.session.username)
    {
        delete req.session.username
    }
    res.redirect("/")

}

export default handlers