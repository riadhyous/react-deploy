import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export default class ManageServices extends Component {
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
              <h1 className="display-4">Manage Services</h1>
              <p className="lead">You can add,update and remove service.</p>
              <div className="mt-4">
                <Link className="btn btn-primary px-5 mr-3 col-md-3 " to="/addService">Add Service</Link>
                <Link className="btn btn-danger px-5 mr-3 col-md-3 " to="/signup">Remove Service</Link>
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
