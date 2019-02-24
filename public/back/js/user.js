



$(function(){

    var currentPage =1;
    var pageSize=5;
    var currentId;
    var isDelete;
    render();
   function render(){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
            page : currentPage,
            pageSize : pageSize
        },
        dataType:"json",
        success:function(info){
            // console.log(info);
           var htmlstr = template('tpl',info);
           $('tbody').html(htmlstr)
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion:3,
                //当前页
                currentPage : info.page,
                //总页数
                totalPages : Math.ceil(info.total / info.size),

                //给页面添加点击事件

                onPageClicked:function(a,b,c,page){
                    currentPage = page;
                    render();
                }

            })
        }


    })
   }

//点击按钮

 $('tbody').on('click','.btn',function(){
       //让模态框显示出来
       $('#userModal').modal('show');

       currentId = $(this).parent().data('id');//当前的这条数据的id
       isDelete = $(this).hasClass('btn-danger') ? 0 : 1; //有btn-danger 改成禁用状态
   })


$('#confirmBtn').on('click',function(){

    $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
            id:currentId,
            isDelete:isDelete
        },
        dataType:'json',
        success:function(info){
            if(info.success){
                $('#userModal').modal('hide');
                render();

            }

        }


    })

})



})