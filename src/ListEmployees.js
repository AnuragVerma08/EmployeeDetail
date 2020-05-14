import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import CreateEmployee from './CreateEmployee';
import './ListEmployees.css';

class ListEmployees extends Component {

    state = {
        query: '',
    }

    updateQuery = (query) => {
        this.setState({
            query: query,
        })
    }

    clearQuery = () => {
        this.updateQuery('');
    }

    updatePath(path) {
        this.props.history.push(path);
    }

    render() {
        const { employees } = this.props;
        const { query } = this.state;
        let EmployeeArray = {}

        const showEmployees = query === '' ? employees : employees.filter((emp) => (
            emp.employee_name.toLowerCase().includes(query.toLowerCase())
        ))

        if (showEmployees !== undefined){
        EmployeeArray = showEmployees.map((employee, i) => {
            return (
                <tr key={i}>
                    <td>{employee.employee_name}</td>
                    <td>{employee.employee_salary}</td>
                    <td>{employee.employee_age}</td>
                    <td>
                        <button className="employee-update" onClick={() => this.updatePath('/create')}/>
                    </td>
                    <td>
                        <button className="employee-remove"
                            onClick={() => this.props.removeEmp(employee)}>Remove</button>
                    </td>
                </tr>
            )
        })}

        return (
            <div className="list-employees">
                <div className="list-employees-top">
                    <input className="search-employees" type="text" placeholder="Search employees" value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                    <Link to='/create' className="add-employee">
                        Create Employee
                    </Link>
                </div>
                {this.props.employees !== undefined ?
                    <div className="employee-list">
                        {showEmployees.length !== employees.length && (
                            <div className="showing-employees">
                                <span>Now Showing {showEmployees.length} of {employees.length}</span>
                                <button onClick={this.clearQuery}>Show all</button>
                            </div>
                        )}
                        <table id="employeelist" align="center">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Salary</th>
                                    <th>Age</th>
                                    <th>Update</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {EmployeeArray}
                            </tbody>
                        </table>
                    </div> : ''}
            </div>
        )
    }
}

export default withRouter(ListEmployees);