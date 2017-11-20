import
  { Filter
  , init
  } from "../"

test("it should set todos to an empty object", () => {
  const { state } = init({ context: None(), id: 123 })
  expect(state.todos).toEqual({})
})

test("it should set a default value for currentId", () => {
  const { state } = init({ context: None(), id: 123 })
  expect(state.currentId).toBe(1)
})

test("it should set a default value for filter", () => {
  const { state } = init({ context: None(), id: 123 })
  expect(state.filter::is(Filter.ShowAll)).toBe(true)
})

test("it should set a default value for todoText", () => {
  const { state } = init({ context: None(), id: 123 })
  expect(state.todoText).toBe("")
})

test("it should set a default value for feedback", () => {
  const { state } = init({ context: None(), id: 123 })
  expect(state.feedback).toBe("")
})

test("it should store id prop in state", () => {
  const { state } = init({ context: None(), id: 123 })
  expect(state.id).toBe(123)
})

test("it should not return any effects", () => {
  const { effects } = init({ context: None(), id: 123 })
  expect(effects).toEqual([])
})