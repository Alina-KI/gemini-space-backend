export class CreatePostDto {
  title: string;
  text: string;
  datePublished: string;
  photo: string;
}

export class PostUserDto {
  title: string;
  text: string;
  datePublished: string;
  photo: string;
  login?: string;
}
