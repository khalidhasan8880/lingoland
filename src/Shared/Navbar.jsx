import { Link } from "react-router-dom";
import logo from '../assets/icons/logo.svg'
const Navbar = () => {


    const navOptions = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to="/instructors" >Instructors</Link></li>
    <li><Link to="/classes" >Classes</Link></li>


</>

    return (
        <div className="flex justify-between fixed z-10 top-2 w-full">
            
            <div>
                <img src={logo} alt="" />
            </div>
            <ul className="flex justify-between">
                {navOptions}
            </ul>
        </div>
    );
};

export default Navbar;