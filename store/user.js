//使用这个js文件 这个文件相当于一个仓库  存放各种数据 
//在别的组件中 可以任意的调用这个文件里的数据

//存放数据的模块
export const state=()=>{

 return {
             //存放登录成功后返回的数据   储存起来
    userInfo:{
        // token:''
        //加这个对象，反正他还没点击登录的时候 不会报错
        user:{}
    }
 }
  
}

//请求的数据不能直接赋值  在需要在这模块里赋值
export const mutations ={
    // 第一个参数必须是state, 第二个参数调用时候传入的参数
    setuserInfo(state,data){
    state.userInfo=data
    },
    //退出登录
    tuichu(state, info){
      if(process.browser){
        localStorage.removeItem('store')
      }
      state.userInfo={}
    }

}

export const actions = {
 login(store,data){
  //这里return的原因是  在调用这个接口时，可以根据.then 或。cathe做出成功请求与失败的反应
  //因为他是普罗米斯对象 所以有。then。cathe
  return this.$axios({
        url: "/accounts/login",
        method: "POST",
        data
      }).then(e => {
        //取到数据  不能直接渲染到头部的登录，使用组件传值或者总线传值不理想
        const data = e.data;
        //不能直接
        // this.$store.state.user.userInfo=data 不能直接这样赋值
        //vuex规定传数据赋值得在这个mutations，使用这个模块的 this.$store.commit（'传去的位置'，数据）格式是固定的
        // 通过commit调用mutations中的方法
        store.commit('setuserInfo',data)
        //怎么确定是不是成功呢成功得有个反应吧，所有得利用user。js里面的
        //需要做个提示  这个
      });
  }
 
  
};