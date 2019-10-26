const express =require('express');

const server = express();
server.use(express.json());

const projects = [];
const SucessRequires = 0;

function countNumberOfRequires(req, res, next){
  console.count("Número de requisições");

  return next();
}

server.use(countNumberOfRequires);

function checkProjectExists(req, res, next){
  const id = req.params.id;

  projects.forEach(function (project){
    if(project.id == id){
      next();
    }
  }); 
  return res.status(400).json({error: 'Projeto não encontrado.'}) 
};

server.post('/projects', (req, res) => {
  projects.push(req.body);

  return res.json({"Message": "Projeto Inserido"});
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json({"Message": "Projeto Alterado"});
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const id = req.params.id;

  for( var i = 0; i < projects.length; i++){ 
    if(projects[i].id == id){
      projects.splice(i, 1); 
      return res.json({"Message": "Projeto Removido"});
    }
  }
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const id = req.params.id;

  projects.forEach(function (project){
    if(project.id == id){
      project.tasks.push(req.body.title);
    }
  });  
  
  return res.json({"Message": "Tarefa adicionada."});
});


server.listen(3000);