Templates = {}; 

	Templates.todoPost = [
 
        "<% _.each(todos,function(todo,todoId,list){ %>",
        "<ul data-todoid=\"<%=todo._id %>\" class= \"finalTodoList\">",
            "<li class= \"todoactivity\">TO DO: <%= todo.activity %></li>",
            "<li class= \"todotime\">TIME: <%= todo.time %></li>",
            "<li class= \"todonotes\">NOTES: <%= todo.notes %></li>",
            "<li class= \"todoclicks\"><a class = \"cleartodo\" id=\"cleartodo\" href= \"\">CLEAR</a> <a class = \"edittodo\" id=\"edittodo\" href= \"\">EDIT</a><a class = \"addMoreTodobtn\" id=\"addMoreTodobtn\" href= \"\">ADD ANOTHER TO DO</a></li>",
        "</ul>",
        "<% }); %>"
	].join("\n");

	Templates.todoEdit = [

        "<ul class=\"editform\">",
            "<li><label>Update Todo</label></li>",
            "<li><input type=\"text\" id=\"editactivity\" value=\"<%= todo.activity %>\" </li>",
            "<li><label>Update Time</label></li>",
            "<li><input type=\"text\" id=\"edittime\" value=\"<%= todo.time %>\"</li>",
            "<li><label>Update Notes</label></li>",
            "<li><input type=\"text\" id=\"editnotes\" value=\"<%= todo.notes %>\"</li>",
            "<li><input type=\"hidden\" id=\"editTodoId\" value=\"<%= todo._id %>\"</li>",
        "</ul>",
        "<ul class=\"editbuttons\">",
            "<li class=\"editformclicks\">",
            "<input class=\"updatebtn\" id=\"updatebtn\" value=\"UPDATE\">",
            "</li><li><input class=\"gobackbtn\" id=\"gobackbtn\" value=\"GO BACK\">",
            "</li>",
        "</ul>"
	].join("\n");	