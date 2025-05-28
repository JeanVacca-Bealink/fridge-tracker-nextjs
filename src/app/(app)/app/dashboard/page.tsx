import FridgeFormModal from "@/components/content-form";
import { createClient } from "@/utils/supabase/server";
import React from "react";

async function Dashboard() {
  const supabase = await createClient()

  const { data: todos } = await supabase.from('fridge_content').select()

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <h3 className="text-white text-2xl font-bold">Fridge Content</h3>
      <div className="h-[450px] w-[50%] bg-violet-100 shadow-lg rounded">
          <ul className="list-disc pl-5">
            {todos?.map((todo) => (
              <li key={todo.id} className="text-lg">
                {todo.description} - {todo.expiration_date ? new Date(todo.expiration_date).toLocaleDateString() : 'No expiration date'}
              </li>
            ))}
          </ul>
      </div>

      <FridgeFormModal />
    </div>
  );
}

export default Dashboard;
