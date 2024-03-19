import React from "react"
import { FaUser } from "react-icons/fa";
import  "./styles.scss"


const Mainheader:React.FC=()=>{
    return (
    <>
    <div className="main_header_div" style={{borderBottom: '1px solid var(--gray-100)'}}>
        <div className="main_header_div_child_1">
            <h4 >ACME</h4>
        </div>
        <div className="main_header_div_child_2">
            <h4>Demo user</h4>
            <FaUser className="main_header_div_child_2_sub"/>
        </div>
    </div>
    </>
    )
}
export default Mainheader;