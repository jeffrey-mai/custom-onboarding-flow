import { useEffect, useState } from "react";
import { AdminContainerProp, FormsType } from "../../../types";
import { useNavigate } from "react-router-dom";

const Admin: React.FC<AdminContainerProp> = (props) => {
  const navigate = useNavigate();
  const { accountData, setAccountData } = props;
  const [stop, setStop] = useState(false);
  const [page2Options, setPage2Options] = useState<{ [key: string]: {checked: boolean} }>({
    wizardAboutMe: {checked: false},
    wizardBirthday: {checked: false},
    wizardAddress: {checked: false},
  });
  const [page3Options, setPage3Options] = useState<{ [key: string]: {checked: boolean} }>({
    wizardAboutMe: {checked: false},
    wizardBirthday: {checked: false},
    wizardAddress: {checked: false},
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const page = Number(event.target.dataset.page);
    if(page == 2){
      setPage2Options((prevState) => ({
        ...prevState,
        [name]: {checked},
      }));
    }
    else{
      setPage3Options((prevState) => ({
        ...prevState,
        [name]: {checked},
      }));
    }
  };

  const handleDoneClick = async () => {
    const updatePages: string[][] = [[], []];
    console.log(accountData)
    if(!accountData.username) return alert("Must be logged in to modify questions!");
    for(const ele of accountData.wizardpage3){
      if(accountData.wizardpage2.includes(ele)){
        return alert("Duplicate question!");
      }
      updatePages[0].push(ele);
    }
    for(const ele of accountData.wizardpage2){
      if(accountData.wizardpage3.includes(ele)){
        return alert("Duplicate question!");
      }
      updatePages[1].push(ele);
    }
    await fetch('http://localhost:3000/admin', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: accountData.username,
        wizardpage2: updatePages[0],
        wizardpage3: updatePages[1]
      })
    })
    .then(response => {navigate('/')})
    .catch(error => { console.error('There was a problem with the POST request:', error);});
  }

  useEffect(() => {
    console.log("Admin.tsx -----------------------------")
    console.log(accountData);
    console.log(accountData.wizardpage2);
    console.log(accountData.wizardpage3);
    if (!stop && accountData?.wizardpage2) {
      setPage2Options((prev) => {
        const updatedOptions = { ...prev };
        accountData.wizardpage2.forEach((ele: string) => {
          updatedOptions[ele] = { checked: true };
        });
        console.log(updatedOptions, "ZZZZZZZZZZZZZZZZZZZZZZZZZ")
        console.log(accountData.wizardpage2);
        console.log(accountData.wizardpage3);
        return updatedOptions;
      });
    }
    if (!stop && accountData?.wizardpage3) {
      setPage3Options((prev) => {
        const updatedOptions = { ...prev };
        accountData.wizardpage3.forEach((ele: string) => {
          console.log(ele, "I'M INSIDEEEEEEEEEEEEEEEEEEEEE")
          updatedOptions[ele] = { checked: true };
        });
        console.log(updatedOptions, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(accountData.wizardpage2);
        console.log(accountData.wizardpage3);
        return updatedOptions;
      });
    }
    setStop(true);
  }, [accountData])

  useEffect(() => {
    if(stop){
      setAccountData((prev: FormsType) => {
        const updatedAccountData = { ...prev }
        Object.entries(page2Options).forEach(([key, value]) => {
          if(value.checked && !updatedAccountData.wizardpage2.includes(key)){
            updatedAccountData.wizardpage2.push(key);
          }
          else if(!value.checked && updatedAccountData.wizardpage2.includes(key)){
            const index = updatedAccountData.wizardpage2.indexOf(key);
            updatedAccountData.wizardpage2.splice(index, 1);
          }
        });
        Object.entries(page3Options).forEach(([key, value]) => {
          console.log(key, value)
          if(value.checked && !updatedAccountData.wizardpage3.includes(key)){
            updatedAccountData.wizardpage3.push(key);
          }
          else if(!value.checked && updatedAccountData.wizardpage3.includes(key)){
            const index = updatedAccountData.wizardpage3.indexOf(key);
            updatedAccountData.wizardpage3.splice(index, 1);
          }
        });
        return updatedAccountData;
      })
    }
  }, [page2Options, page3Options, stop])

  return (
    <div className="admin">
      <div className="adminForm">
        <h1>Admin</h1>
        <h3>Choose specific questions for Account Info 1 and 2 from the onboarding form<br/>(Must be logged in to modify questions)</h3>
        <div className="adminCheckList">
        <div className="checkListBox">
            <h3>Account Info 1</h3>
            <div className="checkList">
              <label>
                <input type="checkbox" name="wizardAboutMe" data-page={2} checked={page2Options.wizardAboutMe.checked} onChange={handleCheckboxChange} /> About Me
              </label>
              <label>
                <input type="checkbox" name="wizardBirthday" data-page={2} checked={page2Options.wizardBirthday.checked} onChange={handleCheckboxChange} /> Birthday
              </label>
              <label>
                <input type="checkbox" name="wizardAddress" data-page={2} checked={page2Options.wizardAddress.checked} onChange={handleCheckboxChange} /> Address
              </label>
            </div>
          </div>
          <div className="checkListBox">
            <h3>Account Info 2</h3>
            <div className="checkList">
              <label>
                <input type="checkbox" name="wizardAboutMe" data-page={3} checked={page3Options.wizardAboutMe.checked} onChange={handleCheckboxChange} /> About Me
              </label>
              <label>
                <input type="checkbox" name="wizardBirthday" data-page={3} checked={page3Options.wizardBirthday.checked} onChange={handleCheckboxChange} /> Birthday
              </label>
              <label>
                <input type="checkbox" name="wizardAddress" data-page={3} checked={page3Options.wizardAddress.checked} onChange={handleCheckboxChange} /> Address
              </label>
            </div>
          </div>
        </div>
        <button onClick={handleDoneClick}>Done</button>
      </div>
    </div>
  );
};

export default Admin;