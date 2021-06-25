import React, { Component } from "react";
import Header from "../../components/Header";
import { auth } from "../services/firebase";
import Footer from "../../components/Footer";
import { db } from "../services/firebase";
import { Redirect } from "react-router-dom";
import { signup } from "../../helpers/auth";

export default class addService extends Component {

      constructor(props) {
        super(props);
        this.state = {
          user: '',
          chats: [],
          service: '',
          readError: null,
          writeError: null,
          loadingChats: false,
            redirect: null 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
      }
  
      async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        const chatArea = this.myRef.current;
        try {
          db.ref("Services").on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            chats.sort(function (a, b) { return a.timestamp - b.timestamp })
            this.setState({ chats });
            console.log(chats)
           // chatArea.scrollBy(0, chatArea.scrollHeight);
            this.setState({ loadingChats: false });
          });
        } catch (error) {
          this.setState({ readError: error.message, loadingChats: false });
        }
      }
      
      handleChange(event) {
        this.setState({
          service: event.target.value,
        });
      }
    
      async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef;
        console.log(chatArea);
        try {
            await db.ref("Services").push({
              service: this.state.service,
            });
          this.setState({service: ''});
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
          <Header />
          <br/>
          <br/>
          <br/>
          <div class="card m-5">
             <div class="card-header">
             List des Services :
             </div>
             <div class="card-body">
             {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}
          <ol>
          {this.state.chats.map(chat => {
            return <li key={chat.key} className={"chat-bubble"}>
              {chat.service}
              <br />
        
            </li>
          })}
          </ol> 

          </div>
          </div>

           <div class="card m-5">
             <div class="card-header">
             Add new Service :
             </div>
             <div class="card-body">
               
                     
           <form onSubmit={this.handleSubmit} className="mx-3">
           <div class="form-group">
               <label for="inputFullName">Enter Service Type : </label>
               <input type="text" class="form-control" id="inputFullName" placeholder="Service Type" name="content" onChange={this.handleChange} value={this.state.service}/>
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
