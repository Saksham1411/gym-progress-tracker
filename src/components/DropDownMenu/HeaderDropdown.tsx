import { useFirebase } from "../../context/Firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const HeaderDropdown = () => {
  const firebase:any = useFirebase()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger><i className="fa-solid fa-gear"></i></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{firebase?.userEmail}</DropdownMenuItem>
        <DropdownMenuItem onClick={firebase.handleSignOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
