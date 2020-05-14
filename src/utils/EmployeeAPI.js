const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://dummy.restapiexample.com/api/v1'

let token = localStorage.token

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAllEmployees = () =>
    fetch(`${api}/employees`, { headers })
        .then(res =>  res.json())
        .then(data => data);

export const getEmployee = (employee) =>
    fetch(`${api}/employee/${employee.id}`, { headers })
        .then(res => res.json())
        .then(data => data)

export const removeEmployee = (employee) =>
    fetch(`${api}/delete/${employee.id}`, { method: 'DELETE', headers })
        .then(res => res.json())
        .then(data => console.log(data));

export const createEmployee = (body) =>
    fetch(`${api}/create`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json());

export const updateEmployee = (employee, body) =>
    fetch(`${api}/update/${employee.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(data => console.log(data));