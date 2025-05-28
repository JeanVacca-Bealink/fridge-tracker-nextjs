import { setOpenDate } from "@/actions/form.actions";
import FridgeFormModal from "@/components/content-form";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faSync, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import {  } from "@fortawesome/free-regular-svg-icons"
function getDateDiff(date: string) : number {
  const today = new Date();
  const diff = new Date(date as string).getTime() - today.getTime();

  console.log("Diff in ms:", diff);
  return Math.ceil(diff / (1000 * 3600 * 24)); // Convert milliseconds to days
}

async function Dashboard() {
  const supabase = await createClient();

  const { data: todos } = await supabase.from("fridge_content").select();

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <h3 className="text-white text-2xl font-bold">Fridge Content</h3>
      <div className="h-[450px] w-[50%] bg-violet-100 shadow-lg rounded ">
        <ul className="list-none">
          {todos?.map((todo) => (
            <li
              key={todo.id}
              className="text-lg bg-white px-2 py-1 border-amber-300 border-2"
            >
              <form
                className="flex gap-2 items-center justify-between"
                method="post"
              >
                <input type="hidden" name="id" value={todo.id} />
                <div className="flex  justify-between flex-1 gap-2 items-center">
                  <p className="flex-1">{todo.description}</p>
                  <span className="text-sm">
                    {todo.open_date ? (
                      <>
                        <FontAwesomeIcon icon={faBoxOpen} className="fa-fw pe-2" />
                        {new Date(todo.open_date).toLocaleDateString()}
                        <button formAction={setOpenDate} className="ps-2 cursor-pointer" title="Refresh date"><FontAwesomeIcon icon={faSync} className="fas" /></button>
                      </>
                    ) : (
                      <button formAction={setOpenDate} className="cursor-pointer" title="Set open date">
                        <FontAwesomeIcon icon={faBox} className="fa-fw" />
                      </button>
                    )}
                  </span>
                  <span className={`text-sm border-l-1 pl-2 border-r-1 pr-2 ${getDateDiff(todo.expiration_date as string) < 2  ? "text-red-500" : getDateDiff(todo.expiration_date as string) < 10 ? 'text-orange-300' : 'text-gray-500'}`}>
                    {todo.expiration_date
                      ? new Date(todo.expiration_date).toLocaleDateString()
                      : "No expiration date"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button>Eat</button>
                  <button>Trash</button>
                </div>
              </form>
            </li>
          ))}
        </ul>
      </div>

      <FridgeFormModal />
    </div>
  );
}

export default Dashboard;
