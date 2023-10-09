import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? 'border-slate-400 dark:border-gray-800 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 focus:text-slate-800 dark:focus:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-900 focus:border-slate-700 dark:focus:border-slate-300'
                    : 'border-transparent text-white-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
