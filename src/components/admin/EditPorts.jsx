import { AnimatePresence } from "framer-motion";
import { Delete, Edit, Trash, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";



const variants = {
  initial: {
    display: 'hidden',
  },

  final: {
    display: 'block',
  }
}


export const Wrapper = ({ children, elementToShow }) => {
  return (
    <div className="relative">
      {children}

      <Btn elementToShow={elementToShow}/>
    </div>
  )
}

export const Btn = ({ elementToShow }) => {

  const [ show_element, set_show_element ] = useState(false);

  return (
    <>
    
      <div onClick={() => set_show_element(!show_element)} className="absolute edit-btn h-[20px] w-[20px] -top-3 right-0 rounded bg-blue-600 text-white flex items-center justify-center">
          <Edit />
      </div>

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

export const Single = ({ showDel = false }) => {
  return (
    <div className="w-[300px] bg-white text-black rounded-xl p-6">

      <div className="input flex flex-col gap-1 mb-2">
        <label htmlFor="name" className="text-sm">Value</label>
        <input type="text" name="name" id="name" className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" />
      </div>

      <div className="flex items-center gap-1">
        <button className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};

export const SingleTextArea = ({ showDel = false }) => {
  return (
    <div className="w-[300px] bg-white text-black rounded-xl p-6">

      <div className="input flex flex-col gap-1 mb-2">
        <label htmlFor="name" className="text-sm">Value</label>
        <textarea type="text" name="name" id="name" className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" />
      </div>

      <div className="flex items-center gap-1">
        <button className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};

export const Double = ({ showDel = false }) => {
  return (
    <div className="w-[300px] bg-white text-black rounded-xl p-6">
      <div className="input flex flex-col gap-1">
        <label htmlFor="name" className="text-sm">Label</label>
        <input type="text" name="name" id="name" className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" />
      </div>

      <div className="input flex flex-col gap-1 my-2">
        <label htmlFor="name" className="text-sm">Value</label>
        <input type="text" name="name" id="name" className="shadow-xl border-2 border-gray-900 rounded-xl px-2 py-1 focus:border-transparent" />
      </div>

      <div className="flex items-center gap-1">
        <button className="flex-grow bg-blue-600 text-white rounded-xl px-2 h-[40px]">Done</button>
        {showDel && 
          <button className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-red-500 text-white">
            <Trash />
          </button>
        }
      </div>
    </div>
  );
};