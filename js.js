
function CreateTableFromJSON() {
    var details = [
        {
            "ID": "1",
            "First Name": "Barleen",
            "Middle Name": "",
            "Last Name": "Dhaliwal",
            "Email": "barleen.dhaliwal@sourcefuse.com",
            "Phone Number": "7009047379",
            "Role": "Junior Engineer",
            "Address": "4133"
        },
        {
            "ID": "2",
            "First Name": "Jai",
            "Middle Name": "",
            "Last Name": "Sharma",
            "Email": "xyz@sourcefuse.com",
            "Phone Number": "900900090",
            "Role": "Junior Engineer",
            "Address": "8A"
        },
        {
            "ID": "3",
            "First Name": "Harry",
            "Middle Name": "Singh",
            "Last Name": "Chahal",
            "Email": "abc@abc.com",
            "Phone Number": "809090809",
            "Role": "Junior Engineer",
            "Address": "Mohali"
        }
    ]

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < details.length; i++) {
        for (var key in details[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.className='table table-hover';
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < details.length; i++) {

        tr = table.insertRow(-1);
        tr.id="row"+i;
        
        //fetchin from JSON and putting in table
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = details[i][col[j]];
            tabCell.className="editable";
        }



        //creating edit button for each row
        var cell_for_edit_button = tr.insertCell(-1);
        var edit_button = document.createElement('button');
        edit_button.type = 'button';
        edit_button.innerHTML = 'Edit';
        edit_button.addEventListener('click', function(){

            // var trid = $(this).closest('tr').attr('id'); // table row ID 
            
             
            // console.log($(this).closest("tr")[0].rowIndex);
            $(this).closest('tr').find(".editable").attr('contenteditable','true');
            $(this).closest('tr').css("background-color","#EBF4FA");
            $(this).closest('tr').find( "td" ).css("display","");

            
        });
        cell_for_edit_button.appendChild(edit_button);

        
        
        
        //creating delete button for each row
        var cell_for_delete_button = tr.insertCell(-1);
        var delete_button = document.createElement('button');
        delete_button.type = 'button';
        delete_button.innerHTML = 'Delete';
        delete_button.id='delete_button_'+i;
        delete_button.addEventListener('click', function(){
            
            var trid = $(this).closest('tr').attr('id'); // table row ID 
            //console.log(trid);
            $('#'+trid).hide();
        });
        cell_for_delete_button.appendChild(delete_button);




        //Creating save button and hiding it
        var cell_for_save_button = tr.insertCell(-1);
        var save_button = document.createElement('button');
        save_button.type = 'button';
        save_button.innerHTML = 'Save';
        save_button.id='save_button_'+i;
        cell_for_save_button.className='save_button_column';
        cell_for_save_button.appendChild(save_button);
        cell_for_save_button.style.display='none';
        save_button.addEventListener('click', function(){

            $(this).closest('tr').css("background-color","white");
            $(this).closest('tr').find( ".save_button_column" ).css("display","none");
            $(this).closest('tr').find( ".cancel_button_column" ).css("display","none");

            
            
        });
        




        //Creating cancel button and hiding it
        var cell_for_cancel_button = tr.insertCell(-1);
        var cancel_button = document.createElement('button');
        cancel_button.type = 'button';
        cancel_button.innerHTML = 'Cancel';
        cancel_button.id='cancel_button_'+i;
        cell_for_cancel_button.className='cancel_button_column'
        cell_for_cancel_button.appendChild(cancel_button);
        cell_for_cancel_button.style.display='none';
        cancel_button.addEventListener('click', function(){

            $(this).closest('tr').css("background-color","white");
            $(this).closest('tr').find( ".save_button_column" ).css("display","none");
            $(this).closest('tr').find( ".cancel_button_column" ).css("display","none");

            var current_row = $(this).closest("tr")[0].rowIndex;
           
            //console.log(current_row);

            for(var j=0;j<col.length;j++)
            {
                var data=details[current_row-1][col[j]];
                // console.log(data);
                $(this).closest('tr').children( ".editable" ).eq(j).text(data);
            }

            
        });
        


    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    document.getElementById("show_data_button").value = "Refresh";
}