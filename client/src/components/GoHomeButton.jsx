import { Link } from "react-router-dom";

const GoHomeButton = () => {
  return (
    <>
      <Link to="/"
        className="flex font-bold text-2xl w-70 h-full min-h-12 rounded lg:rounded-none items-center justify-center cursor-pointer z-10 select-none text-neutral-100 lg:border-r border-neutral-500 hover:bg-neutral-700"
      >
        DeAlmacenes
        <span className="text-main-accent text-xl lg:text-2xl">
          .com
        </span>{" "}
      </Link>
    </>
  );
};

export default GoHomeButton;
