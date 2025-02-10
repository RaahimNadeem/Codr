import clsx from "clsx";

const Button = ({ id, title, containerClass }) => {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
        containerClass
      )}
    >
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <span className="transition-transform duration-500 group-hover:-translate-y-full group-hover:skew-y-12">
          {title}
        </span>
        <span className="absolute translate-y-full skew-y-12 transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </span>
      </span>
    </button>
  );
};

export default Button;
