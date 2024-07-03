//
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Types "types";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

actor {

    /////////////////
    //   TYPES    //
    ///////////////
    type Post = Types.Post;
    type Result<Ok, Err> = Types.Result<Ok, Err>;
    type HashMap<K, V> = Types.HashMap<K, V>;
    type User = {
        principal : Principal;
        username : Text;
        email : Text;
        bio : Text;
    };

     /////////////////
    //   CORE      //
    ////////////////   
    var users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
    var posts = HashMap.HashMap<Principal, [Post]>(0, Principal.equal, Principal.hash);
    // Stable variables for upgrade
    stable var postId : Nat = 0;
    // stable var usersStorage : [(Principal, User)] = [];
    // stable var postsStorage : [(Principal, [Post])] = [];

    // Check the postId:
    public query func checkPostId() : async Nat {
        return postId;
    };

    //Allow users to reveal their secrets
    public shared (msg) func share(post: Post) : async () {
        switch (users.get(msg.caller)) {
            case (null) {
                // Handle case where user is not found
                Debug.print("User not found.");
            };
            case (? user) {
                postId += 1;
                let newPost : Post = {
                    userPrincipal = msg.caller;
                    title = post.title;
                    content = post.content;
                    timestamp = Time.now();
                    likes = 0;
                    id = postId;
                };
                Debug.print("New Post: " # debug_show(newPost.id)); // Debugging line

                let currentPosts = Option.get(posts.get(msg.caller), []);
                var updatedPosts = Buffer.fromArray<Post>(currentPosts);
                updatedPosts.add(newPost);

                let addedArray = Buffer.toArray(updatedPosts);
                posts.put(msg.caller, addedArray);

                Debug.print("Posts for user: " # debug_show(Principal.toBlob(msg.caller)) # " - " # debug_show(addedArray));
            };
        };
    };

    // Query to get post from a user
    public shared (msg) func getPost() : async ?[Post] {
        return posts.get(msg.caller);
    };

    // Query to get all secrets
    public query func getAllSecrets() : async [Post] {  
        let allPosts = Buffer.Buffer<Post>(0);

        for ((_, eachGroup) in posts.entries()) {
            for (post in eachGroup.vals()) {
                allPosts.add(post);
            };
        };

        let returnedArray = Buffer.toArray(allPosts);
        Debug.print("All Secrets: " # debug_show(returnedArray)); // Debugging line
        return returnedArray;
    };

    public shared (msg) func deletePost(postId : Nat) : async () {
        switch (posts.get(msg.caller)) {
            case (null) {
                // Handle case where user is not found
            };
            case (? post) {
                let updatedPost = Buffer.Buffer<Post>(post.size());
                
                for (index in Iter.range(0, post.size() - 1)) {
                    if (post[index].id != postId) {
                        updatedPost.add(post[index]);
                    }
                };

                let returnedArray = Buffer.toArray(updatedPost);
                posts.put(msg.caller, returnedArray);
            }
        }
    };

    public shared (msg) func baddassPost(post : Post) : async() {
        switch (users.get(msg.caller)) {
            case (null) {
                // Handle case they forget to log in
            };
            case (? user) {
                let newPost = {
                        userPrincipal = post.userPrincipal;
                        title = post.title;
                        content = post.content;
                        timestamp = post.timestamp; 
                        likes = post.likes + 1;
                        id = post.id;
                };
                let currentPosts = Option.get(posts.get(msg.caller), []);
                var updatedPosts = Buffer.Buffer<Post>(0);
                for (index in Iter.range(0, currentPosts.size() - 1)) {
                    if (currentPosts[index].id != post.id) {
                        updatedPosts.add(currentPosts[index]);
                    };
                };
                updatedPosts.add(newPost);

                let returnedArray = Buffer.toArray(updatedPosts);
                posts.put(msg.caller, returnedArray);
            };
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////     U                S             E              R           ////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////

    // Public function to register users who log in with Internet Identity
    public shared (msg) func registerUser(username : Text, email : Text, bio : Text) : async () {
        switch (users.get(msg.caller)) {
            case (null) {
                users.put(msg.caller, { principal = msg.caller; username = username; email = email; bio = bio; });
            };
            case (? user) {
                // Handle user already registered, e.g., update info or return an error
                // For example:
                // return Debug.print("User already registered");
            };
        };
    };

    public shared (msg) func updateUserProfile(username : Text, email : Text, bio : Text) : async () {
        switch (users.get(msg.caller)) {
            case (null) {
                // Handle case where user is not found
            };
            case (? user) {
                let updatedUser = {
                    principal = msg.caller;
                    username = username;
                    email = email;
                    bio = bio;
                };
                users.put(msg.caller, updatedUser);
            };
        };
    };

    // Query to get a user profile by principal
    public query func getUserProfile(principal: Principal) : async ?User {
        return users.get(principal);
    };

    public shared (msg) func getId() : async Text {
        return Principal.toText(msg.caller);
    };

    // system func preupgrade() {
    //     usersStorage := Iter.toArray(users.entries());
    //     postsStorage := Iter.toArray(posts.entries());
    // };

    // system func postupgrade() {
    //     users := HashMap.fromIter<Principal, User>(usersStorage.vals(), 1, Principal.equal, Principal.hash);
    //     posts := HashMap.fromIter<Principal, [Post]>(postsStorage.vals(), 1, Principal.equal, Principal.hash);
    // };
}


// Some key change:
// Kill the Post : [Post] in User type:
// == > 2 HashMap:
    // var users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
    // var posts = HashMap.HashMap<Principal, Post>(0, Principal.equal, Principal.hash);
// Better memory, better handling things!