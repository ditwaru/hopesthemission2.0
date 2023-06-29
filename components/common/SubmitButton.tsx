export const SubmitButton = ({ text, disabled }: { text: string; disabled: boolean }) => {
  return (
    <button
      className={`rounded-lg bg-teal-200 hover:bg-teal-300 py-1 px-3 ${disabled && "opacity-50 pointer-events-none"}`}
      type="submit"
    >
      {text}
    </button>
  );
};
