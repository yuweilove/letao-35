$(function(){
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2019年注册人数'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [50, 200, 360, 100, 190, 400]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);


    // ----------------------
    var echarts_right = echarts.init(document.querySelector('.echarts_right'));

    // 指定图表的配置项和数据
    var option2 =option = {
        title : {
            text: '热门品牌销售',
            subtext: '2019年2月',
            x:'center',
            textStyle:{
                color:'red',
                fontSize:25
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['naike','阿迪','安踏','太平鸟','360']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'naike'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'安踏'},
                    {value:135, name:'太平鸟'},
                    {value:1548, name:'360'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option2);



})