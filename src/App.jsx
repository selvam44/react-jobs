import React from 'react';
import {Route,
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, {jobLoader} from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';


const App = () => {

  //Add New Job
  const addJob = async (newJob)=>{
    //console.log(newJob);
    const res = await fetch('/api/jobs',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return ;
  };

  //Delete Job
  const deleteJob = async (id) => {
    //console.log('delete', id);
    const res = await fetch(`/api/jobs/${id}`,{
      method: 'DELETE'
    });
    return ;
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path="/jobs" element={<JobsPage />}/>
      <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />}/>
      <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Route>
  )
  ); 



  return <RouterProvider router={router} />;
};

export default App;