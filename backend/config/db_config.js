// const pg = require('pg')
// const db = new pg.Client('postgres://oniuhcik:HVzf57D5a6DVllfAfv1UMAZBvL_0N9oa@hattie.db.elephantsql.com/oniuhcik');;
const { Pool } = require('pg')
// const db = new Pool({
//   connectionString: "postgres://default:Pz9YWI6VXgTO@ep-royal-morning-820086-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
// })

const db = new Pool({
  host: 'localhost',
  port: '5433',
  database:'griend-local',
  user:'postgres',
  password:'postgres'
})

db.connect(function(err){
  if (err) {
    console.log("Database connection error");
    console.log(err)
  }else
  {
    console.log("Database connected successfully");
  }
})

module.exports = db;
