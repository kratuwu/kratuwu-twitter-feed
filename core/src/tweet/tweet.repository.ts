import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference, Firestore } from '@google-cloud/firestore';
import TweetDocument from './tweet.document';
import TweetDTO from './tweet.dto';
import { FirestoreDatabaseProvider } from 'src/firestore/firestore.providers';

@Injectable()
export class TweetRepository {
  constructor(
    @Inject(TweetDocument.collectionName)
    private readonly tweetCollection: CollectionReference<TweetDocument>,
    @Inject(FirestoreDatabaseProvider)
    private firestore: Firestore,
  ) {}

  async create(tweetsDto: TweetDTO[] = []) {
    const tweetsBatch: TweetDTO[][] = [];
    while (tweetsDto.length > 0) {
      const chunk = tweetsDto.splice(0, 500);
      tweetsBatch.push(chunk);
    }
    return await Promise.all(
      tweetsBatch.map(async (tweets) => {
        const bulk = this.firestore.bulkWriter();
        await Promise.all(
          tweets.map(async (tweet) => {
            const existsTweet = await this.findTweetById(tweet.id);
            if (!existsTweet) bulk.create(this.tweetCollection.doc(), tweet);
          }),
        );
        await bulk.flush();
      }),
    );
  }

  public async countByQuery(query: string) {
    return this.tweetCollection
      .where('query', '==', query)
      .get()
      .then((tweets) => tweets.size);
  }
  private async findTweetById(email: string) {
    return await this.getFirst(this.tweetCollection.where('id', '==', email));
  }
  private async getFirst(arg0: FirebaseFirestore.Query<TweetDocument>) {
    return (await arg0.limit(1).get()).docs[0];
  }
}
