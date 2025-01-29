export default function Panel({ data }) {
    console.log(data);
    return (
        <div className="panel">
            <div>
                <img src={data.image} />
                <h1>{data.title}</h1>
                <p>{data.description}</p>
            </div>

            <div>
                <h3>{data.preparation.title}</h3>
                <ul>
                    {data.preparation.items.map(item => (
                        <li key={item.key}>{item.key}: {item.value}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>{data.ingredients.title}</h2>
                <ul>
                    {data.ingredients.items.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="divider"></div>

            <div>
                <h2>{data.instructions.title}</h2>
                <ul>
                    {data.instructions.items.map(item => (
                        <li key={item.key}>{item.key}: {item.value}</li>
                    ))}
                </ul>
            </div>

            <div className="divider"></div>

            <div>
                <h2>{data.nutrition.title}</h2>
                <p>{data.nutrition.description}</p>
                <ul>
                    {data.nutrition.items.map(item => (
                        <li key={item.key}>{item.key}: {item.value}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}