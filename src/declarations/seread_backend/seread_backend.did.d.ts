import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'likes' : bigint,
  'userPrincipal' : Principal,
  'timestamp' : bigint,
}
export interface User {
  'bio' : string,
  'principal' : Principal,
  'username' : string,
  'email' : string,
}
export interface _SERVICE {
  'baddassPost' : ActorMethod<[Post], undefined>,
  'checkPostId' : ActorMethod<[], bigint>,
  'deletePost' : ActorMethod<[bigint], undefined>,
  'getAllSecrets' : ActorMethod<[], Array<Post>>,
  'getId' : ActorMethod<[], string>,
  'getPost' : ActorMethod<[], [] | [Array<Post>]>,
  'getUserProfile' : ActorMethod<[Principal], [] | [User]>,
  'registerUser' : ActorMethod<[string, string, string], undefined>,
  'share' : ActorMethod<[Post], undefined>,
  'updateUserProfile' : ActorMethod<[string, string, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
