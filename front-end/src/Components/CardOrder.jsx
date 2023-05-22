import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import formatDate from '../functions/dateGenerate';

function CardOrd({ data, route }) {
  const { id, status, saleDate, totalPrice } = data;
  const ROUTE = route;
  const ORDER = 'element-order-id-';
  const STATUS = 'element-delivery-status-';
  const DATE = 'element-order-date-';
  const PRICE = 'element-card-price-';
  const LINK = route.replace('_', '/');

  return (
    <Link to={ `/${LINK}/${id}` }>
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
          {formatDate(saleDate)}
        </p>
        <p
          data-testid={ `${ROUTE}__${PRICE}${id}` }
        >
          {totalPrice}
        </p>
      </div>
    </Link>
  );
}

CardOrd.propTypes = {
  route: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};

export default CardOrd;
