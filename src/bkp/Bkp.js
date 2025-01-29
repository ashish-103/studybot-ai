import "./App.css";
import logo from "./images/logo.png";
import bannerImage from "./images/banner.gif";
import oneimage from "./images/1.jpg";
import email from "./images/envelope.png";
import phone from "./images/phone-call.png";
import location from "./images/location.png";
import footerLogo from "./images/footer-logo.png";
import Slider from './Slider';


function App() {
  return (
    <div className="App">
      <header>
       <a href="index.html"><img src={logo} alt="Logo"/> StoneLab Solution</a>
      </header>
      <section className="banner">
        <div className="container">
          <div className="banner-inner">
            <div className="banner-left">
              <h1 className="banner-title">
                Welcome to the <span>Era of the New World</span>
              </h1>
            </div>
            <div className="banner-right">
              <img src={bannerImage} alt="Banner Image" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-us">
        <div className="container">
          <h2 className="about-title">
            Evaluate Your Exam Prepration with Our AI Analysis Tool
          </h2>
          <h3 className="about-sub-title">
            Unlock the Power of AI for Subjective Anowek
          </h3>
        </div>
      </section>

      <section className="icon-section">
        <div className="container">
          <div className="icon-box-wrapper">
            <div className="icon-box">
              <div className="icon">
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 1024 1024"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M511.8 154.1L916 277v45.7H108V277l403.8-122.9m0-46L64 244.4v122.3h896V244.4L511.8 108.1zM113 831.4h798v16H113z"
                    fill="#39393A"
                  />
                  <path d="M113 391.1h798v16H113z" fill="#E73B37" />
                  <path
                    d="M64.3 871.8h895.3v44H64.3zM204.2 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM414.7 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM625.2 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM835.8 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44z"
                    fill="#39393A"
                  />
                </svg>
              </div>
              <h4 className="icon-title">Title</h4>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </p>
            </div>

            <div className="icon-box">
              <div className="icon">
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 1024 1024"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M511.8 154.1L916 277v45.7H108V277l403.8-122.9m0-46L64 244.4v122.3h896V244.4L511.8 108.1zM113 831.4h798v16H113z"
                    fill="#39393A"
                  />
                  <path d="M113 391.1h798v16H113z" fill="#E73B37" />
                  <path
                    d="M64.3 871.8h895.3v44H64.3zM204.2 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM414.7 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM625.2 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM835.8 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44z"
                    fill="#39393A"
                  />
                </svg>
              </div>
              <h4 className="icon-title">Title</h4>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </p>
            </div>

            <div className="icon-box">
              <div className="icon">
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 1024 1024"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M511.8 154.1L916 277v45.7H108V277l403.8-122.9m0-46L64 244.4v122.3h896V244.4L511.8 108.1zM113 831.4h798v16H113z"
                    fill="#39393A"
                  />
                  <path d="M113 391.1h798v16H113z" fill="#E73B37" />
                  <path
                    d="M64.3 871.8h895.3v44H64.3zM204.2 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM414.7 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM625.2 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM835.8 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44z"
                    fill="#39393A"
                  />
                </svg>
              </div>
              <h4 className="icon-title">Title</h4>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="motivation-title">
            Some AI Related Motivational Quotes
          </h2>
        </div>
      </section>

      <section className="step">
        <div className="container">
          <h3 className="step-title">Our Process</h3>
          <div className="step-wrapper">
            <div className="step-box">
              <h2 className="step-box-title">1</h2>
              <h3 className="step-sub-title">Apply</h3>
              <p className="step-content">
                the more obscure Latin words, consectetur, from a Lorem Ipsum
                passage, and going through the cites of the word in classical
                literature, discovered the 
              </p>
            </div>

            <div className="step-box">
              <h2 className="step-box-title">2</h2>
              <h3 className="step-sub-title">Review</h3>
              <p className="step-content">
                the more obscure Latin words, consectetur, from a Lorem Ipsum
                passage, and going through the cites of the word in classical
                literature, discovered the
              </p>
            </div>

            <div className="step-box">
              <h2 className="step-box-title">3</h2>
              <h3 className="step-sub-title">Interview</h3>
              <p className="step-content">
                the more obscure Latin words, consectetur, from a Lorem Ipsum
                passage, and going through the cites of the word in classical
                literature, discovered the 
              </p>
            </div>

            <div className="step-box">
              <h2 className="step-box-title">4</h2>
              <h3 className="step-sub-title">Personal Interview</h3>
              <p className="step-content">
               the more obscure Latin words, consectetur, from a Lorem Ipsum
                passage, and going through the cites of the word in classical
                literature, discovered the 
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="happy-clinet">
        <h2 className="client-title">Our Happy Client</h2>
        <div className="container">
          <Slider />
        </div>
      </section>

      <section className="desc">
        <div className="desc-left">
          <img src={oneimage} alt="Left Image" />
          <p>
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. 
          </p>
        </div>
        <div className="desc-right">
          <ul>
            <li>
              <h2>Heading 1</h2>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, 
              </p>
            </li>
            <li>
              <h2>Heading 2</h2>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, 
              </p>
            </li>
            <li>
              <h2>Heading 3</h2>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, 
              </p>
            </li>
          </ul>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-wrapper">
            <div className="footer-block">
              <h3 className="footer-title">Reach Us</h3>
              <ul>
                <li>
                  <span>
                    <img src={email} />
                  </span>
                  <span>
                    <a href="mailto:info@yourname.com">info@yourname.com</a>
                  </span>
                </li>

                <li>
                  <span>
                    <img src={phone} />
                  </span>
                  <span>
                    <a href="tel:1234567890">1234567890</a>
                  </span>
                </li>

                <li>
                  <span>
                    <img src={location} />
                  </span>
                  <span>125, Capoital Town, Crawel Street,Res cross Road</span>
                </li>
              </ul>
            </div>
            <div className="footer-block">
              <h3 className="footer-title">Quick Links</h3>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Terms & Condition</a>
                </li>
              </ul>
            </div>
            <div className="footer-block">
               <a href="index.html"><img src={footerLogo} alt="Logo"/> </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; All Right Reserve By <a href="#">Yourwebsite</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
