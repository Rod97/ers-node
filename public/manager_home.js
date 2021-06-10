$(function () {
    var showTable = false;
    (function () {
        fetch('http://localhost:5051/manager/employees', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json()).then(employeeInfo => {
            // console.log(employeeInfo);
            // console.log(employeeInfo.data);
            // console.log(employeeInfo.data[0]._id);
            for (let employee of employeeInfo.data) {
                let tableRow = document.createElement("TR");
                tableRow.setAttribute("id", employee._id)
                tableRow.addEventListener("click", function () {
                    showEmployeeRequests(employee._id)
                });
                let tableData = document.createElement("TD");
                data = document.createTextNode(employee._id);

                tableData.appendChild(data);
                tableRow.appendChild(tableData);
                tableData = document.createElement("TD");
                data = document.createTextNode(employee.first_name + " " + employee.last_name);
                tableData.appendChild(data);
                tableRow.appendChild(tableData);

                document.getElementById("employees").appendChild(tableRow);

            }
        });
    })();

    function showEmployeeRequests(empID) {
        fetch(`http://localhost:5051/manager/requests/employee/${empID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(empRequests => {

            if (Object.keys(empRequests).length != 0) {
                showTable = true;
                let bigRow = document.createElement("TR");

                let innerTable = document.createElement("TABLE");
                let innerHeader = document.createElement("THEAD");
                let innerHeaderRow = document.createElement("TR");

                let headerElement = document.createElement("TH");
                let headerText = document.createTextNode("Request ID");

                headerElement.appendChild(headerText);

                innerHeaderRow.appendChild(headerElement);

                headerElement = document.createElement("TH");
                headerText = document.createTextNode("Status")

                headerElement.appendChild(headerText);

                innerHeaderRow.appendChild(headerElement);

                headerElement = document.createElement("TH");
                headerText = document.createTextNode("Reason")

                headerElement.appendChild(headerText);

                innerHeaderRow.appendChild(headerElement);

                headerElement = document.createElement("TH");
                headerText = document.createTextNode("Decision")

                headerElement.appendChild(headerText);

                innerHeaderRow.appendChild(headerElement);

                innerHeader.appendChild(innerHeaderRow);

                innerTable.appendChild(innerHeader);

                var tableBody = document.createElement("TBODY")

                console.log(empRequests)

                for (let request of empRequests.data) {

                    if (request.status === "Pending") {
                        tableBody.innerHTML += "<tr><td>" + request._id + "</td>"
                            + "<td>" + request.status + "</td>"
                            + "<td>" + request.reason + "</td>"
                            + "<td><input type='hidden' name='requestId' form='resolved' value=" + request._id + ">"
                            + "<select name='decision' form='resolved'>"
                            + "<option value='0'>Deny</option>"
                            + "<option value='1'>Accept</option>"
                            + "<option value='-1' selected='selected'>--Options--</option></select></td></tr>";
                    } else {
                        tableBody.innerHTML += "<tr><td>" + request._id + "</td>"
                            + "<td>" + request.status + "</td>"
                            + "<td>" + request.reason + "</td>";
                    }
                }

                innerTable.appendChild(tableBody);
                bigRow.appendChild(document.createElement("td"));
                bigRow.appendChild(innerTable);

                var submitButton = document.createElement("td");
                var theButtonIteself = document.createElement("input");
                theButtonIteself.setAttribute("type", "submit");
                theButtonIteself.setAttribute("form", "resolved");
                theButtonIteself.setAttribute("value", "Resolve Requests");
                submitButton.appendChild(theButtonIteself);

                bigRow.appendChild(submitButton);
                bigRow.setAttribute("id", "nestedTable");

                document.getElementById(empID).parentNode.insertBefore(bigRow, document.getElementById(empID).nextSibling);
                let oldRow = document.getElementById(empID);
                let newRow = oldRow.cloneNode(true);
                oldRow.parentNode.replaceChild(newRow, oldRow);
            }
        });
    }
    $("tr").click(function () {
        var currentId = $(this).getAttribute("id");
        $("#" + currentId).on("click", function () {
            $("nestedTable").toggle();
        })
    })

});