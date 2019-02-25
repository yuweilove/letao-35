$(function(){
     var currentPage = 1;
     var pageSize = 5;
    render();
     function render() {
         $.ajax({
            type:"get",
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                // console.log(info);
                var htmlstr = template('firstTpl',info)
                $('tbody').html(htmlstr);
                //完成分页的初始化

                $('#paginator').bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage : info.page,
                    //
                    // 总页数
                    totalPages:Math.ceil(info.total / info.size),
                    //给页码添加点击事件
                    onPageClicked :function(a,b,c,page){
                        currentPage = page;
                        render();

                    }
                })
            }
         })
     }

     $('#addBtn').on('click',function(){
         $('#addModal').modal('show')
     })

     $('#form').bootstrapValidator({

        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
    
        // 配置需要校验的字段列表
        fields: {
          categoryName: {
            // 配置校验规则
            validators: {
              // 非空校验
              notEmpty: {
                message: '请输入一级分类名称'
              }
            }
          }
        }
      });
     
     $('#form').on('success.form.bv',function(e){
         e.preventDefault()//阻止submit的自动提交
         $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$('#form').serialize(),
            dataType:"json",
            success:function(info){
                // console.log(info);
                if(info.success){
                    $('#addmodal').modal('hide');
                    currentPage=1;
                    render();
                    $('#form').data('bootstrapValidator').resetForm(true);
                }
                
            }

         })
     })


})