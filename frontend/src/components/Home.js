import React from 'react';
// import { useNavigate } from 'react-router-dom';


function Home() {
  // const isFamilySignupEnabled = false;
  // const navigate = useNavigate()

  // const handleFamilySignupClick = () => {
  //   if (isFamilySignupEnabled) {
  //     navigate('/familysignup')
  //   }
  // }

  return (
    <div className="container">
      <header>
        <h1>Warranty Track Share</h1>
      </header>

      <nav>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/familysignup">Signup</a></li>
          <li><a href="/familysearch">Search</a></li>
          {/* <li>
            <a 
              href="/familysignup" 
              onClick={handleFamilySignupClick}
              style={{ pointerEvents: isFamilySignupEnabled ? 'auto' : 'none', color: isFamilySignupEnabled ? 'inherit' : 'gray' }}>Family Signup</a>
          </li> */}
        </ul>
      </nav>

    </div>
  );
}

export default Home;
