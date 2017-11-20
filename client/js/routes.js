import application from "./application"
import todos       from "./pages/todos"
import multiTodo   from "./pages/multi-todo"
import notFound    from "./pages/404"

export default 
  { layout : application
  , pages  : 
      { "/":
          { component      : todos
          , mainNavigation : true
          , props          : {}
          , title          : "Todos"
          }
      , "/multi":
          { component      : multiTodo
          , mainNavigation : true
          , props          : {}
          , title          : "Todo Lists"
          }
      , 404 : 
          { component      : notFound
          , layout         : false
          , props          : {}
          , title          : "404 - Not Found"
          }
      }
  }