import { MyCard } from "@/components/card";
import CustomForm from '@/components/form';
import EmailForm from '@/components/form';

export default function Home() {
  return (
    <div>
      <div className=" flex items-center justify-center">
      <div className="w-full max-w-lg">
            <h2 className="mt-6 text-center text-3xl  font-extrabold ">Create Your Page</h2>
            <CustomForm />
      </div>

      </div>
      <div className=" flex flex-wrap gap-4 justify-center items-center pt-5">
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
