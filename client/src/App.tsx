import React, { JSX, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import AdminContainer from './containers/AdminContainer';
import ItemsContainer from './containers/ItemsContainer';
import { FormsType } from '../types';
import Data from './components/Data';

const App: React.FC = (): JSX.Element => {
  const [index, setIndex] = useState(0);
  const [accountData, setAccountData] = useState<FormsType>({
    id: -1,
    username: '',
    wizardpage2: ['wizardAboutMe', 'wizardItemCategory'],
    wizardpage3: ['wizardBirthday'],
    aboutme: '',
    address: '',
    city: '',
    state: '',
    zip: -1,
    birthday: '',
    item_category: '',
  })
  const [hasInitializedData, setHasInitializedData] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setHasInitializedData(false);
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log(value);
    setHasInitializedData(false);
    setAccountData(prev => ({
      ...prev,
      "item_category": value
    }));
  };

  const possibleQuestions = {
    // About Me
    "wizardAboutMe": (
    <div className="wizardAboutMe">
      <p>About Me:</p>
      <textarea id="aboutMeInput" value={accountData.aboutme} onChange={handleInputChange} name="aboutme" placeholder="tell me about yourself" />
    </div>),
    // Birthday
    "wizardBirthday": (
    <div className="wizardBirthday">
      <p>Birthday:</p>
      <input type="date" id="birthdayInput" value={accountData.birthday} onChange={handleInputChange} name="birthday" min="1900-01-01" max="2024-12-31"/>
    </div>),
    // Address
    "wizardAddress": (
    <div className="wizardAddress">
      <div>
        <p>Street Address:</p>
        <input type="text" id="streetAddressInput" value={accountData.address} onChange={handleInputChange} name="address" placeholder="street address" />
      </div>
      <div>
        <p>City:</p>
        <input type="text" id="cityInput" value={accountData.city} onChange={handleInputChange} name="city" placeholder="city" />
      </div>
      <div>
        <p>State:</p>
        <input type="text" id="stateInput" value={accountData.state} onChange={handleInputChange} name="state" placeholder="state" />
      </div>
      <div>
        <p>Zip:</p>
        <input type="text" id="zipInput" value={accountData.zip} onChange={handleInputChange} name="zip" placeholder="zip code" />
      </div>
    </div>),
    // Item category
    "wizardItemCategory": (
    <div className="wizardItemCategory">
      <label htmlFor="itemCategoryInput" style={{ marginRight: "10px" }}>
        Choose an option:
      </label>
      <select
        id="itemCategoryInput"
        value={accountData.item_category != null ? accountData.item_category : ""}
        onChange={handleItemCategoryChange}
        style={{ padding: "5px" }}
      >
        <option value="" disabled>
          Select an option
        </option>
        {["Men's clothing", "Women's clothing", "Jewelery", "Electronics"].map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>),
  };
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
    // index 2, page 2, default -> About Me, Item Category
    <></>,
    // index 3, page 3, default -> Birthday
    <></>,
  ]);

  useEffect(() => {
    console.log("App.tsx -----------------------------")
    console.log(accountData.wizardpage2);
    console.log(accountData.wizardpage3);
    console.log(accountData);
    console.log(accountData.item_category)
  }, [accountData])
  
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
            hasInitializedData={hasInitializedData}
            setHasInitializedData={setHasInitializedData}
          />}
        />
        <Route path='/admin' element={
          <AdminContainer
            accountData={accountData}
            setAccountData={setAccountData}
          />}/>
        <Route path='/data' element={<Data />} />
        <Route path='/items' element={<ItemsContainer accountData={accountData} />} />
      </Routes>
    </Router>
  );
};

export default App;