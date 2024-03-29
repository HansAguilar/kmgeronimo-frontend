import React,{ useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import { AiOutlineHistory } from 'react-icons/ai'
import { APPOINTMENT_LINK } from "../ApiLinks";
// import { AiFillPrinter } from 'react-icons/ai';
// import FileIcons from '../components/FileIcons';
import Table from '../components/AppointmentTable';
import Modal from '../components/TreatmentModal';
import CovidTestModal from '../components/CovidServiceModal';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import ExcelButton from '../components/ExcelButton';
// import PDFButton from '../components/PDFButton';

function Appointments() {
  const [ show, setModal ] = useState(false);
  const [ covidShow, setCovidModal ] = useState(false);
  const [ search, setSearch ] = useState("");
  const navigate = useNavigate();
  const appointmentList = useSelector((state)=>{ return state.appointment.payload.filter((val)=>val.status==="TREATMENT"); })
  const [ currentPage, setCurrentPage ] = useState(1);
  const tableHeaders = [ "Patient Name", "Dentist Name", "Treatment Date", "Treatment Start", "Treatment End", "Treatment Duration", "Teeth Number ", "Status","Action"];
  const pageNumber = [];
  
  const [appointment, setAppointment] = useState({
    patient: '',
    patientId:"",
    dentist: '',
    dentistId:"",
    serviceValue: "",
    serviceSelected:[],
    date:"",
    timeStart: "",
    timeEnd:"",
    totalAmount:0.00,
    method: "",
    type: "",
    insuranceId: "",
  });

  for(let x = 1; x <= Math.ceil(appointmentList.length/8);x++){
    pageNumber.push(x);
  }
  const searchHandle = (e) =>{ 
    setSearch(e.target.value);
  }

  const filteredServices = appointmentList.filter(val=>
    (val.patient.firstname+val.patient.middlename+val.patient.lastname).toLowerCase().includes(search)
    );

    const filteredAppointments = appointmentList.map((appointment) => {
      return {
        date: appointment.appointmentDate,
        timeStart: appointment.timeStart,
        timeEnd: appointment.timeEnd,
        status: appointment.status
      };
    });
   
  return (
    <div className=' h-screen overflow-hidden relative '>
      <Modal show={show} setModal={setModal} setCovidModal={setCovidModal} appointment={appointment} setAppointment={setAppointment} filteredAppointments={filteredAppointments} />
      <CovidTestModal show={covidShow} setModal={setCovidModal} setAddModal={setModal} data={appointment} />
      
      <PageHeader link={'Treatment'} />
      <div className=' w-full flex flex-col justify-center p-4 '> 
        <div className=' w-full bg-white h-auto shadow-lg rounded-md '>
           {/*Searchbar and files*/}
           <div className=' w-full p-4 flex justify-between '>

              <div className='flex gap-3 '>
                <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add Treatment</button> 
              </div>

              <div className=' inline-flex gap-2  '>
                  {/* <ExcelButton user={patients} title={"patients"} />
                  <PDFButton data={patients} />
                  <FileIcons Icon={AiFillPrinter} title={"Print"} /> */}
              </div>    
              <input
                  type='text'
                  name='search'
                  className=' px-4 py-1 w-80 border border-gray-300 outline-none '
                  placeholder='Search'
                  onChange={(e)=>searchHandle(e)}
                />

              
    
            </div>
            <Table tableHeaders={tableHeaders} results={ search.length > 0 ? filteredServices : appointmentList  } search={search} currentPage={currentPage} type="Treatment" /> 
              <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
        </div>
      </div>
    </div>
  )
}

export default Appointments