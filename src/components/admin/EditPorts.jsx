import { AnimatePresence } from "framer-motion";
import { Delete, Edit, Trash, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Loading from "../Loading";
import { deletePageContent, updatePageContent } from "../../apiCalls/pageContents";
import Swal from "sweetalert2";



const variants = {
  initial: {
    display: 'hidden',
  },

  final: {
    display: 'block',
  }
}


export const Wrapper = ({ children, elementToShow, isEditable, trigger }) => {
  return (
    <div className="relative">
      {children}

      {isEditable &&
        <Btn elementToShow={elementToShow} trigger={trigger}/>
      }
    </div>
  )
}



export const Btn = ({ elementToShow, trigger }) => {

  const [ show_element, set_show_element ] = useState(false);

  return (
    <>
      {trigger ?
        <div onClick={() => set_show_element(!show_element)} className="">
            {trigger}
        </div>
        :
        <div onClick={() => set_show_element(!show_element)} className="absolute edit-btn h-[20px] w-[20px] -top-3 right-0 rounded bg-blue-600 text-white flex items-center justify-center">
            <Edit />
        </div>
      }

      <AnimatePresence>
        {show_element && 
          <motion.div 
            initial={variants.initial} 
            animate={variants.final}
            transition={{
              opacity: {delay: 0.1}
            }}
            className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-60 z-40"
          >
            <div className="h-full w-full flex items-center justify-center relative gap-1">

              {elementToShow}

              <div onClick={() => set_show_element(!show_element)} className="h-[30px] w-[30px]  top-10 right-10 rounded-full flex items-center justify-center text-white bg-red-500">
                <X />
              </div>

            </div>
          </motion.div>
        }
      </AnimatePresence>
    
    </>
  );
};

export const Single = ({ showDel = false, labels=[], callback=()=>{}, item={} }) => {

  const [ values, set_values ] = useState({ valueOne: item[labels[0]] });

  const [loading_visible, set_loading_visible] = useState(false);

  const updateValues = async () => {

    const contentMap = {position: item.position};

    contentMap[labels[0]] = values.valueOne;

    console.log(contentMap);

    set_loading_visible(true);

    const response = await updatePageContent(contentMap, item.id);

    Swal.fire({...response, icon: response.status});

    set_loading_visible(false);
    callback();
  }

  return (
    <div className="w-[300px] bg-white text-black rounded-xl p-6">
      <Loading show={loading_visible} />

      <div className="input flex flex-col gap-1 mb-2">
        <label htmlFor="name" className="text-sm">Value</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
          onChange={event => set_values({...values, valueOne: event.target.value})}
          value={values.valueOne}
        />
      </div>

      <div className="flex items-center gap-1">
        <button onClick={updateValues} className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};

export const SingleTextArea = ({ showDel = false, labels=[], callback=()=>{}, item={} }) => {

  const [ values, set_values ] = useState({ valueOne: item[labels[0]] });


  const [loading_visible, set_loading_visible] = useState(false);

  const updateValues = async () => {

    const contentMap = {position: item.position};

    contentMap[labels[0]] = values.valueOne;

    set_loading_visible(true);

    const response = await updatePageContent(contentMap, item.id);

    Swal.fire({...response, icon: response.status});

    set_loading_visible(false);
    callback();
  }

  return (
    <div className="w-[300px] bg-white text-black rounded-xl p-6">
      <Loading show={loading_visible} />

      <div className="input flex flex-col gap-1 mb-2">
        <label htmlFor="name" className="text-sm">Value</label>
        <textarea 
          type="text" 
          name="name" 
          id="name" 
          className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" 
          onChange={(event) => set_values({...values, valueOne: event.target.value})}
          value={values.valueOne}
        />
      </div>

      <div className="flex items-center gap-1">
        <button onClick={updateValues} className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
         }
      </div>
    </div>
  );
};

export const Double = ({ showDel = false, labels=[], item={}, callback=()=>{} }) => {

  console.log(item);

  const [ values, set_values ] = useState({ valueOne: item[labels[0]], valueTwo: item[labels[1]]});

  const [loading_visible, set_loading_visible] = useState(false);

  const updateValues = async () => {

    const contentMap = {position: item.position};

    contentMap[labels[0]] = values.valueOne;
    contentMap[labels[1]] = values.valueTwo;

    set_loading_visible(true);

    const response = await updatePageContent(contentMap, item.id);

    Swal.fire({...response, icon: response.status});

    set_loading_visible(false);
    callback();
  }

  return (
    <div className="w-[300px] bg-white text-black rounded-xl p-6">
      <Loading show={loading_visible} />
      <div className="input flex flex-col gap-1">
        <label htmlFor="name" className="text-sm">Label</label>
        <input 
          type="text" 
          name="valueOne" 
          id="valueOne" 
          className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
          onChange={(event) => set_values({...values, valueOne: event.target.value})}
          value={values.valueOne}
        />
      </div>

      <div className="input flex flex-col gap-1 my-2">
        <label htmlFor="name" className="text-sm">Value</label>
        <input 
          type="text" 
          name="valueTwo" 
          id="valueTwo" 
          className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" 
          onChange={(event) => set_values({...values, valueTwo: event.target.value})}
          value={values.valueTwo}
        />
      </div>

      <div className="flex items-center gap-1">
        <button onClick={updateValues} className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};

export const Image = ({ showDel = false, item={}, callback=()=>{}, type="image" }) => {

  const [ values, set_values ] = useState(item);

  const [loading_visible, set_loading_visible] = useState(false);

  const input_ref = useRef(null);

  const updateValues = async () => {

    set_loading_visible(true);

    const response = await updatePageContent({...values, position: item.position}, item.id);

    Swal.fire({...response, icon: response.status});

    set_loading_visible(false);
    callback();
  }

  const deleteItem = async () => {
    set_loading_visible(true);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deletePageContent( item.id);
        Swal.fire({...response, icon: response.status});
        callback();
      }
      set_loading_visible(false);
    });

  }

  const previewImage = (event) => {
    const image = event.target.files[0];
    const url = URL.createObjectURL(image);
    set_values({...values, image, url })
  }


  return (
    <div className=" bg-white text-black rounded-xl p-6">
      <Loading show={loading_visible} />

      <div className="flex items-center gap-6">

        <div className="image-box w-[300px] h-[200px] rounded border-2 border-gray-400 relative text-white">
          <div onClick={() => input_ref.current.click()} className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-40 flex items-center justify-center flex-col">
            <Upload size={60} />
            <span className="font-black text-sm mt-1.5 capitalize">Click Me To Upload An {type}</span>
          </div>

          {(values.url && type == "image") && 
            <img src={values.url} className="h-full w-full object-cover" />
          }

          {(values.url && type != "image") && 
            <video src={values.url} className="h-full w-full object-cover" />
          }


          {type == "image" ? 
            <input ref={input_ref} type="file" accept="image/*" className="h-0 w-0 overflow-hidden p-0 m-0 opacity-0" onChange={previewImage}/> :
            <input ref={input_ref} type="file" accept="video/*" className="h-0 w-0 overflow-hidden p-0 m-0 opacity-0" onChange={previewImage}/>
          }

        </div>

        <div className="input-box">
          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Title</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, title: event.target.value})}
              value={values.title}
            />
          </div>

          <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Content</label>
            <textarea 
              type="text" 
              name="content" 
              id="content" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, content: event.target.value})}
              value={values.content}
            />
          </div>

          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Link Label</label>
            <input 
              type="text" 
              name="link_label" 
              id="link_label" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, link_label: event.target.value})}
              value={values.link_label}
            />
          </div>

          {/* <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Link</label>
            <input 
              type="text" 
              name="link" 
              id="link" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" 
              onChange={(event) => set_values({...values, link: event.target.value})}
              value={values.link}
            />
          </div> */}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3">
        <button onClick={updateValues} className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button onClick={deleteItem} className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};

export const Card = ({ showDel = false, item={}, callback=()=>{}, type="image" }) => {

  const [ values, set_values ] = useState(item);

  const [loading_visible, set_loading_visible] = useState(false);

  const input_ref = useRef(null);

  const updateValues = async () => {

    set_loading_visible(true);

    const response = await updatePageContent({...values, position: item.position}, item.id);

    Swal.fire({...response, icon: response.status});

    set_loading_visible(false);
    callback();
  }

  const deleteItem = async () => {
    set_loading_visible(true);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deletePageContent( item.id);
        Swal.fire({...response, icon: response.status});
        callback();
      }
      set_loading_visible(false);
    });

  }

  const previewImage = (event) => {
    const image = event.target.files[0];
    const url = URL.createObjectURL(image);
    set_values({...values, image, url })
  }


  return (
    <div className=" bg-white text-black rounded-xl p-6">
      <Loading show={loading_visible} />

      <div className="flex items-center gap-6">

        <div className="image-box w-[300px] h-[200px] rounded border-2 border-gray-400 relative text-white">
          <div onClick={() => input_ref.current.click()} className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-40 flex items-center justify-center flex-col">
            <Upload size={60} />
            <span className="font-black text-sm mt-1.5 capitalize">Click Me To Upload An {type}</span>
          </div>

          {(values.url && type == "image") && 
            <img src={values.url} className="h-full w-full object-cover" />
          }

          {(values.url && type != "image") && 
            <video src={values.url} className="h-full w-full object-cover" />
          }


          {type == "image" ? 
            <input ref={input_ref} type="file" accept="image/*" className="h-0 w-0 overflow-hidden p-0 m-0 opacity-0" onChange={previewImage}/> :
            <input ref={input_ref} type="file" accept="video/*" className="h-0 w-0 overflow-hidden p-0 m-0 opacity-0" onChange={previewImage}/>
          }

        </div>

        <div className="input-box">
          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Title</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, title: event.target.value})}
              value={values.title}
            />
          </div>

          <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Content</label>
            <textarea 
              type="text" 
              name="content" 
              id="content" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, content: event.target.value})}
              value={values.content}
            />
          </div>

          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Link Label</label>
            <input 
              type="text" 
              name="link_label" 
              id="link_label" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, link_label: event.target.value})}
              value={values.link_label}
            />
          </div>

          <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Link</label>
            <input 
              type="text" 
              name="link" 
              id="link" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" 
              onChange={(event) => set_values({...values, link: event.target.value})}
              value={values.link}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={updateValues} className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button onClick={deleteItem} className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};

export const CardTwo = ({ showDel = false, item={}, callback=()=>{}, type="image" }) => {

  const [ values, set_values ] = useState(item);

  const [loading_visible, set_loading_visible] = useState(false);

  const input_ref = useRef(null);

  const updateValues = async () => {

    set_loading_visible(true);

    const response = await updatePageContent({...values, position: item.position}, item.id);

    Swal.fire({...response, icon: response.status});

    set_loading_visible(false);
    callback();
  }

  const deleteItem = async () => {
    set_loading_visible(true);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deletePageContent( item.id);
        Swal.fire({...response, icon: response.status});
        callback();
      }
      set_loading_visible(false);
    });



  }

  const previewImage = (event) => {
    const image = event.target.files[0];
    const url = URL.createObjectURL(image);
    set_values({...values, image, url })
  }


  return (
    <div className=" bg-white text-black rounded-xl p-6">
      <Loading show={loading_visible} />

      <div className="flex items-center gap-6">

        <div className="image-box w-[300px] h-[200px] rounded border-2 border-gray-400 relative text-white">
          <div onClick={() => input_ref.current.click()} className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-40 flex items-center justify-center flex-col">
            <Upload size={60} />
            <span className="font-black text-sm mt-1.5 capitalize">Click Me To Upload An {type}</span>
          </div>

          {(values.url && type == "image") && 
            <img src={values.url} className="h-full w-full object-cover" />
          }

          {(values.url && type != "image") && 
            <video src={values.url} className="h-full w-full object-cover" />
          }


          {type == "image" ? 
            <input ref={input_ref} type="file" accept="image/*" className="h-0 w-0 overflow-hidden p-0 m-0 opacity-0" onChange={previewImage}/> :
            <input ref={input_ref} type="file" accept="video/*" className="h-0 w-0 overflow-hidden p-0 m-0 opacity-0" onChange={previewImage}/>
          }

        </div>

        <div className="input-box">
          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Title</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, title: event.target.value})}
              value={values.title}
            />
          </div>

          <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Content</label>
            <textarea 
              type="text" 
              name="content" 
              id="content" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, content: event.target.value})}
              value={values.content}
            />
          </div>

        </div>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <button onClick={updateValues} className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button onClick={deleteItem} className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};

export const CardTwoNoPics = ({ showDel = false, item={}, callback=()=>{}, type="image" }) => {

  const [ values, set_values ] = useState(item);

  const [loading_visible, set_loading_visible] = useState(false);

  const input_ref = useRef(null);

  const updateValues = async () => {

    set_loading_visible(true);

    const response = await updatePageContent({...values, position: item.position}, item.id);

    Swal.fire({...response, icon: response.status});

    set_loading_visible(false);
    callback();
  }

  const deleteItem = async () => {
    set_loading_visible(true);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deletePageContent( item.id);
        Swal.fire({...response, icon: response.status});
        callback();
      }
      set_loading_visible(false);
    });



  }

  const previewImage = (event) => {
    const image = event.target.files[0];
    const url = URL.createObjectURL(image);
    set_values({...values, image, url })
  }


  return (
    <div className=" bg-white text-black rounded-xl p-6">
      <Loading show={loading_visible} />

      <div className="flex items-center gap-6">

        <div className="input-box">
          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Title</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, title: event.target.value})}
              value={values.title}
            />
          </div>

          <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Content</label>
            <textarea 
              type="text" 
              name="content" 
              id="content" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, content: event.target.value})}
              value={values.content}
            />
          </div>

        </div>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <button onClick={updateValues} className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button onClick={deleteItem} className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};

export const CardDouble = ({ showDel = false, item={}, callback=()=>{}, type="image" }) => {

  console.log(item);

  const [ values, set_values ] = useState(item);

  const [loading_visible, set_loading_visible] = useState(false);

  const input_ref = useRef(null);

  const updateValues = async () => {

    set_loading_visible(true);

    const response = await updatePageContent({...values, position: item.position}, item.id);

    Swal.fire({...response, icon: response.status});

    set_loading_visible(false);
    callback();
  }

  const previewImage = (event) => {
    const image = event.target.files[0];
    const url = URL.createObjectURL(image);
    set_values({...values, image, url })
  }


  return (
    <div className=" bg-white text-black rounded-xl p-6">
      <Loading show={loading_visible} />

      <div className="flex items-center gap-6">

        <div className="image-box w-[300px] h-[200px] rounded border-2 border-gray-400 relative text-white">
          <div onClick={() => input_ref.current.click()} className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-40 flex items-center justify-center flex-col">
            <Upload size={60} />
            <span className="font-black text-sm mt-1.5 capitalize">Click Me To Upload An {type}</span>
          </div>

          {(values.url && type == "image") && 
            <img src={values.url} className="h-full w-full object-cover" />
          }

          {(values.url && type != "image") && 
            <video src={values.url} className="h-full w-full object-cover" />
          }


          {type == "image" ? 
            <input ref={input_ref} type="file" accept="image/*" className="h-0 w-0 overflow-hidden p-0 m-0 opacity-0" onChange={previewImage}/> :
            <input ref={input_ref} type="file" accept="video/*" className="h-0 w-0 overflow-hidden p-0 m-0 opacity-0" onChange={previewImage}/>
          }

        </div>

        <div className="input-box">
          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Title</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, title: event.target.value})}
              value={values.title}
            />
          </div>

          <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Content</label>
            <textarea 
              type="text" 
              name="content" 
              id="content" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, content: event.target.value})}
              value={values.content}
            />
          </div>

          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Title-2</label>
            <input 
              type="text" 
              name="link_label" 
              id="link_label" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, link_label: event.target.value})}
              value={values.link_label}
            />
          </div>

          <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Content-2</label>
            <textarea 
              type="text" 
              name="link" 
              id="link" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" 
              onChange={(event) => set_values({...values, link: event.target.value})}
              value={values.link}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={updateValues} className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};

export const CardDoubleNoPic = ({ showDel = false, item={}, callback=()=>{}, type="image" }) => {

  console.log(item);

  const [ values, set_values ] = useState(item);

  const [loading_visible, set_loading_visible] = useState(false);

  const input_ref = useRef(null);

  const updateValues = async () => {

    set_loading_visible(true);

    const response = await updatePageContent({...values, position: item.position}, item.id);

    Swal.fire({...response, icon: response.status});

    set_loading_visible(false);
    callback();
  }

  const previewImage = (event) => {
    const image = event.target.files[0];
    const url = URL.createObjectURL(image);
    set_values({...values, image, url })
  }

  return (
    <div className=" bg-white text-black rounded-xl p-6">
      <Loading show={loading_visible} />

      <div className="flex items-center gap-6">

        <div className="input-box">
          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Title</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, title: event.target.value})}
              value={values.title}
            />
          </div>

          <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Content</label>
            <textarea 
              type="text" 
              name="content" 
              id="content" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, content: event.target.value})}
              value={values.content}
            />
          </div>

          <div className="input flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">Title-2</label>
            <input 
              type="text" 
              name="link_label" 
              id="link_label" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent"
              onChange={(event) => set_values({...values, link_label: event.target.value})}
              value={values.link_label}
            />
          </div>

          <div className="input flex flex-col gap-1 my-2">
            <label htmlFor="name" className="text-sm">Content-2</label>
            <textarea 
              type="text" 
              name="link" 
              id="link" 
              className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" 
              onChange={(event) => set_values({...values, link: event.target.value})}
              value={values.link}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={updateValues} className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};