import './App.css';
import Navbar from "./Components/Navbar.js";
import Loader from "./Components/Loader";
import Footer from "./Components/Footer";
import Services from "./Components/Services";
import Transaction from "./Components/Transaction";
import Welcome from "./Components/Welcome";

function App() {
  return (
    <div className="app">
      <div className='gradient-bg-welcome'>
        <Navbar />
      </div>
      <Welcome />
      <Services />
      <Transaction />
      <Footer />
    </div>
  );
}

export default App;
