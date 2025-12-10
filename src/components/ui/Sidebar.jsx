// 'use client'

// import Link from 'next/link';
// import Image from 'next/image';
// import NavLink from './NavLink';
// import logo from "@images/vflux-logoo.png";
// import { 
//   AiOutlineHome, 
//   AiOutlineTeam, 
//   AiOutlineCreditCard, 
//   AiOutlineWallet, 
//   AiOutlineHistory, 
//   AiOutlineSetting, 
//   AiOutlineKey, 
//   AiOutlineLogout, 
//   AiOutlineCustomerService
// } from 'react-icons/ai';

// const Sidebar = ({ isOpen = true }) => {
//   const menuItems = [
//     { icon: AiOutlineWallet, label: "Analytics", href: "/analytics" },
//     { icon: AiOutlineHome, label: "Overview", href: "/overview" },
//     { icon: AiOutlineTeam, label: "Manage Staff", href: "/manage-staff" },
//     { icon: AiOutlineCreditCard, label: "Payment", href: "/payment" },
//     { icon: AiOutlineWallet, label: "Fund Wallet", href: "/fund-wallet" },
//     { icon: AiOutlineHistory, label: "Transaction History", href: "/transaction-history" },
//     { icon: AiOutlineSetting, label: "Privacy and Setting", href: "/privacy-settings" },
//     { icon: AiOutlineKey, label: "Change Password", href: "/change-password" },
//     { icon: AiOutlineLogout, label: "Logout", href: "/login" },
//   ];

//   return (
//     <div className={`${isOpen ? 'w-64' : 'w-0'} bg-black text-white h-screen flex flex-col transition-all duration-300 overflow-hidden fixed z-50`}>
//       {/* Logo */}
//       <Link href="/" className="p-6 flex items-center cursor-pointer">
//         <Image 
//           src={logo} 
//           alt="Virtual Flux Logo"
//           width={150}      
//           height={40}
//           priority
//         />
//       </Link>

//       {/* Menu Items */}
//       <nav className="flex-1 px-4">
//         {menuItems.map((item, index) => (
//           <div key={index} className="mb-1">
//             <NavLink href={item.href} icon={item.icon}>
//               {item.label}
//             </NavLink>
//           </div>
//         ))}
//       </nav>

//       {/* Customer Support */}
//       <div className="p-4">
//         <div className="border border-gray-600 rounded-lg">
//           <NavLink href="/support" icon={AiOutlineCustomerService}>
//             Customer support
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

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
import { useDispatch } from 'react-redux'
import { logout } from '@/state/slices/user.slice';
import { useRouter } from 'next/navigation'

const Sidebar = ({ isOpen = true, onChangePasswordClick }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user")
    dispatch(logout());
    router.push('/login');
  };

  const menuItems = [
    { icon: AiOutlineWallet, label: "Analytics", href: "/analytics" },
    { icon: AiOutlineHome, label: "Overview", href: "/overview" },
    { icon: AiOutlineTeam, label: "Manage Staff", href: "/manage-staff" },
    { icon: AiOutlineCreditCard, label: "Payment", href: "/payment" },
    { icon: AiOutlineWallet, label: "Fund Wallet", href: "/fund-wallet" },
    { icon: AiOutlineHistory, label: "Transaction History", href: "/transaction-history" },
    { icon: AiOutlineSetting, label: "Privacy and Setting", href: "/privacy-settings" },
    { icon: AiOutlineKey, label: "Change Password", onClick: onChangePasswordClick, isModal: true },
    { icon: AiOutlineLogout, label: "Logout", onClick: handleLogout, isLogout: true }
  ];

  return (
    <div className={`fixed left-0 top-0 h-screen bg-black text-white z-50 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-0 md:w-20'
    }`}>
      {/* Logo */}
      <div className="p-4">
        {isOpen && <Image src={logo} alt="Virtual Flux Logo" width={150} height={40} />}
      </div>

      {/* Menu Items */}
      <nav className="mt-8">
      {menuItems.map((item, index) => {
        if (item.isModal) {
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <item.icon className="text-xl" />
              {isOpen && <span className="ml-4">{item.label}</span>}
            </button>
          );
        }

        if (item.isLogout) {
          return (
            <button
              key={index}
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <item.icon className="text-xl" />
              {isOpen && <span className="ml-4">{item.label}</span>}
            </button>
          );
        }
        return (
          <NavLink key={index} href={item.href} icon={item.icon}>
            {isOpen && <span className="ml-4">{item.label}</span>}
          </NavLink>
        );
      })}

      </nav>

      {/* Customer Support */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors rounded-lg">
          <AiOutlineCustomerService className="text-xl" />
          {isOpen && <span className="ml-4">Customer support</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
