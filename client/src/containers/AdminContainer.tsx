import { AdminContainerProp } from "../../../types";
import Admin from "../components/Admin";

const AdminContainer: React.FC<AdminContainerProp> = (props) => {
  const { index, setIndex, accountData, setAccountData, wizardPages, possibleQuestions } = props;

  return (
    <div className="adminContainer">
      <Admin
        index={index} 
        setIndex={setIndex}
        accountData={accountData}
        setAccountData={setAccountData}
        wizardPages={wizardPages}
        possibleQuestions={possibleQuestions}
      />
    </div>
  );
};

export default AdminContainer;