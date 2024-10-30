import logoWhite from './../../assets/images/logoWhite.png';
import homeIcon from './../../assets/images/home.svg';
import personIcon from './../../assets/images/person.svg';
import menuOpen from './../../assets/images/menu-open.svg';
import { useRecoilState } from 'recoil';
import { headerVisibleAtom } from '../recoil/atoms/headerVisible';
import { useRef, useEffect } from 'react';

export function Header() {
  const [isVisible, setIsVisible] = useRecoilState(headerVisibleAtom);
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref for the button
  const headerRef = useRef<HTMLElement>(null); // Ref for the header

  const clickButtonVisible = (): void => {
    setIsVisible(!isVisible); // Toggle visibility on button click
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // Check if click is outside both button and header
      if (
        buttonRef.current &&
        headerRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(true); // Set visible when clicking outside the button and header
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [setIsVisible]);

  return (
    <>
      <button
        className="navButton"
        type="button"
        onClick={clickButtonVisible}
        ref={buttonRef}
      >
        <img src={menuOpen} alt="menuOpen" />
      </button>

      <header
        ref={headerRef}
        className={isVisible ? `mainNav` : `slideAnimeBefore`}
      >
        <nav>
          <ul>
            <li className="mb-5">
              <a href="/">
                <img src={logoWhite} alt="logoOnly" />
              </a>
            </li>
            <li className="nav-list active">
              <a href="/">
                <img src={homeIcon} alt="home" />
              </a>
            </li>
            <li className="nav-list">
              <a href="/">
                <img src={personIcon} alt="person" />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
