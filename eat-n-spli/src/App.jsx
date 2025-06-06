import { Children } from "react";
import "./App.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    balance: -7,
    image: "Pizza-4.png.JPG",
  },
  { id: 933382, name: "Sarah", balance: 20, image: "Pizza-1.png.JPG" },
  { id: 499467, name: "Anthony", balance: 0, image: "Pizza-2.png.JPG" },
];
export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
    </div>
  );
}

function FriendsList() {
  return (
    <div>
      <ul>
        {initialFriends.map((friend) => (
          <Friends
            friend={friend.name}
            image={friend.image}
            balance={friend.balance}
            key={friend.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Friends({ friend, image, balance, children }) {
  return (
    <div>
      <li>
        <img src={image} alt={friend} />
        <h3>{friend}</h3>
        {balance < 0 && (
          <p className="red">
            You owe {friend} ${Math.abs(balance)}
          </p>
        )}
        {balance > 0 && (
          <p className="green">
            {friend} owe you ${balance}
          </p>
        )}
        {balance === 0 && <p className="none">You and {friend} are even</p>}
        <Button>Select</Button>
      </li>
    </div>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🤼 Friends name:</label>
      <input type="text" placeholder="add friend..." />

      <label>🎴 Image URL:</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return <form className="forn-split-bill"></form>;
}
