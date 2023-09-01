import logo_gold from "../assets/LogoGold.png";
import logo_black from "../assets/LogoBlack.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import Button from "./Button";

const Header = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollPos, setScrollPos] = useState(null);

    // hamburger menu when mobile width
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Change header when scrolled
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) { 
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to sections
    const handleHome = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            let marginTop = parseInt(getComputedStyle(section).marginTop, 10);
            let scrollPos = section.offsetTop - marginTop;
            window.scrollTo({top: scrollPos, behavior: 'smooth'});
        };
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        console.log("click")
    };

    const showHamburger = windowWidth <= 1010;

    return (
        <div className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="header-left">
                <div className="header-logo">
                    <img src={scrolled ? logo_black : logo_gold} alt="header_logo" />
                </div>
                <div className="header-links">
                    <span onClick={handleHome}>Home</span>
                    <span>Programs</span>
                    <span>Testimonials</span>
                    <span>Contact Us</span>
                </div>
            </div>
            {!showHamburger && 
                <div className="reservation">
                    <a href="https://projectmovementstudio.square.site/" target="_blank">BOOK NOW</a>
                </div>
            }
            {showHamburger && 
                <IconContext.Provider value={{className: "header-hamburger"}}>
                    <div onClick={toggleMobileMenu}><AiOutlineMenu /></div>
                </IconContext.Provider>
            }
            <div id="mobile-menu" className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <IconContext.Provider value={{className: "mobile-close"}}>
                    <div onClick={toggleMobileMenu}>
                        <AiOutlineClose />
                    </div>
                </IconContext.Provider>
                <div>
                    <span className="mobile-span">Home</span>
                    <span className="mobile-span">Programs</span>
                    <span className="mobile-span">Testimonials</span>
                    <span className="mobile-span">Contact Us</span>
                </div>
            </div>
      </div>
    );
};

export default Header;