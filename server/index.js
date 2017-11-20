import "babel-polyfill"

import fs         from "fs"
import koa        from "koa"
import serve      from "koa-static"
import bodyparser from "koa-body"
import Router     from "koa-router"
import routes     from "../client/js/routes"
import Server     from "immune/server"
import API        from "./api"

const app    = new koa()
const router = Router()

const server = Server(routes, 
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

app.use(bodyparser({ multipart: true }))
app.use(serve("."))

Object.keys(routes.pages).forEach(route => 
  router.get(route, async (ctx, next) => 
    ctx.body = await server.render({ ctx, route, language: "en", dir: "ltr" })
  )
)

API(router)

app.use(router.routes())

app.use(async (ctx, next) => {
  ctx.status   = 404
  ctx.body     = await server.render({ ctx, route: 404, layout: false, language: "en", dir: "ltr" })
})

app.listen(9001)

console.log("Server listening on http://localhost:9001")