import css from './item.module.css';

export const ContactItem = ({ contact, deleteContact }) => {
    return <li className={css.item}>
        <span>{contact.name}: {contact.number}</span>
        <button className={css.buttonDelete} type='button' onClick={() => deleteContact(contact.id)}>delete</button>
    </li>
}