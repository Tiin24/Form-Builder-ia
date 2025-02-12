interface FieldOption {
  label: string;
  value?: string;
}

export interface Field {
  fieldType?: "select" | "radio" | "checkbox" | "text" | "email" | "password";
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[]; // Para select, radio y checkbox
  fieldName?: string;
  type?: string; // Para input fields como text, email, password, etc.
}

export interface Form {
  formTitle: string;
  formHeading?: string;
  fields: Field[];
  theme?: string; 
  background?: string;
}

export interface FieldEditProps {
  defaultValue: Field;
  onUpdate: (updatedField: Field) => void;
  deleteField: () => void; // Nueva prop
}

export interface FormUiProps {
  jsonForm?: Form;
  onFieldUpdate: (index: number, updatedField: Field) => void;
  deleteField: (index: number) => void;
  selectedTheme: string;
  selectedStyle?: { key: string; value: string }; // Agregamos selectedStyle
}

interface Theme {
  theme: string;
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
}

interface Background {
  gradient: string;
}

export interface ControllerProps {
  selectedTheme: (theme: string) => void;
  selectedBackground: (background: string) => void;
  selectedStyle: (style: { key: string; value: string }) => void; // Agregamos selectedStyle
}

