export interface FormElement {
  id: string;
  type: 'text'
    | 'multiline'
    | 'integer'
    | 'date'
    | 'time'
    | 'datetime'
    | 'dropdown'
    | 'single-select'
    | 'multi-select'
    | 'upload';
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];       // For dropdowns/selection fields
  optionsString?: string;   // For editing ease (optional)
  editMode?: boolean;
  icon?: string;            // Optional icon property
}
