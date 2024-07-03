export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'likes' : IDL.Nat,
    'userPrincipal' : IDL.Principal,
    'timestamp' : IDL.Int,
  });
  const User = IDL.Record({
    'bio' : IDL.Text,
    'principal' : IDL.Principal,
    'username' : IDL.Text,
    'email' : IDL.Text,
  });
  return IDL.Service({
    'baddassPost' : IDL.Func([Post], [], []),
    'checkPostId' : IDL.Func([], [IDL.Nat], ['query']),
    'deletePost' : IDL.Func([IDL.Nat], [], []),
    'getAllSecrets' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'getId' : IDL.Func([], [IDL.Text], []),
    'getPost' : IDL.Func([], [IDL.Opt(IDL.Vec(Post))], []),
    'getUserProfile' : IDL.Func([IDL.Principal], [IDL.Opt(User)], ['query']),
    'registerUser' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'share' : IDL.Func([Post], [], []),
    'updateUserProfile' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
