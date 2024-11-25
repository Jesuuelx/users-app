interface Message {
  name: string;
  message: string;
}

export interface User {
  id: string;
  name_user: string;
  cellphone: string;
  email: string;
  last_message: string;
  characters: string;
  alt_img?: string;
  messages: Message[];
}
