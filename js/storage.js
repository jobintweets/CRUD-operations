if (localStorage.getItem("employees") == null) {
    localStorage.setItem("employees", JSON.stringify([]));
}

function addEmployee(employee) {
    var employees = getEmployeesFromLocalStorage();
    employees.push(employee);
    updateLocalStorageData(employees);
    return getEmployeesFromLocalStorage();
}

function getEmployee(empno) {
    var employees = getAllEmployees();
    var index = getIndexOfEmployee(employees, empno);
    return employees[index];
}

function updateEmployeeDetails(employee) {
    var employees = getAllEmployees();
    var index = getIndexOfEmployee(employees, employee.empno);
    employees.splice(index, 1, employee);
    updateLocalStorageData(employees);
    return getAllEmployees();

}

function getAllEmployees() {
    return getEmployeesFromLocalStorage();
}

function deleteEmployee(empno) {
    var employees = getEmployeesFromLocalStorage();
    var index = getIndexOfEmployee(employees, empno);
    employees.splice(index, 1);
    updateLocalStorageData(employees);
    return getAllEmployees();
}

function getIndexOfEmployee(employees, empno) {

    for (var i = 0; i < employees.length; i++) {
        var emp = employees[i];
        if (emp.empno == empno)
            return i;
    }
    return -1;
}

function searchEmployees(searchData,dname) {

    if (dname == "" && searchData == "") {
        return getAllEmployees();
    } else if (dname != "" && searchData == "") {
        return searchEmployeesByDname(dname);
    } else if (dname == "" && searchData != "") {
        return searchEmployees(searchData);
    } else if (dname != "" && searchData != "") {
        return searchEmployeeByDnameAndData(dname, searchData);
    }
}

function searchEmployeesByDname(dname) {
    var employees = getAllEmployees();
    var searchArr = [];
    employees.forEach(employee => {
        if (employee.dname === dname) {
            searchArr.push(dname);
        }
    });
    return searchArr;
}

function searchEmployees(searchData) {
    var employees = getAllEmployees();
    var searchArr = [];
    employees.forEach(employee => {
        if (employee.name.indexOf(searchData) == -1) {
            searchArr.push(dname);
        }
    });
    return searchArr;
}

function searchEmployeeByDnameAndData(dname, searchData) {
    var employees = getAllEmployees();
    var searchArr = [];
    employees.forEach(employee => {
        if (employee.dname === dname && employee.name.indexOf(searchData) == -1) {
            searchArr.push(dname);
        }
    });
    return searchArr;
}

//function getEmployeeCountData(){
//    
//}
//function getEmployeeCountChartData(){
//    
//}


function getEmployeesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("employees"));
}

function updateLocalStorageData(employees) {
    localStorage.setItem("employees", JSON.stringify(employees));
}

//department wise total salary
function dept_count_tsal() {
    var employees = getEmployeesFromLocalStorage();
    var dept_sal_map = {};

    employees.forEach(emp => {

        var map_var = dept_sal_map[emp.dept]
        if (map_var) {
            var tsal = parseInt(map_var.tsal) + parseInt(emp.salary)
            dept_sal_map[emp.dept] = {
                "dname": emp.dept,
                "count": map_var.count + 1,
                "tsal": tsal
            }
        } else {
            dept_sal_map[emp.dept] = {
                "dname": emp.dept,
                "count": 1,
                "tsal": emp.salary
            }
        }
    })
    var array = [];
    for (key in dept_sal_map) {
        var value = dept_sal_map[key];
        array.push(value);
    }
    return array;
}



//department wise qualifuicatins
function dept_qual_count() {
    var employees = getEmployeesFromLocalStorage();
    var departmentmap = {};
    employees.forEach(emp => {
        dept = departmentmap[emp.dept];
        departmentmap[emp.dept] = dept ? dept.add(emp) : new Set().add(emp);

    })
    emp_qual_count = [];
    for (key in departmentmap) {
        department_set = departmentmap[key];
        //        because we creatwed a set for empoyess
        qualification_map = {};
        for (var dept of department_set) {
            count = qualification_map[dept.qualification];
            qualification_map[dept.qualification] = count ? count + 1 : 1;
        }
        for (k in qualification_map) {
            var count = qualification_map[k];
            emp_qual_count.push({
                "departmentname": key,
                "qualifications": k,
                "count": count
            });
        }
    }
    return emp_qual_count;
    //    console.log(emp_qual_count);
}


//total qualifications in the organization
function organization_qualifications_total_count() {
    var employees = getEmployeesFromLocalStorage();
    var qualifications_count_map = {};
    employees.forEach(emp => {
        var count = qualifications_count_map[emp.qualification];
        qualifications_count_map[emp.qualification] = count ? count + 1 : 1;
    });
    var count_list = [];
    for (key in qualifications_count_map) {
        var value = qualifications_count_map[key];
        count_list.push({
            "qualifications": key,
            "count": value
        });
    }
    return count_list;
}

