/* load list from local storage (or use empty list) */
let jsonObj = localStorage.getItem('todos') || '[]';
let todolist = JSON.parse(jsonObj);

const app = new Vue({
    el: '#app',

    data(){
        return{
            todos: todolist,
            text: '',
            idx: todolist.length
        }
    }, //data()

    methods: {
        inputText(e){
            this.text = e.target.value;
        },

        addTodo(){
            if(!this.text) return;

            const text = this.text;
            const id = this.idx;
            this.idx = this.idx + 1;
            const todo = {
                id,
                text,
                isDone: false
            };
            this.todos.push(todo);
            this.resetText();
            saveTodos();
        },

        resetText(){
            this.text = '' ;
        },

        deleteTodo(id){
            const index = this.getIndexBy(id);
            this.todos.splice(index, 1);
            saveTodos();
        },

        toggleIsDone(id){
            const index = this.getIndexBy(id);
            this.todos[index].isDone = !this.todos[index].isDone;
            saveTodos();
        },

        getIndexBy(id){
            const filteredTodo = this.todos.filter(todo => todo.id === id)[0];
            // [0] = first one that matches
            const index = this.todos.indexOf(filteredTodo);
            return index;
        }
    }, //methods

    computed: {
        doneTodo(){
            return this.todos.filter(todo => todo.isDone === true);
        },
        incompleteTodo(){
            return this.todos.filter(todo => todo.isDone === false);
        }
    }


}); //vue()

/* overwrite list in local storage with new list */
function saveTodos() {
    var obj = JSON.stringify(app.todos);
    localStorage.setItem('todos', obj);
}
