import
  { h
  , step
  , component
  } from "immune/ui"

import todoList from "../components/todo-list"

export const ID = String

export const Msg = Union(
  { AddTodoList    : [    ]
  , RemoveTodoList : [ ID ]
  }
)

export const init = ({ context }) =>
  step({ todoLists: {} }, [ todoList.mount("todoLists") ])

export const update = (state, msg, context) => msg::caseOf(
  { AddTodoList    : () => step(state, [ todoList.mount   ([ "todoLists"     ]) ])
  , RemoveTodoList : id => step(state, [ todoList.unmount ([ "todoLists", id ]) ])
  }
)

export const view = ({ state, actions: { AddTodoList, RemoveTodoList }, props }) => 
  h("div", 
    [ todoList.dynamic([state, "todoLists"], (id, list) =>
        h(`section[labelled-by='${id}'].todo-list`, {},
          [ h("p.smaller", ["A simple todo list demo using the ", h("strong", "immune framework")])
          , list({ id })
          , h(`button[aria-label='delete todolist']`, { onclick: () => RemoveTodoList(id) }, "Remove List")
          ]
        )
      )
    , h("hr")
    , h("button", { onclick: () => AddTodoList() }, "+ Add Todolist")
    ]
  )

export default component({ Msg, init, update, view })