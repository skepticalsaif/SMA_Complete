const Sequelize = require('sequelize')

let db;

// if (process.env.NODE_ENV == 'testing') {
//   db = new Sequelize({
//     dialect: 'sqlite',
//     // storage: __dirname + '/../../test/test.db'
//     // this line was giving workflow errors
//     storage: ':memory:'
//   })
// } else 
if (process.env.DATABASE_URL) {
  db = new Sequelize({
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    database: 'd6ik1asihstlen',
    port: 5432,
    username: 'zkczymwcgpoamj',
    password: '7f95e6b861db8ad88f880abcf79da614540aa2e44f96198c778b7a31d6cea8da',
    host: 'ec2-35-174-122-153.compute-1.amazonaws.com'
  })
}
// else {
//   db = new Sequelize({
//     dialect: 'mysql',
//     database: 'socialmediadb1',
//     username: 'socialmediauser1',
//     password: 'socialmediapass'
//   })
// }

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