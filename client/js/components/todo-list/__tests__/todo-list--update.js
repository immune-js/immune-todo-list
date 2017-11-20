import
  { Todo
  , Filter
  , Msg
  , init
  , update
  } from "../"

// -- Update - Msg.AddTodo

test("given the AddTodo message it should add a new todo in the todos object", () => {
  const { state } = update(init({ context: None(), id: 123 }).state, Msg.AddTodo("a todo"), None())
  
  expect(state.todos["1"] instanceof Todo).toBe(true)
  expect(state.todos["1"].id).toBe(1)
  expect(state.todos["1"].task).toBe("a todo")
  expect(state.todos["1"].done).toBe(false)
})

test("given the AddTodo message it should increment currentId", () => {
  const { state: initState } = init({ context: None(), id: 123 })
  
  const { state } = update(initState, Msg.AddTodo("a todo"), None())
  
  expect(initState.currentId).toBe(1)
  expect(state.currentId).toBe(2)
})

test("given the AddTodo message it should clear the todoText", () => {
  const { state: initState } = init({ context: None(), id: 123 })
  
  const { state } = update(initState::assoc("todoText", "foo"), Msg.AddTodo("a todo"), None())
  
  expect(state.todoText).toBe("")
})

test("given the AddTodo message it should update feedback", () => {
  const { state: initState } = init({ context: None(), id: 123 })
  
  const { state } = update(initState, Msg.AddTodo("a todo"), None())
  
  expect(state.feedback).toBe("a todo added")
})

test("given the AddTodo message it should not return any effects", () => {
  const { state: initState } = init({ context: None(), id: 123 })
  
  const { effects } = update(initState, Msg.AddTodo("a todo"), None())
  
  expect(effects).toEqual([])
})

// -- Update - Msg.RemoveTodo

test("given the RemoveTodo message it should remove the todo from the todos object", () => {
  const todo = Todo(1, "a todo", false)
  const { state } = update({ todos: { 1: todo }, feedback: "" }, Msg.RemoveTodo(todo), None())
  
  expect(state.todos["1"]).toBe(undefined)
})

test("given the RemoveTodo message it should update feedback", () => {
  const todo = Todo(1, "a todo", false)
  const { state } = update({ todos: { 1: todo }, feedback: "" }, Msg.RemoveTodo(todo), None())
  
  expect(state.feedback).toBe("a todo removed")
})

// -- Update - Msg.UpdateText

test("given the UpdateText message it should update the todoText", () => {
  const { state } = update({ todoText: "" }, Msg.UpdateText("a todo"), None())
  
  expect(state.todoText).toBe("a todo")
})

// -- Update -- Msg.ToggleTodo

test("given the ToggleTodo message it should toggle a todos done status from false to true", () => {
  const todo = Todo(1, "a todo", false)
  const { state } = update({ todos: { 1: todo } }, Msg.ToggleTodo(todo), None())
  
  expect(state.todos[1].done).toBe(true)
})

test("given the ToggleTodo message it should toggle a todos done status from true to false", () => {
  const todo = Todo(1, "a todo", true)
  const { state } = update({ todos: { 1: todo } }, Msg.ToggleTodo(todo), None())
  
  expect(state.todos[1].done).toBe(false)
})

// -- Update -- Msg.ChangeFilter

test("given the ChangeFilter message it should swich filter to the one provided", () => {
  const { state } = update({ filter: Filter.ShowAll() }, Msg.ChangeFilter(Filter.ShowCompleted()), None())
  
  expect(state.filter::is(Filter.ShowCompleted)).toBe(true)
})