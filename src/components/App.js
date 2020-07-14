import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments'
import SearchAppointments from './SearchAppointments'

class App extends Component {
  constructor() {
    super();
    this.state = {
      name : 'Nikhil',
      myAppointments: []
    }
  }

  componentDidMount() {
    fetch('./data.json')
           .then(response =>response.json())
           .then(result => {
               const appointments = result.map(item => {
                   return item;
                 })
                 this.setState({
                   myAppointments: appointments
                 });
           });
  }

  render() {
    return (
      <div className="App">
        <main className="page bg-white" id="petratings">
         <div className="container">
           <div className="row">
             <div className="col-md-12 bg-white">
               <div className="container">
                 {this.state.name}
                 <AddAppointments />
                 <ListAppointments />
                 <SearchAppointments />
               </div>
             </div>
           </div>
         </div>
       </main>
      </div>
    );
  }
}
  

export default App;
