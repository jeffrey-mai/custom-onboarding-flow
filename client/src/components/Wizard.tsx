import { useEffect } from "react";
import { MainContainerProp } from "../../../types";
import React from "react";
import { useNavigate } from "react-router-dom";

const Wizard: React.FC<MainContainerProp> = (props) => {
  const { index, setIndex, accountData, setAccountData, wizardPages, setWizardPages, possibleQuestions, hasInitializedData, setHasInitializedData } = props;
  const navigate = useNavigate();
  const handlePreviousClick = () => {
    if(index == 3){
      const currStep = document.getElementById("step2");
      const prevStep = document.getElementById("step3");
      if(currStep) currStep.className = "wizardTrackerCurrentStep";
      if(prevStep) prevStep.className = "wizardTrackerSteps";
      setIndex(curr => curr - 1);
    } 
    else if(index == 1){
      setIndex(curr => curr - 1);
    }
  }

  const handleNextClick = async () => {
    if(index == 0 || index == 1){
      const createUsernameInput = document.getElementById("createUsernameInput") as HTMLInputElement;
      const createPasswordInput = document.getElementById("createPasswordInput") as HTMLInputElement;
      const usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
      const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
      const currStep = document.getElementById("step2");
      const prevStep = document.getElementById("step1");

      if(index == 0 && createUsernameInput.value && createPasswordInput.value){
        await fetch('http://localhost:3000/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: createUsernameInput.value,
            password: createPasswordInput.value
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.rowCount != 0){ 
            setHasInitializedData(false);
            setAccountData(data.rows[0]);
            if(currStep) currStep.className = "wizardTrackerCurrentStep";
            if(prevStep) prevStep.className = "wizardTrackerSteps";
            setIndex(curr => curr + 2);
          }
          else alert("Username already exists or username/password is empty!");
        })
        .catch(error => { console.error('There was a problem with the POST request:', error);});
      }
      else if(index == 1 && usernameInput.value && passwordInput.value){
        await fetch(`http://localhost:3000/account?username=${usernameInput.value}&password=${passwordInput.value}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.rowCount != 0){
            setHasInitializedData(false);
            setAccountData(data.rows[0]);
            if(currStep) currStep.className = "wizardTrackerCurrentStep";
            if(prevStep) prevStep.className = "wizardTrackerSteps";
            setIndex(curr => curr + 1);
          }
          else alert("Account doesn't exist!");
        })
        .catch(error => { console.error('There was a problem with the GET request:', error);});
      }
      else alert("Missing required data!");
    }
    else if(index == 2 || index == 3){
      const aboutMeInput = document.getElementById("aboutMeInput") as HTMLInputElement;
      const streetAddressInput = document.getElementById("streetAddressInput") as HTMLInputElement;
      const cityInput = document.getElementById("cityInput") as HTMLInputElement;
      const stateInput = document.getElementById("stateInput") as HTMLInputElement;
      const zipInput = document.getElementById("zipInput") as HTMLInputElement;
      const birthdayInput = document.getElementById("birthdayInput") as HTMLInputElement;
      const itemCategoryInput = document.getElementById("itemCategoryInput") as HTMLSelectElement;
      const currStep = document.getElementById("step3");
      const prevStep = document.getElementById("step2");
      const updateColumns = [];

      if(aboutMeInput) updateColumns.push(`aboutme = $2`);
      if(streetAddressInput) updateColumns.push(`address = '${streetAddressInput.value ? streetAddressInput.value : null}'`);
      if(cityInput) updateColumns.push(`city = '${cityInput.value ? cityInput.value : null}'`);
      if(stateInput) updateColumns.push(`state = '${stateInput.value ? stateInput.value : null}'`);
      if(zipInput) {
        if(isNaN(Number(zipInput.value))) return alert("Zip is not a number!");
        updateColumns.push(`zip = ${zipInput.value ? zipInput.value : null}`);
      }
      if(birthdayInput) updateColumns.push(`birthday = '${birthdayInput.value ? birthdayInput.value : null}'`);
      if(itemCategoryInput) updateColumns.push(`item_category = '${itemCategoryInput.value ? itemCategoryInput.value : null}'`);

      if(updateColumns.length != 0 && !updateColumns.join(", ").includes("null")){
        await fetch('http://localhost:3000/', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            columns: updateColumns,
            accountData: accountData
          })
        })
        .then(response => {
          if(index == 2){
            if(currStep) currStep.className = "wizardTrackerCurrentStep";
            if(prevStep) prevStep.className = "wizardTrackerSteps";
            setIndex(curr => curr + 1);
          }
        })
        .catch(error => { console.error('There was a problem with the POST request:', error);});
      }
      else return alert("Missing required data!");

      if(index == 3) navigate('/items');
    }
  }

  useEffect(() => {
    if (accountData.wizardpage2 && !hasInitializedData) {
      let tempWizardPages = wizardPages;
      tempWizardPages[2] = (<><h2>Account Info 1</h2></>);
      tempWizardPages[3] = (<><h2>Account Info 2</h2></>);

      accountData.wizardpage2.forEach((ele: string) => {
        tempWizardPages[2] = <>
          {tempWizardPages[2]}
          {possibleQuestions[ele]}
        </>;
      })
      accountData.wizardpage3.forEach((ele: string) => {
        tempWizardPages[3] = <>
          {tempWizardPages[3]}
          {possibleQuestions[ele]}
        </>;
      })
      setWizardPages(tempWizardPages);
      setHasInitializedData(true);
      console.log('Updated accountData:', accountData);
    };
  }, [accountData]);

  return (
    <div className="wizard">
      <div className="wizardForm">
        <div className="wizardTracker">
          <div className="wizardTrackerCurrentStep" id="step1">
            <div className="wizardTrackerGrayNumber">1</div>
            <h4>Create Account</h4>
          </div>
          <div className="wizardTrackerSteps" id="step2">
            <div className="wizardTrackerGrayNumber">2</div>
            <h4>Account Info 1</h4>
          </div>
          <div className="wizardTrackerSteps" id="step3">
            <div className="wizardTrackerGrayNumber">3</div>
            <h4>Account Info 2</h4>
          </div>
        </div>
        <div className="wizardPages">
          {wizardPages[index]}
        </div>
        <div className="wizardNextPrev">
          {index == 0 ? <></> : <button onClick={handlePreviousClick}>Previous</button>}
          {index == 0 ? <button onClick={handleNextClick}>Create</button> :
           index == 1 ? <button onClick={handleNextClick}>Login</button> :
           index == 2 ? <button onClick={handleNextClick}>Next</button> :
           <button onClick={handleNextClick}>Done</button>}
        </div>
      </div>
    </div>
  );
};

export default Wizard;