$(function(){
    var currentPage = 1;
    var pageSize = 5;

    render();
    function render(){
        $.ajax({
            type:"get",
            url: "/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                // console.log(info);
                var htmlstr = template('secondTpl',info);
                $('tbody').html(htmlstr);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage:info.page,
                    totalPages : Math.ceil(info.total / info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
                
            }
        })

    }
    $('#addBtn').on('click',function(){
        $('#addModal').modal('show')
        $.ajax({
            type:'get',
            url: '/category/queryTopCategoryPaging',
            data:{
                page:1,
                currentPage:100,
            },
            dataType:"json",
            success:function(info){
                // console.log(info);
               var htmlstr = template ('dropdownTpl',info);
               $('.dropdown-menu').html(htmlstr);
            }

        })
    })
    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text();
        $('#dropdownText').text(txt);

        var id = $(this).data('id');
        //设置给隐藏域
        $('[name="categoryId"]').val(id);

        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
    })


    //完成文件上传的的初始化
    $('#fileupload').fileupload({
        dataType:"json",
        done:function( e , data){
            // console.log(data);
            var picUrl = data.result.picAddr;
            console.log(picUrl);
            
            //把地址设置给图片
            $('#imgBox img').attr('src',picUrl);
            //设置给隐藏域
            $('[name="brandLogo"]').val(picUrl);

            // 只要隐藏域有值了, 就是更新成成功状态
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    })

   // 5. 直接进行校验
  $('#form').bootstrapValidator({
    // 配置 excluded 排除项, 对隐藏域完成校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置校验字段列表
    fields: {
      // 选择一级分类
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      // 输入二级分类名称
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      // 二级分类图片
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请选择图片'
          }
        }
      }
    }
  });


  // 6. 注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data: $('#form').serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          $('#addmodal').modal('hide');
          currentPage=1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#dropdownText').text('请选择一级分类');
          $('#imgBox img').attr('src','./images/none.png')
        }
      }
    })
  })
  
   

})