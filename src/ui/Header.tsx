import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
    return (
        <header className="w-full border-b border-gray-200 bg-gray-600">
            <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-6">

                {/* Brand/Logo */}
                <a href="/" className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500">
                        <FontAwesomeIcon icon={faCode} className="h-5 w-5 text-white" />
                    </div>
                    <span className="hidden sm:inline text-sm font-semibold text-cyan-500">MGS Portal</span>
                </a>

                {/* Navigation */}
                <Navbar />

            </div>
        </header>
    );
}