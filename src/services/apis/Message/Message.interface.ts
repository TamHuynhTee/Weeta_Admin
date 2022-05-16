export interface ICreateConversationMessage {
  conversation: string;
  sender: string;
  text: string;
}

export interface IEditConversationMessage {
  text: string;
}
