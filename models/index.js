const Sequelize = require('sequelize')
const slugify = require('slugify')
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
})

const generateUrlTitle = (title) => {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return slugify(title, '_')
    
}

const Page = db.define('page', {
    title:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    content:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'close')
    }
})
Page.beforeValidate((page) => {
    if (!page.slug){
       page.slug = generateUrlTitle(page.title)
    }
})
const User = db.define('user', {
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        validate:{
            isEmail: true
        }
    }
})

Page.belongsTo(User, { as: 'author' })
User.hasMany(Page, {foreignKey: 'authorId'})
module.exports = {
    db, Page, User,
}