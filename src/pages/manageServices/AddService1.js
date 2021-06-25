import React, { Component } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class addService extends Component {

      constructor(props) {
        super(props);
        this.state = {
          user: auth().currentUser,
          chats: [],
          service: '',
          readError: null,
          writeError: null,
          loadingChats: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
      }
    
      async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        
      }
    
      handleChange(event) {
        this.setState({
          service: event.target.value,
        });
      }
    
      handleChange1(event) {
        this.setState({
          content1: event.target.value,
        });
      }
      handleChange2(event) {
        this.setState({
          content2: event.target.value,
        });
      }
      handleChange3(event) {
        this.setState({
          content3: event.target.value,
        });
      }
      handleChange4(event) {
        this.setState({
          content4: event.target.value,
        });
      }
      /*async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef;
        console.log(chatArea);
        let myMap = new Map();
        myMap.set("name", "value associated with 'a string'")
        myMap.set("email", "value associated with keyObj")
        myMap.set("phone", "value associated with keyFunz")
        myMap.set("ServiceType", "value associated with keyFunc")
        myMap.set("ServiceDescription", "value associated with keyFunc")
        try {
          await db.ref("chatsxcwc").child(this.state.user.uid).push("dsfsfsdfs");
          this.setState({ content: '',content1: '',content2: '',content3: '',content4: '', });
          chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }*/
      async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef;
        console.log(chatArea);
        try {
            await db.ref("ServicesType").add({
              services: this.state.service,
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
        return (
          <div>
   <Header />
   <br/>
   <br/>
   <br/>
   <br/>
    <div class="card m-5">
      <div class="card-header">
      Add new Service :
      </div>
      <div class="card-body">
        
              
    <form onSubmit={this.handleSubmit} className="mx-3">
    <div class="form-group">
        <label for="inputFullName">Enter Service Type : </label>
        <input type="text" class="form-control" id="inputFullName" placeholder="Service Type" name="content" onChange={this.handleChange} value={this.state.service         }/>
      </div>
 
      {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
      <button type="submit" class="btn btn-primary">Add</button>
    </form>
 
    </div>
    </div>
    <Footer/>
    </div>
    );
  }
}
