import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {FirestoreDB,FirestoreTimestamp} from './FirebaseApp';

const userCollection = FirestoreDB.collection('users');
class App extends Component {
  constructor()
  {
    super();
    this.state = {
      userArr:[],
      loading:false
    }
  }

  componentDidMount()
  {
    this.setState({loading:true});
    this.loadData();
  }

  loadData()
  {
    userCollection.orderBy("created_at", "asc").get()
      .then((querySnapshot)=>{
        let users = [];
        querySnapshot.forEach((doc)=>{
          users.push({
            key : doc.id,
            ...doc.data()
          });
        });
        this.setState({userArr:users,loading:false});
      })
      .catch((error)=>{
        console.log(error);
        this.setState({userArr:[],loading:false});
      });
  }

  showDetail(key)
  {
    userCollection.doc(key).get()
      .then((doc)=>{
        console.log(doc.data());
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  addUser()
  {
    this.setState({loading:true});
    userCollection.add({
      name:Math.random().toString(36).substring(7),
      address:Math.random().toString(36).substring(7),
      created_at:FirestoreTimestamp  
    })
    .then(()=>{
      this.loadData();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  render() {
    const mapped_users = this.state.userArr.map(user =>
        <li key={user.key} className="App-li">
            <a href={user.name} onClick={(e)=>{e.preventDefault();this.showDetail(user.key)}}>
                {user.name}
            </a>
        </li>
    );    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
            this.state.loading?
                <p>Loading</p>
                :
                <ul>
                    {mapped_users}
                </ul>
        }
        <button onClick={()=>this.addUser()}>
          Add User
        </button>
      </div>
    );
  }
}

export default App;
