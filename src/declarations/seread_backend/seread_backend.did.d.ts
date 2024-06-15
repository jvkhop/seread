import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'title' : string,
  'content' : string,
  'timestamp' : bigint,
}
export interface _SERVICE {
  'getAllSecrets' : ActorMethod<[], Array<Post>>,
  'share' : ActorMethod<[Post], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
