import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../pages/services/firebase';


function Header() {
  return (
    <header>
  
<nav class="navbar navbar-expand-lg navbar-expand-sm fixed-top navbar-dark bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav me-auto">
        <li class="nav-item active">
        <Link className="nav-item nav-link mr-3" to="/">Home</Link>
        </li>
      </ul>
      
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/manageProviders">Manage Providers</Link>
              <Link className="nav-item nav-link mr-3" to="/manageServices">Manage Services</Link>
              <Link className="nav-item nav-link mr-3" to="/manageClients">Manage Clients</Link>
              <button className="btn btn-secondary my-2 my-sm-0 mr-3 justify-content-end" onClick={() => auth().signOut()}>Logout</button>
              
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/login">Sign In</Link>
              <Link className="nav-item nav-link mr-3" to="/signup">Sign Up</Link>
            </div>}
        </div>
        
     
    </div>
  </div>
</nav>


    </header>
  );
}

export default Header;