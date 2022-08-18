import { MediaInterface } from './tweet.document';

export class TweetDTO {
  static collectionName = 'tweet';

  public id: string;

  public query: string;

  public authorId: string;

  public authorUsername: string;

  public text: string;

  public mediaUrls: MediaInterface[];

  public createdAt: number;
}
export default TweetDTO;
