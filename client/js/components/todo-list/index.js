import
  { h
  , step
  , targetValue
  , preventDefault
  , component
  , transitions
  } from "immune/ui"

// -- Effects

import DOM from "immune/effects/dom"

// -- Animations

const listTransition = transitions.group(
  transitions.enter({ name: 'scale', time: 300 }),
)

// -- Type aliases

const ID = OneOf(String, Number)

// -- Types

export const Todo = Type({ id: ID, task: String, done: Boolean })

export const Filter = Union(
  { ShowAll       : []
  , ShowCompleted : []
  , ShowPending   : []
  }
)

// -- Msg

export const Msg = Union(
  { AddTodo      : [ String        ]
  , RemoveTodo   : [ Todo          ]
  , UpdateText   : [ String        ]
  , ToggleTodo   : [ Todo          ]
  , ChangeFilter : [ Filter        ]
  }
)

// -- Init

export const init = ({ context, id }) =>
  step(
    { todos     : {}
    , currentId : 1
    , filter    : Filter.ShowAll()
    , todoText  : ""
    , feedback  : ""
    , id
    }
  )

// -- Update

export const update = (state, msg, context) => msg::caseOf(
  { AddTodo : text => step(
      state::evolve(
        { todos     : { [state.currentId]: Todo(state.currentId, text.trim(), false) }
        , currentId : state.currentId::inc()
        , todoText  : ""
        , feedback  : `${text} added`
        }
      )
    )
  
  , RemoveTodo : todo => 
      step(state::evolve({ feedback: `${todo.task} removed` })::dissocIn(["todos", todo.id.toString()]), [ DOM.focusSelector(`h1#${state.id}`) ])
  
  , UpdateText : text => 
      step(state::evolve({ todoText: text }))
  
  , ToggleTodo : todo =>
      step(state::assocIn(["todos", todo.id], Todo(todo.id, todo.task, !todo.done)))
  
  , ChangeFilter : filter =>
      step(state::evolve({ filter }))
  }
)

// -- View

export const view = ({ state: { todos, filter, todoText, id, feedback }, actions: { AddTodo, RemoveTodo, UpdateText, ToggleTodo, ChangeFilter }, props }) =>
  h("div",
    [ h(`h1#${id}`, { tabindex: "-1" }, "Todos")
    
    , listTransition(
        h(`ul.todos#todos-${id}`, { key: "todos" }, todos::filterBy(filter)::map(([id, todo]) => 
          h("li", { key: id }, todoView(todo, { ToggleTodo, RemoveTodo })))
        )
      )
    
    , h("div.empty-state",
        todos::count() === 0 && h("p", 
          "Either you've done everything already or there are still things to add to your list. Add your first todo!"
        )
      )
    
    , h(`div[role='toolbar'][aria-label='todo filters'][aria-controls='todos-${id}'].smaller`,
        [ h("strong", "Filters:")
        , h(`button[aria-pressed='${(filter instanceof Filter.ShowAll) ? "true" : "false"}']`, 
            { onclick: () => ChangeFilter(Filter.ShowAll()) }, "All")
        , h(`button[aria-pressed='${(filter instanceof Filter.ShowCompleted) ? "true" : "false"}']`, 
            { onclick: () => ChangeFilter(Filter.ShowCompleted()) }, "Completed")
        , h(`button[aria-pressed='${(filter instanceof Filter.ShowPending) ? "true" : "false"}']`, 
            { onclick: () => ChangeFilter(Filter.ShowPending()) }, "Pending")
        ]
      )
      
    , h("form", { onsubmit: preventDefault(AddTodo, todoText) }, 
        [ h("label.vh", { for: `add-${id}` }, "Create a new todo item")
        , h("input", 
            { type        : "text"
            , id          : `add-${id}`
            , value       : todoText
            , placeholder : "E.g. Cook dinner"
            , autofocus   : true
            , oninput     : targetValue(UpdateText)
            }
          )
          
        , h("button", { disabled: todoText.trim() === "" }, "Add Todo")
        ]
      )
      
     // Announce that a todo was added or removed to users of screen-readers
    , h("div[role='status'].vh", feedback)
    ]
  )

export const todoView = (todo, { ToggleTodo, RemoveTodo }) => (
  [ h(`input[type='checkbox']#todo-${todo.id}.vh`, 
      { checked  : todo.done
      , onchange : e => ToggleTodo(todo)
      }
    )
  
  , h(`label[for='todo-${todo.id}']`, [ h("span.tick"), h("span.text", todo.task) ])
  
  , h(`button[aria-label='delete ${todo.task}']`, { onclick: () => RemoveTodo(todo) }, 
      h("svg", h("use", { href: '#bin-icon' }, []))
    )
  ]
)

// -- Helpers

export const filterBy = (todos, currentFilter) => currentFilter::caseOf(
  { ShowAll       : () => todos
  , ShowCompleted : () => todos::filter(([id, todo]) =>  todo.done)
  , ShowPending   : () => todos::filter(([id, todo]) => !todo.done)
  }
)

// -- Component

export default component({ Msg, init, update, view })