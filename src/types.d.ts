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
  id: string;
  formTitle: string;
  formHeading?: string;
  fields: Field[];
  theme?: string;
  background?: string;
  enabledSignIn?: boolean | null; // ✅ Agregado
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
  selectedTheme?: string; // Hacemos opcional en caso de que no siempre esté presente
  selectedStyle?: { key: string; value: string };
  editable: boolean; // Nueva prop para definir si el formulario es editable o no
  formId: string; // ID del formulario
  enabledSignIn?: boolean | null; // Estado de autenticación
}


export interface ControllerProps {
  selectedTheme: (theme: string) => void;
  selectedBackground: (background: string) => void;
  selectedStyle: (style: { key: string; value: string }) => void; // Agregamos selectedStyle
}

export interface JsonFormRecord {
  id: string;
    jsonform: string;
    theme: string;
    background?: string;
    style?: { key: string; value: string };
    createdBy: string;
    createdAt: string;
    enabledSignIn: boolean | null;
}