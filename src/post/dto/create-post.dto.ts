export class CreatePostDto {
  title: string;
  text: string;
  datePublished: string;
}

export class PostUserDto {
  title: string;
  text: string;
  datePublished: string;
  login?: string;
}
