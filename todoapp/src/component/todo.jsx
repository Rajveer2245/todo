import { useEffect, useState } from "react";
import TodoCss from "./todo.module.css";
import toast from "react-hot-toast";

function Todo() {
  const Task = JSON.parse(localStorage.getItem("TodoTask")) || [
    { task: "Buy-Iphone", compelete: true },
    { task: "Buy Guitar", compelete: false },
    { task: "Buy Guitar", compelete: false },
  ];

  const [Alltask, setAlltask] = useState(Task);
  const [inputValue, setValue] = useState("");
  const [compelete, setComplete] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [totaltask, setTotaltask] = useState(0);

  function handleTask() {
    if (inputValue) {
      setAlltask([...Alltask, { task: inputValue, compelete: false }]);
    }
    setValue("");
    toast.success("Task Added", {
      duration: 1000,
    });
  }

  function handleChecked(id) {
    const myArray = [...Alltask];
    myArray[id].compelete = !myArray[id].compelete;
    setAlltask(myArray);

    let completedTasks = myArray.filter((value, index) => {
      return value.compelete;
    });

    setComplete(completedTasks.length);

    let remainingTask = myArray.filter((value, index) => {
      return !value.compelete;
    });

    setRemaining(remainingTask.length);
  }

  function handleDelete(id) {
    console.log(id);

    const ArrayOfDelete = [...Alltask];

    let deletedItems = ArrayOfDelete.filter((value, index) => {
      return index !== id;
    });

    setAlltask(deletedItems);
  }

  function handleUpdate(id) {
    let myEdit = [...Alltask];
    let editedTask = myEdit[id];

    let promptTask = prompt(`Edit Task :- ${editedTask.task}`, editedTask.task);

    if (promptTask) {
      let newObj = { task: promptTask, compelete: false };

      myEdit.splice(id, 1, newObj);
    }

    setAlltask(myEdit);
  }

  useEffect(() => {
    const myArray = [...Alltask];
    let completedTasks = myArray.filter((value, index) => {
      return value.compelete;
    });

    setComplete(completedTasks.length);

    let remainingTask = myArray.filter((value, index) => {
      return !value.compelete;
    });

    setRemaining(remainingTask.length);

    let totalTask = myArray.filter((value, index) => {
      return value;
    });

    setTotaltask(totalTask.length);

    localStorage.setItem("TodoTask", JSON.stringify(myArray));
  }, [Alltask]);

  function handleremoveAll() {
    let removeAll = [...Alltask];
    removeAll = [];
    setAlltask(removeAll);
  }

  return (
    <>
      <div className={TodoCss.total}>Total Task :- {totaltask}</div>
      <div className={TodoCss.main}>
        <div className={TodoCss.todo}>
          <h1>My Todo App..🙂</h1>
          <input
            type="text"
            className={TodoCss.input}
            value={inputValue}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button className={TodoCss.btn} onClick={handleTask}>
            Add Task{" "}
          </button>
          {Alltask.map((value, index) => (
            <ul key={index}>
              <span>
                <input
                  type="checkbox"
                  checked={value.compelete}
                  onChange={() => {
                    handleChecked(index);
                  }}
                />
                <span
                  style={{
                    textDecoration: value.compelete ? "line-through" : "",
                  }}
                >
                  {value.task}
                </span>
              </span>
              <span
                className="material-symbols-outlined"
                style={{
                  color: "red",
                  marginLeft: "5px",
                  float: "right",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleDelete(index);
                }}
              >
                delete
              </span>
              <span
                className="material-symbols-outlined"
                style={{
                  color: "green",
                  marginLeft: "5px",
                  float: "right",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleUpdate(index);
                }}
              >
                update
              </span>
            </ul>
          ))}
          <div className={TodoCss.taskdiv}>
            <p>Completed Task :- {compelete}</p>
            <p>Remaining Task :- {remaining}</p>
          </div>

          <div className={TodoCss.btndiv}>
            {Alltask.length ? (
              <button className={TodoCss.removebtn} onClick={handleremoveAll}>
                Remove all
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;