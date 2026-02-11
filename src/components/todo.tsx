import React, { useState } from 'react'

interface TodoItem {
  id: number
  text: string
}

const TodoComponent: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([])

  const addTodo = (todoText: string) => {
    const newTodo: TodoItem = { id: Date.now(), text: todoText }
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const todoInput = form.elements.namedItem('todo') as HTMLInputElement
    const todoText = todoInput.value.trim()
    if (todoText) {
      addTodo(todoText)
      todoInput.value = ''
    }
  }

  return (
    <div className='flex h-screen justify-center'>
      <div>
        <h1 className='text-2xl font-bold my-2'>Todo List</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            className='border border-slate7 p-2 rounded-md bg-slate3 text-slate12'
            type='text'
            name='todo'
            placeholder='Add a new todo'
          />
          <button className='bg-crimson9 w-full text-slate1 px-4 py-2 rounded-md' type='submit'>
            Add
          </button>
        </form>
        <ul className='w-full my-3 py-2'>
          {todos.map(todo => (
            <li key={todo.id} className='flex justify-between items-baseline mt-2'>
              <p className='text-base text-slate12'>{todo.text}</p>
              <button
                className='bg-red9 text-slate12 px-2 py-1 rounded-md'
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoComponent
