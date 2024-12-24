import { useEffect, useState } from "react";
import { AccountsType, FormsType } from "../../types";

const Data: React.FC = () => {
  const [accountsTable, setAccountsTable] = useState<AccountsType[]>([]);
  const [formsTable, setFormsTable] = useState<FormsType[]>([]);

  useEffect(() => {
    fetch('https://server-jeffrey-mais-projects.vercel.app/data/accounts', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => setAccountsTable(data))
    .catch(error => { console.error('There was a problem with the POST request:', error);});
  
    fetch('https://server-jeffrey-mais-projects.vercel.app/data/forms', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => setFormsTable(data))
    .catch(error => { console.error('There was a problem with the POST request:', error);});
  }, [])
  
  return (
    <div className="data">
      <div className="accountsTable">
        <h1>Accounts Table</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>username</th>
              <th>password</th>
            </tr>
          </thead>
          <tbody>
            {accountsTable.map(ele => {
              return (
                <tr>
                  <td data-label="id">{ele.id}</td>
                  <td data-label="username">{ele.username}</td>
                  <td data-label="password">{ele.password}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="formsTable">
        <h1>Forms Table</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>username</th>
              <th>wizardpage2</th>
              <th>wizardpage3</th>
              <th>aboutme</th>
              <th>address</th>
              <th>city</th>
              <th>state</th>
              <th>zip</th>
              <th>birthday</th>
              <th>item_category</th>
            </tr>
          </thead>
          <tbody>
            {formsTable.map(ele => {
              return (
                <tr>
                  <td data-label="id">{ele.id}</td>
                  <td data-label="username">{ele.username}</td>
                  <td data-label="wizardpage2">{ele.wizardpage2.map((item) => (
                      <span>
                        {item}
                        <br />
                      </span>
                    ))}
                  </td>
                  <td data-label="wizardpage3">{ele.wizardpage3.map((item) => (
                      <span>
                        {item}
                        <br />
                      </span>
                    ))}</td>
                  <td data-label="aboutme">{ele.aboutme}</td>
                  <td data-label="address">{ele.address}</td>
                  <td data-label="city">{ele.city}</td>
                  <td data-label="state">{ele.state}</td>
                  <td data-label="zip">{ele.zip}</td>
                  <td data-label="birthday">{ele.birthday}</td>
                  <td data-label="item_category">{ele.item_category}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Data;