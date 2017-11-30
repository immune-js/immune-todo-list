import "../css/base.css"

import startApp    from "immune/ui"
import routes      from "./routes"
import application from "./application"
import AppState    from "immune/effects/app-state"

startApp(application, document.getElementById("app"))

AppState.stream.addListener(
  { next : state => console.log("AppState:", state)
  }
)