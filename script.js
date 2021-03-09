// {<li class="list-group-item">An item</li>
//       <li class="list-group-item">A second item</li>
//       <li class="list-group-item">A third item</li>
//       <li class="list-group-item">A fourth item</li>
//       <li class="list-group-item">And a fifth one</li>}

var ulTag = document.getElementById('TaskList');

var taskArr = [];
var listToBeRemoved = null;
var value ='';

fetch('https://jsonplaceholder.typicode.com/todos').
then(response=>response.json())
.then(data=>{
	data.map((item)=>{
		createTaskList(item.title,item.completed);
	});
})

function addTask(){
	value = document.getElementById('inputTask').value;
	createTaskList(value);
}
function createTaskList(value,completed){
		if(value.length && !taskArr.includes(value)){
			var listItem = document.createElement('li');
			var textNode = document.createTextNode(value);
			taskArr = [value, ...taskArr];
		
			//Icon creation starts
			var icon = document.createElement('i');
			icon.classList.add('fa');
			icon.classList.add('fa-trash-o');
			icon.style.float='right';
			icon.addEventListener('click',(event)=>removeTask(event));
			//Icon creation ends
		
			listItem.appendChild(textNode);
			listItem.appendChild(icon);
			listItem.classList.add("list-group-item");

            if(completed){
               listItem.classList.add('list-group-item-success');
			}
			else{
				listItem.classList.add('list-group-item-danger');
			}

			ulTag.appendChild(listItem);
			document.getElementById('inputTask').value = '';
			}
			else{
				alert("Please enter valid task");
			}
}

function removeTask(event){
	document.getElementsByClassName('modal')[0].style.display='block';
	listToBeRemoved = event.target.parentNode;
}

function confirmDelete(){
	listToBeRemoved && listToBeRemoved.remove();
	document.getElementsByClassName('modal')[0].style.display='none';
	taskArr = taskArr.filter(item=>item!==value)
}

function cancelDelete(){
	document.getElementsByClassName('modal')[0].style.display='none';
}

function onEnterAdd(event){
	if(event.keyCode===13){
		addTask();
	}
} 