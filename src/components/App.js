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

    const appointments = this.state.myAppointments.map(
      apt => (
        <div key={apt.aptDate}>
            <div><b>{apt.petName}</b></div>
            <div><b>{apt.ownerName}</b></div>
            <div>{apt.aptNotes}</div>
            <div>{apt.aptDate}</div>
        </div>
      )
    )


    return (
      <div className="App">
        <main className="page bg-white" id="petratings">
         <div className="container">
           <div className="row">
             <div className="col-md-12 bg-white">
               <div className="container">
                  {appointments}
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
