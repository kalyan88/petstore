import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import { without, findIndex } from 'lodash';


class App extends Component {

    constructor() {
      super();
      this.state = {
        formDisplay: false,
        myAppointments:[],
        orderBy: 'petName',
        orderDir: 'asc',
        queryText: '',
        lastIndex: 0
      };
      this.deleteAppoitnment = this.deleteAppoitnment.bind(this);
      this.toggleForm = this.toggleForm.bind(this);
      this.addAppointment = this.addAppointment.bind(this);
      this.changeOrder = this.changeOrder.bind(this);
      this.searchApts = this.searchApts.bind(this);
      this.updateInfo=this.updateInfo.bind(this);
    }

    toggleForm() {
      this.setState({
        formDisplay: !this.state.formDisplay
      })
    }

    updateInfo(name, value, id) { 
      let tempApts = this.state.myAppointments;
      let aptIndex = findIndex(this.state.myAppointments,{
        aptId: id
      });
      tempApts[aptIndex][name] =value;
      this.setState({
        myAppointments: tempApts
      });
    }

    addAppointment(apt) {
      let tempApts = this.state.myAppointments;
      apt.aptId = this.state.lastIndex;
      tempApts.unshift(apt); //unshift is JS function will push item to an array and place beggining of the array
      this.setState({
        myAppointments: tempApts,
        lastIndex:this.state.lastIndex+1 //incrementing the index after adding item
      });
    }

    deleteAppoitnment(apt) {
      let tempApts = this.state.myAppointments;
      tempApts = without(tempApts, apt)

      this.setState({
        myAppointments: tempApts
      })
    }

    changeOrder(order, dir) {
      this.setState({
        orderBy:order,
        orderDir: dir
      })
    }

    searchApts(query) {
      this.setState({
        queryText: query
      });
    }

    componentDidMount() {
      
      fetch('./data.json')
            .then(response =>response.json())
            .then(result => {
                const appointments = result.map(item => {
                  item.aptId = this.state.lastIndex;
                  this.setState({lastIndex:  this.state.lastIndex+1}) //this will increment the lastIndex inside constructor()
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
      filteredApts = filteredApts.sort((a,b) => {
        if(a[this.state.orderBy].toLowerCase() <
                b[this.state.orderBy].toLowerCase()){
                  return -1* order;
                } else{
                  return 1* order
                }
      }).filter(eachItem => { 
        return(
          eachItem['petName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['ownerName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['aptNotes']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });
      return (
        <main className="page bg-white" id="petratings">
            <div className="container">
              <div className="row">
                <div className="col-md-12 bg-white">
                  <div className="container">
                    <AddAppointments 
                      formDisplay={this.state.formDisplay}
                      toggleForm={this.toggleForm}
                      addAppointment={this.addAppointment}/>
                    <SearchAppointments 
                      orderBy={this.state.orderBy}
                      orderDir={this.state.orderDir}
                      changeOrder={this.changeOrder}
                      searchApts={this.searchApts}
                      />
                    <ListAppointments 
                      appointments={filteredApts}
                      deleteAppoitnment={this.deleteAppoitnment}
                      updateInfo={this.updateInfo}/>
                  </div>
                </div>
              </div>
            </div>
          </main>
      );
    }
}

export default App;
