const router = require('express').Router()
const views = require('../views/index')
const {Page, User} = require('../models')
const { addPage, editPage, error, main, userList, userPages, wikiPage } = views
router.get('/', async (req, res, next) => {
    try {
        //find all makes pages into an array
        const pages = await Page.findAll()
        res.send(main(pages))
    } catch(err) {
        next(err)
    }
    

})

router.post('/', async(req, res, next) => {
    //Sequelize's save method returns a promise which resolves 
    //with a new instance representing what was 
    //actually saved to the database
   try {
       const newUser = await Page.create(req.body)
       const [user, wasCreated] = await User.findOrCreate({
            where: {
               name: req.body.name,
               email: req.body.email    
            }
        })
        await page.save()
        newUser.setAuthor(user)
       res.redirect(`/wiki/${newUser.slug}`)
   } catch(err) {
       next(err)
   }
})
router.get('/add', (req, res, next) => {
    res.send(addPage())
})

router.get('/:title', async (req, res, next) => {
    try {
        const page = await Page.findOne({where: {slug: req.params.title}})
        const author = await page.getAuthor()
        res.send(wikiPage(page, author))
    } catch(err) {
        next(err)
    }
})

module.exports = router