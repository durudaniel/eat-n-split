import { Children, useState } from "react";
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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);

    setShowAddFriend(false);
  }

  function onShowAdd() {
    setShowAddFriend((showAdd) => !showAdd);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friend={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={onShowAdd}>
          {!showAddFriend ? "Add friend" : "Close"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friend }) {
  return (
    <div>
      <ul>
        {friend.map((friend) => (
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

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("c:UsersChiemelaPicturesPizza-5.png.JPG");

  const id = crypto.randomUUID();
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");

    //console.log(newFriend);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤼 Friends name:</label>
      <input
        type="text"
        placeholder="add friend..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🎴 Image URL:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with</h2>

      <label>💰 Bill value:</label>
      <input type="text" />

      <label>💵 Your expense:</label>
      <input type="text" />

      <label>🤼 X's expense</label>
      <input type="text" disabled />

      <label>💵 Who's paying the bills</label>
      <select>
        <option value="you">You</option>
        <option value="friend">friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
