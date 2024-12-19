import { useEffect } from "react";
import { MainContainerProp } from "../../../types";

const Wizard: React.FC<MainContainerProp> = (props) => {
  const { index, setIndex, accountData, setAccountData, wizardPages, setWizardPages, possibleQuestions } = props;
  const handlePreviousClick = () => {
    if(index == 3){
      const currStep = document.getElementById("step2");
      const prevStep = document.getElementById("step3");
      if(currStep) currStep.className = "wizardTrackerCurrentStep";
      if(prevStep) prevStep.className = "wizardTrackerSteps";
      setIndex(curr => curr - 1);
    } else if(index == 2){
      const currStep = document.getElementById("step1");
      const prevStep = document.getElementById("step2");
      if(currStep) currStep.className = "wizardTrackerCurrentStep";
      if(prevStep) prevStep.className = "wizardTrackerSteps";
      setIndex(curr => curr - 2);
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
        .then(response => {
          if(!response.ok) throw new Error('Network response was not ok');
        })
        .catch(error => { console.error('There was a problem with the POST request:', error);});
        
        if(currStep) currStep.className = "wizardTrackerCurrentStep";
        if(prevStep) prevStep.className = "wizardTrackerSteps";
        setIndex(curr => curr + 2);
      } 
      else if(index == 1 && usernameInput.value && passwordInput.value){
        await fetch(`http://localhost:3000/account?username=${usernameInput.value}&password=${passwordInput.value}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
          setAccountData(data);
          let tempWizardPages = wizardPages;
          tempWizardPages[2] = (<><h2>Account Info 1</h2></>);
          tempWizardPages[3] = (<><h2>Account Info 2</h2></>);

          data.wizardpage2.forEach((ele: string) => {
            tempWizardPages[2] = <>
              {tempWizardPages[2]}
              {possibleQuestions[ele]}
            </>;
          })
          data.wizardpage3.forEach((ele: string) => {
            tempWizardPages[3] = <>
              {tempWizardPages[3]}
              {possibleQuestions[ele]}
            </>;
          })
          setWizardPages(tempWizardPages);
        })
        .catch(error => { console.error('There was a problem with the GET request:', error);});
        
        if(currStep) currStep.className = "wizardTrackerCurrentStep";
        if(prevStep) prevStep.className = "wizardTrackerSteps";
        setIndex(curr => curr + 1);
      }
    }
    else if(index == 2){
      const currStep = document.getElementById("step3");
      const prevStep = document.getElementById("step2");
      if(currStep) currStep.className = "wizardTrackerCurrentStep";
      if(prevStep) prevStep.className = "wizardTrackerSteps";
      setIndex(curr => curr + 1);
    }
  }

  useEffect(() => {
    if (accountData) {
      console.log('Updated accountData:', accountData);
      wizardPages.forEach(ele => console.log(ele));
    }
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
          <button onClick={handlePreviousClick}>Previous</button>
          {index == 0 ? <button onClick={handleNextClick}>Create</button> :
           index == 1 ? <button onClick={handleNextClick}>Login</button> :
           <button onClick={handleNextClick}>Next</button>}
        </div>
      </div>
    </div>
  );
};

export default Wizard;