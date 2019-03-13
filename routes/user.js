const router = require('express').Router()
const {User, Page} = require('../models')
const views = require('../views')
const { addPage, editPage, error, main, userList, userPages, wikiPage } = views


router.get('/', async (req, res, next) => {
    try {
        const allUsers = await User.findAll()
        res.send(userList(allUsers))
    } catch (err) {
        next(err)
    }
})
router.get('/:authorId', async(req, res, next) => {
    try {
        //the user return an object from the data base
        const user = await User.findById(req.params.authorId)
        const page = await user.getPages()
        res.send(userPages(user, page))
    } catch (err) {
        next(err)
    }
})
module.exports = router