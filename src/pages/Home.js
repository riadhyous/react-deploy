import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Header></Header>
        <br/>
        <br/>
        <br/>
        <br/>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Welcome to administrator account</h1>
              <p className="lead">You can manage Provider,Service and client.</p>
              <div className="mt-4">
                <Link className="btn btn-primary px-5 mr-3" to="/manageProviders">Manage Providers</Link>
                <Link className="btn btn-primary px-5 mr-3" to="/manageServices">Manage Services</Link>
                <Link className="btn btn-primary px-5 mr-3" to="/manageServices">Manage Clients</Link>
                < br></ br>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}
