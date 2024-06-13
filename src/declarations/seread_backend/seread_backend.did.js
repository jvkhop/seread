export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'title' : IDL.Text,
    'content' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'getAllSecrets' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'share' : IDL.Func([IDL.Principal, Post], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
