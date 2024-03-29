import React,{ useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Appointments from './Appointments';
import Dentist from './Dentist';
import Patients from './Patients';
import Profile from './Profile';
import Services from './Services';
import Messages from './Messages';
import Header from '../components/Header';
import PageNotFound from './PageNotFound';
import History from './History';
import AppointmentInformation from './AppointmentInformation';
import Announcement from './Announcement';
import AppointmentCalendar from './AppointmentCalendar';
import ViewPatient from '../components/ViewPatient';
import Treatment from "./Treatment";
import Payment from "./Payment";
import Schedule from "./Schedule";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatient } from '../redux/action/PatientAction';
import { fetchDentist } from '../redux/action/DentistAction';
import { fetchAppointment } from '../redux/action/AppointmentAction';
import { fetchAdmin,fetchLoginAdmin } from '../redux/action/AdminAction';
import { fetchServices } from '../redux/action/ServicesAction';
import { fetchPayments } from '../redux/action/PaymentAction';
import { fetchInstallment } from '../redux/action/InstallmentAction';
import { fetchAnnouncement } from '../redux/action/AnnouncementAction';
import { fetchHistory } from '../redux/action/HistoryAction';
import { fetchAllNotification } from '../redux/action/NotificationAction';
import { fetchMessages } from '../redux/action/MessageAction';
import { fetchAppointmentFee } from '../redux/action/AppointmentFeeAction';
import { fetchSchedule } from '../redux/action/ScheduleAction';
import LoadingSpinner from "../components/LoadingSpinner";
import { AiOutlineScan } from 'react-icons/ai';
import QRScanPage from './QRScanPage';
import { useNavigate } from 'react-router-dom';
import QRCodeModal from '../components/QRCodeModal';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToggleQR, setToggleQR] = useState(false);
  const [ toggleBar, setToggleBar ] = useState(false);
  const patient = useSelector(state=>{return state.patient});
  const history = useSelector(state=>{return state.history});
  const installment = useSelector(state=>{return state.installment});
  const announcement = useSelector(state=>{return state.announcement});
  const messages = useSelector(state=>{return state.messages});
  const payment = useSelector(state=>{return state.payment});
  const service = useSelector(state=>{return state.service});
  const dentist = useSelector(state=>{return state.denstis});
  const admin = useSelector(state=>{return state.admin});
  const appointment = useSelector(state=>{return state.appointment });

  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(fetchLoginAdmin(token));
    dispatch(fetchAdmin());
  }, []);

  useEffect(() => {
    if (admin?.loginAdmin?.adminId) {
      dispatch(fetchHistory());
      dispatch(fetchAnnouncement());
      dispatch(fetchInstallment());
      dispatch(fetchPayments());
      dispatch(fetchServices());
      dispatch(fetchDentist());
      dispatch(fetchAppointment());
      dispatch(fetchAllNotification());
      dispatch(fetchMessages(admin.loginAdmin.adminId));
      dispatch(fetchAppointmentFee());
      dispatch(fetchSchedule());
      dispatch(fetchPatient());
      isLoading(false); // Make sure you have a function named `isLoading` defined
    }
  }, [admin.loginAdmin]);
  
  if(loading)return <section className='w-full h-screen flex justify-center items-center '><LoadingSpinner loading={loading} /></section>
  return (!patient?.loading && !history?.loading &&!announcement?.loading && !installment?.loading &&!payment?.loading && !service?.loading &&!dentist?.loading && !admin?.loading && !messages.loading&& !appointment?.loading) &&(
      <div className='w-full h-screen flex z-10 relative '>
        <Sidebar toggleBar={toggleBar} />
        <div className=' relative flex flex-grow flex-col bg-gray-200 '>
          { isToggleQR && (<QRCodeModal setToggleQR={setToggleQR} />) }
          <Header toggleBar={toggleBar} setToggleBar={setToggleBar} />
          <Routes>
                  <Route element={
                  <Home />} 
                  path='/' />

                  <Route element={
                  <Admin  />
                  } path='/admin' />

                  <Route path='/appointment'>
                    <Route element={<Appointments/>} path='/appointment/' />
                    <Route element={<AppointmentCalendar />} path='/appointment/calendar' />
                    <Route path='/appointment/details/:id' element={<AppointmentInformation/>} />
                    <Route path='*' element={<PageNotFound/>} />
                  </Route>

                  <Route element={
                  <Messages />
                  } path='/messages' />

                  <Route element={
                  <Dentist />
                  } path='/dentist' />

                  <Route 
                  path='/patient' >
                    <Route  element={<Patients />} path='/patient/' />
                    <Route  element={<ViewPatient />} path='/patient/:id' />
                  </Route>

                  <Route element={
                  <Profile />
                  } path='/profile' />

                  <Route element={
                  <History />
                  } path='/history' />

                  <Route element={
                  <Treatment />
                  } path='/treatment' />

                  <Route element={
                  <Services />
                  } path='/services' />

                  <Route element={
                  <Schedule />
                  } path='/schedule' />

                  <Route element={
                  <Payment />
                  } path='/payment' />

                  <Route element={
                  <Announcement />
                  } path='/announcement' />

                  <Route element={ <QRScanPage /> } 
                  path='/scan/:id' />
                  

          <Route path='*' element={<PageNotFound />} />
          </Routes>

          {/* LOGO */}
          <div className=' flex justify-center items-center flex-col bg-cyan-600 absolute w-auto h-auto p-3 right-10 bottom-10 rounded-md cursor-pointer hover:shadow-lg hover:bg-cyan-700 ' onClick={()=>setToggleQR(true)} >
            <AiOutlineScan size={50} className=' text-white ' />
            <h3 className=' font-bold text-white '>QR Code</h3>
          </div>

        </div>
    </div>
    )
}

export default Dashboard