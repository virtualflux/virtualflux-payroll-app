'use client'

import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';
import logo from "@images/vflux-logoo.png";
import { 
  AiOutlineHome, 
  AiOutlineTeam, 
  AiOutlineCreditCard, 
  AiOutlineWallet, 
  AiOutlineHistory, 
  AiOutlineSetting, 
  AiOutlineKey, 
  AiOutlineLogout, 
  AiOutlineCustomerService
} from 'react-icons/ai';

const Sidebar = ({ isOpen = true }) => {
  const menuItems = [
    { icon: AiOutlineHome, label: "Overview", href: "/overview" },
    { icon: AiOutlineTeam, label: "Manage Staff", href: "/manage-staff" },
    { icon: AiOutlineCreditCard, label: "Payment", href: "/payment" },
    { icon: AiOutlineWallet, label: "Fund Wallet", href: "/fund-wallet" },
    { icon: AiOutlineWallet, label: "Analytics", href: "/analytics" },
    { icon: AiOutlineHistory, label: "Transaction History", href: "/transaction-history" },
    { icon: AiOutlineSetting, label: "Privacy and Setting", href: "/privacy-settings" },
    { icon: AiOutlineKey, label: "Change Password", href: "/change-password" },
    { icon: AiOutlineLogout, label: "Logout", href: "/logout" },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} bg-black text-white h-screen flex flex-col transition-all duration-300 overflow-hidden fixed z-50`}>
      {/* Logo */}
      <Link href="/" className="p-6 flex items-center cursor-pointer">
        <Image 
          src={logo} 
          alt="Virtual Flux Logo"
          width={150}      
          height={40}
          priority
        />
      </Link>

      {/* Menu Items */}
      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-1">
            <NavLink href={item.href} icon={item.icon}>
              {item.label}
            </NavLink>
          </div>
        ))}
      </nav>

      {/* Customer Support */}
      <div className="p-4">
        <div className="border border-gray-600 rounded-lg">
          <NavLink href="/support" icon={AiOutlineCustomerService}>
            Customer support
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
