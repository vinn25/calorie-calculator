// import type { RadioGroupProps } from '@fluentui/react-components';
// import { Field, Radio, RadioGroup } from '@fluentui/react-components';
// import Image from 'next/image';
// import React from 'react';

// interface PropsOption {
//     label: string;
//     value: string;
//     country: any;
// }

// interface Props {
//     label?: string;
//     option: PropsOption[];
//     isRequired?: boolean;
//     props: Partial<RadioGroupProps>;
//     error?: boolean;
//     helperText?: any;
// }

// const RadioGroups = ({
//     label,
//     option,
//     isRequired,
//     error,
//     helperText,
//     props,
// }: Props) => {
//     return (
//         <Field
//             label={
//                 <div className="w-full text-text-sm">
//                     {label}
//                     {isRequired && <sup className="text-red">*</sup>}
//                 </div>
//             }
//         >
//             <RadioGroup {...props}>
//                 {option.map((item: any) => (
//                     <Radio
//                         value={item.value}
//                         label={
//                             <div className="flex gap-3">
//                                 <Image
//                                     src={item.country}
//                                     alt="country"
//                                     width={16}
//                                 />
//                                 {item.label}
//                             </div>
//                         }
//                         key={item.value}
//                     />
//                 ))}
//             </RadioGroup>
//             {error && (
//                 <div className="text-left text-text-sm font-medium text-red">
//                     {helperText}
//                 </div>
//             )}
//         </Field>
//     );
// };

// export default RadioGroups;
