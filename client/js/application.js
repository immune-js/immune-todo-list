import 
  { h
  , component
  } from "immune/ui"

import routes from "./routes"

import Dispatch from "immune/effects/dispatch"
import Location from "immune/effects/location"
import Router   from "immune/effects/router"

// -- Pages

import todo     from "./pages/todos"
import multi    from "./pages/multi-todo"
import notFound from "./pages/404"

// -- Types

const Route = Union(
  { TodoList  : []
  , MultiTodo : []
  , NotFound  : []
  }
)

// -- Route Map

export const routeMap =
  { "/"      : Route.TodoList
  , "/multi" : Route.MultiTodo
  }

// -- Msg

export const Msg = Union(
  { ChangeRoute : [ Location ]
  }
)

// -- Init

export const init = ({ context, location }) => (console.log(location),
  { state   : { pages: {}, location, route: parseRoute(location) }
  , effects : [ Msg.ChangeRoute(location) ]
  }
)

// -- Update

export const update = (state, msg, context) => msg::caseOf(
  { ChangeRoute : location => (
      { state: state::evolve({ route: parseRoute(location), location }), effects: [] }
    )
  }
)

// -- View

export const view = ({ state: { route, location }, actions, props: { context } }) => 
  h("div",
    [ h("nav", h("ul", 
        [ h("li", navLink( location.path, "/"      , "Todos"               ))
        , h("li", navLink( location.path, "/multi" , "Multiple Todo Lists" ))
        ]
      ))
    , route::caseOf(
        { TodoList  : () => todo     ([ "pages", location.path, "todo"      ], {})
        , MultiTodo : () => multi    ([ "pages", location.path, "multiTodo" ], {})
        , NotFound  : () => notFound ([ "pages", "404"                      ], {})
        }
      )
    ]
  )

// -- Subscriptions

export const subscriptions = () =>
  [ Router.listen  ( Msg.ChangeRoute )
  , Router.capture ( "data-route"    )
  ]

// -- Helpers

export const navLink = (routePath, linkPath, text) =>
  h("a", { "data-route": true, ["aria-current"]: routePath == linkPath ? "page" : "", href: linkPath}, text)

export const parseRoute = location =>
  Router.parse(location, routeMap)::getOrElse(Route.NotFound())

// -- Component

export default component({ Msg, init, update, view, subscriptions })