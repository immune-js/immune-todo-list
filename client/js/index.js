import "../css/base.css"

import startApp from "immune/ui"
import routes   from "./routes"
import AppState from "immune/effects/app-state"

startApp(routes, document.getElementById("app"))

AppState.stream.addListener(
  { next : state => console.log("AppState:", state)
  }
)