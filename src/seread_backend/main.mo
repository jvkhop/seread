//
import Result "mo:base/Result";
//
import Buffer "mo:base/Buffer";
//
import HashMap "mo:base/HashMap";
//
import Iter "mo:base/Iter";
//
import Principal "mo:base/Principal";
//
import Option "mo:base/Option";
//
import Types "types";
//
import Nat32 "mo:base/Nat32";
//
import Hash "mo:base/Hash";
//
import Time "mo:base/Time";
//
import Array "mo:base/Array";


actor {

    /////////////////
    //   TYPES    //
    ///////////////
    type Post = Types.Post;
    type Result<Ok, Err> = Types.Result<Ok, Err>;
    type HashMap<K, V> = Types.HashMap<K, V>;

     /////////////////
    //   CORE      //
    ////////////////   
    var owner : Principal = Principal.fromText("7ekfb-rzz3v-hqpqo-o6rkv-xvde6-l5a4r-hviuc-gizoh-5ybe5-fgnxl-cqe");
    var posts = HashMap.HashMap<Principal, Post>(0, Principal.equal, Principal.hash);

    //Allow users to post their secrets
    public func share(id: Principal, post: Post) {
        let newPost : Post = {
            title = post.title;
            content = post.content;
            timestamp = Time.now(); 
        };
        posts.put(id, newPost);
    };

    public query func getAllSecrets() : async [Post] {  
        var allSecrets : [Post] = [];
    
        let entries = Iter.toArray<(Principal, Post)>(posts.entries());
    
        for ((_, post) in entries.vals()) {
            allSecrets := Array.append(allSecrets, [post]);
        };
    
        return allSecrets;
    };
}