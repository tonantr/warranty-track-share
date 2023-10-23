import React from 'react';


function Home() {
  return (
    <div className="home">
      <header>
        <h1>WTS App</h1>
      </header>

      <nav>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li>
        </ul>
      </nav>

    </div>
  );
}

export default Home;
