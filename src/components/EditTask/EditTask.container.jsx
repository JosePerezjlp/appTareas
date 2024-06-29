import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditTask = () => {
    const params = useParams()
    const [subTask,setSubTask] = useState([])
    const [task, setTask] = useState(null)
    const [taskText, setTaskText] = useState('')
    const [newTaskName, setNewTaskName] = useState('')
    const [newSubTask, setNewSubTask] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [startPage, setStartPage] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertTwo, setShowAlertTwo] = useState(false);
    const [showAlertSuccess,setShowAlertSuccess] = useState(false)
    const [showAlertSuccessTwo,setShowAlertSuccessTwo] = useState(false)
    const [showAlertDelete,setShowAlertDelete] = useState(false)
    const itemsPerPage = 10
    const visibles_page = 3

    const handleMouseEnter = () => {
      setShowAlert(true);
    };
    const handleMouseEnterTwo = () => {
        setShowAlertTwo(true);
      };
  
    const handleMouseLeave = () => {
      setShowAlert(false);
    };

    const handleMouseLeaveTwo = () => {
        setShowAlertTwo(false);
      };   
  
    const handleInputChange = (e) => {
      setNewTaskName(e.target.value)
    }
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && newTaskName.trim() !== '') {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
        const updatedTasks = storedTasks.map(task => {
          if (task.id === parseInt(params.id)) {
            return { ...task, text: newTaskName }
          }
          return task
        });
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        setTaskText(newTaskName)
        setNewTaskName('')
        setShowAlertSuccess(true)
        setTimeout(() => {
          setShowAlertSuccess(false);
        }, 5000); 
      }
    }

    const handleAddSubTask = () => {
        if (newSubTask.trim() !== '') {
          let newId = 1      
         
          if (task.subTasks && task.subTasks.length > 0) {
            newId = Math.max(...task.subTasks.map(subTask => subTask.id)) + 1
          }
      
          const newTask = {
            id: newId,
            text: newSubTask
          };      
         
          const updatedTask = { ...task }
          if (!updatedTask.subTasks) {
            updatedTask.subTasks = []
          }
          updatedTask.subTasks.push(newTask);     
        
          const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
          const updatedTasks = storedTasks.map(t => {
            if (t.id === updatedTask.id) {
              return updatedTask;
            }
            return t
          });
          localStorage.setItem("tasks", JSON.stringify(updatedTasks))      
  
          setTask(updatedTask)
          setNewSubTask('')
          setSubTask(updatedTask.subTasks)
          setShowAlertSuccessTwo(true)
          setTimeout(() => {
            setShowAlertSuccessTwo(false);
          }, 5000);       
        }
      }      

      const deleteSubTask = (subTaskId) => {
        const updatedTask = {
            ...task,
            subtasks: task.subTasks.filter(subTask => subTask.id !== subTaskId),
          }

          const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
          const updatedTasks = storedTasks.map(t => {
            if (t.id === updatedTask.id) {
              return updatedTask
            }
            return t
          });

          localStorage.setItem("tasks", JSON.stringify(updatedTasks))
          setTask(updatedTask)
          setSubTask(updatedTask.subtasks)
          setShowAlertDelete(true)
          setTimeout(() => {
            setShowAlertDelete(false);
          }, 5000);       
        
      };

    const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTasks = subTask.slice(startIndex, startIndex + itemsPerPage)

  const totalPages = Math.ceil(subTask.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const handleNextSet = () => {
    setStartPage(startPage + visibles_page)
  };

  const handlePreviousSet = () => {
    setStartPage(startPage - visibles_page)
  };

  const visiblePages = Array.from({ length: Math.min(visibles_page, totalPages - startPage + 1) }, (_, index) => startPage + index);

 useEffect(() => {     

      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
      const task = storedTasks.find(task => task.id === parseInt(params.id))  

      if (task) {
        setTask(task)
        setTaskText(task.text)
        setSubTask(task?.subTasks)
      }
    }, [params.id])
   
  return (
    <div className="flex flex-col justify-center mx-auto mt-10 w-3/12" >
      <h1 className="text-center text-white font-bold max-w-full">Editar Tarea id : {params.id}</h1>
      
        <div className="flex flex-col border border-gray-300 p-2 rounded mt-10 bg-white">       
       <div className="flex flex-col justify-center mb-4">
           <p className="font-bold max-w-full w-full">Texto actúal: {taskText}</p> 
           <span
            className="text-gray-600 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
           <span className="text-red-500">Nota*</span>
          </span>
          {showAlert && (
          <span className="text-sm text-red-500">Puedes cambiar el nombre de la tarea seleccionada rellenando el siguiente cuadro y presionando enter.</span>
        )}
         <input
          type="text"
          value={newTaskName}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Cambiar nombre tarea"
          className="border border-gray-300 rounded py-1 px-2 mt-2"
        />        
            {showAlertSuccess && (
          <span className="text-sm text-green-400 mt-2">Se actualizo correctamente.</span>
        )} 
      </div>
      </div>
      <div className="flex flex-col border border-gray-300 p-2 rounded mt-10 bg-white">        
        <div className="flex flex-col mb-4">
            <label className="font-bold">Agregar nueva subtarea <span
            className="text-gray-600 cursor-pointer"
            onMouseEnter={handleMouseEnterTwo}
            onMouseLeave={handleMouseLeaveTwo}
          >
           <span className="text-red-500">*</span>
          </span>
          {showAlertTwo && (
          <span className="text-sm text-red-500">Aquí puedes agregarle subtareas a esta misma tarea llenando el siguiente cuadro.</span>
        )}</label>
        <input
          type="text"        
          placeholder="cocinare papas"
          className="border border-gray-300 rounded py-1 px-2 mt-2"
          onChange={(e) => setNewSubTask(e.target.value)}   
          value={newSubTask}  
        />  
        </div>       
          <button onClick={handleAddSubTask} className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-1 rounded mr-20 mt-3 ml-20">
          Agregar
        </button>  
        {showAlertSuccessTwo && (
          <span className="text-sm text-green-400 mt-2">Se creó correctamente.</span>
        )} 
   </div>       
 
      { subTask?.length === 0 ? "":   
        <div className="mt-6">
          <ul className="border border-gray-300 rounded p-4 bg-white">
            {currentTasks?.map(items => (
              <li key={items.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                <span className="font-bold">{items.text}</span>
                <div>              
                  <button onClick={() => deleteSubTask(items.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
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

export default EditTask;
