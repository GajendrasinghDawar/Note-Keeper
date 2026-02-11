export interface Note {
  id?: number
  title: string
  content: string
  created: Date
}

export interface NoteFormData {
  title: string
  content: string
}
