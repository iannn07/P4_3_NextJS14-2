import React from 'react';
import CreateForm from './components/CreateForm';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import readUserSession from '@/lib/actions';
import { redirect } from 'next/navigation';
import SignOut from './components/SignOut';
import { deleteTodoById, readTodo, updateTodoById } from './actions';

export default async function ToDoPage() {
  const { data } = await readUserSession();

  if (!data.session) {
    return redirect('/auth-server-action');
  }

  const { data: todos } = await readTodo();

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-96 space-y-5'>
        <div className='flex justify-center items-center'>
          <SignOut />
        </div>
        <CreateForm />

        {todos?.map((todo, index) => {
          const deleteTodo = deleteTodoById.bind(null, todo.id);
          const updateTodo = updateTodoById.bind(
            null,
            todo.id,
            !todo.completed
          );

          return (
            <div
              key={index}
              className='flex justify-between items-center gap-6'
            >
              <h1
                className={cn({
                  'line-through': todo.completed,
                })}
              >
                {todo.title}
              </h1>
              <div className='flex gap-2'>
                <form action={deleteTodo}>
                  <Button>Delete</Button>
                </form>
                <form action={updateTodo}>
                  <Button>Update</Button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
