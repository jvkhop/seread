import React from 'react';

const Post = ({ posts, loading, handleBaddass }) => {
    if (loading) {
        return <h1>Loading...</h1>;
    }

    

    return (
        <>
            {posts.map((secret) => (
                <div className='list' key={secret.id}>
                    <h3>{secret.title}</h3>
                    <p>{secret.content}</p>
                    <small>{new Date(Number(secret.timestamp) / 1000000).toLocaleString()}</small>
                    <button onClick={() => handleBaddass(secret)}>Baddass!</button>
                    <p>
                        {Number(secret.likes)} baddass!
                    </p>
                </div>
            ))}
        </>
    );
};

export default Post;

// {secrets.map((secret, index) => (
//     <div key={index} className="each-secret">
//       <h3>{secret.title}</h3>
//       <p>{secret.content}</p>
//       <small>{new Date(Number(secret.timestamp) / 1000000).toLocaleString()}</small>
//       <button onClick={() => handleBaddass(secret)}>Baddass!</button>
//       <p>
//         {Number(secret.likes)} baddass!
//       </p>
//     </div>
//   ))}