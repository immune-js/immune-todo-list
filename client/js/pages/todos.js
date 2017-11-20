import
  { h
  , step
  , component
  } from "immune/ui"

import todoList from "../components/todo-list"

export const init = ({ context }) =>
  step({}, [])

export const view = ({ state, actions, props }) => 
  h("section[labelled-by='todoList'].todo-list", {},
    [ h("p.smaller", ["A simple todo list demo using the ", h("strong", "immune framework")])
    , todoList("todoList", { id: "todoList" })
    ]
  )

export default component({ init, view })