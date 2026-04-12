interface BevelButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

export default function BevelButton( {text, onClick, disabled}: BevelButtonProps ) {

    if (disabled) {

    }

    return (
        <button disabled={disabled} onClick={onClick} className={`m-1 relative inline-block px-3 py-1 font-bold rounded-lg transition-all
    ${disabled
            ? 'text-cyan-700 cursor-not-allowed opacity-40 shadow-md shadow-gray-100'
            : 'text-cyan-400 cursor-pointer shadow-md shadow-gray-700 hover:shadow-lg hover:shadow-cyan-900/50 active:shadow-sm active:translate-y-[2px]'
        }`}>{text}</button>
    );
}