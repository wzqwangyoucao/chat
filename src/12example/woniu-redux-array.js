const arrayThunk = ({dispatch,getState})=>next=>action=>{

    //����Ǻ���ִ��һ�� ������dispatch��getState
    //if(typeof action=='function'){
     //   return action(dispatch,getState)
    //}
	if(Array.isArray(action)){
		action.forEach(v=>next(v))
	}
    //Ĭ��ʲô��û��
    return next(action)
}
export default arrayThunk