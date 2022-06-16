import {useContext,useState, useEffect} from "react";
import './Css.css';
import { TransactionContext  } from "../context/TransactionContext";

const Navbar = () =>{
  const {connectWallet, account} = useContext(TransactionContext);
  const [reload, setReload] = useState(false);

  useEffect(()=>{
    setReload(false);
  },[reload])

    return (
        <>
    <nav className="navbar">
     <div className="logo">Krypto</div>
     <ul className="nav-links">
      
       <input type="checkbox" id="checkbox_toggle" />
       <label for="checkbox_toggle" className="hamburger">&#9776;</label>
       
       <div className="menu">
         <li><a href="/">Market</a></li>
         <li><a href="/">Exchange</a></li>
         <li><a href="/">Tutorials</a></li>
         <li><a href="/">Wallets</a></li>
         {!account && <button className='btn btn-wallet' onClick={connectWallet}>Connect</button>
         
         }
       </div>
     </ul>
   </nav>
        </>
    );
}

export default Navbar;