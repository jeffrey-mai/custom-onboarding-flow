export interface MainContainerProp {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  accountData: Record<string, any>;
  setAccountData: React.Dispatch<React.SetStateAction<number>>;
  wizardPages: React.ReactElement<HTMLDivElement>[];
  setWizardPages: React.Dispatch<React.SetStateAction<React.ReactElement<HTMLDivElement>[]>>;
  possibleQuestions: Record<string, React.ReactElement<HTMLDivElement>>;
}

export interface AdminContainerProp {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  accountData: Record<string, any>;
  setAccountData: React.Dispatch<React.SetStateAction<number>>;
  wizardPages: React.ReactElement<HTMLDivElement>[];
  possibleQuestions: Record<string, React.ReactElement<HTMLDivElement>>;
}

export interface AccountsType {
  id: number;
  username: string;
  password: string;
}

export interface FormsType {
  id: number;
  username: string;
  wizardpage2: string[];
  wizardpage3: string[];
  aboutme: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  birthday: string;
}