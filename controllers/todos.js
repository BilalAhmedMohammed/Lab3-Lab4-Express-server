const Todo = require('../models/todos');
const todosSpecificUser = async (id) => {
    return await Todo.find({userID:id});
}
const find = () =>Todo.find();
const todoslimit_skip=async (limit,skip) =>{
    return await Todo.find({},null,{limit:limit,skip:skip});
}
const create = (todo) => {
    console.log(todo);
    return Todo.create(todo);
}
const updateTitle = (id, reqBody) => {
    const todo = Todo.findById(id);
    const { title, tags, status } = reqBody;
    return Todo.updateOne({ _id: id }, { title: title ? title : todo.title, tags: tags ? tags : todo.tags, status: status ? status : todo.status });
}
const deleteTodo = (id) => {
    return Todo.deleteOne({ _id: id });
}
module.exports = {
    todosSpecificUser,
    create,
    updateTitle,
    deleteTodo,
    find,
    todoslimit_skip
}