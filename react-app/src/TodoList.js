import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    let todo = {
      first_name: '',
      last_name: '',
      email: ''
    }
    navigate('/createtodo');
  };
  const [todos, setTodos] = useState([]);

  const handleEditTodo = (todo) => {
    console.log(todo);
    navigate('/createtodo', {state : todo});
  };
  
  const handleDeleteTodo = async (e) => {
    // e.preventDefault();
    console.log(e)

    try {
      const response = await fetch('http://127.0.0.1:8000/todo/todo_api', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(e)
      });
      if (response.ok) {
        window.location.reload()
        // fetchTodos();
        // navigate('/');
      } else {
        console.error('Error:', response.statusText);
        if(response.status == 401) {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/todo/todo_api', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
        });
        console.log(res);
        if(res.ok) {
          const data = await res.json();

          if (Array.isArray(data)) {
            setTodos(data);
          } else {
            console.error('Fetched data is not an array', data);
          }
        }
        else {
          if(res.status == 401) {
            navigate('/login');
          }
        }
        
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);
  
  const todoLogOut = async (e) => {
    // e.preventDefault();
    console.log(e)

    try {
      const response = await fetch('http://127.0.0.1:8000/user/logout');
      if (response.ok) {
        localStorage.clear()
        navigate('/login');
      } else {
        console.error('Error:', response.statusText);
        if(response.status == 401) {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const myFunction = () => {
    var input, filter, table, tr, td, i, j, txtValue, shouldDisplay;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        shouldDisplay = false;

        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    shouldDisplay = true;
                    break;
                }
            }
        }
        tr[i].style.display = shouldDisplay ? "" : "none";
    }
}

  
  return (
    <div className="card p-4 m-4">
      <h2>Todo List
        <button className="btn btn-primary rounded-circle p-2 lh-1 create-btn cursor-pointer btn-danger mx-1" title='Logout' onClick={todoLogOut}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
            <path d="M7.5 1v7h1V1z"/>
            <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
          </svg>
        </button>
        <button className="btn btn-primary rounded-circle p-2 lh-1 create-btn cursor-pointer" title='Create Todo' onClick={handleCreateClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>
        </button>
      </h2>
      <input type="text" id="myInput" className="form-control my-4" onKeyUp={() => myFunction()} placeholder="Search for names.." title="Type in a name"></input>
      <table className="table" id="myTable">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Notes</th>
            <th scope="col">Created on</th>
            <th scope="col" className='centered'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{todo.name}</td>
              <td>{todo.notes}</td>
              <td>{todo.dat_created}</td>
              <td className='centered'>
                <button className="btn btn-sm btn-primary mx-1" onClick={() => handleEditTodo(todo)} title='Edit Todo'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square cursor-pointer" viewBox="0 0 16 16">
                    {/* <title>Edit Todo</title> */}
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>
                </button>
                <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDeleteTodo(todo.id)} title='Delete Todo'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash cursor-pointer" viewBox="0 0 16 16">
                    {/* <title>Delete Todo</title> */}
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
