import { useState, useEffect } from "react";
import white_logo from '../assets/white_logo.png'
import default_logo from '../assets/Logo.png'

const links= [
  {label:"Danh sách tour", href:"/", className : "links-tours"},
  {label:"Liên hệ", href:"/", className : "links-contact"},
];

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={scrolled ? 'navbar-scrolled' : 'navbar'}>
      <div className="navbar_logo" onClick={() => window.location = "/"}>
        <img src={scrolled ? default_logo : white_logo} className="logo-img" />
      </div>

      <div className="navbar_link">
        {links.map((item) => (
          <a key={item.label} className={`links ${item.className}`} href={item.href}>
            {item.label}
          </a>
        ))}


      </div>
      

      <div className="navbar_actions">
        <button className="btn-login">Đăng nhập</button>
        <button className="btn-register">Đăng ký</button>
      </div>
    </nav>
  )
}
export default Header