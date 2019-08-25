// 交互文件
/**
 * 先准备一个数组对象，模拟数据动态
 */
function dataThroughList({data,elem1,elem2,title,cancel,confirm}){
  var data=data;
  var title=title;
  //接受事件函数
  var cancel=cancel;
  var confirm=confirm;
  //加载添加弹框事件的元素 ID的元素
  var btn=elem1;
  var msgBox=elem2;
  document.querySelector(btn).addEventListener('click',function(){
    document.querySelector(msgBox).style.display='block';
  });
//先给指定的元素添加数据框架
document.querySelector(msgBox).className='msg_box_dusk';
document.querySelector(msgBox).innerHTML=mainMsg(title);
////在此处调用功能函数
toDoChechedList();
//添加的数据函数
function mainMsg(title){
  let html=`
    <div class="msg_box_main">
    <!-- 头部 -->
    <header class="msg_box_header">
      <span class="title_font">${title}</span>
      <span class="cancel_del" data-cancel="close"></span>
    </header>
    <!-- 中间部位 -->
    <nav class="msg_box_nav">
      <!-- 右边数据框 -->
      <div class="left_right_box">
        <ul data-datalist="left">
          <li><input type="checkbox" name="" id="1"><span>12</span></li>
          <li><input type="checkbox" name="" id="2"><span>34</span></li>
          <li><input type="checkbox" name="" id="3"><span>56</span></li>
          <li><input type="checkbox" name="" id="4"><span>78</span></li>
          <li><input type="checkbox" name="" id="5"><span>98</span></li>
        </ul>  
      </div>
      <!-- 左边数据框 -->
      <div class="left_right_box left_box_bet">
        <ul data-datalist="right">
          <li><span>12</span><span class="cancel_del"></span></li>
          <li><span>34</span><span class="cancel_del"></span></li>
          <li><span>56</span><span class="cancel_del"></span></li>
        </ul>
      </div>
    </nav>
    <!-- 底部按钮部位 现支持两个按钮 -->
    <footer class="msg_box_footer">
      <button data-cancel="cancel">取消</button>
      <button data-confirm="ok">确定</button>
    </footer>
  </div>
  `;
  return html;
}
/**
 * 一下内容为加载的功能函数；
 */

  function toDoChechedList(){
  //选中的数据的数组
  var checkedArr=[];
  //左右表格数据列表
  window.leftList=document.querySelector('[data-datalist="left"]');
  window.rightList=document.querySelector('[data-datalist="right"]');
  //左边数据框选中的值得函数
  function checkStat(id){
    if(checkedArr.length==0) return '';
    for(var tmp of checkedArr){
      if(tmp.id==id) return 'checked=true';
    }
  }
  // 左边框的数据生成 函数
  function leftDataTable(){
    let html=``;
    // 循环获取加载数据data-datalist="left"
    for(var tmp of data){
      html+=`
      <li><input type="checkbox" value="${tmp.id}" ${checkStat(tmp.id)} data-name="${tmp.value}"><span>${tmp.value}</span></li>
      `;
    };
    leftList.innerHTML=html;
    checkedLeftStat();
  } 

  leftDataTable();
  // 右边数据表的加载函数
  function rightDataTable(){
    let html=``;
    //循环获取加载数据 data-datalist="right";
    if(checkedArr.length==0){
      rightList.innerHTML='';
      return;
    };
    for(var tmp of checkedArr){
      html+=`
      <li><span>${tmp.value}</span><span class="cancel_del" data-delid="${tmp.id}"></span></li>
      `;
    } ;
    rightList.innerHTML=html;
    clickRightStat()
  }
  rightDataTable();

  //左边的数据表格添加监听事件；
  function checkedLeftStat(){
    //获取input的对象组
    let inputCkd=document.querySelectorAll('[data-datalist="left"] li input');
    for(var tmp of inputCkd){
      tmp.addEventListener('click',function(){
        //判断是否被选中
        var boolStat=this.checked;
        //获取藏在其中的值
        var id=this.value;
        var value=this.dataset.name;
        if(boolStat){
          //选中的话值得对象放入选中数组中
          var nowObj={id,value};
          checkedArr.push(nowObj);
        }else{
          //为选中删除数组对应的内容
          for(var index=0;index<checkedArr.length;index++){
            if(id==checkedArr[index].id){
              checkedArr.splice(index,1);
            }
          }
        }
        //加载右边框的数据 也可以重载两个表格实现选中移除左边列表的数据
        rightDataTable();
      })
    }

  }

  ///右边数据列表的监听事件
  function clickRightStat(){
    //获取input的对象组
    let spans=document.querySelectorAll('[data-datalist="right"] li span.cancel_del');
    //添加删除事件
    for(var span of spans){
      span.addEventListener('click',function(){
        //console.log(this);
        //获取其中的ID值
        var id=this.dataset.delid;
        //console.log(id);
        for(var index=0;index<checkedArr.length;index++){
          if(id==checkedArr[index].id){
            checkedArr.splice(index,1);
          }
        }
        //加载左右两表的数据
        rightDataTable();
        leftDataTable();
      })
    }
  }

  /**
   * 一下是三个数据框外的三个按钮的事件处理函数
   * 取消 确定 关闭弹框
   */
  //关闭弹框事件
  document.querySelector('[data-cancel="close"]').addEventListener('click',function(){
    document.querySelector('#msg_box').style.display='none';
  })
  //取消按钮也是直接关闭弹出框，这里不做数据的处理，也可做数据的处理
  document.querySelector('[data-cancel="cancel"]').addEventListener('click',function(){
    document.querySelector('#msg_box').style.display='none';
  })
  ///确定按钮做数据的返回处理
  document.querySelector('[data-confirm="ok"]').addEventListener('click',function(){
    document.querySelector('#msg_box').style.display='none';
    confirm(checkedArr);
  })
  }//数据加载的功能函数结尾
}//穿梭框的加载函数
