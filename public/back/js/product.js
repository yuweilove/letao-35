$(function () {
    var currentPage = 1;
    var pageSize = 3;
    var picArr = [];
    render();
    function render() {
        $.ajax({
            type: "get",
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                // console.log(info);
                var htmlstr = template('productTpl', info);
                $('tbody').html(htmlstr);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render()
                    }
                })
            }
        })
    }

    $('#addBtn').on('click', function () {

        $('#addModal').modal('show')

        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlstr = template('dropdownTpl', info);
                $('.dropdown-menu').html(htmlstr);
            }
        })
    })


    //3.给下拉菜单的a 添加点击事件

    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        $('#dropdownText').text(txt);

        var id = $(this).data('id');
        $('[name="brandId"').val(id);
    })

    //4.进行文件上传的初始化
    $('#fileupload').fileupload({
        dataType: "json",
        done: function (e, data) {
            console.log(data);
            var picObj = data.result;//接收的结果
            var picUrl = picObj.picAddr;//获取图片的路径
            //将后台的返回的对象传到数组中
            picArr.unshift(picObj);

            //将新添加的图片添加到#imgBox里面
            $('#imgBox').prepend('<img style="height: 100px;" src="' + picUrl + '" alt="">')

            if (picArr.length > 3) {
                picArr.pop();
                $('#imgBox img:last-of-type').remove();
            }
            if(picArr.length ===3){
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')
            }
        }
    })

    //5.添加表单的校验功能

    $('#form').bootstrapValidator({
        // 配置 excluded 排除项, 对隐藏域完成校验
        excluded: [],
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
               validators:{
                notEmpty: {
                    message: '请选择二级分类'
                  } 
               } 
            },
            proName: {
                validators: {
                  notEmpty: {
                    message: '请输入商品名称'
                  }
                }
            },
            proDesc: {
                validators: {
                  notEmpty: {
                    message: '请输入商品描述'
                  }
                }
              },
              num: {
                validators: {
                  notEmpty: {
                    message: '请输入商品库存'
                  },
                  // 1  10  111  1111
                  // 正则校验, 必须非零开头的数字
                  // \d  0-9 数字
                  // ?   表示 0 次 或 1 次
                  // +   表示 1 次 或 多次
                  // *   表示 0 次 或 多次
                  // {n} 表示 出现 n 次
                  // {n, m}  表示 出现 n ~ m 次
                  regexp: {
                    regexp: /^[1-9]\d*$/,
                    message: '商品库存必须是非零开头的数字'
                  }
                }
              },
              size: {
                validators: {
                  notEmpty: {
                    message: '请输入商品尺码'
                  },
                  // 尺码格式, 必须是 xx-xx 格式,  xx 是两位的数字
                  regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: '尺码格式, 必须是 xx-xx 格式,  xx 是两位数字, 例如: 32-40 '
                  }
                }
              },
              oldPrice: {
                validators: {
                  notEmpty: {
                    message: '请输入商品原价'
                  }
                }
              },
              price: {
                validators: {
                  notEmpty: {
                    message: '请输入商品现价'
                  }
                }
              },
              picStatus: {
                validators: {
                  notEmpty: {
                    message: '请上传三张图片'
                  }
                }
              }
        }
    })

    //6 注册表单校验成功事件

    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        //获取基本的表单
        var paramsStr = $('#form').serialize();
        paramsStr += '&picArr=' + JSON.stringify(picArr);
        // console.log(paramsStr);
        


        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:paramsStr,
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    $('#addModal').modal('hide');
                    currentPage=1;
                    render();

                    $('form').data('bootstrapValidator').resetForm(true);
                    $('#dropdownText').text('请输入二级名称');
                    $('#imgBox img').remove();
                    picArr=[];
                }
            }
        })
    })


})