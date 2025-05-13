// import { Icon } from '@iconify/react';
// import Image from 'next/image';
// import React, { useState } from 'react';

// import CountryIndonesia from '../../../public/country/indonesia.svg';
// import CountrySingapore from '../../../public/country/singapore.svg';

// const optionCountry = [
//     {
//         name: 'Indonesia',
//         code: '+62',
//         flag: CountryIndonesia,
//     },
//     {
//         name: 'Singapore',
//         code: '+63',
//         flag: CountryIndonesia,
//     },
// ];

// interface PropsOption {
//     _id: string;
//     phoneCode: string[];
//     alpha2Code: string;
//     name: string;
// }

// interface Props {
//     name: string;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     onChangeCountry?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     value?: string;
//     defaulValue?: string;
//     defaultCountry?: string;
//     error?: boolean;
//     helperText?: any; // TODO: Please check it, some value is boolean
//     country?: PropsOption[];
// }

// const TextFieldPhoneNumber = ({
//     name,
//     onChange,
//     onChangeCountry,
//     value,
//     defaulValue,
//     defaultCountry,
//     error,
//     helperText,
//     country,
// }: Props) => {
//     const [openCountry, setOpenCountry] = useState(false);
//     const [selectedIndex, setSelectedIndex] = useState(0);
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const handleOpenCountry = () => {
//         setOpenCountry(!openCountry);
//     };
//     const handleSelectCountry = (index: number) => {
//         setSelectedIndex(index);
//         setSelectedCountry(`${index}`);
//         setOpenCountry(false);
//     };
//     return (
//         <div>
//             <div className="relative flex items-center">
//                 <button
//                     id="dropdown-phone-button"
//                     data-dropdown-toggle="dropdown-phone"
//                     className={`z-10 inline-flex shrink-0 items-center gap-2 rounded-l-sm rounded-s-sm border-y border-l ${error ? 'border-danger-500' : 'border-neutral-200'} px-4 py-2.5 text-center text-sm font-medium text-black focus:outline-none focus:ring-4`}
//                     type="button"
//                     onClick={handleOpenCountry}
//                 >
//                     {optionCountry[selectedIndex]?.code}
//                     <Icon
//                         icon="fluent:chevron-down-16-regular"
//                         width="16"
//                         height="16"
//                     />
//                 </button>
//                 {openCountry && (
//                     <div
//                         id="dropdown-phone"
//                         className="absolute bottom-[-100px] z-10 block max-h-[100px] w-52 overflow-y-auto rounded-lg bg-white shadow-10"
//                     >
//                         <ul
//                             className="text-sm"
//                             aria-labelledby="dropdown-phone-button"
//                         >
//                             {optionCountry.map((data, index) => (
//                                 <li
//                                     className={`flex justify-stretch py-2 pr-2 align-middle hover:bg-neutral-50 ${index === selectedIndex && 'bg-neutral-100'}`}
//                                     key={data.code}
//                                 >
//                                     <button
//                                         type="button"
//                                         className="inline-flex w-full px-4 py-2 text-text-xs"
//                                         role="menuitem"
//                                         onClick={() =>
//                                             handleSelectCountry(index)
//                                         }
//                                     >
//                                         <span className="inline-flex items-center">
//                                             <Image
//                                                 src={
//                                                     data.name === 'Indonesia'
//                                                         ? CountryIndonesia
//                                                         : CountrySingapore
//                                                 }
//                                                 alt="image"
//                                                 width={16}
//                                                 className="mr-2"
//                                             />
//                                             {data.code}
//                                         </span>
//                                     </button>
//                                     {index === selectedIndex && (
//                                         <Icon
//                                             icon="fluent:checkmark-16-regular"
//                                             width="16"
//                                             height="16"
//                                             className="text-slate-600"
//                                         />
//                                     )}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//                 <div className="relative w-full">
//                     <input
//                         type="text"
//                         name={name}
//                         value={value}
//                         onChange={onChange}
//                         defaultValue={defaulValue}
//                         id="phone-input"
//                         className={`z-20 block w-full rounded-e-md border-y border-r ${error ? 'border-danger-500' : 'border-neutral-200'} p-2.5 text-sm`}
//                         placeholder="8xxxxxxxx"
//                     />
//                     <input
//                         type="text"
//                         onChange={onChangeCountry}
//                         defaultValue={defaultCountry}
//                         value={selectedCountry}
//                         className="hidden"
//                     />
//                 </div>
//             </div>
//             {error && (
//                 <div className="text-left text-text-sm font-medium text-red">
//                     {helperText}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TextFieldPhoneNumber;
