window.onload = function () {
            
    var chart0 = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Vendas por Funcionários"
        },
        axisX: {
            valueFormatString: "DD MMM,YY"
        },
        axisY: {
            title: "Número de cortes ",
            
        },
        legend:{
            cursor: "pointer",
            fontSize: 16,
            itemclick: toggleDataSeries
        },
        toolTip:{
            shared: true
        },
        data: [{
            name: "Gustavo",
            type: "spline",
            yValueFormatString: "#0.## cortes",
            showInLegend: true,
            dataPoints: [
                { x: new Date(2017,6,24), y: 31 },
                { x: new Date(2017,6,25), y: 31 },
                { x: new Date(2017,6,26), y: 29 },
                { x: new Date(2017,6,27), y: 29 },
                { x: new Date(2017,6,28), y: 31 },
                { x: new Date(2017,6,29), y: 30 },
                { x: new Date(2017,6,30), y: 29 }
            ]
        },
        ]
    });
    var chart1 = new CanvasJS.Chart("Ferreira", {
            animationEnabled: true,
            title:{
                text: "Vendas por Funcionários"
            },
            axisX: {
                valueFormatString: "DD MMM,YY"
            },
            axisY: {
                title: "Número de cortes ",
                
            },
            legend:{
                cursor: "pointer",
                fontSize: 16,
                itemclick: toggleDataSeries
            },
            toolTip:{
                shared: true
            },
            data: [{
                name: "Ferreira",
                type: "spline",
                yValueFormatString: "#0.## cortes",
                showInLegend: true,
                dataPoints: [
                    { x: new Date(2017,6,24), y: 31 },
                    { x: new Date(2017,6,25), y: 31 },
                    { x: new Date(2017,6,26), y: 29 },
                    { x: new Date(2017,6,27), y: 29 },
                    { x: new Date(2017,6,28), y: 31 },
                    { x: new Date(2017,6,29), y: 30 },
                    { x: new Date(2017,6,30), y: 29 }
                ]
            },
            ]
        });

    var chart2 = new CanvasJS.Chart("Siqueira", {
        animationEnabled: true,
        title:{
            text: "Vendas por Funcionários"
        },
        axisX: {
            valueFormatString: "DD MMM,YY"
        },
        axisY: {
            title: "Número de cortes ",
            
        },
        legend:{
            cursor: "pointer",
            fontSize: 16,
            itemclick: toggleDataSeries
        },
        toolTip:{
            shared: true
        },
        data: [{
            name: "Siqueira",
            type: "spline",
            yValueFormatString: "#0.## cortes",
            showInLegend: true,
            dataPoints: [
                { x: new Date(2017,6,24), y: 31 },
                { x: new Date(2017,6,25), y: 31 },
                { x: new Date(2017,6,26), y: 29 },
                { x: new Date(2017,6,27), y: 29 },
                { x: new Date(2017,6,28), y: 31 },
                { x: new Date(2017,6,29), y: 30 },
                { x: new Date(2017,6,30), y: 29 }
            ]
        },
        ]
    });

    chart0.render();
    chart1.render();
    chart2.render();
        
    function toggleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else{
            e.dataSeries.visible = true;
        }
        chart0.render();
        chart1.render();
        chart2.render();
    }
        
    }
