import React from 'react';
import "../../../assets/styles/secrets.css";

const Post = ({ posts, loading, handleBaddass }) => {
    if (loading) {
        return <h1>Loading...</h1>;
    }



    return (
        <>
            {posts.map((secret) => (
                // <div className='list' key={secret.id}>
                secret.imgUrl ?
                    <div className='list1' key={secret.id}>

                        <div className="image-part list1-item">
                            <img src={secret.imgUrl} className="imgPost"/>
                        </div>

                        <div className="text-part list1-item">
                            <h3>{secret.title}</h3>
                            <p>{secret.content}</p>
                            <small>{new Date(Number(secret.timestamp) / 1000000).toLocaleString()}</small>
                            <button onClick={() => handleBaddass(secret)}>Baddass!</button>
                            <p>
                                {Number(secret.likes)} baddass!
                            </p>
                        </div>

                    </div>

                    :
                    <div className='list2' key={secret.id}>
                        <div className="text-part">
                            <h3>{secret.title}</h3>
                            <p>{secret.content}</p>
                            <small>{new Date(Number(secret.timestamp) / 1000000).toLocaleString()}</small>
                            <button onClick={() => handleBaddass(secret)}>Baddass!</button>
                            <p>
                                {Number(secret.likes)} baddass!
                            </p>
                        </div>
                    </div>
            ))}
        </>
    );
};

export default Post;