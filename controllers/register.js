

const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password} = req.body
    if(!email || !name || !password){
       return res.status(400).json('Incorrect form submission')
    }
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx("users")
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                // password: password
                joined: new Date()
            }).then(response => {
                res.json(response)
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        
    .then(err => res.status(400).json('unable to register'))

}

module.exports={ 
    handleRegister: handleRegister
}