import React, { JSX, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import AdminContainer from './containers/AdminContainer';
import Data from './components/Data';

const App: React.FC = (): JSX.Element => {
  const [index, setIndex] = useState(0);
  const [accountData, setAccountData] = useState({})
  const [wizardPages, setWizardPages] = useState([
    // index 0, page 1
    <>
      <h2>Create an Account</h2>
      <div>
        <p>Username:</p>
        <input type="text" id="createUsernameInput" placeholder="username" />
      </div>
      <div>
        <p>Password:</p>
        <input type="password" id="createPasswordInput" placeholder="password" />
      </div>
      <p onClick={() => setIndex(curr => curr + 1)}>Sign in</p>
    </>,
    // index 1, page 1
    <>
      <h2>Sign in</h2>
      <div>
        <p>Username:</p>
        <input type="text" id="usernameInput" placeholder="username" />
      </div>
      <div>
        <p>Password:</p>
        <input type="password" id="passwordInput" placeholder="password" />
      </div>
      <p onClick={() => setIndex(curr => curr - 1)}>Create an Account</p>
    </>,
    // index 2, page 2, default -> About Me
    <div>
      <h2>Account Info 1</h2>
      <div className="wizardAboutMe">
        <p>About Me:</p>
        <textarea id="aboutMeInput" placeholder="tell me about yourself" />
      </div>
    </div>,
    // index 3, page 3, default -> Birthday
    <div>
      <h2>Account Info 2</h2>
      <div className="wizardBirthday">
        <p>Birthday:</p>
        <input type="date" id="birthdayInput" name="birthday" min="1900-01-01" max="2024-12-31"/>
      </div>
    </div>,
  ]);

  const possibleQuestions = {
    // About Me
    "wizardAboutMe": (<div className="wizardAboutMe">
      <p>About Me:</p>
      <textarea id="aboutMeInput" placeholder="tell me about yourself" />
    </div>),
    // Birthday
    "wizardBirthday": (<div className="wizardBirthday">
      <p>Birthday:</p>
      <input type="date" id="birthdayInput" name="birthday" min="1900-01-01" max="2024-12-31"/>
    </div>),
    // Address
    "wizardAddress": (<div className="wizardAddress">
      <div>
        <p>Street Address:</p>
        <input type="text" id="streetAddressInput" placeholder="street address" />
      </div>
      <div>
        <p>City:</p>
        <input type="text" id="cityInput" placeholder="city" />
      </div>
      <div>
        <p>State:</p>
        <input type="text" id="stateInput" placeholder="state" />
      </div>
      <div>
        <p>Zip:</p>
        <input type="text" id="zipInput" placeholder="zip code" />
      </div>
    </div>),
  };
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <MainContainer 
            index={index} 
            setIndex={setIndex}
            accountData={accountData}
            setAccountData={setAccountData}
            wizardPages={wizardPages}
            setWizardPages={setWizardPages}
            possibleQuestions={possibleQuestions}
          />}
        />
        <Route path='/admin' element={
          <AdminContainer 
            index={index} 
            setIndex={setIndex}
            accountData={accountData}
            setAccountData={setAccountData}
            wizardPages={wizardPages}
            possibleQuestions={possibleQuestions}
          />}
        />
        <Route path='/data' element={<Data />}/>
      </Routes>
    </Router>
  );
};

export default App;