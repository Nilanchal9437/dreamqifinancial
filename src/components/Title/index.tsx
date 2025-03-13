import { Plus } from "lucide-react"; // Lucide React Icon

interface TitleType {
  title: string;
  description: string;
  action: () => void;
  btntitle: string;
  hidebtn?: boolean;
}

function Title({ title, description, action, btntitle, hidebtn }: TitleType) {
  return (
    <div className="flex justify-between items-center">
      {/* Title & Description */}
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-gray-300">{description}</p>
      </div>

      {/* Button */}
      {!hidebtn && (
        <button
          onClick={() => action()}
          className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all"
        >
          <Plus className="w-4 h-4" />
          {btntitle}
        </button>
      )}
    </div>
  );
}

export default Title;
