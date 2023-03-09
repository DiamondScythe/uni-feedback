module.exports = {
    post(req, res) {
        res.send({
            message: `Hello ${req.body.title}!`
        })
    }
}