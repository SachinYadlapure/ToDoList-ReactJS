import React, { useState, useEffect } from "react";
import "./style.css";

// get the local storage data back

const getLocalData = () => {
  const lists = localStorage.getItem("myList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  //   add the item function
  const addItem = () => {
    if (!inputData) {
      alert("Please Fill The Data");
    } else if (inputData && toggleBtn) {
      setItems(
        items.map((item) => {
          if (item.id === isEditItem) {
            return { ...item, name: inputData };
          }
          return item;
        })
      );
      setInputData("");
      setIsEditItem("");
      setToggleBtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //   edit the items

  const editItem = (id) => {
    const item_todo_edited = items.find((item) => {
      return item.id === id;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(id);
    setToggleBtn(true);
  };

  // how to delete items
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(updatedItems);
  };

  //   remove all items

  const removeAll = () => {
    setItems([]);
  };

  //   adding local storage

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(items));
  }, [items]);

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src="./images/todo.svg" alt="todologo" />
          <figcaption>Add Your List Here ✌</figcaption>
        </figure>
        <div className="addItems">
          <input
            type="text"
            placeholder="✍ Add Item"
            className="form-control"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {toggleBtn ? (
            <i className="far fa-edit add-btn" onClick={addItem}></i>
          ) : (
            <i className="fa fa-plus-square add-btn" onClick={addItem}></i>
          )}
        </div>
        {/* show our items */}
        <div className="showItems">
          {items.map((item) => {
            return (
              <div className="eachItem" key={item.id}>
                <h3>{item.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(item.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(item.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        {/* remove all button */}

        <div className="showItems">
          <button
            className="btn effect04"
            data-sm-link-text="Remove All"
            onClick={removeAll}
          >
            <span>CHECK LIST</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
