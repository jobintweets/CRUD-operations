$(function(){
    var dept_count_sal=dept_count_tsal();
    var dept_count_qual= dept_qual_count();
    var count_list = organization_qualifications_total_count();
    console.log(count_list);
    showtable();
    showtable2();
  
    function showtable(){
        var headings=['Department','Count','Totla Salary'];
        data='';
        data+='<table class="table table-striped"><thead><tr>';
        
        for(var i=0;i<headings.length;i++){
            data+='<th>' +headings[i] + '</th>'
        }
        data+='</tr></thead>';
        for(var i=0;i<dept_count_sal.length;i++){
            var dpt=dept_count_sal[i];
            data+="<tr>";
            data+="<td>"+dpt.dname+"</td>";
            data+="<td>"+dpt.count+"</td>";
            data+="<td>"+dpt.tsal+"</td>";
            data+="</tr>"
        }
        data+="</table>";
        $("#deptsctable").html(data);
    }
    
   ;
  
     function showtable2(){
        var headings=['Department Name','Qualifications','Count'];
        data='';
        data+='<table class="table table-striped"><thead><tr>';
        
        for(var i=0;i<headings.length;i++){
            data+='<th>' +headings[i] + '</th>'
        }
        data+='</tr></thead>';
        for(var i=0;i< dept_count_qual.length;i++){
            var dpt=dept_count_qual[i];
            data+="<tr>";
            data+="<td>"+dpt.departmentname+"</td>";
            data+="<td>"+dpt.qualifications+"</td>";
            data+="<td>"+dpt.count+"</td>";
            data+="</tr>"
        }
        data+="</table>";
        $("#deptqtable").html(data);
    }
    
    initialize();
    function initialize(){
         // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});
        

      // Set a callback to run when the Google Visualization API is loaded.
     google.charts.setOnLoadCallback(drawColumnChart);
            google.charts.setOnLoadCallback(drawPiChart);
    }
    
    
    function drawPiChart(){
         // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Qualifications');
        data.addColumn('number', 'Total');
        var rows=[];
        for(var i=0;i<count_list.length;i++){
            var ele=count_list[i];
            rows.push([ele.qualifications,ele.count])
        }
        data.addRows(rows);
     
        // Set chart options
        var options = {'title':'Qualifications & Count',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('deptempcountchart'));
        chart.draw(data, options);
    }
//    column charts
    function drawColumnChart(){
        
        
          // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Department');
        data.addColumn('number', 'Total Salary');
        var rows=[];
        for(var i=0;i<dept_count_sal.length;i++){
            var ele=dept_count_sal[i];
            rows.push([ele.dname,parseInt(ele.tsal)])
        }
        data.addRows(rows);
     
        // Set chart options
        var options = {'title':'Total Salary by department',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('deptsalarychart'));
        chart.draw(data, options);
        
        
        
    }
        
    
    
    
    
});