import { useState } from "react";
import { api } from "~/utils/api";

export const Form = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const createTodoMutation = api.todoRouter.createTodo.useMutation();

  const createTodo = () => {
    createTodoMutation.mutate({
      name: name,
      description: description,
    }, {
      onError(error){
        console.log(error);
      }, 
      onSuccess(data, variables, context ){
        alert(`Todo ${data.name} created`)
      }
    }
    );
  }

  const handleOnsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo()
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative w-full bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <form onSubmit={(e) => handleOnsubmit(e)}>
          <label className="mb-2 block" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            required
            value={name}
            className="h-11 w-full rounded border-2"
            type="text"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <label className="mb-2 mt-4 block" htmlFor="description">
            Description
          </label>
          <input
            required
            className="h-11 w-full rounded border-2"
            type="text"
            value={description}
            id="description"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <input
            className="mt-6 h-10 w-full cursor-pointer rounded bg-indigo-600 text-white"
            type="submit"
            value={"Create"}
          />
        </form>
      </div>
    </div>
  );
};
