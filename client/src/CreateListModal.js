import React from 'react';

const CreateListModal = ({closeModal,inputData}) => {

    const{
        colors
    } = inputData

    return (
        <div className="modalBackground">
        <div className="modal-div">
        <div className="nav justify-content-end mb-3">
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>closeModal()}>X</button>
    </div>
    <form onSubmit={(e)=> {
        inputData.manageTodoList(e)
    }}>
<div id="newListForm">
        <h2 className="text-center">Create new ToDo</h2>
    <div className="mb-3">
        <input type="text" autoComplete="off" className="form-control" placeholder="List name" id="listSection" name="listSection" onChange={(e)=>inputData.onChangeSection(e)}/>
    </div>
    <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="colorSelect" >
        <label style={{background: colors.red.background}} onMouseDown={(e)=>inputData.onChangeColor(e,colors.red)} onTouchStart={(e)=>inputData.onChangeColor(e,colors.red)}/>
    <input type="radio"/>
        </div>
        <div className="colorSelect" >
        <label style={{background: colors.orange.background}} onMouseDown={(e)=>inputData.onChangeColor(e,colors.orange)} onTouchStart={(e)=>inputData.onChangeColor(e,colors.orange)}/>
    <input type="radio"/>
        </div>
        <div className="colorSelect" >
        <label style={{background: colors.yellow.background}} onMouseDown={(e)=>inputData.onChangeColor(e,colors.yellow)} onTouchStart={(e)=>inputData.onChangeColor(e,colors.yellow)}/>
    <input type="radio"/>
        </div>
        <div className="colorSelect" >
        <label style={{background: colors.blue.background}} onMouseDown={(e)=>inputData.onChangeColor(e,colors.blue)} onTouchStart={(e)=>inputData.onChangeColor(e,colors.blue)}/>
    <input type="radio"/>
        </div>
        <div className="colorSelect" >
        <label style={{background: colors.green.background}} onMouseDown={(e)=>inputData.onChangeColor(e,colors.green)} onTouchStart={(e)=>inputData.onChangeColor(e,colors.green)}/>
    <input type="radio"/>
        </div>
        <div className="colorSelect" >
        <label style={{background: colors.purple.background}} onMouseDown={(e)=>inputData.onChangeColor(e,colors.purple)} onTouchStart={(e)=>inputData.onChangeColor(e,colors.purple)}/>
    <input type="radio"/>
        </div>
        <div className="colorSelect" >
        <label style={{background: colors.violet.background}} onMouseDown={(e)=>inputData.onChangeColor(e,colors.violet)} onTouchStart={(e)=>inputData.onChangeColor(e,colors.violet)}/>
    <input type="radio"/>
        </div>
        <div className="colorSelect" >
        <label style={{background: colors.gray.background}} onMouseDown={(e)=>inputData.onChangeColor(e,colors.gray)} onTouchStart={(e)=>inputData.onChangeColor(e,colors.gray)}/>
    <input type="radio"/>
        </div>
        <div className="colorSelect" >
        <label style={{background: colors.black.background}} onMouseDown={(e)=>inputData.onChangeColor(e,colors.black)} onTouchStart={(e)=>inputData.onChangeColor(e,colors.black)}/>
    <input type="radio"/>
        </div>
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-success">Submit</button>
        </div>
        </div>
        </form>
        </div>
        </div>
);
};

export default CreateListModal;