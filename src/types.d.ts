// Definición de FieldOption
export interface FieldOption {
  label: string;
  value?: string;
}

// Definición de Field
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
  id?: string;
  formTitle?: string;
  formHeading?: string;
  fields?: Field[];
  theme?: string;
  background?: string;
  enabledSignIn?: boolean | null;
}

// Definición de FieldEditProps
export interface FieldEditProps {
  defaultValue: Field;
  onUpdate: (updatedField: Field) => void;
  deleteField: () => void;
}

// Definición de FormUiProps
export interface FormUiProps {
  id?: string;
  jsonForm?: Form[]; // Aquí permitir un array si realmente lo es
  onFieldUpdate?: (index: number, updatedField: Field) => void;
  deleteField?: (index: number) => void;
  selectedTheme?: string;
  selectedStyle?: { key: string; value: string };
  editable?: boolean;
  formId?: string;
  enabledSignIn?: boolean | null;
}

// Definición de ControllerProps
export interface ControllerProps {
  selectedTheme: (theme: string) => void;
  selectedBackground: (background: string) => void;
  selectedStyle: (style: { key: string; value: string }) => void;
}

// Definición de FormDataState
export interface FormDataState {
  [key: string]: string | number | boolean | string[];
}


interface Record {
  fields: Field;
  formHeading: string
  formTitle: string
}

export interface FormListItemProps{
  jsonForm: Form[]; 
  formRecord?: FormUiProps;
  refreshData?: () => void;
}