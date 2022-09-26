import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAll, selectById } from '../../ProductAction/ProductSlice';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai"
import { MdModeEditOutline } from "react-icons/md";
import { AdminState, DeleteGood } from './AdminRedux';
import { useDeleteGoodMutation, useGetProductsQuery } from '../../ProductAction/ProductSlice';
import styled from 'styled-components';
import { Typewriter } from "react-simple-typewriter"
const Errormanage = ({ goodId }) => {
    const dispatch = useDispatch();
    const [deleteGood] = useDeleteGoodMutation()
    const { refetch } = useGetProductsQuery();
    const navigate = useNavigate()
    const good = useSelector((state) => selectById(state, goodId));
    const Goods = useSelector(selectAll)
    const { DeleteGoodId } = useSelector(AdminState)

    const [name, setname] = React.useState("")
    const [LoadingState, setLoadingState] = React.useState(false)
    const [ShowResult, setShowResult] = React.useState(false)
    const [ResultMessage, setResultMessage] = React.useState("")
    const [ResultStatus, setResultStatus] = React.useState(false)
    const [changeBtn, setchangeBtn] = React.useState(false)
    const updateGood = (e) => {
        navigate(`/admin/dashboard/Product/${e}`)
    }
    const deleteGood1 = (e) => {
        const found = Goods.find(good => good.id == e)
        dispatch(DeleteGood({ name: found.name, id: found.id }))


    }
    const deleteform = async (e) => {
        try {
            setLoadingState(true)
            let result = await deleteGood(e).unwrap();
            setResultMessage(result.message)
            setShowResult(true)
            setResultStatus(result.status)
            //   if(result?.status){
            //    refetch();
            //   }
        } catch (err) {
            console.log(err.message)
        } finally {
            setShowResult(true)
            setchangeBtn(true)
        }
    }
    const Loading = () => {
        return (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "25px" }}>
                Please wait<Typewriter loop={50}
                    words={["..........", "..........", "..........", "..........", "..........", "..........", "..........", "..........", ".........."]}
                    delaySpeed={1000} />
            </div>
        )
    }

    const fetchAgain=()=>{
        setResultMessage("")
        setLoadingState(false);
        setShowResult(false);
        setchangeBtn(false)
        if(ResultStatus){
            refetch()
            return
        }
        return
    }
    return (
        <>
            <Container className='border rounded'>
                <div className='text-center'>{good?.name}</div>
                <div className='imgFather'>
                    <img src={good?.image} alt={good?.image} className="image" />
                </div>

                <div className='iconsFather my-2'>
                    <i className='border border-1 border-danger w-50 text-center btn' type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => deleteGood1(goodId)} ><AiFillDelete className='text-danger' /></i>
                    <i className='border border-1 border-success w-50 text-center btn' onClick={() => updateGood(goodId)}  ><MdModeEditOutline className='h-100 text-success' /></i>
                </div>
            </Container>
            <Modal>
                <div className="modal fade" id="deleteModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-keyboard="false">
                    <div className="modal-dialog  modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Are you sure you want to delete {DeleteGoodId && DeleteGoodId.name}</h5>
                                {
                                    !LoadingState && <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                }
                            </div>
                            <div className="modal-body">
                                {LoadingState ? ShowResult ? <div>{ResultStatus ?
                                    <div className="alert alert-success d-flex align-items-center" role="alert">
                                        {ResultMessage}
                                    </div> :
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        {ResultMessage}
                                    </div>
                                }</div> : <Loading /> : ""}
                            </div>
                            <div className="modal-footer ">{
                                changeBtn?<button type="button" className="btn btn-success" onClick={fetchAgain} data-bs-dismiss="modal">Close</button>:<>
                                <button type="button" className="btn btn-secondary " data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger " onClick={() => deleteform(DeleteGoodId && DeleteGoodId.id)}>Delete</button>
                                </>

                            }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
const Container = styled.main`
height:100%;
.imgFather{
   height:66%;
   width:100%;
   position:relative;
    .image{
        position:absolute;
        min-height:100%;
        max-height:100%;
        width:100%;
    }
}
.iconsFather{
    display:flex;
    flex-direction:row-reverse;
    justify-content:space-between;
    i{
        font-size:30px;
        border-radius:8px;

    }

}`

const Modal = styled.section`
#deleteModal{
    .modal-dialog{

        .modal-content{

            .modal-footer{
                display:flex !important;
                justify-content:center !important;
                align-items:center !important;
                flex-direction:row !important;
                button{
                    width:45% !important;
                }
            }
        }
    }

}

`



export default Errormanage