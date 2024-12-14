import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

function Header() {
  const nav = useNavigate();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      nav('/login');
    } catch (error) {
      console.error("Error during sign-out:", error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleNavigation = (path) => {
    nav(path);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div 
          onClick={() => handleNavigation('/')} 
          className="brandName" 
          style={{ cursor: 'pointer' }}
        >
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" placeholder="Search for places" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span 
            onClick={() => {
              if (!user) {
                nav('/login');
              }
            }} 
            style={{ cursor: 'pointer' }}
          >
            {user ? `Welcome, ${user.displayName || 'User'}` : 'Login'}
          </span>
          <hr />
        </div>
        {user && (
          <span 
            onClick={handleLogout} 
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          >
            Logout
          </span>
        )}
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span 
              onClick={() => handleNavigation('/create')} 
              style={{ cursor: 'pointer' }}
            >
              SELL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
