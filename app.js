/**
 * Todo List Application
 * A simple todo list app built with vanilla JavaScript
 */

import { createTodo, deleteTodo, toggleTodo } from './todoLogic.js';

// DOM Elements
const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo-input');
const descriptionInput = document.getElementById('description-input');
const addBtn = document.getElementById('add-btn');

// Default todo items
const defaultTodos = [
    {
        id: 1,
        title: 'todo 1',
        description: 'This is the description for todo 1.',
        completed: false
    },
    {
        id: 2,
        title: 'todo 2',
        description: 'This is the description for todo 2.',
        completed: false
    }
];

// Current todo items (starts with defaults)
let todos = [...defaultTodos];
let nextId = 3;

/**
 * Initialize the application
 */
function init() {
    renderTodos();
    setupEventListeners();
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Add button click
    addBtn.addEventListener('click', handleAddTodo);

    // Enter key in input field
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    });
}

/**
 * Handle adding a new todo
 */
function handleAddTodo() {
    const title = newTodoInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
        newTodoInput.focus();
        return;
    }

    const newTodo = createTodo(nextId++, title, description);
    todos.push(newTodo);
    renderTodos();

    // Clear inputs
    newTodoInput.value = '';
    descriptionInput.value = '';
    newTodoInput.focus();
}

/**
 * Handle deleting a todo
 * @param {number} id - The id of the todo to delete
 */
function handleDeleteTodo(id) {
    todos = deleteTodo(todos, id);
    renderTodos();
}

/**
 * Handle toggling todo completion
 * @param {number} id - The id of the todo to toggle
 */
function handleToggleTodo(id) {
    todos = toggleTodo(todos, id);
}

/**
 * Handle toggling the description visibility
 * @param {HTMLElement} descriptionElement - The description element to toggle
 */
function handleToggleDescription(descriptionElement) {
    descriptionElement.classList.toggle('expanded');
}

/**
 * Create a todo item element
 * @param {Object} todo - The todo object
 * @returns {HTMLElement} - The todo list item element
 */
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;

    // Header (clickable area)
    const header = document.createElement('div');
    header.className = 'todo-item-header';

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        handleToggleTodo(todo.id);
    });

    // Title
    const title = document.createElement('span');
    title.className = 'todo-title';
    title.textContent = todo.title;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'delete';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDeleteTodo(todo.id);
    });

    // Assemble header
    header.appendChild(checkbox);
    header.appendChild(title);
    header.appendChild(deleteBtn);

    // Description (hidden by default)
    const description = document.createElement('div');
    description.className = 'todo-description';

    const descriptionText = document.createElement('p');
    descriptionText.textContent = todo.description;
    description.appendChild(descriptionText);

    // Click on header to toggle description
    header.addEventListener('click', (e) => {
        // Don't toggle if clicking on checkbox or delete button
        if (e.target !== checkbox && e.target !== deleteBtn) {
            handleToggleDescription(description);
        }
    });

    // Assemble todo item
    li.appendChild(header);
    li.appendChild(description);

    return li;
}

/**
 * Render all todo items
 */
function renderTodos() {
    // Clear the list
    todoList.innerHTML = '';

    // Render each todo
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
