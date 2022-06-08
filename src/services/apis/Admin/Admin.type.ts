import { ACCOUNT_MODEL } from '@/models/Account.model';

export type resGetListUser = {
  users: Array<ACCOUNT_MODEL>;
  total: number;
};
