export interface MainContainerProp {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  accountData: FormsType;
  setAccountData: React.Dispatch<React.SetStateAction<FormsType>>;
  wizardPages: React.ReactElement<HTMLDivElement>[];
  setWizardPages: React.Dispatch<React.SetStateAction<React.ReactElement<HTMLDivElement>[]>>;
  possibleQuestions: Record<string, React.ReactElement<HTMLDivElement>>;
  hasInitializedData: boolean;
  setHasInitializedData: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AdminContainerProp {
  accountData: FormsType;
  setAccountData: React.Dispatch<React.SetStateAction<FormsType>>;
}

export interface ItemsContainerProp {
  accountData: FormsType;
}

export interface ItemType {
  itemData: ItemDataType;
}

export interface ItemDataType {
  "id": number;
  "title": string;
  "price": number;
  "description": string;
  "category": string;
  "image": string;
  "rating": Record<string, number>;
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
  item_category: string;
}