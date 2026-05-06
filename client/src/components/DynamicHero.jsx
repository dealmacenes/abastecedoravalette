import { HiOutlineShoppingCart } from "react-icons/hi";

const DynamicHero = () => {
  return (
    <div className="flex flex-col rounded-lg border border-neutral-500 w-full sm:max-w-4/10 lg:max-w-1/2 ml-auto mt-10 sm:mt-0 h-fit">
      <div className="flex border-b border-neutral-500 px-6 py-3 justify-between items-center">
        <div className="flex w-fit h-fit gap-4">
          <div className="rounded-full bg-neutral-500 size-3" />
          <div className="rounded-full bg-neutral-500 size-3" />
          <div className="rounded-full bg-neutral-500 size-3" />
        </div>

        <HiOutlineShoppingCart className="rounded-full p-2 size-10 bg-neutral-700 text-neutral-200 stroke-1" />
      </div>
      <div className="flex w-full">
        <div className="hidden lg:flex flex-col w-7/20 border-r border-neutral-500 py-8 px-4 gap-6">
          <div className="flex w-full h-2 rounded-full bg-neutral-500" />
          <div className="flex w-3/5 h-2 rounded-full bg-neutral-500" />
        </div>

        <div className="relative flex flex-col w-full p-4 sm:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-6">
            <div className="flex w-full aspect-[4/5] md:aspect-square rounded-lg border border-neutral-600" />
            <div className="flex w-full aspect-[4/5] md:aspect-square rounded-lg border border-neutral-600" />
            <div className="flex w-full aspect-[4/5] md:aspect-square rounded-lg border border-neutral-600" />
            <div className="flex w-full aspect-[4/5] md:aspect-square rounded-lg border border-neutral-600" />
          </div>
          <div className="rounded-lg border border-neutral-600 bg-neutral-800 h-10 mt-6" />
          <div className="hidden lg:flex flex-col sm:gap-[12%] absolute sm:-bottom-3 lg:-bottom-6 right-[10%] w-11/20 h-3/5">
            <div className="flex w-full h-[4%] rounded-full bg-neutral-500" />
            <div className="flex w-3/5 h-[4%] rounded-full bg-neutral-500" />
            <div className="flex w-8/10 h-[4%] rounded-full bg-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicHero;
