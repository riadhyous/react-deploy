import React, { Component } from "react";
import Header from "../../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import { Redirect } from "react-router-dom";
import { signup } from "../../helpers/auth";

export default class AddProvider extends Component {

      constructor(props) {
        super(props);
        this.state = {
          user: '',
          chats: [],
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            ServiceType: '',
            ServiceDescription: '',
          readError: null,
          writeError: null,
          loadingChats: false,
            redirect: null 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleChange6 = this.handleChange6.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
      }
    
      async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        const chatArea = this.myRef;
        try {
          db.ref("Services").on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            chats.sort(function (a, b) { return a.timestamp - b.timestamp })
            this.setState({ chats });
            console.log(chats)
            //chatArea.scrollBy(0, chatArea.scrollHeight);
            this.setState({ loadingChats: false });
          });
        } catch (error) {
          this.setState({ readError: error.message, loadingChats: false });
        }
      }
      
    
      handleChange(event) {
        this.setState({
          name: event.target.value,
        });
      }
    
      handleChange1(event) {
        this.setState({
          email: event.target.value,
        });
      }
      handleChange2(event) {
        this.setState({
          phone: event.target.value,
        });
      }
      handleChange3(event) {
        this.setState({
          ServiceType: event.target.value,
        });
      }
      handleChange4(event) {
        this.setState({
          ServiceDescription: event.target.value,
        });
      }
      handleChange5(event) {
        this.setState({
          password: event.target.value,
        });
      }
      handleChange6(event) {
        this.setState({
          address: event.target.value,
        });
      }
      async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef;
        console.log(chatArea);
        try {
            const userId = await signup(this.state.email, this.state.password);
            console.log("bbbbbbbbbbbb"+userId.uid)
            this.setState({  user : userId});
            console.log("aaaaaaaaaaaaaa"+this.state.user.uid)
            await db.ref("Users").child("Providers").child(userId.uid).set({
              name: this.state.name,
              email: this.state.email,
              phone: this.state.phone,
              address: this.state.address,
              ServiceType: this.state.ServiceType,
              ServiceDescription: this.state.ServiceDescription,
              timestamp: Date.now(),
              uid: this.state.user.uid
            });
          this.setState({  name:'',email: '',  phone: '',ServiceType: '',ServiceDescription: '', });
          this.setState({ redirect: "/" });
          chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }
      async handleSubmit1(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
          await db.ref("chats").child(this.state.id).remove();
         
          chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }
      formatTime(timestamp) {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return time;
      }
    
      render() {
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />;
        }
        return (
          <div>
            <br/>
            <br/>
            <br/>
            <br/>
   <Header />
    <div class="card m-5">
      <div class="card-header">
      Add new Provider:
      </div>
      <div class="card-body">
        
              
    <form onSubmit={this.handleSubmit} className="mx-3">
    <div class="form-group">
        <label for="inputFullName">Full Name</label>
        <input type="text" class="form-control" id="inputFullName" placeholder="Full Name" name="content" onChange={this.handleChange} value={this.state.content}/>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Email</label>
          <input type="email" class="form-control" id="inputEmail4" placeholder="Email" name="content1" onChange={this.handleChange1} value={this.state.content1}/>
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Password</label>
          <input type="password" class="form-control" id="inputPassword4" placeholder="Password" name="content5" onChange={this.handleChange5} value={this.state.content5}/>
        </div>
      </div>
      <div class="form-group">
        <label for="inputAddress">Address</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="Address" name="content6" onChange={this.handleChange6} value={this.state.content6}/>
      </div>
      
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputPhoneNumber">Phone Number</label>
          <input type="text" class="form-control" id="inputPhoneNumber" name="content2" onChange={this.handleChange2} value={this.state.content2}/>
        </div>
        <div class="form-group col-md-4">
          <label for="inputServiceType">Service Type</label>
          <select id="inputServiceType" class="form-control" onChange={this.handleChange3} value={this.state.content3}>
            <option selected>Choose...</option>
            {this.state.chats.map(chat => {
            return <option key={chat.key} >{chat.service}</option>
          })}
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="inputDescription">Description</label>
          <textarea type="text" class="form-control" id="inputDescription" onChange={this.handleChange4} value={this.state.content4}/>
        </div>
      </div>
      {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
      <button type="submit" class="btn btn-primary">Add</button>
    </form>
    
    
    </div>
   
    </div>
    <div className="py-3 mx-5">
      Login in as: <strong className="text-info">admin</strong>
    </div>
    </div>
    );
  }
}
