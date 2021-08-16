const Sequelize = require('sequelize')

let db;

if (process.env.NODE_ENV == 'testing') {
  db = new Sequelize({
    dialect: 'sqlite',
    // storage: __dirname + '/../../test/test.db'
    // this line was giving workflow errors
    storage: ':memory:'
  })
} else {
  db = new Sequelize({
    dialect: 'mysql',
    database: 'socialmediadb1',
    username: 'socialmediauser1',
    password: 'socialmediapass'
  })
}

// table attribute definitions
const COL_ID_DEF = {
  type: Sequelize.DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
}
const COL_USERNAME_DEF = {
  type: Sequelize.DataTypes.STRING(30),
  unique: true,
  allowNull: false
}
const COL_TITLE_DEF = {
  type: Sequelize.DataTypes.STRING(140),
  allowNull: false
}

// sequelize automatically pluralizes the table name i.e (User => Users)
const Users = db.define('user', {
  id: COL_ID_DEF,
  username: COL_USERNAME_DEF
})

const Posts = db.define('post', {
  id: COL_ID_DEF,
  title: COL_TITLE_DEF,
  body: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false
  }
})

const Comments = db.define('comment', {
  id: COL_ID_DEF,
  title: COL_TITLE_DEF,
  body: {
    type: Sequelize.DataTypes.TEXT('tiny')
  }
})

// defining the relationships
Users.hasMany(Posts)
Posts.belongsTo(Users)  // foreign key

Users.hasMany(Comments)
Comments.belongsTo(Users)  // foreign key

Posts.hasMany(Comments)
Comments.belongsTo(Posts)  // foreign key 

module.exports = { db, Users, Posts, Comments }