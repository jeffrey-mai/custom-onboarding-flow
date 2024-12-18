import { useState } from "react";

const Wizard = () => {
  const [index, setIndex] = useState(0);
  const [wizardQuestions, setWizardQuestions] = useState([
    // index 0
    <div className="wizardQuestions">
      <h2>Create an Account</h2>
      <div>
        <p>Username:</p>
        <input type="text" id="usernameInput" placeholder="username" />
      </div>
      <div>
        <p>Password:</p>
        <input type="text" id="passwordInput" placeholder="password" />
      </div>
      <p onClick={() => setIndex(curr => curr + 1)}>Sign in</p>
    </div>,
    // index 1
    <div className="wizardQuestions">
      <h2>Sign in</h2>
      <div>
        <p>Username:</p>
        <input type="text" id="usernameInput" placeholder="username" />
      </div>
      <div>
        <p>Password:</p>
        <input type="text" id="passwordInput" placeholder="password" />
      </div>
      <p onClick={() => setIndex(curr => curr - 1)}>Create an Account</p>
    </div>,
    // index 2
    <div className="wizardQuestions">
      <h2>Account Info 1</h2>
      <div className="wizardAboutMe">
        <p>About Me:</p>
        <textarea id="aboutMeInput" placeholder="tell me about yourself" />
      </div>
    </div>,
    // index 3
    <div className="wizardQuestions">
      <h2>Account Info 2</h2>
      <div className="wizardBirthday">
        <p>Birthday:</p>
        <input type="date" id="birthday" name="birthday" min="1900-01-01" max="2024-12-31"/>
      </div>
    </div>,
  ]);

  const handlePreviousClick = () => {
    if(index == 3){
      const currStep = document.getElementById("step2");
      const prevStep = document.getElementById("step3");
      if(currStep) currStep.className = "wizardTrackerCurrentStep";
      if(prevStep) prevStep.className = "wizardTrackerSteps";
    } else if(index == 2){
      const currStep = document.getElementById("step1");
      const prevStep = document.getElementById("step2");
      if(currStep) currStep.className = "wizardTrackerCurrentStep";
      if(prevStep) prevStep.className = "wizardTrackerSteps";
    }
    if(index == 2) setIndex(curr => curr-=2);
    else if(index != 0) setIndex(curr => curr - 1);
  }

  const handleNextClick = () => {
    if(index == 0 || index == 1){
      const currStep = document.getElementById("step2");
      const prevStep = document.getElementById("step1");
      if(currStep) currStep.className = "wizardTrackerCurrentStep";
      if(prevStep) prevStep.className = "wizardTrackerSteps";
    } else if(index == 2){
      const currStep = document.getElementById("step3");
      const prevStep = document.getElementById("step2");
      if(currStep) currStep.className = "wizardTrackerCurrentStep";
      if(prevStep) prevStep.className = "wizardTrackerSteps";
    }
    if(index == 0) setIndex(curr => curr+=2);
    else if(index < 3) setIndex(curr => curr + 1);
  }

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
        {wizardQuestions[index]}
        <div className="wizardNextPrev">
          <button onClick={handlePreviousClick}>Previous</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;