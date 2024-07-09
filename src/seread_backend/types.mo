import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

module {

  public type Result<Ok, Err> = Result.Result<Ok, Err>;
  public type HashMap<Ok, Err> = HashMap.HashMap<Ok, Err>;

  public type Post = {
    userPrincipal: Principal;
    title: Text;
    content: Text;
    timestamp: Int; 
    likes : Nat;
    id : Nat;
    imgUrl : Text; 
  };

};