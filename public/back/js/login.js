$(function(){
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields:{
            username:{
                validators:{
                    notEmpty: {
                        message: '用户名不能为空'
                      },
                      stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在6到30之间'
                      },
                }
            },
            password:{
                validators:{
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                      stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                } 
            }
        }
    })
    // $('#form').on('success.form.bv',function(e){
    //     e.preventDefault();;//阻止submit的自动提交
    //     $.ajax({
    //         // type:'post',
    //         // data: $('#form').serialize(),
    //         // url: '/employee/employeeLogin', 
    //         // dataType:'json',
    //         // success:function(info){
    //         //     console.log(info);
                
    //         // }
    //     })
    // })

})
