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
  const [selectedFriend, setSelectedFriend] = useState(null);

  //console.log(selectedFriend);
  //console.log(friends);
  //console.log(friends.id === selectedFriend);
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);

    setShowAddFriend(false);
  }

  function onShowAdd() {
    setShowAddFriend((showAdd) => !showAdd);
  }

  function handleSelection(friend) {
    setSelectedFriend((selected) => (selected === friend ? null : friend));

    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    //console.log(value);
    setFriends((friend) =>
      friend.map((friends) =>
        friends.name === selectedFriend
          ? { ...friends, balance: friends.balance + value }
          : friends
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friend={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={onShowAdd}>
          {!showAddFriend ? "Add friend" : "Close"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friend, onSelection, selectedFriend }) {
  return (
    <div>
      <ul>
        {friend.map((friend) => (
          <Friends
            friend={friend.name}
            image={friend.image}
            balance={friend.balance}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
            key={friend.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Friends({ friend, image, balance, onSelection, selectedFriend }) {
  const isSelected = selectedFriend === friend;

  return (
    <div>
      <li className={isSelected ? "selected" : ""}>
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
        <Button onClick={() => onSelection(friend)}>
          {isSelected ? "Close" : "Select"}
        </Button>
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoPays, setWhoPays] = useState("you");
  const friendExpenses = bill && paidByUser ? bill - paidByUser : "";
  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoPays === "you" ? friendExpenses : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend}</h2>

      <label>💰 Bill value:</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>💵 Your expense:</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      />

      <label>🤼 {selectedFriend}'s expense</label>
      <input type="text" value={friendExpenses} disabled />

      <label>💵 Who's paying the bills</label>
      <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriend}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
