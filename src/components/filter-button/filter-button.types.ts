type FilterOption = {
  value: string;
  label: string;
};

export type FilterButtonProps = {
  filterField: string;
  options: FilterOption[];
};
