export type AuthCodeProps = {
  autoFocus?: boolean;
  length?: number;
  isDisabled?: boolean;
  onChange: (value: string) => void;
};

export type AuthInputProps = {
  min?: string;
  max?: string;
  pattern: string;
};

export type AuthCodeRef = {
  focus: () => void;
  clear: () => void;
};
