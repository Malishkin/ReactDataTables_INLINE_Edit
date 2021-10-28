import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


import axios from 'axios';

export const UsingDataTable3 = () => {
  // set the initial state
  const [isFirstRender, setIsFirstRender] = useState(true);
  // const [clearSelection, setClearSelection] = useState(false);
  const [rowInEditMode, setRowInEditMode] = useState(-1);

  const [user, setUser] = useState('');
  const [users, setUsers] = useState([
    {
      id: 0,
      Firstname: 'Avi2',
      Lastname: 'Raveh2',
      Phonenumber: '0548877789',
    },
    {
      id: 1,
      Firstname: 'Ron',
      Lastname: 'Gutmann',
      Phonenumber: '0507668991',
    },
  ]);


  useEffect(() => {
    async function fetchData() {
      try {
        console.log('UseEffect is called 3!');
        const response = await axios('http://localhost:8000/api/users');
        let updatedUsers = [];

        let newId = users[users.length - 1].id + 1;

        updatedUsers = [...users];

        let yossiData = response.data;

        if (yossiData) {
          yossiData.Data.id = newId;
          updatedUsers.push(yossiData.Data);
        }
        setUsers(updatedUsers);
      } catch (e) {
        console.log('Error: ', e);
      }
    }
    fetchData().then( ()=>
          { var elements = document.querySelectorAll('[id^="btnSave"]');
            elements.forEach(function (element) {
              element.disabled = true;
            });
          }
    );
  }, []);

  const customSubmit = async (userData) => {

    let response = await axios.post(
      'http://localhost:8000/api/users',
      userData
    );
    setUser(response.data.Data);
    alert(response.data);
    return response.data.Succes; //Returns true or false

  };

  const onFieldFirstnameChange = (e, rowid) => {
    let updatedUsers = [...users];
    updatedUsers[rowid].Firstname = e.target.value;
    setUsers(updatedUsers);
  };

  const onFieldLastnameChange = (e, rowid) => {
    let updatedUsers = [...users];
    updatedUsers[rowid].Lastname = e.target.value;
    setUsers(updatedUsers);
  };
  const onFieldPhonenumberChange = (e, rowid) => {
    let updatedUsers = [...users];
    updatedUsers[rowid].Phonenumber = e.target.value;
    setUsers(updatedUsers);
  };

  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.Firstname,
      sortable: true,
      cell: (row) => (
        //rowInEditMode === row.id ? <div>aa</div> : <div>bb</div>
        rowInEditMode === row.id ? 
          <div key={`mydivFirstname-${row.id}`}>
            <input
              name={`mycellFirstname-${row.id}`}
              id={`mycellFirstname-${row.id}`}
              type='text'
              key={`mycellFirstname-${row.id}`}
              onChange={(e) => onFieldFirstnameChange(e, row.id)}
              value={users && users[row.id] && users[row.id].Firstname}
            />
          </div>
         : 
          <div key={`mydivFirstname-${row.id}`}>
            <span
              name={`mycellFirstname-${row.id}`}
              id={`mycellFirstname-${row.id}`}
              key={`mycellFirstname-${row.id}`}>
              {users && users[row.id] && users[row.id].Firstname}
            </span>
          </div>
        
      )

    },
    {
      name: 'Last Name',
      selector: (row) => row.Lastname,
      sortable: true,
      cell: (row) =>
        rowInEditMode === row.id ? 
          <div key={`mydivLastname-${row.id}`}>
            <input
              name={`mycellLastname-${row.id}`}
              id={`mycellLastname-${row.id}`}
              type='text'
              key={`mycellLastname-${row.id}`}
              onChange={(e) => onFieldLastnameChange(e, row.id)}
              value={users && users[row.id] && users[row.id].Lastname}
            />
          </div>
         : 
          <div key={`mydivLastname-${row.id}`}>
            <span
              name={`mycellLastname-${row.id}`}
              id={`mycellLastname-${row.id}`}
              key={`mycellLastname-${row.id}`}>
              {users && users[row.id] && users[row.id].Lastname}
            </span>
          </div>
        
    },
    {
      name: 'Phone Number',
      selector: (row) => row.Phonenumber,
      sortable: true,
      cell: (row) =>
            rowInEditMode === row.id ? 
              <div key={`mydivPhone-${row.id}`}>
                <input
                  name={`mycellPhone-${row.id}`}
                  id={`mycellPhone-${row.id}`}
                  type='text'
                  key={`mycellPhone-${row.id}`}
                  onChange={(e) => onFieldPhonenumberChange(e, row.id)}
                  value={users && users[row.id] && users[row.id].Phonenumber}
                />
              </div>
             : 
              <div key={`mydivPhone-${row.id}`}>
                <span
                  name={`mycellPhone-${row.id}`}
                  id={`mycellPhone-${row.id}`}
                  key={`mycellPhone-${row.id}`}>
                  {users && users[row.id] && users[row.id].Phonenumber}
                </span>
              </div>
            
    },
    {
      sortable: false,
      right: true,
      cell: (row) => (
        <div>
          <Button variant='dark'  size='sm'
            id={'btnEdit-' + row.id}
            onClick={(e) => {
              e.target.disabled = true;
              document.getElementById(`btnSave-${row.id}`).disabled = false;
              setIsFirstRender(false);
              setRowInEditMode(row.id);
            }}>
            Edit
          </Button>
        </div>
      ),
    },
    {
      sortable: false,
      right: true,
      cell: (row) => (
        <div>
          <Button variant='dark'  size='sm'
            id={`btnSave-${row.id}`}
            onClick={async (e) => {
              e.target.disabled = true;
              document.getElementById('btnEdit-' + row.id).disabled = false;

              let userData = {
                Firstname: users[row.id].Firstname,
                Lastname: users[row.id].Lastname,
                Phonenumber: users[row.id].Phonenumber,
              };
              customSubmit(userData);
              setRowInEditMode(-1);
            }}>
            Save
          </Button>
        </div>
      ),
    },


  ]

  // const columns = [
  //   {
  //     name: 'First Name',
  //     selector: (row) => row.Firstname,
  //     sortable: true,
  //     cell: (row) =>
  //       rowInEditMode === row.id ? (
  //         <div key={`mydivFirstname-${row.id}`}>
  //           <input
  //             name={`mycellFirstname-${row.id}`}
  //             id={`mycellFirstname-${row.id}`}
  //             type='text'
  //             key={`mycellFirstname-${row.id}`}
  //             // onChange={(e) => onFieldFirstnameChange(e, row.id)}
  //             value={users && users[row.id] && users[row.id].Firstname}
  //           />
  //         </div>
  //       ) : (
  //         <div key={`mydivFirstname-${row.id}`}>
  //           <span
  //             name={`mycellFirstname-${row.id}`}
  //             id={`mycellFirstname-${row.id}`}
  //             key={`mycellFirstname-${row.id}`}>
  //             {users && users[row.id] && users[row.id].Firstname}
  //           </span>
  //         </div>
  //       ),
  //   },
  //   {
  //     name: 'Last Name',
  //     selector: (row) => row.Lastname,
  //     sortable: true,
  //     right: true,
  //     cell: (row) =>
  //       rowInEditMode === row.id ? (
  //         <div key={`mydivLastname-${row.id}`}>
  //           <input
  //             name={`mycellLastname-${row.id}`}
  //             id={`mycellLastname-${row.id}`}
  //             type='text'
  //             key={`mycellLastname-${row.id}`}
  //             // onChange={(e) => onFieldLastnameChange(e, row.id)}
  //             value={users && users[row.id] && users[row.id].Lastname}
  //           />
  //         </div>
  //       ) : (
  //         <div key={`mydivLastname-${row.id}`}>
  //           <span
  //             name={`mycellLastname-${row.id}`}
  //             id={`mycellLastname-${row.id}`}
  //             key={`mycellLastname-${row.id}`}>
  //             {users && users[row.id] && users[row.id].Lastname}
  //           </span>
  //         </div>
  //       ),
  //   },
  //   {
  //     name: 'Phone Number',
  //     selector: (row) => row.Phonenumber,
  //     sortable: true,
  //     cell: (row) =>
  //       rowInEditMode === row.id ? (
  //         <div key={`mydivPhone-${row.id}`}>
  //           <input
  //             name={`mycellPhone-${row.id}`}
  //             id={`mycellPhone-${row.id}`}
  //             type='text'
  //             key={`mycellPhone-${row.id}`}
  //             // onChange={(e) => onFieldPhonenumberChange(e, row.id)}
  //             value={users && users[row.id] && users[row.id].Phonenumber}
  //           />
  //         </div>
  //       ) : (
  //         <div key={`mydivPhone-${row.id}`}>
  //           <span
  //             name={`mycellPhone-${row.id}`}
  //             id={`mycellPhone-${row.id}`}
  //             key={`mycellPhone-${row.id}`}>
  //             {users && users[row.id] && users[row.id].Phonenumber}
  //           </span>
  //         </div>
  //       ),
  //   },
    // {
    //   sortable: false,
    //   right: true,
    //   cell: (row) => (
    //     <div>
    //       <button
    //         id={'btnEdit-' + row.id}
    //         onClick={(e) => {
    //           e.target.disabled = true;
    //           document.getElementById(`btnSave-${row.id}`).disabled = false;
    //           setIsFirstRender(false);
    //           setRowInEditMode(row.id);
    //         }}>
    //         Edit
    //       </button>
    //     </div>
    //   ),
    // },
    // {
    //   sortable: false,
    //   right: true,
    //   cell: (row) => (
    //     <div>
    //       <button
    //         id={`btnSave-${row.id}`}
    //         onClick={async (e) => {
    //           e.target.disabled = true;
    //           document.getElementById('btnEdit-' + row.id).disabled = false;

    //           let userData = {
    //             Firstname: user.Firstname,
    //             Lastname: user.Lastname,
    //             Phonenumber: user.Phonenumber,
    //           };
    //           customSubmit(userData);
    //           setRowInEditMode(-1);
    //         }}>
    //         Save
    //       </button>
    //     </div>
    //   ),
    // },
  // ];

  const handleSelectionChanged = (event) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', event.selectedRows);
  };

  // Toggle the state so React Table Table changes to `clearSelectedRows` are triggered
  // const handleClearRows = () => {
  //   setClearSelection(!clearSelection);
  // };

  return (
    <div>
      { users.map((item) => <div>{item.Firstname}</div>) }
      <div>
        <DataTable
          title='Users'
          columns={columns}
          data={users}
          onSelectedRowsChange={handleSelectionChanged}
        />
      </div>
    </div>
  );
};
