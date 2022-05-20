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
    <nav class="navbar">
     <div class="logo">Krypto</div>
     <ul class="nav-links">
      
       <input type="checkbox" id="checkbox_toggle" />
       <label for="checkbox_toggle" class="hamburger">&#9776;</label>
       
       <div class="menu">
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