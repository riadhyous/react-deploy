<Header />

        <div className="chat-area" ref={this.myRef}>
          {/* loading indicator */}
          {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}
          {/* chat area */}
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
              {chat.content}<br />
              {chat.content1}<br />
              {chat.content2}<br />
              {chat.content3}<br />
              {chat.content4}<br />
              <br />
              <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
            </p>
          })}
        </div>
        <form onSubmit={this.handleSubmit} className="mx-3">
          <label >First Name:</label>
          <input type="text" className="form-control" name="content" onChange={this.handleChange} value={this.state.content}></input>
          <label >Email:</label>
          <input type="email" className="form-control" name="content1" onChange={this.handleChange1} value={this.state.content1}></input>
          <label >Password:</label>
          <input type="password" className="form-control" name="content2" onChange={this.handleChange2} value={this.state.content2}></input>
          <label >Service:</label>
          <input type="text" className="form-control" name="content3" onChange={this.handleChange3} value={this.state.content3}></input>
          <label >Numero Telephone:</label>
          <input type="text" className="form-control" name="content4" onChange={this.handleChange4} value={this.state.content4}></input>
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
          <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
        </form>
        <div className="py-5 mx-3">
          Login in as: <strong className="text-info">{this.state.user.email}</strong>
        </div>