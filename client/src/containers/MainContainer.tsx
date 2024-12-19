import Wizard from "../components/Wizard";
import { MainContainerProp } from "../../../types";

const MainContainer: React.FC<MainContainerProp> = (props) => {
  const { index, setIndex, accountData, setAccountData, wizardPages, setWizardPages, possibleQuestions } = props;

  return (
    <div className="mainContainer">
      <Wizard
        index={index} 
        setIndex={setIndex}
        accountData={accountData}
        setAccountData={setAccountData}
        wizardPages={wizardPages}
        setWizardPages={setWizardPages}
        possibleQuestions={possibleQuestions}
      />
    </div>
  );
};

export default MainContainer;