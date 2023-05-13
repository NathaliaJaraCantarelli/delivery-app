// import React, { useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import DeliveryContext from './DeliveryContext';
// // import requestAPIFetch from '../services/RequestAPI';

// function DeliveryProvider({ children }) {
//   const [title, setTitle] = useState(''); /* recebe os valores de título da página */
//   const [showInput, setShowInput] = useState(false);
//   const [statusSearch, setStatusSearch] = useState(false);
//   const [deliveryearch, setdeliveryearch] = useState({ name: '', search: '' });
//   const [iddeliveryearch, setIddeliveryearch] = useState('');

//   const value = useMemo(() => ({
//     title,
//     setTitle,
//     showInput,
//     setShowInput,
//     deliveryearch,
//     setdeliveryearch,
//     statusSearch,
//     setStatusSearch,
//     iddeliveryearch,
//     setIddeliveryearch,
//   }), [title, setTitle, deliveryearch, setdeliveryearch, statusSearch, setStatusSearch,
//     showInput, setShowInput, iddeliveryearch, setIddeliveryearch]);

//   return (
//     <DeliveryContext.Provider value={ value }>
//       { children }
//     </DeliveryContext.Provider>
//   );
// }

// DeliveryProvider.propTypes = {
//   children: PropTypes.element.isRequired,
// };

// export default DeliveryProvider;
