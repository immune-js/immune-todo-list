import "babel-polyfill"

import fs          from "fs"
import koa         from "koa"
import serve       from "koa-static"
import bodyparser  from "koa-body"
import Router      from "koa-router"
import Server      from "immune/server"
import application from "../client/js/application"
import API         from "./api"

const app    = new koa()
const port   = process.env.SERVER_PORT || 9001
const router = Router()

const server = Server(application, 
  { template : fs.readFileSync("./build/client/index.html", "UTF-8")
  , tags     :
      { lang  : "<!-- APP_LANG -->"
      , dir   : "<!-- APP_DIR -->"
      , title : "<!-- APP_TITLE -->"
      , state : "<!-- APP_STATE -->"
      , view  : "<!-- APP_CONTENT -->"
      }
  }
)

console.log("server:", server)

app.use(bodyparser({ multipart: true }))
app.use(serve("."))

API(router)

app.use(async (context, next) => {
  context.body = await server.render({ context, lang: "en", dir: "ltr" })
})

app.use(router.routes())

app.listen(port)

console.log("Server listening on http://localhost:" + port)