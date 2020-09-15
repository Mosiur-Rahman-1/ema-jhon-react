import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);
    console.log(watch("example"));

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <input name="UserName" defaultValue={loggedInUser.name} ref={register} />
    <input name="UserEmail" defaultValue={loggedInUser.email} ref={register} />
    <input name="exampleRequired" ref={register({ required: true })} />
    {errors.exampleRequired && <span>This field is required</span>}
    <input type="submit" />
    </form>
);
}

export default Shipment;