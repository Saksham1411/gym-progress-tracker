
import { AddFieldModal } from "../Modal/AddFieldModal";
const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className=" font-bold">Gym progress tracker</div>
      <AddFieldModal/>
    </div>
  );
};

export default Header;
