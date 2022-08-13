import { MediaInterface } from './tweet.document';

export class TweetDTO {
  static collectionName = 'tweet';

  public id: string;

  public query: string;

  public authorId: string;

  public authorName: string;

  public text: string;

  public mediaUrls: MediaInterface[];
}
export default TweetDTO;
