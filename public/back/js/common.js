
//进度条
$(document).ajaxStart(function(){
    NProgress.start();
 })
 $(document).ajaxStop(function(){
     setTimeout(function(){
        NProgress.done()
     },1000)
 })


$(function(){
    //二级菜单的变化
    $('.lt_aside .category').on('click',function(){
        $(this).next().stop().slideToggle();
    })
    //点击左边按钮的变化
    $('.lt_topbar .btn-left').on('click',function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
    })
    //点击退出按钮
    $('.lt_topbar .btn-right').on('click',function(){
        $('#logoutModal').modal('show');
    })

    $('#logoutBtn').on('click',function(){
       $.ajax({
           type:'get',
           url: '/employee/employeeLogout',
           dataType:'json',
           success:function(info){
               console.log(info);
               if(info.success){
                   location.href='login.html';
               }
           }
       })
    })
   

})