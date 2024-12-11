import type { UserInfo } from 'src/types/user.interface';

export type UserInfoProps = UserInfo & {};

export type UserTableRowInfoProps = {
  row: UserInfo;
  selected: boolean;
  onSelectRow: () => void;
};

export type UserTableInfoToolbarProps = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
