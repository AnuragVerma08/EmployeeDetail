import React, { Component } from 'react';
import ListEmployees from './ListEmployees';
import * as EmployeesApi from './utils/EmployeeAPI';
import CreateEmployee from './CreateEmployee';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    employees: [],
    APIemployees: [],
  }

  componentDidMount() {
    EmployeesApi.getAllEmployees().then((APIemployees) => {
      this.setState({
        APIemployees: APIemployees['data']
      })
    })
  }

  removeEmp = (employee) => {
    this.setState((currentState) => ({
      APIemployees: currentState.APIemployees.filter((emp) => {
        return emp.id !== employee.id
      })
    }))
    EmployeesApi.removeEmployee(employee);
  }

  createEmp = (employee) => {
    EmployeesApi.createEmployee(employee).then((employee) => {
      this.setState((currentState) => ({
        employees: currentState.employees.concat([employee])
      }))
    })
  }

  render() {
    const { APIemployees } = this.state;
    return (
      <div>
        <div className="header">
          <p>Employee Data</p>
        </div>
        <Route exact path='/' render={() => (
          <ListEmployees removeEmp={this.removeEmp} employees={APIemployees} />
        )} />
        <Route path='/create' render={({ history }) => (
          <CreateEmployee createEmp={(emp) => {
            this.createEmp(emp)
            history.push('/')
          }} />
        )} />
      </div>
    );
  }
}

export default App;