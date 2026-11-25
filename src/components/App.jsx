
import React, { useState, useEffect } from "react";
import ToyContainer from "./ToyContainer";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const API_URL = "http://localhost:3000/toys";

  // Fetch all toys
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setToys(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching toys:", error);
      });
  }, []);

  // Add a new toy
  function handleAddToy(newToy) {
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then((response) => response.json())
      .then((data) => {
        setToys((currentToys) => [...currentToys, data]);
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error adding toy:", error);
        throw error;
      });
  }

  // Like a toy
  function handleLike(toy) {
    const updatedLikes = Number(toy.likes) + 1;

    setToys((currentToys) =>
      currentToys.map((item) =>
        item.id === toy.id
          ? { ...item, likes: updatedLikes }
          : item
      )
    );

    fetch(`${API_URL}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: updatedLikes
      })
    }).catch((error) => {
      console.error("Error updating likes:", error);
    });
  }

  // Donate a toy
  function handleDonate(id) {
    setToys((currentToys) =>
      currentToys.filter((toy) => toy.id !== id)
    );

    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    }).catch((error) => {
      console.error("Error deleting toy:", error);
    });
  }

  return (
    <div className="app">
      <h1>Toy Store</h1>

      <button onClick={() => setShowForm(!showForm)}>
        Add a Toy
      </button>

      {showForm && (
        <ToyForm onAddToy={handleAddToy} />
      )}

      <ToyContainer
        toys={toys}
        onLike={handleLike}
        onDonate={handleDonate}
      />
    </div>
  );
}

export default App;
