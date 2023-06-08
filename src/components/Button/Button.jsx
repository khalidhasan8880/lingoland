import './Button.css'
const Button = ({children}) => {
    return (
        <button className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-xl active:px-5 text-pr sm:text-1xl text-center px-6 py-2 rounded-full">
            {children}
        </button>
    );
};

export default Button;