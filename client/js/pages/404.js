import
  { h
  , component
  , step
  } from "immune/ui"

export const init = ({ context }) =>
  step({}, [])

export const view = ({ state, actions, props }) =>
  h("h1", "404 - Page not found")

export default component({ init, view })