import PropTypes from 'prop-types';

function CardOrd({ data }) {
  const { id, status, saleDate, totalPrice } = data;
  const ROUTE = 'customer_products';
  const ORDER = 'element-order-id-';
  const STATUS = 'element-delivery-status-';
  const DATE = 'element-order-date-';
  const PRICE = 'element-card-price-';

  return (
    <div>
      <p
        data-testid={ `${ROUTE}__${ORDER}${id}` }
      >
        {id}
      </p>
      <p
        data-testid={ `${ROUTE}__${STATUS}${id}` }
      >
        {status}
      </p>
      <p
        data-testid={ `${ROUTE}__${DATE}${id}` }
      >
        {saleDate}
      </p>
      <p
        data-testid={ `${ROUTE}__${PRICE}${id}` }
      >
        {totalPrice}
      </p>
    </div>
  );
}

CardOrd.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};

export default CardOrd;
