import profile_picture from "../assets/default_profile_picture.png"
import { useModal } from "../context/ModalProvider";

export default function ImageUploadModal({ onUpload, onRemove, image }) {
  const { closeModal } = useModal();
  return (
    <div className="absolute -left-[6%]">
      <div className="bg-white p-[2px] rounded-md shadow-lg">
        <div className="flex gap-2">
          <button
            className="w-full p-2 text-sm text-blue-500 hover:bg-gray-100 rounded-md"
            onClick={onUpload}
          >
            Upload
          </button>
          {image !== profile_picture && (
            <button
              className="w-full p-2 text-sm text-red-500 hover:bg-gray-100 rounded-md"
              onClick={onRemove}
            >
              Remove
            </button>
          )}
          <button
            className="w-full p-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
