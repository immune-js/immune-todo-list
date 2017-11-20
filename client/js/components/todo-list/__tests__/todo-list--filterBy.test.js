import
  { Todo
  , Filter
  , filterBy
  } from "../"


test("given Filter.ShowAll should return all todos", () => {
  const todos = { 1: Todo(1, "todo1", false), 2: Todo(2, "todo2", true), 3: Todo(3, "todo3", false) }
  
  expect(todos::filterBy(Filter.ShowAll())::count()).toEqual(3)
})

test("given Filter.ShowCompleted should return all completed todos", () => {
  const todos = { 1: Todo(1, "todo1", false), 2: Todo(2, "todo2", true), 3: Todo(3, "todo3", false) }
  
  expect(todos::filterBy(Filter.ShowCompleted())::every(([_, todo]) => todo.done)).toEqual(true)
})