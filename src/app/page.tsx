import { MyCard } from "@/components/card";
import CustomForm from '@/components/form';
import TodoList from "@/components/TodoList"

export default function Home() {
  return (
    <div>
        <div className="flex justify-center items-center ">
            <div className="w-full max-w-lg">
                <h2 className="mb-6 text-center text-3xl font-extrabold">TodoIt</h2>
                <TodoList></TodoList>
            </div>
        </div>
      <div className=" flex items-center justify-center pt-7">
        <div className="w-full max-w-lg">
              <h2 className="mb-6 text-center text-3xl  font-extrabold ">Create Your Page</h2>
              <CustomForm />
        </div>
      </div>
      <div className=" flex flex-wrap gap-4 justify-center items-center pt-5">
        {/* <TodoInput></TodoInput> */}
        {/* <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard /> */}
      </div>
    </div>

  );
}
