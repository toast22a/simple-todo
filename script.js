var tasks = []

var ctr = 0

var patt = /./

var Task = function(name){
  var ret = {id : ctr, name, done : false}
  ctr += 1
  return ret
}

function addTask(name){
  tasks.push(Task(name))
  refreshTasks()
  checkEmpty()
}

function deleteTask(id){
  tasks = tasks.filter((x)=>x.id != id)
  refreshTasks()
  checkEmpty()
}

function clearTasks(){
  tasks = []
  refreshTasks()
  checkEmpty()
}

function checkEmpty(){
  if ($("div.task-list").children().length == 0) {
    $("div.task-empty").css("display", "block")
  } else {
    $("div.task-empty").css("display", "none")
  }
}

function refreshTasks(){
  $("div.task-list").empty()
  for (var i = 0 ; i < tasks.length ; i++){
    var task = document.createElement("div")
    var task_name = document.createElement("div")
    var task_name_span = document.createElement("span")
    var task_mark_done = document.createElement("button")

    task.className = "task"
    task_name.className = "task-name"
    task_mark_done.className = "task-mark-done"

    $(task_name_span).text(tasks[i].name)
    $(task_mark_done).text("X")

    task_name.appendChild(task_name_span)
    task.appendChild(task_name)
    task.appendChild(task_mark_done)

    $(task).attr("data-taskid", tasks[i].id)

    $("div.task-list").append(task)
  }

  $("button.task-mark-done").click(function(){
    var id = $(this).parent().attr("data-taskid")
    deleteTask(id)
  })
}

$(document).ready(function(){
  $("input.task-input-text").on("keypress", function(e){
    if (e.keyCode == 13){
      var name = $("input.task-input-text").val()
      if (name.trim() != ""){
        addTask(name)
        $("input.task-input-text").val("")
      }
    }
  })

  $("button.task-input-button").click(function(){
    var name = $("input.task-input-text").val()
    if (name.trim() != ""){
      addTask(name)
      $("input.task-input-text").val("")
    }
  })

  $("button.task-clear-all").click(function(){
    clearTasks()
  })

  $("input.list-title").focusout(function(){
    document.title = $("input.list-title").val()
  })

  $(document).keypress(function(e){
    if (!$(":focus")[0]){
      $("input.task-input-text").focus()
      $("input.task-input-text").trigger(e)
    }
  })

  checkEmpty()
})
