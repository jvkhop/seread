import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";

module {

  public type Result<Ok, Err> = Result.Result<Ok, Err>;
  public type HashMap<Ok, Err> = HashMap.HashMap<Ok, Err>;

  public type Post = {
    title: Text;
    content: Text;
    timestamp: Int; // Adding timestamp for when the post was created
  };

};