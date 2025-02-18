const Button = ({ variant = 'default', children, disabled = false, text, cls, onSubmit, ...props }) => {
    const baseStyle = `font-semibold rounded-2xl focus:outline-none focus:ring`;
    const variants = {
        orange: 'px-4 py-2 text-lg  bg-white text-primary-orange border-2 border-primary-orange hover:bg-primary-orange hover:text-white',
        blue: 'px-4 py-2 text-xl border-2 border-primary-blue bg-primary-blue text-white hover:bg-white hover:text-primary-blue',
        blueOutlineCourse: 'border-primary-blue text-xs p-1.5 border-2 text-primary-blue hover:bg-primary-blue hover:text-white',
        blueOutline: 'border-primary-blue text-lg px-4 py-2 border-2 text-primary-blue hover:bg-primary-blue hover:text-white',
        secondary: 'px-4 py-2 text-lg bg-primary-orange text-white hover:bg-orange-700',
        auth: 'px-4 py-2 text-[16px]  text-white bg-primary-orange border-2 border-primary-orange hover:bg-primary-blue hover:text-white',
        // danger: 'bg-red-500 text-white hover:bg-red-700',
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
            {...props}
            onSubmit={onSubmit}
        >
            {text}
        </button>
    );
};

export default Button;