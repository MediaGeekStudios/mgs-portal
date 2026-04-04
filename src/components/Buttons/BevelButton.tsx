interface BevelButtonProps {
    text: string;
    onClick: () => void;
}

export default function BevelButton( {text, onClick}: BevelButtonProps ) {
    return (
        <button onClick={onClick} className='m-1 relative inline-block px-3 py-1 font-bold text-white bg-cyan-500 rounded-lg border-b-4 border-cyan-700 active:border-b-0 active:translate-y-[4px] transition-all'>{text}</button>
    );
}