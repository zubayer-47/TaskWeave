type Props = {
  handleOpen: () => void;
};

export default function CreateTaskButton({ handleOpen }: Props) {
  return (
    <button
      type="button"
      onClick={handleOpen}
      className="mx-4 my-2 rounded-md bg-success-button p-2 font-inter font-semibold text-white transition-colors hover:bg-success-button/80"
    >
      Create Task
    </button>
  );
}
