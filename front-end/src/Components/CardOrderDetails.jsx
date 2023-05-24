import PropTypes from 'prop-types';

export default function CardOrderDetails({ product, index, route, quantity }) {
  return (
    <>
      <td
        data-testid={
          `${route}__element-order-table-item-number-${index}`
        }
      >
        {index + 1}
      </td>
      <td
        data-testid={
          `${route}__element-order-table-name-${index}`
        }
      >
        {product.name}
      </td>
      <td
        data-testid={
          `${route}__element-order-table-quantity-${index}`
        }
      >
        {quantity}
      </td>
      <td
        data-testid={
          `${route}__element-order-table-unit-price-${index}`
        }
      >
        {product.price.toString().replace('.', ',')}
      </td>
      <td
        data-testid={
          `${route}__element-order-table-sub-total-${index}`
        }
      >
        {((parseFloat(quantity) * parseFloat(product.price))
          .toFixed(2)).toString().replace('.', ',')}
      </td>
    </>
  );
}

CardOrderDetails.propTypes = {
  index: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
