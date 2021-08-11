const { Posts, Users } = require('../db/models')

async function createNewPost(userId, title, body) {
  const post = await Posts.create({
    title,
    body,
    userId
  })
  return post
}

// showAllPosts({username: ''})
// showAllPosts({title: ''})

async function findAllPosts(query) {
  // TODO: handle query params
  let where = {}
  if (query.userId) {
    where.userId = query.userId
  }
  const posts = await Posts.findAll({
    include: [Users],
    // we can do this ( include: [Users] ) only if there is a relation between users and posts i.e Users.hasMany(Posts); Posts.belongsTo(Users); 
    where
  })
  return posts
}

module.exports = { createNewPost, findAllPosts }

// test code for creating a task ( createNewPost )
// async function task() {
//   console.log(await createNewPost(1, 'this is sample post', 'this is some body'))
//   console.log(await createNewPost(2, 'this is another post', 'some other body as well'))
// }
// task()

// test code for seeing the tasks ( showAllPosts )
// async function task2() {
//   const posts = await showAllPosts()
//   for (let p of posts) {
//     console.log(`${p.title}\nauthor: ${p.user.username}\n${p.body}\n===========\n`)
//   }
//   // for seeing the author above we have made changes in showAllPosts() > .findAll - we have added include: [Users] for tis purpose
//   // see above for further info
// }
// task2()

