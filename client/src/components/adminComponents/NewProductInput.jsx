// client/src/components/NewProductInput.jsx 
const NewProductInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text"
}) => {
  const classNames =
    "flex w-full sm:max-w-50 md:max-w-65 lg:max-w-80 text-neutral-100 py-2 px-3 border border-neutral-700 rounded text-xl outline-none bg-neutral-800";

  return (
    <label className="flex flex-col md:flex-row w-full gap-1 md:gap-5 md:items-center md:justify-end">
      <span className="text-sm text-neutral-300">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={classNames}
      />
    </label>
  );
};

export default NewProductInput;
