import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])
  const [projectName, setProjectName] = useState('');

  useEffect(() =>{
    api.get('/repositories').then(response => {setRepositories(response.data)})
  },[])

  async function handleAddRepository() {
    try {
    //  if (projectName === '' || projectName === null){
    //     return alert('Favor preencher o nome do projeto!');
    //   } 
      const response = await api.post('/repositories', {
        title: projectName,
        url: "localhost", 
        techs: ["Node", "React", "React Native"]
      });

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setProjectName('');
    } catch (error) {
      alert("error, could not create the repository.")
    }
  }

  async function handleRemoveRepository(id) {

    try {
      await api.delete(`repositories/${id}`);
    
      setRepositories(repositories.filter(repository => repository.id !== id));

    } catch (error) {
      alert('Error, repository could not be deleted!')
    }
  }

  return (
    <div className="container">
      <h1>React Challenge</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
        
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        )}
      </ul>
      <div className='inputs'>
        <input
          value={projectName} 
          type="text" 
          placeholder="Nome do Repositorio"
          onChange={e => setProjectName(e.target.value)}
        />
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
