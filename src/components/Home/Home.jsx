import React, { useEffect, useState } from "react";
import { LinkButton } from "./Home.styles";
import routes from "../../config/settings/routes";

const Home = () => {
  const [listTask, setListTask] = useState([]);
  const [input, setInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1)
  const [showAlertSuccess,setShowAlertSuccess] = useState(false)
  const [showAlertDelete,setShowAlertDelete] = useState(false)
  const itemsPerPage = 10
  const visibles_page = 3

  useEffect(() => {

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setListTask(storedTasks)
  }, []);

  const generateNewId = (tasks) => {
    let newId = 1
    const taskIds = tasks.map(task => task.id);
    while (taskIds.includes(newId)) {
      newId++
    }
    return newId;
  };

  const addTask = () => {
    if (input.trim() === '') {
      return
    }

    const newId = generateNewId(listTask);

    const newTask = {
      id: newId,
      text: input,
      subTasks:[]
    };

    const updatedTasks = [...listTask, newTask];

    setListTask(updatedTasks)
    setInput('')

    localStorage.setItem("tasks", JSON.stringify(updatedTasks))

    setShowAlertSuccess(true)
    setTimeout(() => {
      setShowAlertSuccess(false);
    }, 5000); 
  };

  const deleteTask = (taskId) => {

    const updatedTasks = listTask.filter(task => task.id !== taskId)
    setListTask(updatedTasks)

    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
 
    setShowAlertDelete(true)
    setTimeout(() => {
      setShowAlertDelete(false);
    }, 5000); 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask()
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTasks = listTask.slice(startIndex, startIndex + itemsPerPage)

  const totalPages = Math.ceil(listTask.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleNextSet = () => {
    setStartPage(startPage + visibles_page)
  }

  const handlePreviousSet = () => {
    setStartPage(startPage - visibles_page)
  }

  const visiblePages = Array.from({ length: Math.min(visibles_page, totalPages - startPage + 1) }, (_, index) => startPage + index)
  return (
    <div className="flex flex-col justify-center mx-auto mt-10 w-3/12">
      <h1 className="text-center text-white font-bold">Crea tus tareas del día</h1>
      <form className="border border-gray-300 p-2 rounded mt-10 mb-10 bg-white" onSubmit={handleSubmit}>
        <div className="flex items-start justify-center">
          <div className="flex flex-col mb-4">
            <label className="font-bold mb-2">Crea una tarea</label>
            <input
              className="border border-gray-300 p-2 rounded"
              type="text"
              placeholder="mañana comprar verduras"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 ml-6">
            Crear
          </button>       
        </div>
        {showAlertSuccess && (
          <span className="text-sm text-green-400 mt-2 ml-6">Se creo correctamente.</span>
        )}
      </form>
      {listTask.length === 0 ? "" :
        <div className="bg-white border border-gray-300 rounded">
          <ul className="p-4">
            {currentTasks.map(items => (
              <li key={items.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                <span>{items.text}</span>
                <div>
                  <LinkButton to={routes.editTask.replace(/:id/, items.id)} className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-2 rounded mr-2">
                    Editar
                  </LinkButton>
                  <button onClick={() => deleteTask(items.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    &times;
                  </button>
                </div>
              </li>
            ))}
                        {showAlertDelete && (
          <span className="text-sm text-red-500 mt-2">Se elimino correctamente.</span>
        )} 
          </ul>
          <div className="flex justify-center mt-4">
            {startPage > 1 && (
              <button onClick={handlePreviousSet} className="mx-1 px-3 py-1 rounded bg-gray-200">
                &lt;
              </button>
            )}
            {visiblePages.map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {page}
              </button>
            ))}
            {startPage + visibles_page <= totalPages && (
              <button onClick={handleNextSet} className="mx-1 px-3 py-1 rounded bg-gray-200">
                &gt;
              </button>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default Home;
