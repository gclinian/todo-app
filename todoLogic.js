/**
 * Pure logic functions for the Todo app (no DOM dependencies).
 * Exported for unit testing.
 */

/**
 * Create a new todo object.
 * @param {number} id
 * @param {string} title
 * @param {string} description
 * @returns {Object}
 */
export function createTodo(id, title, description) {
    return {
        id,
        title,
        description: description || 'No description provided.',
        completed: false
    };
}

/**
 * Delete a todo by id.
 * @param {Object[]} todos
 * @param {number} id
 * @returns {Object[]}
 */
export function deleteTodo(todos, id) {
    return todos.filter(todo => todo.id !== id);
}

/**
 * Toggle the completed state of a todo by id.
 * @param {Object[]} todos
 * @param {number} id
 * @returns {Object[]}
 */
export function toggleTodo(todos, id) {
    return todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
}
