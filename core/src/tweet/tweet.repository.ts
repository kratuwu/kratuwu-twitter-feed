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

  async create(tweetsDto: TweetDTO[]): Promise<TweetDTO[]> {
    const batch = this.firestore.batch();
    await Promise.all(
      tweetsDto.map(async (tweet) => {
        const existsTweet = await this.findTweetById(tweet.id);
        if (!existsTweet) batch.create(this.tweetCollection.doc(), tweet);
      }),
    );
    await batch.commit();
    return tweetsDto;
  }

  private async findTweetById(email: string) {
    return await this.getFirst(this.tweetCollection.where('id', '==', email));
  }
  private async getFirst(arg0: FirebaseFirestore.Query<TweetDocument>) {
    return (await arg0.limit(1).get()).docs[0];
  }
}
