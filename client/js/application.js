import 
  { h 
  , component
  , step
  } from "immune/ui"

import routes  from "./routes"

// -- Init

export const init = ({ context }) => 
  step({ pages: {} }, [])

// -- View

export const view = ({ state, actions, props: { context, page, route } }) => (
  h("div",
    [ h("nav[role='navigation']",
        h("ul",
          [ h("li", navLink( route.path, "/"      , "Todos"               ))
          , h("li", navLink( route.path, "/multi" , "Multiple Todo Lists" ))
          ]
        )
      )
    , h("main", page.component(["pages", route.path], page.props))
    ]
  )
)

// -- Helpers

export const navLink = (routePath, linkPath, text) =>
  h("a", { "data-route": true, ["aria-current"]: routePath == linkPath ? "page" : "", href: linkPath}, text)

// -- Component

export default component({ init, view })