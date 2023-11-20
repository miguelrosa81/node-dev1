const validateTitle = (request, response, next) =>{
  const { body } = request;
  if(body.title === undefined) {
    return response.status(400).json({message: 'The field title está indefinido'});
  }

  if(body.title === '') {
    return response.status(400).json({message: 'The field title está vazio'});
  }
  next();
};


const validateDelete = (request, response, next) =>{
  const { id } = request.params;
  if(id === undefined) {
    return response.status(400).json({message: 'The field ID está indefinido'});
  }
  
  if(id === '') {
    return response.status(400).json({message: 'The field ID está vazio'});
  }
  next();
};

const validateStatus = (request, response, next) =>{
  const { body } = request;
  if(body.status === undefined) {
    return response.status(400).json({message: 'The field status está indefinido'});
  }
  
  if(body.status === '') {
    return response.status(400).json({message: 'The field status está vazio'});
  }
  next();
};

module.exports = {
  validateTitle,
  validateDelete,
  validateStatus
};