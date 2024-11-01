import logoWhite from './../../assets/images/logoWhite.png';
import logo from './../../assets/images/logo.png';
import homeIcon from './../../assets/images/home.svg';
import policyIcon from './../../assets/images/policy.svg';
import termsConditions from './../../assets/images/terms-and-conditions-icon.svg';
import menuOpen from './../../assets/images/menu-open.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerVisibleAtom } from '../recoil/atoms/headerVisible';
import { useRef, useEffect } from 'react';
import { visibleStateAtom } from '../recoil/atoms/visibleAtom';

export function Header() {
  const [isVisible, setIsVisible] = useRecoilState(headerVisibleAtom);
  const visible = useRecoilValue(visibleStateAtom);
  console.log(visible);
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
      <div className={`logoBlock ${!visible ? 'relative' : 'fixed'}`}>
        <button
          className="navButton"
          type="button"
          onClick={clickButtonVisible}
          ref={buttonRef}
        >
          <img src={menuOpen} alt="menuOpen" />
        </button>
        <div>
          <img src={logo} alt="logo" width={75} />
        </div>
      </div>
      <header
        ref={headerRef}
        className={isVisible ? `mainNav` : `slideAnimeBefore`}
      >
        <nav>
          <ul>
            <li className="mb-5">
              <img src={logoWhite} alt="logoOnly" />
            </li>
            <li className="nav-list active">
              <a href="/">
                <img src={homeIcon} alt="home" />
              </a>
            </li>
            <li className="nav-list">
              <a href="/privacy-policy">
                <img src={policyIcon} alt="policy" />
              </a>
            </li>
            <li className="nav-list">
              <a href="/terms-and-conditions">
                <img
                  src={termsConditions}
                  alt="terms-and-conditions"
                  width={17}
                />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
