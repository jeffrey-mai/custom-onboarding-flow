import Wizard from "../components/Wizard";
import { MainContainerProp } from "../../types";

const MainContainer: React.FC<MainContainerProp> = (props) => {
  const { index, setIndex, accountData, setAccountData, wizardPages, setWizardPages, possibleQuestions, hasInitializedData, setHasInitializedData } = props;

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
        hasInitializedData={hasInitializedData}
        setHasInitializedData={setHasInitializedData}
      />
    </div>
  );
};

export default MainContainer;