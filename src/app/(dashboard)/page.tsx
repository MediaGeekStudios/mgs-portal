import { redirect } from 'next/navigation';

export default function Home() {

    /* Forcing redirection anytime this page is hit */
    redirect('/tickets');
}