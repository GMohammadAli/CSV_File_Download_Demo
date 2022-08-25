import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import axios from 'axios';
import { Button } from '@mui/material';


function App() {
  const [blogs, setBlogs] = useState();
  const [areBlogsAvailable , setAreBlogsAvailable] = useState(false);

  const headers = {
    Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NjIwNTU0NzF9.nVgzJofZqhe6CN31pwAi8rdqrwCQRWq6pL7rV-8cqr0"
  };

  //This is an API call on my BLogs_App_Backend Repository
  const getBlogs = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_KEY}/users/2/blogs`, {headers})
      .then((res) => {
        setBlogs(res.data);
        setAreBlogsAvailable(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, [])

  const csvHeaders = [
    {
      label:"Sr. No", key:"id"
    },
    {
      label:"Title", key:"title"
    },
    {
      label:"Description", key:"description"
    },
    {
      label:"Is Liked?", key:"isLiked"
    }
  ]


  const csvLink = {
    headers: csvHeaders,
    data: blogs,
    filename: "blogs.csv"
  };


  return (
    <div>
      {areBlogsAvailable && (
        <CSVLink {...csvLink}>
          <Button
            sx={{ color: "#FFF !important" ,textDecorationLine:"none"}}
            color="primary"
            variant="contained"
          >
            Download Blogs File
          </Button>
        </CSVLink>
      )}
    </div>
  );
}

export default App

