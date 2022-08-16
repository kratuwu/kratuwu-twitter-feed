import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import LastTweetQueryDocument from './lastQuery.dument';

@Injectable()
export class LastTweetQueryRepository {
  constructor(
    @Inject(LastTweetQueryDocument.collectionName)
    private readonly lastTweetQueryCollection: CollectionReference<LastTweetQueryDocument>,
  ) {}

  public async saveLastTweetQueryDocument(
    query: string,
    lastCreatedAt: string,
  ) {
    if (lastCreatedAt) {
      const lastQuery = await this.findByQuery(query);
      if (lastQuery) {
        return lastQuery.ref.update({ lastCreatedAt });
      }
      return this.lastTweetQueryCollection.add({ query, lastCreatedAt });
    }
  }

  public async getLastQueryCreatedAt(query: string): Promise<string> {
    const lastQuery = await this.findByQuery(query);
    return (await lastQuery?.ref.get())?.data().lastCreatedAt;
  }

  private async findByQuery(query: string) {
    return this.getFirst(
      this.lastTweetQueryCollection.where('query', '==', query),
    );
  }

  private async getFirst(
    arg0: FirebaseFirestore.Query<LastTweetQueryDocument>,
  ) {
    return (await arg0.limit(1).get()).docs[0];
  }
}
