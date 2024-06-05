import { Modal, Button, Label, Select, TextInput, Spinner } from 'flowbite-react';
import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiDocumentAdd, HiOutlineExclamationCircle } from 'react-icons/hi';


// import { set } from 'mongoose';

export default function DashMedicine() {
  const { currentUser } = useSelector((state) => state.user);
  // const currentUser = {
  //   _id: "11223344",
  //     username: "yohannes",
  //     email: "yohannesguesh01@gmail.com",
  //     isAdmin: true
  // }
  // const [userPosts, setUserPosts] = useState([]);
  const userPosts = [{
    updatedAt: "24-20-2014",
    category: "post",
    _id: 2,
    title: "abcd"

  },
  {
    updatedAt: "24-20-2014",
    category: "post",
    _id: 1,
    title: "abcd"

  },
  {
    updatedAt: "24-20-2014",
    category: "post",
    _id: 3,
    title: "abcd"

  }
]
  const [medicine, setMedicine] = useState([]);

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(false);
  const [medicineIdToDelete, setMedicineIdToDelete] = useState();
  const [formData, setFormData] = useState({});
  const [formMedicine, setFormMedicine] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [editMedicine, setEditMedicine] = useState(false)
  const [medicineIndex, setMedicineIndex] = useState(0)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleMedicineChange = (e) => {
    setFormMedicine({ ...formMedicine, [e.target.id]: e.target.value.trim() });

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || formData.location == null) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      console.log(formData);
      
      const res = await fetch('https://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };


  const handleAdd = async() => {
    const fetchPosts = async () => {
      
      try {
        const res = await fetch(`http://localhost:5000/api/medicine/addmedicine`,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          console.log(data)
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }



  const handleUpdate = () => {
    console.log(formMedicine)
    const fetchPosts = async () => {
      
      try {
        const res = await fetch(`http://localhost:5000/api/medicine/updatemedicine`,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formMedicine),
        });
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          const res = await fetch(`http://localhost:5000/api/medicine/getmedicine`,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentUser.message),
        });
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          console.log(data)
          setMedicine(data)
          if (data.length < 9) {
            setShowMore(false);
          }
        }
          console.log(data)
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }

  useEffect(() => {
    setFormData({ ...formData, token: currentUser.message.token });
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/medicine/getmedicine`,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentUser.message),
        });
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          console.log(data)
          setMedicine(data)
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.message.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.message.id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        // setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `http://localhost:5000/api/medicine/deletemedicine/${medicineIdToDelete}/${currentUser.message.token}`,
        {
          method: 'DELETE',
        }
      );
      
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        // setUserPosts((prev) =>
        //   prev.filter((post) => post._id !== postIdToDelete)
        // );
        const res = await fetch(`http://localhost:5000/api/medicine/getmedicine`,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentUser.message),
        });
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          console.log(data)
          setMedicine(data)
          if (data.length < 9) {
            setShowMore(false);
          }
        }
        setMedicineIdToDelete(null)
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='mt-20 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.message.isAdmin && medicine.length > 0 ? (
        <>
        <div className=' items-end justify-end flex'>
        <Button className='bg-red-500 right-0' onClick={() => (setDetail(true))}><HiDocumentAdd className='w-6 h-6' /> add medicine</Button>
        </div>
        
          <table>
            <thead className='bg-white border-blue-400 border-solid rounded'>
              <th>name</th>
              <th>total number</th>
              <th>price</th>
              <th>delete</th>
              <th>edit</th>
            </thead>
              {medicine.map((post, index) => (
                <tbody key={post._id}>
                  
                    <td className='px-6'>{post[1]}</td>
                    <td className='px-6'>{post[2]}</td>
                    <td className='px-6'>{post[3]}</td>
                    <td>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setMedicineIdToDelete(post[0]);
                        console.log(medicine[medicineIndex][2])
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer px-6'
                    >
                      Delete
                    </span>
                    </td>
                    <td>
                    <Link
                      className='text-teal-500 hover:underline px-6'
                      onClick={() => {
                        setMedicineIndex(index)
                        setFormMedicine({ ...formMedicine, token: currentUser.message.token, medicine_id: post[0] });
                        setEditMedicine(true)

                      }}
                    >
                      <span>Edit</span>
                    </Link>
                    </td>
                </tbody>
              ))}
            
            
          </table>
          
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={detail}
        position='center'
        onClose={() => setDetail(false)}
        className='lg:my-[100px] lg:mx-[300px] bg-black'
      >
        <Modal.Header>Small modal</Modal.Header>
        <Modal.Body>
          
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Medicine' />
              <Select defaultValue="Aspirin" onChange={(event) => {
              // setModalPlacement(event.target.value)
              setFormData({ ...formData, medicine: event.target.value });
            }}>
                <option value="Aspirin">Aspirin</option>
                <option value="Paracetamol">Paracetamol</option>
                <option value="Ibuprofen">Ibuprofen</option>
                <option value="Amoxicillin">Amoxicillin</option>
                <option value="Ciprofloxacin">Ciprofloxacin</option>
                <option value="Metformin">Metformin</option>
              </Select>
            </div>
            <div>
              <Label value='Total Number' />
              <TextInput
                type='number'
                placeholder='0'
                id='totalnumber'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Price' />
              <TextInput
                type='number'
                placeholder='0.00'
                id='price'
                onChange={handleChange}
              />
            </div>
            {/* <div>
              <Label value='user type'></Label>
            <Select defaultValue="user" onChange={(event) => {
              setModalPlacement(event.target.value)
              setFormData({ ...formData, role: event.target.value });
            }}>
            <option value="user">User</option>
            <option value="pharmacy">Pharmacy</option>
            
          </Select>
            </div> */}
            
              
            
            {/* <Button onClick={()=>{setShowPopup(true)}} className='ml-1 text-start bg-red-600'>
              Subscription
            </Button> */}
            {/* {showPopup && <SubscriptionPopup onClose={() => setShowPopup(false)} />} */}
            {/* <SubscriptionPopup /> */}
            {/* <Button
            className='bg-red-500'
            onClick={() => {setDetail(true)}}
            >
              {Check == true && <span className='mr-2'><FaCheckCircle size={30} color="green" /></span>}
              Add Location
            </Button> */}

            


            <Button
              className='bg-red-500'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            {/* <OAuth /> */}
          </form>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            setDetail(false)
            handleAdd()
          }} className='bg-green-500'>I accept</Button>
          <Button color="gray" onClick={() => setDetail(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>





      <Modal
        show={editMedicine}
        position='center'
        onClose={() => setEditMedicine(false)}
        className='lg:my-[100px] lg:mx-[300px] bg-black'
      >
        <Modal.Header>Small modal</Modal.Header>
        <Modal.Body>
          
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          { medicine[medicineIndex]  && (
            <div>

            <div>
              <Label value='Total Number' />
              <TextInput
                type='number'
                placeholder={medicine[medicineIndex][2]}
                id='totalnumber'
                // value={medicine[medicineIndex][2]}
                onChange={handleMedicineChange}
              />
            </div>
            <div>
              <Label value='Price' />
              <TextInput
                type='number'
                placeholder={medicine[medicineIndex][3]}
                id='price'
                onChange={handleMedicineChange}
              />
            </div>
            </div>
          )}
            
           
            {/* <div>
              <Label value='user type'></Label>
            <Select defaultValue="user" onChange={(event) => {
              setModalPlacement(event.target.value)
              setFormData({ ...formData, role: event.target.value });
            }}>
            <option value="user">User</option>
            <option value="pharmacy">Pharmacy</option>
            
          </Select>
            </div> */}
            
              
            
            {/* <Button onClick={()=>{setShowPopup(true)}} className='ml-1 text-start bg-red-600'>
              Subscription
            </Button> */}
            {/* {showPopup && <SubscriptionPopup onClose={() => setShowPopup(false)} />} */}
            {/* <SubscriptionPopup /> */}
            {/* <Button
            className='bg-red-500'
            onClick={() => {setDetail(true)}}
            >
              {Check == true && <span className='mr-2'><FaCheckCircle size={30} color="green" /></span>}
              Add Location
            </Button> */}
          </form>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            setDetail(false)
            handleUpdate()
          }} className='bg-green-500'>I accept</Button>
          <Button color="gray" onClick={() => setDetail(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
