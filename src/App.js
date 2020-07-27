import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [ repositorys, setRepositorys ] = useState([]);
  const [ mounted, setMounted ] = useState(0);
  
  useEffect( ( ) => { 

    const getRepositories = async () => {
      const response = await api.get('/repositories');
      setRepositorys(response.data)
    }
    getRepositories();
           

  },[ mounted ]);

  async function handleAddRepository() {
    
    const response = await api.post('./repositories',{
      "title":`Novo repositorio ${Date.now()} `,
      "url":"https://github.com/wendelrios/bootcamp",
      "techs": [
        "Node JS",
        "Express",
        "React"
      ]
    });

    setRepositorys([...repositorys, response.data]);
    setMounted(mounted+1);
  }

  async function handleRemoveRepository(id) {
    api.delete(`./repositories/${id}`, {
      data:{id}
    });
    setMounted(mounted+1);
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
