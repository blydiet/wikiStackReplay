const router = require('express').Router()
const wikiRouter = require('./wiki')
const userRouter = require('./user')

router.use('/wiki', wikiRouter)
router.use('/users', userRouter)

module.exports = router