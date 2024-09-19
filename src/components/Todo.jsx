import React, { useState, useEffect } from 'react';
import { DB } from './utils/db';

const TodoComponent = () => {
    const [ todos, setTodos ] = useState([]);

    // Load todos from IndexedDB when the component mounts
    useEffect(() => {
        const loadTodos = async () => {
            const storedTodos = await DB.getTodos();
            setTodos(storedTodos);
        };
        loadTodos();
    }, []);

    // Save todos to IndexedDB whenever the state changes
    useEffect(() => {
        todos.forEach(async (todo) => {
            await DB.saveTodo(todo);
        });
    }, [ todos ]);

    const addTodo = (todoText) => {
        const newTodo = { id: Date.now(), text: todoText }; // No need to include 'id' here
        setTodos([ ...todos, newTodo ]);
    };

    const deleteTodo = async (id) => {
        await DB.deleteTodo(id);
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const todoText = e.target.elements.todo.value.trim();
        if (todoText)
        {
            addTodo(todoText);
            e.target.elements.todo.value = '';
        }
    };

    return (
        <div className='flex h-screen justify-center'>
            <div>
                <h1 className='text-2xl font-bold my-2'>Todo List</h1>
                <form onSubmit={ handleSubmit } className='flex flex-col gap-3'>
                    <input
                        className='border border-gray-400 p-2 rounded-md'
                        type='text'
                        name='todo'
                        placeholder='Add a new todo'
                    />
                    <button
                        className='bg-green-500 w-full text-white px-4 py-2 rounded-md'
                        type='submit'
                    >
                        Add
                    </button>
                </form>
                <ul className='w-full my-3 py-2'>
                    { todos.map((todo) => (
                        <li key={ todo.id } className='flex justify-between items-baseline mt-2'>
                            <p className='text-base'>{ todo.text }</p>
                            <button
                                className='bg-red-500 text-white px-2 py-1 rounded-md'
                                onClick={ () => deleteTodo(todo.id) }
                            >
                                Delete
                            </button>
                        </li>
                    )) }
                </ul>
            </div>
        </div>
    );
};

export default TodoComponent;