function createTableFromJson() {

    //following camelCase - JSON naming convention
    const DATA = [{
            "id": "1",
            "firstName": "Barleen",
            "middleName": "",
            "lastName": "Dhaliwal",
            "email": "barleen-d@sourcefuse.com",
            "phoneNumber": "888888880",
            "role": "Junior Engineer",
            "address": "4133"
        },
        {
            "id": "2",
            "firstName": "Jai",
            "middleName": "K",
            "lastName": "Sharma",
            "email": "xyz@sourcefuse.com",
            "phoneNumber": "900900090",
            "role": "Junior Engineer",
            "address": "8A"
        },
        {
            "id": "3",
            "firstName": "Harry",
            "middleName": "Singh",
            "lastName": "Chahal",
            "email": "abc@abc.com",
            "phoneNumber": "809090809",
            "role": "Junior Engineer",
            "address": "Mohali"
        },
        {
            "id": "4",
            "firstName": "Barry",
            "middleName": "Singh",
            "lastName": "Sharma",
            "email": "xyz@abc.com",
            "phoneNumber": "80909079",
            "role": "Engineer",
            "address": "Mohali"
        }
    ]

    // EXTRACT VALUE FOR HTML HEADER. 

    let col = [];
    for (let i = 0; i < DATA.length; i++) {
        for (let key in DATA[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    let table = document.createElement("table");
    table.className = 'table table-hover';
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    let tr = table.insertRow(-1); // TABLE ROW.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < DATA.length; i++) {

        tr = table.insertRow(-1);
        tr.id = "row" + i;

        //fetchin from JSON and putting in table
        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = DATA[i][col[j]];
            tabCell.className = "editable";
        }



        //creating edit button for each row
        let cellForEditButton = tr.insertCell(-1);
        let editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.innerHTML = 'Edit';
        editButton.addEventListener('click', function() {

            // let trid = $(this).closest('tr').attr('id'); // table row ID 


            // console.log($(this).closest("tr")[0].rowIndex);
            $(this).closest('tr').find(".editable").attr('contenteditable', 'true');
            $(this).closest('tr').css("background-color", "#EBF4FA");
            $(this).closest('tr').find("td").css("display", "");


        });
        cellForEditButton.appendChild(editButton);




        //creating delete button for each row
        let cellForDeleteButton = tr.insertCell(-1);
        let deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerHTML = 'Delete';
        deleteButton.id = 'deleteButton' + i;
        deleteButton.addEventListener('click', function() {

            let trid = $(this).closest('tr').attr('id'); // table row ID 
            //console.log(trid);
            $('#' + trid).hide();
        });
        cellForDeleteButton.appendChild(deleteButton);




        //Creating save button and hiding it
        let cellForSaveButton = tr.insertCell(-1);
        let saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.innerHTML = 'Save';
        saveButton.id = 'saveButton' + i;
        cellForSaveButton.className = 'saveButtonColumn';
        cellForSaveButton.appendChild(saveButton);
        cellForSaveButton.style.display = 'none';
        saveButton.addEventListener('click', function() {

            $(this).closest('tr').css("background-color", "white");
            $(this).closest('tr').find(".saveButtonColumn").css("display", "none");
            $(this).closest('tr').find(".cancelButtonColumn").css("display", "none");



        });





        //Creating cancel button and hiding it
        let cellForCancelButton = tr.insertCell(-1);
        let cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.innerHTML = 'Cancel';
        cancelButton.id = 'cancelButton' + i;
        cellForCancelButton.className = 'cancelButtonColumn'
        cellForCancelButton.appendChild(cancelButton);
        cellForCancelButton.style.display = 'none';
        cancelButton.addEventListener('click', function() {

            $(this).closest('tr').css("background-color", "white");
            $(this).closest('tr').find(".saveButtonColumn").css("display", "none");
            $(this).closest('tr').find(".cancelButtonColumn").css("display", "none");

            let currentRow = $(this).closest("tr")[0].rowIndex;

            //console.log(currentRow);

            for (let j = 0; j < col.length; j++) {
                let content = DATA[currentRow - 1][col[j]];
                // console.log(content);
                $(this).closest('tr').children(".editable").eq(j).text(content);
            }


        });



    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    let divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    document.getElementById("showDataButton").value = "Refresh";
}