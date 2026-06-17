/**
 * A plain server-side module (NO "use server" directive). It holds the toy
 * in-memory store and synchronous read helpers.
 *
 * WHY this file is separate from actions.js: a file with a top-level
 * "use server" directive marks EVERY export as a Server Action, and Server
 * Actions MUST be async functions. A synchronous `getFeedback` can't live
 * there. So we keep mutable state + sync reads here, and the async actions in
 * actions.js. (This is a real gotcha the Next compiler enforces.)
 *
 * In a real app this module would be your DB/repository layer.
 */
const feedback = ['Loving the App Router model.'];

export function getFeedback() {
  return feedback;
}

export function addFeedback(message) {
  feedback.push(message);
}
