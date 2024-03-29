import React,{useState, useEffect} from 'react';
import PageHeader from '../components/PageHeader';
import Table from '../components/HistoryTable';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { HISTORY_LINK } from '../ApiLinks';
import { useSelector } from 'react-redux';
import ExcelButton from '../components/HistoryExcel';
import PDFButton from '../components/HistoryPdfButton';
import moment from 'moment';

function History() {
  const tableHeaders = [ "Name","Dentist", "Description", "Date", "Status" ];
  const [ search, setSearch ] = useState("");
  const  historyList = useSelector((state)=>state.appointment.payload.filter((val)=>val.status === "DONE" || val.status === "CANCELLED"))
  const [ currentPage, setCurrentPage ] = useState(1);
  const pageNumber = [];

  const searchHandle = (e) =>{ 
    setSearch(e.target.value);
  }

  for(let x = 1; x <= Math.ceil(historyList.length/8);x++){
    pageNumber.push(x);
  }
  const filteredHistory = historyList.filter((val)=>
    (val.name+val.appointmentDate).toLowerCase().includes(search.toLowerCase())
  )

  const history = historyList.filter(val=>val.status === "DONE" || val.status === "CANCELLED")
        .map(val=> {return{
            appointmentDate: moment(val.appointmentDate).format("L"),
            name: `${val.patient.firstname} ${val.patient.lastname}`,
            dentist: `Dr. ${val.dentist.fullname}`,
            description: val.status==="DONE" ? `Appointment for ${val.patient.firstname} ${val.patient.lastname} was successful` :  `Appointment for ${val.patient} has been cancelled`,
            status:val.status
         }});

  // const fetchHistory = async() => {
  //   try {
  //       const response = await axios.get(HISTORY_LINK);
  //       if(response.data){
  //           setHistoryList(response.data);
  //       }
  //   } catch (error) {console.log(error); }
  // }
  // useEffect(()=>{
  //   fetchHistory();
  // },[]);
  
  return (
    <div className=' h-screen overflow-hidden relative '>
      <PageHeader link={'History'} />
      <div className=' w-full flex flex-col justify-center p-4 '> 
        <div className=' w-full bg-white h-auto rounded-xl shadow-lg'>
          {/*Sub header*/}
          <div className=' w-full p-4 border-t-2 border-t-cyan-500 rounded-t-xl flex justify-between items-center border-b-2 '>
              <h1 className=' text-xl '>Appointment History</h1>
              
              {/* <div className='flex gap-3 '>
                <button className=' bg-gray-500 text-white flex justify-start items-center pl-4 pr-8 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><AiOutlineHistory size={30} />&nbsp;History</button>
                <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add Appointment</button> 
              </div> */} 
              <input
                  type='text'
                  name='search'
                  className=' px-4 py-1 w-80 border border-gray-300 outline-none '
                  placeholder='Search'
                  onChange={(e)=>searchHandle(e)}
                />
          </div>
           {/*Searchbar and files*/}
           <div className=' w-full p-4 flex justify-between '>
              <div className=' inline-flex gap-2  '>
                   <ExcelButton users={history} title={"medical-record-list"} />
                  <PDFButton data={history} />
                  {/*<FileIcons Icon={AiFillPrinter} title={"Print"} /> */}
              </div>    
              {/* <input
                  type='text'
                  name='search'
                  className=' px-4 py-1 w-80 border border-gray-300 outline-none '
                  placeholder='Search'
                  onChange={(e)=>searchHandle(e)}
                /> */}

              
    
            </div>
            <Table tableHeaders={tableHeaders} results={ search.length > 0 ? filteredHistory : history  } search={search} currentPage={currentPage} /> 
              <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
        </div>
      </div>
    </div>
  )
}

export default History