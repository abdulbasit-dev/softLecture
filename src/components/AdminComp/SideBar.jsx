// import { useContext, useEffect, useState } from 'react';
// import Filter1Icon from '@material-ui/icons/Filter1';
// import Filter2Icon from '@material-ui/icons/Filter2';
// import Filter3Icon from '@material-ui/icons/Filter3';
// import Filter4Icon from '@material-ui/icons/Filter4';
// import { LectureContext } from '../../LectureConetxt';
// import { Link } from 'react-router-dom';

// function SideBar() {
//   const [state] = useContext(LectureContext);
//   const [stage, setStage] = useState(null);

//   useEffect(() => {
//     setStage(state.user?.email?.substring(5, 6));
//   });

//   return (
//     <div className="bg-gray-800 shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
//       <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
//         {stage && (
//           <ul className="list-reset mt-6 flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
//             <li className="mr-3 flex-1">
//               <a
//                 href="#"
//                 className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
//               >
//                 <Filter1Icon />
//                 <span className="pb-1 ml-2 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
//                   Stage 1
//                 </span>
//               </a>
//             </li>
//             <li className="mr-3 flex-1">
//               <a
//                 href="#"
//                 className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
//               >
//                 <Filter2Icon />
//                 <span className="pb-1 ml-2 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
//                   Stage 2
//                 </span>
//               </a>
//             </li>
//             <li className="mr-3 flex-1">
//               <a
//                 href="#"
//                 className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600"
//               >
//                 <Filter3Icon />
//                 <span className="pb-1 ml-3 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
//                   Stage 3
//                 </span>
//               </a>
//             </li>
//             <li className="mr-3 flex-1">
//               <Link
//                 to={`admin/stage/${stage}`}
//                 className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
//               >
//                 <Filter4Icon />
//                 <span className="pb-1 ml-2 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
//                   Stage 4
//                 </span>
//               </Link>
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SideBar;
