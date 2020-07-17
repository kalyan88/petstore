import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments'
import SearchAppointments from './SearchAppointments'
import { without } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {  
                    orderBy: 'petName',
                    orderDir: 'asc',
                    myAppointments: [],      
                    lastIndex: 0,
                    formDisplay: false
                  };
    this.deleteAppoitnment = this.deleteAppoitnment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
  }

  deleteAppoitnment(apt) {
    let tempApt = this.state.myAppointments;
    tempApt = without(tempApt, apt)
    this.setState(
        {
          myAppointments: tempApt
        }
    )
  }

  toggleForm() {
    this.setState(
      {
        formDisplay:!this.state.formDisplay
      }
    )
  }

  addAppointment(apt) { 
    let tempApt = this.state.myAppointments;
    apt.aptId= this.state.lastIndex;
    tempApt.unshift(apt);
    this.setState(
      {
        myAppointments:tempApt,
        lastIndex: this.state.lastIndex+1
      }
    )

  }
  changeOrder(order, dir) {
    this.setState(
      {
        orderBy:order,
        orderDir: dir
      })
  }

  componentDidMount() {
    fetch('./data.json')
           .then(response =>response.json())
           .then(result => {
               const appointments = result.map(item => {
                   item.aptId = this.state.lastIndex;
                   this.setState({lastIndex: this.state.lastIndex+1})
                   return item;
                 })
                 this.setState({
                   myAppointments: appointments
                 });
           });
  }
  render() {
    let order;
    let filteredApts = this.state.myAppointments;
     if(this.state.orderDir === 'asc') {
       order =1; // to show Ascending order
     } else {
       order = -1;// to show decending order
     }
     filteredApts.sort((a,b) => {
       if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()){
                 return -1* order;
               } else{  return 1* order }
     })

    return (
      <div className="App">
        <main className="page bg-white" id="petratings">
         <div className="container">
           <div className="row">
             <div className="col-md-12 bg-white">
               <div className="container">
                 <AddAppointments formDisplay={this.state.formDisplay}
                                  toggleForm={this.toggleForm}
                                  addAppointment={this.addAppointment}
                                    />
                 <ListAppointments appointments={filteredApts}
                                   deleteAppoitnment= {this.deleteAppoitnment}
                                   />
                 <SearchAppointments changeOrder={this.changeOrder}
                                      orderBy={this.state.orderBy}
                                      orderDir={this.state.orderDir}/>
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
