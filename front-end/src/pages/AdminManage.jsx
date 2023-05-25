import { useEffect, useState } from 'react';
import { requestData, requestRegister } from '../services/request';
import HeaderAdmin from '../Components/HeaderAdmin';

const ROUTE = 'admin_manage';
const TABLE = 'element-user-table-item-number-';
const NAME = 'element-user-table-name-';
const NAMEINP = 'input-name';
const EMAIL = 'element-user-table-email-';
const EMAILINP = 'input-email';
const ROLE = 'element-user-table-role-';
const ROLEINP = 'select-role';
const REMOVE = 'element-user-table-remove-';
const PASSWORDINP = 'input-password';
const REGISTER = 'button-register';
const ERROR = 'element-invalid-register';

export default function AdminManage() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [login, setLogin] = useState({
    email: '', password: '', name: '', role: 'customer' });
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    const allUsers = async () => {
      const allUsersReq = await requestData('/user');
      setUsers(allUsersReq.users);
      console.log(allUsersReq);
    };
    allUsers();
  }, []);

  const DOZE = 12;
  const SEIS = 6;
  const re = /\S+@\S+\.\S+/;
  const verifyName = login.name.length >= DOZE;
  const verifyPassword = login.password.length >= SEIS;
  const verifyEmail = re.test(login.email);
  const verify = (verifyName && verifyPassword && verifyEmail);

  const sendInfo = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = login;
    try {
      console.log({ name, email, password, role });
      await requestRegister(
        '/register',
        { name, email, password, role },
      );
      setLogin({ email: '', password: '', name: '', role: 'customer' });
      setUsers([...users, { email, name, password, role }]);
      setConflict(false);
    } catch (error) {
      setConflict(true);
    }
  };

  const handleChange = ({ target }) => {
    setLogin({
      ...login,
      [target.name]: target.value,
    });
    const campInput = ((login.name.length > 0) && (
      login.email.length > 0) && (login.password.length > 0));
    if (campInput) setErrorMessage('Preencha todos os campos corretamente');
  };

  const removeUser = async (id, email) => {
    await requestRegister('/user/remove', { id });
    const remove = users.filter((user) => user.email !== email);
    setUsers(remove);
  };

  return (
    <>
      <HeaderAdmin />
      <p>Admin</p>
      <form>
        <span>Nome </span>
        <input
          type="text"
          name="name"
          value={ login.name }
          onChange={ handleChange }
          data-testid={ `${ROUTE}__${NAMEINP}` }
        />
        <span>Email </span>
        <input
          type="email"
          name="email"
          value={ login.email }
          onChange={ handleChange }
          data-testid={ `${ROUTE}__${EMAILINP}` }
        />
        <span>Password </span>
        <input
          type="text"
          name="password"
          value={ login.password }
          onChange={ handleChange }
          data-testid={ `${ROUTE}__${PASSWORDINP}` }
        />
        <span>Tipo </span>
        <select
          onChange={ handleChange }
          name="role"
          data-testid={ `${ROUTE}__${ROLEINP}` }
        >
          <option value="customer">customer</option>
          <option value="administrator">administrator</option>
          <option value="seller">seller</option>
        </select>
        <button
          type="button"
          disabled={ !verify }
          data-testid={ `${ROUTE}__${REGISTER}` }
          onClick={ sendInfo }
        >
          CADASTRAR
        </button>
        <span data-testid={ `${ROUTE}__${ERROR}` }>{ errorMessage }</span>
        <p
          id="form-invalid-text"
          hidden={ !conflict }
          data-testid="admin_manage__element-invalid-register"
        >
          Usuário já existe!
        </p>
      </form>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Tipo</td>
            <td>Excluir</td>
          </tr>
        </thead>
        <tbody>
          { users.map((user, index) => (
            <tr key={ index }>
              <td data-testid={ `${ROUTE}__${TABLE}${index}` }>{ index + 1 }</td>
              <td data-testid={ `${ROUTE}__${NAME}` }>{user.name}</td>
              <td data-testid={ `${ROUTE}__${EMAIL}${index}` }>{user.email}</td>
              <td data-testid={ `${ROUTE}__${ROLE}${index}` }>{user.role}</td>
              <td>
                <button
                  data-testid={ `${ROUTE}__${REMOVE}${index}` }
                  type="button"
                  onClick={ () => removeUser(user.id, user.email) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
