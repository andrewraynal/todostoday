	$(document).ready(function (){	

	myTodo.init();

});

var myTodo = {
	init: function(){
		this.initStyling();
		this.initEvents();
	},
	initStyling: function(){
		
		this.renderTodo();
	},
	initEvents: function(){
		$(".homeAddTodo").on("click", ".addTodobtn", function(e){
			e.preventDefault();
			myTodo.addTodo();
			$(".homeAddTodo").hide();
			$(".finalTodo").show("slow");
		});
		
		$(".homeAddTodo").on("click", ".seeTodoListbtn", function(e){
			e.preventDefault();
			$(".homeAddTodo").addClass("hide");
			$(".finalTodo").show("slow");
		});

		$(".finalTodoList").on("click", ".addMoreTodobtn", function(e){
			e.preventDefault();
			$(".homeAddTodo").show();
			$(".finalTodo").hide("slow");
		});

		$(".finalTodo").on("click", ".cleartodo", function(e){
			e.preventDefault();
			var $thisTodo = $(this).closest("ul");
			var todoId = $thisTodo.data("todoid");
			console.log(todoId);
      		myTodo.removeTodo(todoId);
		});
		
		$(".finalTodo").on("click", ".edittodo", function(e){
			e.preventDefault();
			var $thisTodo = $(this).closest("ul");
			var todoId = $thisTodo.data("todoid");
      		myTodo.renderTodoDetails(todoId);
      		$(".editTodoForm").removeClass("hide");
      		$(".homeAddTodo").hide();
			$(".finalTodo").hide();
		});

		$(".editTodoForm").on("click", ".gobackbtn", function(e){
			e.preventDefault();
			$(".editTodoForm").hide();
			$(".finalTodo").show("slow");
		});

		$(".editTodoForm").on("click", ".updatebtn", function(e){
			e.preventDefault();
			var todoId = $("#editTodoId").val();
			myTodo.updateTodo(todoId);
		})
	},	

	render: function($el, template, data){
		var tmpl = _.template(template, data);
		
		$el.html(tmpl);	
	},

	renderTodo: function(){

		$.ajax({
			url: "http://tiy-fee-rest.herokuapp.com/collections/andrewr",
			type: "GET",
			datatype: "json",
			error: function(jqXHR, status, error){
				alert("GET ERROR");
			},
			success: function(data, datatype, jqXHR){
				var todos = window.todos = data;
				myTodo.render($(".finalTodo"), Templates.todoPost, todos);
			}
		});
	},
	renderTodoDetails: function(todoid){
		var $thisTodo = $(this).parent("ul");
		var todoId = $thisTodo.data("todoid");
		$.ajax({
			url: "http://tiy-fee-rest.herokuapp.com/collections/andrewr/" + todoid,
			type: "GET",
			datatype: "json",
			error: function(jqXHR, status, error) {
				alert("GET DETAILS ERROR");
			},
			success: function(data, datatype, jqXHR) {
				var todo = window.todo = data;
				myTodo.render($(".editTodoForm"), Templates.todoEdit, todo);
			console.log("get success!");
			}
		});
	},
	addTodo: function(){
			var newToDo = {
				date: new Date(),
				activity: $("#actinput").val(),
				time: $("#timeinput").val(),
				notes: $("#notesinput").val()
		};
		$.ajax({
			url: "http://tiy-fee-rest.herokuapp.com/collections/andrewr",
			type: "POST",
			data: newToDo,
			error: function(jqXHR, status, error){
				alert("POST ERROR");
			}, 
			success: function(data, datatype, jqXHR){	
				var activity = $("#actinput").val("");
				var time = $("#timeinput").val("");
				var notes = $("#notesinput").val("");
				myTodo.renderTodo();	
			}	
		});
		console.log("post success!");
	},

	removeTodo: function(todoid){
			console.log(todoid);
		$.ajax({
			url: "http://tiy-fee-rest.herokuapp.com/collections/andrewr/" + todoid,
			type: "DELETE",
			error: function (data){
				alert("DELETE ERROR");
			},
			success: function (data, datatype, jqXHR){
				myTodo.renderTodo();
				console.log("remove success!");
			}
		});
	},

	updateTodo: function(todoId){
		var id = todoId;																													
		var editTodo = {
			date: new Date(),
			activity: $("#editactivity").val(),
			time: $("#edittime").val(),
			notes: $("#editnotes").val()
		};
	$.ajax({
		url: "http://tiy-fee-rest.herokuapp.com/collections/andrewr/" + id,
		type: "PUT",
		data: editTodo,
		error: function(jqXHR, status, error) {
		console.log("error because that is whack")
	},
		success: function(data, datatype, jqXHR){
		var activity = $("#editactivity").val("");
		var time = $("#edittime").val("");
		var notes = $("#editnotes").val("");
		// $(".editTodoForm").hide();
		myTodo.renderTodo();
		alert("update rendered!");
		}
	});
	}

};  