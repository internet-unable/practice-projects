export default function Input({label, type = "text", name}) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <input type={type} name={name} id={name} {...rest} />
        </div>
    );
}