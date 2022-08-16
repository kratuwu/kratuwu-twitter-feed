import LastTweetQueryDocument from 'src/tweet/lastQuery.dument';
import TweetDocument from 'src/tweet/tweet.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  TweetDocument.collectionName,
  LastTweetQueryDocument.collectionName,
];
