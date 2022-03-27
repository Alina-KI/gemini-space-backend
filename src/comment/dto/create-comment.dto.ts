export class CreateCommentDto {
  readonly text: string;
  readonly datePublished: string;
  readonly userId: string;
}

export class ChangeCommentDto {
  readonly text: string;
  readonly datePublished: string;
}
