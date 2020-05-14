import React, { Component } from "react";
import { Link } from "react-router-dom";
import serializeForm from "form-serialize";
import './CreateEmployee.css'
class CreateEmployee extends Component {

    handleSubmit =(e) =>{
        e.preventDefault();
        const values =serializeForm(e.target, { hash: true });
        console.log(values);

        if (this.props.createEmp){
            this.props.createEmp(values);
        }

    }

    render(){
        return(
            <div>
                <Link to='/' className='close-create-employee'>Close</Link>
                <form onSubmit={this.handleSubmit} className='create-employee-form'>
                    <div className='create-employee-details'>
                        <input type='text' name='name' placeholder='Name' required/>
                        <input type='text' name='salary' placeholder='Salary' required/>
                        <input type='text' name='age' placeholder='Age' required/>
                        <input type='text' name='id' placeholder='Id' required/>
                        <button>Add Employee</button>
                    </div>
                </form>
            </div>
        )}

}

export default CreateEmployee;