import logoOnly from './../assets/images/logoOnly.png';

export function App() {
  return (
    <div className="container mx-auto px-4 welcome-page">
      <img src={logoOnly} alt="Official Logo of Dojo" />
      <h1 className="heading text-4xl">
        Welcome to <span className="text-accent">DOJO</span>
      </h1>
      <p className="text-[18px] font-[400]">Your productivity partner.</p>
      <button className="btn welcome-btn">Let's Start</button>
      <p className="text-center">
        Created by <b>Harshil Khimasia - Freelance Web Developer&trade;</b>. For
        more information, visit our{' '}
        <a
          href="https://harshilkhimasia.com/"
          target="_blank"
          rel="noreferrer"
          className="highlighted-link"
        >
          official website
        </a>
        .
      </p>
    </div>
  );
}

export default App;
