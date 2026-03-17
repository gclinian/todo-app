import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createTodo, deleteTodo, toggleTodo } from '../../todoLogic.js';

describe('createTodo', () => {
    test('creates a todo with given id, title, description', () => {
        const todo = createTodo(1, 'Buy milk', 'From the store');
        assert.deepEqual(todo, {
            id: 1,
            title: 'Buy milk',
            description: 'From the store',
            completed: false
        });
    });

    test('uses default description when none provided', () => {
        const todo = createTodo(2, 'Walk dog', '');
        assert.equal(todo.description, 'No description provided.');
    });

    test('always sets completed to false', () => {
        const todo = createTodo(3, 'Test', 'desc');
        assert.equal(todo.completed, false);
    });
});

describe('deleteTodo', () => {
    const todos = [
        { id: 1, title: 'todo 1', completed: false },
        { id: 2, title: 'todo 2', completed: false },
        { id: 3, title: 'todo 3', completed: false }
    ];

    test('removes the todo with the given id', () => {
        const result = deleteTodo(todos, 2);
        assert.equal(result.length, 2);
        assert.ok(!result.find(t => t.id === 2));
    });

    test('keeps other todos intact', () => {
        const result = deleteTodo(todos, 2);
        assert.ok(result.find(t => t.id === 1));
        assert.ok(result.find(t => t.id === 3));
    });

    test('does nothing when id does not exist', () => {
        const result = deleteTodo(todos, 99);
        assert.equal(result.length, 3);
    });

    test('does not mutate original array', () => {
        deleteTodo(todos, 1);
        assert.equal(todos.length, 3);
    });
});

describe('toggleTodo', () => {
    const todos = [
        { id: 1, title: 'todo 1', completed: false },
        { id: 2, title: 'todo 2', completed: true }
    ];

    test('toggles false -> true', () => {
        const result = toggleTodo(todos, 1);
        assert.equal(result.find(t => t.id === 1).completed, true);
    });

    test('toggles true -> false', () => {
        const result = toggleTodo(todos, 2);
        assert.equal(result.find(t => t.id === 2).completed, false);
    });

    test('does not affect other todos', () => {
        const result = toggleTodo(todos, 1);
        assert.equal(result.find(t => t.id === 2).completed, true);
    });

    test('does not mutate original array', () => {
        toggleTodo(todos, 1);
        assert.equal(todos.find(t => t.id === 1).completed, false);
    });
});
