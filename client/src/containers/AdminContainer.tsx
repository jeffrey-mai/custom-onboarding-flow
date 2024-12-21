import { AdminContainerProp } from "../../../types";
import Admin from "../components/Admin";

const AdminContainer: React.FC<AdminContainerProp> = (props) => {
  const { accountData, setAccountData } = props;

  return (
    <div className="adminContainer">
      <Admin
        accountData={accountData}
        setAccountData={setAccountData}
      />
    </div>
  );
};

export default AdminContainer;