type Account = {
  groups: Array<`account_group:${string}`>;
  id: `account:${string}`;
  status: string;
};

export type Profile = {
  account: Account;
  created_at: string; // ISO date string
  first_name: string;
  full_name: string;
  id: `profile:${string}`;
  in: `account:${string}`;
  last_name: string;
  gender?: string;
  date_of_birth?: string;
  out: `account:${string}`;
  mobile?: {
    country_code: string;
    formatted_number: string;
    is_primary: true;
    mobile: string;
  }[];
  updated_at: string; // ISO date string
};
