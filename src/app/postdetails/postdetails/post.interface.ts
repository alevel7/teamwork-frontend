export interface Post {
  id?: number;
  dateCreated?: Date | string;
  title?: string;
  article?: string;
  comments: Comments[];
}

interface Comments {
  comment_id: number;
  comment: string;
  article_article_id: number;
  users_user_id: number;
  createdOn: string;
}
