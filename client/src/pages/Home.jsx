import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
      if (data?.success) {
        // setCategories(data?.category); // Uncomment if you need to set categories
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/api/v1/place/place-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/place/place-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios(`http://localhost:8000/api/v1/place/place-list/${page}`)
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
    {/* WELCOME */}

    <div className="mt-5 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Welcome to Our Website!</h1>
    <section className='bg-gray-100 p-8'>
      <p className="text-lg text-gray-800 leading-relaxed">
      <b> Welcome!</b> We're thrilled to have you here. Whether you're exploring our products, seeking information, or simply browsing, we hope you find everything you need. Our goal is to provide you with a seamless and enjoyable experience. If you have any questions or need assistance, feel free to reach out to us. Thank you for visiting, and we look forward to serving you!
      </p>
    </section>
    </div>

      {/* ABOUT ME */}
      <div className="mx-auto mt-4 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">About Me</h2>
        <section className="bg-gray-100 p-8">
          <p className="text-lg text-gray-800 leading-relaxed">
            I am <b> Harikesh Yadav </b>, I have created this <b> portfolio web app</b> to add all my <b> projects. </b> I have used Tailwind Css for this portfolio application. <br />
            I'm a passionate web developer with a strong foundation in front-end and back-end technologies. My journey in web development started with a curiosity to understand how websites work, and it has grown into a deep love for creating efficient, user-friendly web applications. I have experience working with technologies like <b> HTML, CSS, JavaScript, React, Node.js, and MongoDB.</b> I enjoy learning new technologies and solving complex problems. When I'm not coding, you can find me exploring new coffee shops or hiking trails.
          </p>
        </section>
      </div>

      {/* PROJECTS SECTION */}
      <div id="projects" className="bg-blue-200">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-black">Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ margin: '20px 0' }}>All Projects List</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {products.map(p => (
                <div key={p._id} style={{ margin: '10px', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', backgroundColor: '#fff', maxWidth: '300px' }}>
                  <div style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div>
                      <img src={`http://localhost:8000/api/v1/place/place-photo/${p._id}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} alt={p.name} />
                      <div style={{ padding: '10px' }}>
                        <h5 style={{ marginBottom: '10px' }}>{p.name}</h5>
                        <p>{p.description.substring(0, 30)}</p>
                       {p.link && <NavLink to={p.link} target='_blank'><button className='bg-blue-900 text-white p-2 rounded'><span className="text-sm">Visit Project</span></button></NavLink>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-center mt-6'>
            {products && products.length < total && (
              <button className='px-5 py-2 bg-red-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700 transition duration-300 ease-in-out' onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AFTER PROJECTS CONTENT */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>

      
    </>
  )
}
