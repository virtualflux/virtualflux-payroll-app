'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, children, icon: Icon, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname !== '/' && pathname.includes(href));

  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`w-full p-3 rounded-lg flex items-center gap-3 text-sm transition-all duration-300 ease-in-out ${
        isActive 
          ? 'bg-white text-black' 
          : 'text-gray-300 hover:text-white hover:bg-gray-800'
      }`}
    >
      <Icon size={20} />
      {children}
    </Link>
  );
};

export default NavLink;