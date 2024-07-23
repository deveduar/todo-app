import { MyCard } from "@/components/card";
import CustomForm from '@/components/form';

export default function Home() {
  return (
    <div>
      <div className=" sm:px-16 lg:px-18 justify-center">
            <h2 className="mt-6 text-center text-3xl font-extrabold ">Create Your Page</h2>
            <CustomForm />
            <h2 className="mt-6 text-center text-3xl font-extrabold ">Login</h2>

      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center pt-5">
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
      </div>
    </div>

  );
}
