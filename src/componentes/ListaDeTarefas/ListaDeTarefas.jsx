import React, { useEffect, useState } from 'react';

const URL_TAREFAS = 'https://jsonplaceholder.typicode.com/todos';
const URL_USUARIOS = 'https://jsonplaceholder.typicode.com/users';

const ListaDeTarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const [resTarefas, resUsuarios] = await Promise.all([
          fetch(URL_TAREFAS),
          fetch(URL_USUARIOS)
        ]);
        const tarefas = await resTarefas.json();
        const usuarios = await resUsuarios.json();
        setTarefas(tarefas);
        setUsuarios(usuarios);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    };

    buscarDados();
  }, []);

  const obterNomeUsuario = (userId) => {
    const usuario = usuarios.find((user) => user.id === userId);
    return usuario ? usuario.name : 'Usuário Desconhecido';
  };

  return (
    <div>
      <div className="tarefas-completas">
        <h2>Tarefas Completas</h2>
        <ul>
          {tarefas
            .filter((tarefa) => tarefa.completed)
            .map((tarefa) => (
              <li key={tarefa.id}>
                <strike>{obterNomeUsuario(tarefa.userId)} - {tarefa.title}</strike>
              </li>
            ))}
        </ul>
      </div>

      <div className="tarefas-pendentes">
        <h2>Tarefas Pendentes</h2>
        <ul>
          {tarefas
            .filter((tarefa) => !tarefa.completed)
            .map((tarefa) => (
              <li key={tarefa.id}>
                {obterNomeUsuario(tarefa.userId)} - {tarefa.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ListaDeTarefas;