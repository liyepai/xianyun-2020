//存放搜索过的历史记录

export const state = ()=>{
    return{
        ariList:[]}
    }


export const mutations={
    //此方法可以操作存放数据
    setData(start,data){
    start.ariList.unshift(data)
    }
}