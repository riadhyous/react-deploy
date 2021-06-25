import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export default class ManageProviders extends Component {
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
              <h1 className="display-4">Manage Providers</h1>
              <p className="lead">You can add,update and remove provider.</p>
              <div className="mt-4">
                <Link className="btn btn-primary px-5 mr-3 col-md-3" to="/addProvider">Add Provider</Link>
                <Link className="btn btn-success px-5 mr-3 col-md-4" to="/updateProvider">Update or Remove Provider</Link>
                
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
