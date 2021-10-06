export class CreateDialogueDto {
  // readonly _idSender;
  readonly nameTalk;
}

export class SendMessageDto {
  readonly senderId;
  readonly text;
  readonly date;
}
