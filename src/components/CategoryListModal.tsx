import { categoryDefinitions } from "../data/categoryList";
import Modal from "./Modal";

interface CategoryListModalProps {
  isShowing: boolean;
  toggle: () => void;
  unknowns: number;
}

function CategoryListModal({
  isShowing,
  toggle,
  unknowns,
}: CategoryListModalProps) {
  return (
    <Modal isShowing={isShowing} toggle={toggle} title="Categorising">
      <div className="mb-4 text-xs normal-case">
        <p className="my-2">
          You have {unknowns || "no"} unknown transactions. Please refer to our
          category key below
        </p>
        <div className="max-h-[60vh] divide-y divide-gray-200 overflow-auto text-left text-xs">
          <div className="flex bg-gray-50 p-2 font-bold">
            <div className="flex-1 px-2">Name</div>
            <div className="flex-3 px-2">Examples</div>
          </div>
          {categoryDefinitions.map((category) => (
            <div key={category.name} className="flex p-2 hover:bg-gray-100">
              <div className="flex-1 px-2">{category.name}</div>
              <div className="flex-3 px-2 italic">
                {category.items.toString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default CategoryListModal;
