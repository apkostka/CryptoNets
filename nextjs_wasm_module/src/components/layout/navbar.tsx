import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppDispatch } from '@/config/store';

export const Navbar = () => {
    const dispatch = useAppDispatch();

    return (
        <nav className='mb-10 flex items-center justify-between bg-white px-6 py-4'>
            <div className='flex items-center gap-6'>
                <Link href='/' className='text-primary text-xl font-bold'></Link>
            </div>

            <ul className='flex items-center'></ul>
        </nav>
    );
};
