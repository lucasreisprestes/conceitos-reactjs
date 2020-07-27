import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositorys, setRepositorys] = useState([]);
    
  useEffect( ( ) => { 

    api.get('repositories').then(response => {
      setRepositorys(response.data);
    });
        
  },[]);

  async function handleAddRepository() {
    
    const response = await api.post('/repositories',{
      title:`Novo repositorio ${Date.now()} `,
      url:"https://github.com/wendelrios/bootcamp",
      techs: [
        "Node JS",
        "Express",
        "React"
      ]
    });

    setRepositorys([...repositorys, response.data]);
  
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204){
      
      const repositoryList = repositorys.filter(repository => repository.id !== id);
      
      setRepositorys(repositoryList);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        
            {repositorys.map(repo => 
              <li key={repo.id}>  
                <h1>{repo.title}</h1>
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )}            
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
