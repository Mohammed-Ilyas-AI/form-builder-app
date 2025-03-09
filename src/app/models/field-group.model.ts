// Interface to represent a Field Group
export interface FieldGroup {
  editMode: boolean;
  id: string; // Unique identifier for the field group
  name: string; // Name of the field group
  description?: string; // Optional description of the field group
}
