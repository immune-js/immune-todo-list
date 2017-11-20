import
  { Todo
  , todoView
  } from "../"

// -- Completed Checkbox

test("the completed checkbox should have an id attribute based on the todo id", () => {
  const todo = Todo(1, "a todo", false)
  const [ checkbox ] = todoView(todo, {})
  
  expect(checkbox.data.id).toBe("todo-1")
})

test("the completed checkbox should have the correct input type", () => {
  const todo = Todo(1, "a todo", false)
  const [ checkbox ] = todoView(todo, {})
  
  expect(checkbox.data.type).toBe("checkbox")
})

test("the completed checkbox should be visually hidden", () => {
  const todo = Todo(1, "a todo", false)
  const [ checkbox ] = todoView(todo, {})
  
  expect(checkbox.data.class).toBe("vh")
})

test("the completed checkbox should not be checked if the todo is not done", () => {
  const todo = Todo(1, "a todo", false)
  const [ checkbox ] = todoView(todo, {})
  
  expect(checkbox.data.checked).toBe(false)
})

test("the completed checkbox should be checked if the todo is done", () => {
  const todo = Todo(1, "a todo", true)
  const [ checkbox ] = todoView(todo, {})
  
  expect(checkbox.data.checked).toBe(true)
})

test("the completed checkbox should invoke ToggleTodo when changed", () => {
  const todo = Todo(1, "a todo", false)
  const [ checkbox ] = todoView(todo, { ToggleTodo: _todo => todo === _todo })
  
  expect(checkbox.data.onchange()).toBe(true)
})

// -- Label

test("the label should be connected to the real checkbox", () => {
  const todo = Todo(1, "a todo", false)
  const [ _, label ] = todoView(todo, {})
  
  expect(label.data.for).toBe("todo-1")
})

test("the label should contain a styled 'fake' checkbox", () => {
  const todo = Todo(1, "a todo", false)
  const [ _, label ] = todoView(todo, {})
  
  expect(label.children[0].tag).toBe("span")
  expect(label.children[0].data.class).toBe("tick")
  expect(label.children[0].children).toEqual([])
})

test("the label should contain the todo task", () => {
  const todo = Todo(1, "a todo", false)
  const [ _, label ] = todoView(todo, {})
  
  expect(label.children[1].tag).toBe("span")
  expect(label.children[1].data.class).toBe("text")
  expect(label.children[1].children).toEqual(["a todo"])
})

// -- Delete Button

test("the delete button should have an aria label", () => {
  const todo = Todo(1, "a todo", false)
  const [ _, __, button ] = todoView(todo, {})
  
  expect(button.data["aria-label"]).toBe("delete a todo")
})

test("the delete button should invoke RemoveTodo when clicked", () => {
  const todo = Todo(1, "a todo", false)
  const [ _, __, button ] = todoView(todo, { RemoveTodo: _todo => todo === _todo })
  
  expect(button.data.onclick()).toBe(true)
})

test("the delete button should contain a svg reference", () => {
  const todo = Todo(1, "a todo", false)
  const [ _, __, button ] = todoView(todo, {})
  
  expect(button.children[0].tag).toBe("svg")
  expect(button.children[0].children[0].tag).toBe("use")
  expect(button.children[0].children[0].data.href).toBe("#bin-icon")
})