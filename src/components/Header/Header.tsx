import HeaderDropdown from "../DropDownMenu/HeaderDropdown";
import { AddFieldModal } from "../Modal/AddFieldModal";
import { Modal } from "../ui/animated-modal";
const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className=" font-bold">Gym progress tracker</div>
      <div className="flex gap-2">
        <Modal>
          <AddFieldModal />
        </Modal>
        <HeaderDropdown />
      </div>
    </div>
  );
};

export default Header;
