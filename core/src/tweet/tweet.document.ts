export interface MediaInterface {
  type: string;
  url: string;
}
class TweetDocument {
  static collectionName = 'tweet';

  public id: string;

  public query: string;

  public authorId: string;

  public authorName: string;

  public text: string;

  public mediaUrls: MediaInterface[];
}
export default TweetDocument;
