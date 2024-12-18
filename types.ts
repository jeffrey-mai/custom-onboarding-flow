export interface AccountType {
  username: string;
  password: string;
  form: {
    aboutMe: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    birthday: string;
  }
}