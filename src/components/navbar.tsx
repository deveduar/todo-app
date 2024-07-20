import { NavigationMenuDemo } from "@/components/nav-menu";

export function Navbar() {
  return (
    <div className="flex flex-col items-center justify-between p-4 ">
      <nav className="shadow-lg rounded  flex justify-center items-center ">
        <div className="">
          <NavigationMenuDemo  />
        </div>
      </nav>
    </div>
  );
}
